from datetime import datetime

from django.core.exceptions import BadRequest
from django.db.models import Q
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from apps.employees.models import Schedule
from apps.users.utils.choices import UserType
from .models import Appointment, Prescription
from .utils.choices import AppointmentStatus
from .utils.permissions import (AppointmentBaseAccess, AppointmentUpdate,
                                PrescriptionBaseAccess, PrescriptionUpdateDestroy,
                                IsReceptionistOrAdmin)
from .utils.serializers import (AppointmentSerializer,
                                PrescriptionSerializer)


# Display list, create appointments
class AppointmentList(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    name = "appointments"
    filterset_fields = ["status", "doctor", "patient"]
    search_fields = ["patient__first_name", "patient__last_name", "patient__pesel"]
    ordering_fields = ["id", "date"]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Return patient's appointments
        if user.type == UserType.PATIENT:
            return Appointment.objects.filter(patient=user.patient).exclude(patient=None)
        # Return doctor's appointments
        elif user.type == UserType.DOCTOR:
            return Appointment.objects.filter(doctor=user.doctor).exclude(doctor=None)
        # Return all appointments if the user is admin or receptionist
        else:
            return Appointment.objects.all()

    # If the current user is a patient assign the appointment to them
    # handle status and patient fields
    def perform_create(self, serializer):
        user = self.request.user
        if user.type == UserType.PATIENT:
            serializer.validated_data['status'] = AppointmentStatus.TO_BE_CONFIRMED
            serializer.validated_data['patient'] = user.patient
        elif user.type == UserType.RECEPTIONIST:
            serializer.validated_data['status'] = AppointmentStatus.CONFIRMED
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
            return Appointment.objects.filter(patient=user.patient).exclude(patient=None)
        # Return doctor's appointments
        elif user.type == UserType.DOCTOR:
            return Appointment.objects.filter(doctor=user.doctor).exclude(doctor=None)
        # Return appointments without medical data for receptionist and admin
        else:
            return Appointment.objects.all().exclude(symptoms=None, medicine=None, recommendations=None)

    def partial_update(self, request, *args, **kwargs):
        if self.request.user.type == UserType.DOCTOR:
            request.data['status'] = AppointmentStatus.COMPLETED
        return super().partial_update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if self.request.user.type != UserType.ADMIN:
            raise PermissionDenied(detail="Brak uprawnień.")
        return super().update(request, *args, **kwargs)


# Display list, create prescriptions
class PrescriptionList(generics.ListCreateAPIView):
    serializer_class = PrescriptionSerializer
    name = "prescriptions"
    filterset_fields = ["appointment"]
    ordering_fields = ["id", "created_at"]
    permission_classes = [IsAuthenticated, PrescriptionBaseAccess]

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


# Display, update single prescription
class PrescriptionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PrescriptionSerializer
    name = "prescription"
    permission_classes = [IsAuthenticated, PrescriptionBaseAccess, PrescriptionUpdateDestroy]

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
                Q(start_date__isnull=False) & Q(start_date__lte=date, end_date__gte=date), doctor=doctor)
            # First check if there are schedules with start-end dates that include the date
            if temp:
                doctor_availability = temp.values_list(weekday, flat=True)
            # Else return doctor's fixed schedule
            else:
                doctor_availability = Schedule.objects.filter(doctor=doctor).values_list(weekday, flat=True)

            # Delete extra dimension in the list
            if len(doctor_availability) > 0:
                doctor_availability = doctor_availability[0]

            # Slots that are in doctor's availability but aren't in taken slots
            slots = [slot for slot in doctor_availability if slot not in taken_slots]
            return Response(slots)
        else:
            # Raise BadRequest if there's no query params
            raise BadRequest(_("Parametry 'doctor' i 'date' są wymagane."))
