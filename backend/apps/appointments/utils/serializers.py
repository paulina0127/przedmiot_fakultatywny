from datetime import datetime

from django.db.models import Q
from rest_framework import serializers

from ..models import Appointment, Prescription
from .choices import AppointmentStatus
from ...employees.models import Schedule
from ...users.utils.choices import UserType


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"

    def is_slot_available(self):
        # Get the request object from the context
        request = self.context.get('request')
        doctor = request.data.get('doctor', self.instance.doctor)
        date = request.data.get('date', self.instance.date)
        # Get weekday name
        date = datetime.strptime(date, "%Y-%m-%d").date()
        weekday = date.strftime("%A").lower()

        # Slot unavailable if weekday is not on the schedule
        if weekday not in [field.name for field in Schedule._meta.fields]:
            return False

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
        available_slots = [slot for slot in doctor_availability if slot not in taken_slots]
        if request.method == 'POST' and request.data.get('time', '') in available_slots:
            return True
        if request.method in ['PUT', 'PATCH']:
            if request.data.get('time', self.instance.time) == self.instance.time \
                    or request.data.get('time', '') in available_slots:
                return True
        return False

    def validate(self, values):
        if not self.is_slot_available():
            raise serializers.ValidationError("Ten slot jest niedostępny.")
        return values

    def validate_date(self, value):
        request = self.context['request']
        if request.user.type == UserType.PATIENT:
            if value < datetime.now().date():
                raise serializers.ValidationError("Data nie może być z przeszłości.")


class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = "__all__"
