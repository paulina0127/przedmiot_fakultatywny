import secrets

from apps.users.utils.choices import UserType
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Patient, User
from .utils.permissions import PatientBaseAccess, PatientReadUpdate, IsPatient
from .utils.serializers import PatientSerializer, PatientUserCreateSerializer, CreateUserLinkPatientSerializer


# Patient registration (for patients)
class CreateUserPatient(generics.CreateAPIView):
    serializer_class = PatientUserCreateSerializer
    name = "new-patient-user"
    permission_classes = [~IsAuthenticated]


# User creation and patient link (for patients)
class CreateUserLinkPatient(generics.CreateAPIView):
    serializer_class = CreateUserLinkPatientSerializer
    name = "new-user-link-patient"
    permission_classes = [~IsAuthenticated]


# Display all, create patients (for staff)
class PatientList(generics.ListCreateAPIView):
    serializer_class = PatientSerializer
    name = "patients"
    search_fields = ["first_name", "last_name", "pesel"]
    ordering_fields = ["id", "birthdate"]
    permission_classes = [IsAuthenticated, ~IsPatient, PatientBaseAccess]

    def perform_create(self, serializer):
        # Set link key
        key = secrets.token_urlsafe(10)
        while Patient.objects.filter(link_key=key).exists():
            key = secrets.token_urlsafe(10)
        serializer.save(link_key=key)

    def get_queryset(self):
        user = self.request.user
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
    permission_classes = [IsAuthenticated, PatientBaseAccess, PatientReadUpdate]

    def get_queryset(self):
        user = self.request.user
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
    permission_classes = [IsAuthenticated, ~IsPatient]

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
