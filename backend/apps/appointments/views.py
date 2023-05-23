import secrets
from datetime import datetime

from django.core.exceptions import BadRequest
from django.db.models import Q
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from apps.employees.models import Schedule, Doctor
from apps.users.utils.choices import UserType
from .models import Appointment, Prescription
from .utils.choices import AppointmentStatus
from .utils.email_templates import (
    appointment_email_template,
    APPOINTMENT_TO_BE_CONFIRMED,
    APPOINTMENT_CONFIRMED,
    PRESCRIPTION_ADDED,
    prescription_email_template,
)
from .utils.permissions import (
    AppointmentBaseAccess,
    AppointmentUpdate,
    PrescriptionBaseAccess,
    PrescriptionUpdate,
    IsReceptionistOrAdmin,
)
from .utils.serializers import (
    AppointmentSerializer,
    PrescriptionSerializer,
    PatientCreateAppointmentSerializer,
    ReceptionistCreateAppointmentSerializer,
)
from backend.utils.pagination import CustomPagination


# Display list, create appointments
class AppointmentList(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    name = "appointments"
    filterset_fields = ["status", "doctor", "patient"]
    search_fields = ["patient__first_name", "patient__last_name", "patient__pesel"]
    ordering_fields = ["id", "date"]
    permission_classes = [IsAuthenticated, AppointmentBaseAccess]
    pagination_class = CustomPagination

    def get_serializer_class(self):
        if self.request.user.type == UserType.PATIENT and self.request.method in [
            "POST",
            "PUT",
            "PATCH",
        ]:
            return PatientCreateAppointmentSerializer
        elif (
            self.request.user.type == UserType.RECEPTIONIST
            and self.request.method in ["POST", "PUT", "PATCH"]
        ):
            return ReceptionistCreateAppointmentSerializer
        return self.serializer_class

    def get_queryset(self):
        user = self.request.user
        # Return patient's appointments
        if user.type == UserType.PATIENT:
            return Appointment.objects.filter(patient=user.patient)
        # Return doctor's appointments
        elif user.type == UserType.DOCTOR:
            return Appointment.objects.filter(doctor=user.doctor)
        # Return all appointments if the user is admin or receptionist
        else:
            return Appointment.objects.all()

    # If the current user is a patient assign the appointment to them
    # handle status and patient fields
    def perform_create(self, serializer):
        user = self.request.user
        if user.type == UserType.PATIENT:
            serializer.validated_data["status"] = AppointmentStatus.TO_BE_CONFIRMED
            serializer.fields["patient"].read_only = False
            serializer.validated_data["patient"] = user.patient
            doctor = Doctor.objects.get(id=self.request.data["doctor"])
            date = serializer.validated_data["date"]
            time = serializer.validated_data["time"]
            serializer.save()
            # Email user
            email = APPOINTMENT_TO_BE_CONFIRMED
            email["body"] += f"\nLekarz: {doctor.first_name} {doctor.last_name} \n" \
                             f"Data: {date} \n" \
                             f"Godzina: {time}"
            user.email_user(email["subject"], email["body"])

        elif user.type == UserType.RECEPTIONIST:
            serializer.validated_data["status"] = AppointmentStatus.CONFIRMED
            doctor = Doctor.objects.get(id=self.request.data["doctor"])
            date = serializer.validated_data["date"]
            time = serializer.validated_data["time"]
            serializer.save()
            # Email patient user
            if serializer.validated_data["patient"].user:
                email = APPOINTMENT_CONFIRMED
                email["body"] += f"\nLekarz: {doctor.first_name} {doctor.last_name} \n" \
                                 f"Data: {date} \n" \
                                 f"Godzina: {time}"
                serializer.validated_data["patient"].user.email_user(
                    email["subject"], email["body"]
                )
        else:
            serializer.save()


# Display, update single appointment
class AppointmentDetail(generics.RetrieveUpdateAPIView):
    name = "appointment"
    permission_classes = [IsAuthenticated, AppointmentBaseAccess, AppointmentUpdate]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        user = self.request.user
        # Return patient's appointment
        if user.type == UserType.PATIENT:
            return Appointment.objects.filter(patient=user.patient)
        # Return doctor's appointments
        elif user.type == UserType.DOCTOR:
            return Appointment.objects.filter(doctor=user.doctor)
        # Return appointments for receptionist and admin
        else:
            return Appointment.objects.all()

    def partial_update(self, request, *args, **kwargs):
        # Get appointment request/object values
        user = self.request.user
        obj = self.get_object()
        doctor = request.data.get("doctor", obj.doctor)
        date = request.data.get("date", obj.date)
        time = request.data.get("time", obj.time)
        patient = request.data.get("patient", obj.patient)
        if user.type == UserType.DOCTOR:
            # set completed by default when doctor updates
            request.data["status"] = AppointmentStatus.COMPLETED
        status = request.data.get("status", obj.status)

        response = super().partial_update(request, *args, **kwargs)

        # Send email if any value got changed
        if patient.user and (obj.status != status or obj.doctor != doctor
                             or obj.date != date or obj.time != time or obj.patient != patient):
            email = appointment_email_template(status)
            email["body"] += f"\nLekarz: {doctor} \n" \
                                f"Data: {date} \n" \
                                f"Godzina: {time}"
            patient.user.email_user(email["subject"], email["body"])

        return response


# Display list, create prescriptions
class PrescriptionList(generics.ListCreateAPIView):
    serializer_class = PrescriptionSerializer
    name = "prescriptions"
    filterset_fields = ["appointment", "status"]
    ordering_fields = ["id", "created_at"]
    permission_classes = [IsAuthenticated, PrescriptionBaseAccess]

    def get_queryset(self):
        user = self.request.user
        if user.type in [UserType.PATIENT, UserType.DOCTOR]:
            return Prescription.objects.filter(appointment_id=self.kwargs['pk'])

    def perform_create(self, serializer):
        # Generate 4-digit PIN for prescription
        pesel = Appointment(id=self.request.data.get('appointment')).patient.pesel
        code = str(secrets.randbelow(10000)).zfill(4)
        while Prescription.objects.filter(access_code=code, appointment__patient__pesel=pesel).exists():
            code = str(secrets.randbelow(10000)).zfill(4)
        serializer.fields["access_code"].read_only = False
        serializer.validated_data["access_code"] = code
        # Assign appointment, save
        serializer.fields["appointment"].read_only = False
        serializer.validated_data["appointment"] = Appointment.objects.get(pk=self.kwargs['pk'])
        serializer.save()
        # Email patient
        if serializer.validated_data["patient"].user:
            email = PRESCRIPTION_ADDED
            serializer.validated_data["patient"].user.email_user(email["subject"], email["body"])


# Display, update single prescription
class PrescriptionDetail(generics.RetrieveUpdateAPIView):
    serializer_class = PrescriptionSerializer
    name = "prescription"
    permission_classes = [
        IsAuthenticated,
        PrescriptionBaseAccess,
        PrescriptionUpdate,
    ]

    def get_serializer(self, *args, **kwargs):
        serializer = super().get_serializer(*args, **kwargs)
        serializer.fields['status'].read_only = False
        return serializer

    def get_queryset(self):
        user = self.request.user
        # Return patient's prescriptions
        if user.type == UserType.PATIENT:
            return Prescription.objects.filter(appointment__patient=user.patient)
        # Return doctor's prescriptions
        elif user.type == UserType.DOCTOR:
            return Prescription.objects.filter(appointment__doctor=user.doctor)
        # Return all prescriptions if the user is admin
        else:
            return Prescription.objects.all()

    def partial_update(self, request, *args, **kwargs):
        # Get object/request values and email patient
        prescription = self.get_object()
        status = request.data.get("status", prescription.status)
        patient = prescription.appointment.patient

        response = super().partial_update(request, *args, **kwargs)

        if patient.user:
            email = prescription_email_template(status)
            if email:
                patient.user.email_user(email["subject"], email["body"])

        return response


# Appointment statistics
class AppointmentStatisticsList(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    name = "appointment-stats"
    permission_classes = [IsAuthenticated, IsReceptionistOrAdmin]

    def get_queryset(self):
        today = timezone.now().date()

        # Query params
        period = self.request.query_params.get("period", "")
        start_date = self.request.query_params.get("start_date", "")
        end_date = self.request.query_params.get("end_date", "")

        # Filters
        # Today, this month, this year
        if period == "day":
            queryset = Appointment.objects.filter(date__date=today)
        elif period == "month":
            queryset = Appointment.objects.filter(date__month=today.month)
        elif period == "year":
            queryset = Appointment.objects.filter(date__year=today.year)
        # Date range
        elif start_date:
            queryset = Appointment.objects.filter(date__date__gte=start_date)
        elif end_date:
            queryset = Appointment.objects.filter(date__date__lte=end_date)
        elif start_date and end_date:
            queryset = Appointment.objects.filter(
                date__date__range=[start_date, end_date]
            )
        else:
            queryset = Appointment.objects.all()
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        # Counts
        all = queryset.count()
        completed = queryset.filter(status=AppointmentStatus.COMPLETED).count()
        cancelled = queryset.filter(status=AppointmentStatus.CANCELLED).count()

        stats = {"all": all, "completed": completed, "cancelled": cancelled}
        return Response(stats)


# Available slots
class AvailableSlotsList(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    name = "available-slots"
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        # Query params
        doctor = self.request.query_params.get("doctor", "")
        date = self.request.query_params.get("date", "")

        if doctor and date:
            # Get weekday name
            date = datetime.strptime(date, "%Y-%m-%d").date()
            weekday = date.strftime("%A").lower()

            # Return empty list if weekday is not on the schedule
            if weekday not in [field.name for field in Schedule._meta.fields]:
                return Response([])

            # Taken slots for the date
            taken_slots = (
                Appointment.objects.filter(doctor=doctor, date=date)
                .exclude(status=AppointmentStatus.CANCELLED)
                .values_list("time", flat=True)
            )

            # Doctor's availability for the date
            temp = Schedule.objects.filter(
                Q(start_date__isnull=False)
                & Q(start_date__lte=date, end_date__gte=date),
                doctor=doctor,
            )

            # First check if there are schedules with start-end dates that include the date
            if temp.count() > 0:
                doctor_availability = temp.values_list(weekday, flat=True)
            # Else return doctor's fixed schedule
            else:
                doctor_availability = list(
                    Schedule.objects.filter(doctor=doctor).values_list(
                        weekday, flat=True
                    )
                )

            # Delete extra dimension in the list
            if len(doctor_availability) > 0:
                doctor_availability = doctor_availability[0]

            # Slots that are in doctor's availability but aren't in taken slots
            slots = [slot for slot in doctor_availability if slot not in taken_slots]

            return Response(slots)
        else:
            # Raise BadRequest if there's no query params
            raise BadRequest(_("Parametry 'doctor' i 'date' są wymagane."))
