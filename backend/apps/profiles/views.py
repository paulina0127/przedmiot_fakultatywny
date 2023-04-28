from .models import Doctor, Patient
from .utils.serializers import (
    DoctorSerializer,
    PatientSerializer,
)

from rest_framework import generics
from rest_framework.permissions import (
    DjangoModelPermissions,
    DjangoModelPermissionsOrAnonReadOnly,
)
from django.utils import timezone
from rest_framework.response import Response


# Display list of all patients
class PatientList(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    name = "patients"
    search_fields = ["first_name", "last_name", "pesel"]
    ordering_fields = ["id", "birthdate"]
    permission_classes = [DjangoModelPermissions]


# Display single patient
class PatientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    name = "patient"
    permission_classes = [DjangoModelPermissions]


# Display list of all doctors
class DoctorList(generics.ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    name = "doctors"
    filterset_fields = ["specializations"]
    search_fields = ["first_name", "last_name"]
    ordering_fields = ["id"]
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


# Display single doctor
class DoctorDetail(generics.RetrieveAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    name = "doctor"
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


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
