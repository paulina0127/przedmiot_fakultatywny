from apps.users.utils.choices import UserType
from django.utils import timezone
from rest_framework import generics
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response

from .models import Patient
from .utils.serializers import PatientSerializer


# Display list of all patients
class PatientList(generics.ListCreateAPIView):
    serializer_class = PatientSerializer
    name = "patients"
    search_fields = ["first_name", "last_name", "pesel"]
    ordering_fields = ["id", "birthdate"]
    permission_classes = [DjangoModelPermissions]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            # Return patient's profile
            if user.type == UserType.PATIENT:
                return Patient.objects.filter(user=user)
            # Return doctor's patients
            elif user.type == UserType.DOCTOR:
                return Patient.objects.filter(
                    appointments__doctor=user.doctor
                ).distinct()
            # Return all patients if the user is admin or receptionist
            else:
                return Patient.objects.all()


# Display single patient
class PatientDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PatientSerializer
    name = "patient"
    permission_classes = [DjangoModelPermissions]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            # Return patient's profile
            if user.type == UserType.PATIENT:
                return Patient.objects.filter(user=user)
            # Return doctor's patients
            elif user.type == UserType.DOCTOR:
                return Patient.objects.filter(
                    appointments__doctor=user.doctor
                ).distinct()
            # Return all patients if the user is admin or receptionist
            else:
                return Patient.objects.all()


# Patient statistics
class PatientStatisticsList(generics.ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    name = "patient-stats"

    def get_queryset(self):
        today = timezone.now().date()

        # Query params
        period = self.request.query_params.get("period", "")
        start_date = self.request.query_params.get("start_date", "")
        end_date = self.request.query_params.get("end_date", "")

        # Filters
        # Today, this month, this year
        if period == "day":
            queryset = Patient.objects.filter(user__date_joined__date=today)
        elif period == "month":
            queryset = Patient.objects.filter(user__date_joined__month=today.month)
        elif period == "year":
            queryset = Patient.objects.filter(user__date_joined__year=today.year)
        # Date range
        elif start_date:
            queryset = Patient.objects.filter(user__date_joined__date__gte=start_date)
        elif end_date:
            queryset = Patient.objects.filter(user__date_joined__date__lte=end_date)
        elif start_date and end_date:
            queryset = Patient.objects.filter(
                user__date_joined__date__range=[start_date, end_date]
            )
        else:
            queryset = Patient.objects.all()
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        # Counts
        all = (Patient.objects.all()).count()
        new = queryset.count()

        stats = {"all": all, "new": new}
        return Response(stats)
