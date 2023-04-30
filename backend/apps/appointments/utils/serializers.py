from rest_framework import serializers

from ..models import Appointment, Prescription


class PatientAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        exclude = ["patient"]


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"


class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = "__all__"
