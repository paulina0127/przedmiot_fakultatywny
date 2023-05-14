import secrets

from django.db import transaction
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from .models import Patient
from .utils.permissions import PatientBaseAccess, PatientReadUpdate, IsPatient
from .utils.serializers import PatientSerializer, UserLinkPatientSerializer
from apps.users.utils.choices import UserType
from rest_framework.parsers import MultiPartParser

User = get_user_model()


# User creation and patient link (for patients)
class UserLinkPatient(generics.UpdateAPIView):
    serializer_class = UserLinkPatientSerializer
    name = "user-link-patient"
    permission_classes = [~IsAuthenticated]

    def get_queryset(self):
        return Patient.objects.filter(user=None, link_key__isnull=False)

    def perform_update(self, serializer):
        pesel = serializer.validated_data["pesel"]
        link_key = serializer.validated_data["link_key"]
        user_id = serializer.validated_data["user_id"]
        try:
            # user = User.objects.get(id=user_id, type=UserType.NEW)
            user = User.objects.get(id=user_id, patient__isnull=True)
            patient = Patient.objects.get(user=None, pesel=pesel, link_key=link_key)
        except (User.DoesNotExist, Patient.DoesNotExist):
            raise ValidationError("Podano błędne dane.")
        # Set user type and assign user to patient in one transaction
        with transaction.atomic():
            user.type = UserType.PATIENT
            user.save()
            patient.user = user
            patient.link_key = ""  # reset link key
            patient.save()

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(
            {"detail": "Połączono pacjenta do konta."}, status=status.HTTP_200_OK
        )


# Display all, create patients
class PatientList(generics.ListCreateAPIView):
    serializer_class = PatientSerializer
    name = "patients"
    search_fields = ["first_name", "last_name", "pesel"]
    ordering_fields = ["id", "birthdate"]
    permission_classes = [~IsPatient, PatientBaseAccess]

    def perform_create(self, serializer):
        # Set link key if patient is added by receptionist
        if self.request.user.is_authenticated and self.request.user.type in [
            UserType.RECEPTIONIST,
            UserType.ADMIN,
        ]:
            key = secrets.token_urlsafe(10)
            while Patient.objects.filter(link_key=key).exists():
                key = secrets.token_urlsafe(10)
            serializer.fields['link_key'].read_only = False
            serializer.validated_data['link_key'] = key
        serializer.save()

    def get_queryset(self):
        user = self.request.user
        # Return patient's profiles
        if user.is_authenticated:
            if user.type == UserType.PATIENT:
                return Patient.objects.filter(user=user)
            # Return doctor's patients
            elif user.type == UserType.DOCTOR:
                return Patient.objects.filter(
                    appointments__doctor=user.doctor
                ).distinct()
            # Return all patients if the user is admin or receptionist
            elif user.type in [UserType.ADMIN, UserType.RECEPTIONIST]:
                return Patient.objects.all()

    def post(self, request, *args, **kwargs):
        medicine_values = []
        allergies_values = []
        diseases_values = []

        for key, value in request.data.items():
            if key.startswith("medicine[") and key.endswith("]"):
                index = int(key.split("[")[1].split("]")[0])
                while len(medicine_values) <= index:
                    medicine_values.append(None)
                medicine_values[index] = value
            elif key.startswith("allergies[") and key.endswith("]"):
                index = int(key.split("[")[1].split("]")[0])
                while len(allergies_values) <= index:
                    allergies_values.append(None)
                allergies_values[index] = value
            elif key.startswith("diseases[") and key.endswith("]"):
                index = int(key.split("[")[1].split("]")[0])
                while len(diseases_values) <= index:
                    diseases_values.append(None)
                diseases_values[index] = value

        data = request.data.copy()
        data["medicine"] = medicine_values
        data["allergies"] = allergies_values
        data["diseases"] = diseases_values

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


# Display single patient
class PatientDetail(generics.RetrieveUpdateAPIView):
    serializer_class = PatientSerializer
    name = "patient"
    permission_classes = [IsAuthenticated, PatientBaseAccess, PatientReadUpdate]
    parser_classes = [MultiPartParser]

    def get_queryset(self):
        user = self.request.user
        # Return patient's profile
        if user.type == UserType.PATIENT:
            return Patient.objects.filter(user=user)
        # Return doctor's patients
        elif user.type == UserType.DOCTOR:
            return Patient.objects.filter(appointments__doctor=user.doctor).distinct()
        # Return all patients if the user is admin or receptionist
        else:
            return Patient.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        medicine_values = []
        allergies_values = []
        diseases_values = []

        for key, value in request.data.items():
            if key.startswith("medicine[") and key.endswith("]"):
                index = int(key.split("[")[1].split("]")[0])
                while len(medicine_values) <= index:
                    medicine_values.append(None)
                medicine_values[index] = value
            elif key.startswith("allergies[") and key.endswith("]"):
                index = int(key.split("[")[1].split("]")[0])
                while len(allergies_values) <= index:
                    allergies_values.append(None)
                allergies_values[index] = value
            elif key.startswith("diseases[") and key.endswith("]"):
                index = int(key.split("[")[1].split("]")[0])
                while len(diseases_values) <= index:
                    diseases_values.append(None)
                diseases_values[index] = value

        instance.medicine = medicine_values
        instance.allergies = allergies_values
        instance.diseases = diseases_values

        print(medicine_values, allergies_values, diseases_values)
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


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
