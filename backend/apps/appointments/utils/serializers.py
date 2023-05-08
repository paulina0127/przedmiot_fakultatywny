from rest_framework import serializers
from .choices import AppointmentStatus
from ..models import Appointment, Prescription


class PatientAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        exclude = ["patient"]

    def get_fields(self):
        # Make some fields read only for patient
        fields = super().get_fields()
        for field_name, field in fields.items():
            if field_name not in ['status', 'date', 'time', 'doctor', 'patient']:
                field.read_only = True
        return fields


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"

    def validate(self, values):
        queryset = Appointment.objects.filter(date=values['date'], time=values['time'], doctor=values['doctor'])
        queryset = queryset.exclude(status=AppointmentStatus.CANCELLED)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)
        if queryset.exists():
            raise serializers.ValidationError("Ten slot jest niedostępny.")
        return values


class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = "__all__"
