from rest_framework import serializers

from ..models import Doctor, Patient, Receptionist


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        exclude = ["user"]


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        exclude = ["user"]


class ReceptionistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receptionist
        exclude = ["user"]
