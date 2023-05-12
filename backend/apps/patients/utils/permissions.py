from datetime import datetime, timedelta

from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission, SAFE_METHODS

from apps.appointments.models import Appointment
from apps.appointments.utils.choices import AppointmentStatus
from apps.users.utils.choices import UserType


class PatientBaseAccess(BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST' and request.user.type == UserType.PATIENT:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        # True if user type is admin, receptionist or
        # a doctor/patient associated with request user.
        user = request.user
        if user.type == UserType.DOCTOR:
            return Appointment.objects.filter(doctor=user.doctor, patient=obj).exists()
        if user.type == UserType.PATIENT:
            return obj.user == user
        return user.type == UserType.RECEPTIONIST or user.type == UserType.ADMIN


class PatientReadUpdate(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow read access to everyone
        if request.method in SAFE_METHODS or request.user.type == UserType.ADMIN:
            return True

        # Make some fields not editable
        data = request.data
        if request.user.type == UserType.PATIENT:
            disallowed_keys = ['pesel', 'birthdate', 'user', 'link_key']
            if any(key in disallowed_keys for key in data):
                raise PermissionDenied(detail="Brak uprawnień do zmiany "
                                              "tych danych.")
        elif request.user.type == UserType.DOCTOR:
            allowed_keys = ['medicine', 'allergies', 'diseases']
            if any(key not in allowed_keys for key in data):
                raise PermissionDenied(detail="Brak uprawnień do zmiany "
                                              "danych niemedycznych.")
        elif request.user.type == UserType.RECEPTIONIST:
            disallowed_keys = ['medicine', 'allergies', 'diseases', 'user']
            if any(key in disallowed_keys for key in data):
                raise PermissionDenied(detail="Brak uprawnień do zmiany "
                                              "tych danych.")
        return True


class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user.type == UserType.PATIENT
