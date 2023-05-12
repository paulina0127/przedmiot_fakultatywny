from apps.employees.models import Doctor, Receptionist
from apps.patients.models import Patient
from django.contrib.auth import get_user_model
from djoser.serializers import UserSerializer
from rest_framework import serializers

from .choices import UserType

User = get_user_model()


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ["id", "first_name", "last_name", "image"]


class ReceptionistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receptionist
        fields = ["id", "first_name", "last_name", "image"]


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ["id", "first_name", "last_name", "image"]


class DoctorUserSerializer(serializers.ModelSerializer):
    profile = DoctorSerializer(read_only=True, source="doctor")

    class Meta:
        model = User
        fields = ["id", "email", "type", "profile"]


class ReceptionistUserSerializer(UserSerializer):
    profile = ReceptionistSerializer(read_only=True, source="receptionist")

    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "type", "profile"]


class PatientUserSerializer(UserSerializer):
    profile = PatientSerializer(read_only=True, source="patient")

    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "type", "profile"]


class DefaultUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "type"]


class UserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "type", "password"]

    def to_representation(self, instance):
        user = self.context["request"].user
        # Return user serializer for doctor
        if user.type == UserType.DOCTOR:
            serializer = DoctorUserSerializer(instance, context=self.context)
        # Return user serializer for receptiionist
        elif user.type == UserType.RECEPTIONIST:
            serializer = ReceptionistUserSerializer(instance, context=self.context)
        # Return user serializer for patient
        elif user.type == UserType.PATIENT:
            serializer = PatientUserSerializer(instance, context=self.context)
        # Return default user serializer
        else:
            serializer = DefaultUserSerializer(instance, context=self.context)
        return serializer.data
