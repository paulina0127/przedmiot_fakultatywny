from datetime import datetime

from django.db.models import Q
from rest_framework import serializers

from .available_slots import available_slots_list
from ..models import Appointment, Prescription
from .choices import AppointmentStatus, PrescriptionStatus
from ...employees.models import Schedule, Doctor
from ...patients.models import Patient
from ...users.utils.choices import UserType


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ["id", "first_name", "last_name"]


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ["id", "first_name", "last_name"]


class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = "__all__"

    def is_slot_available(self):
        # Get the request object from the context
        request = self.context.get("request")
        if self.instance:
            doctor = request.data.get("doctor", self.instance.doctor)
            date = request.data.get("date", self.instance.date)
        else:
            doctor = request.data.get("doctor")
            date = request.data.get("date")
        available_slots = available_slots_list(doctor, date)
        if request.method == "POST" and request.data.get("time", "") in available_slots:
            return True
        if request.method in ["PUT", "PATCH"]:
            if (
                self.instance
                and request.data.get("time", self.instance.time) == self.instance.time
                or request.data.get("time", "") in available_slots
            ):
                return True
        return False

    def validate(self, values):
        if not self.is_slot_available():
            raise serializers.ValidationError("Ten termin jest niedostępny.")
        return values

    def validate_date(self, value):
        request = self.context["request"]
        if request.user.type == UserType.PATIENT:
            if value < datetime.now().date():
                raise serializers.ValidationError("Data nie może być z przeszłości.")
        return value


class PatientCreateAppointmentSerializer(AppointmentSerializer):
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())

    class Meta:
        model = Appointment
        exclude = ["status", "recommendations", "control_visit"]


class ReceptionistCreateAppointmentSerializer(AppointmentSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())
    status = serializers.ChoiceField(choices=AppointmentStatus, required=False)

    class Meta:
        model = Appointment
        exclude = ["recommendations"]


class PrescriptionSerializer(serializers.ModelSerializer):
    access_code = serializers.CharField(read_only=True)
    expires_at = serializers.DateTimeField(read_only=True)
    appointment = serializers.PrimaryKeyRelatedField(read_only=True)
    status = serializers.ChoiceField(choices=PrescriptionStatus, read_only=True)

    class Meta:
        model = Prescription
        fields = "__all__"
