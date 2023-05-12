from datetime import datetime, timedelta

from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission, SAFE_METHODS

from apps.appointments.utils.choices import AppointmentStatus
from apps.users.utils.choices import UserType


class AppointmentBaseAccess(BasePermission):

    def has_object_permission(self, request, view, obj):
        # True if user type is admin, receptionist or
        # a doctor/patient associated with the Appointment.
        user = request.user
        if user.type == UserType.DOCTOR:
            return obj.doctor.user == user
        if user.type == UserType.PATIENT:
            return obj.patient.user == user
        return user.type == UserType.RECEPTIONIST or user.type == UserType.ADMIN


class AppointmentUpdate(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow read access to everyone
        if request.method in SAFE_METHODS or request.user.type == UserType.ADMIN:
            return True

        data = request.data
        if request.user.type == UserType.PATIENT:
            twelve_hours_ago = datetime.now() - timedelta(hours=12)
            if twelve_hours_ago > obj.date:
                raise PermissionDenied(detail="Wizytę można anulować 12 godzin "
                                              "przed dniem jej rozpoczęcia.")
            if len(data) != 1 and data.get('status') != AppointmentStatus.CANCELLED:
                raise PermissionDenied(detail="Możesz tylko anulować wizytę.")
        else:
            if datetime.now().date() > obj.date:
                raise PermissionDenied(detail="Edycja możliwa tego samego dnia, "
                                              "co wizyta (lub wcześniej).")

            if request.user.type == UserType.DOCTOR:
                allowed_keys = ['symptoms', 'medicine', 'recommendations']
                if any(key not in allowed_keys for key in data):
                    raise PermissionDenied(detail="Brak uprawnień do zmiany "
                                                  "danych niemedycznych.")

            elif request.user.type == UserType.RECEPTIONIST:
                allowed_keys = ['status', 'date', 'time', 'doctor', 'patient']
                if any(key not in allowed_keys for key in data):
                    raise PermissionDenied(detail="Brak uprawnień do zmiany "
                                                  "danych medycznych.")
        return True


class PrescriptionBaseAccess(BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            if request.user not in [UserType.ADMIN, UserType.DOCTOR]:
                return False
        return True

    def has_object_permission(self, request, view, obj):
        # True if user type is admin or
        # a doctor/patient associated with the Prescription,
        # patient is readonly, receptionist doesn't have any access.
        user = request.user
        if user.type == UserType.DOCTOR:
            return obj.appointment.doctor.user == user
        if user.type == UserType.PATIENT:
            return request.method in SAFE_METHODS and obj.appointment.patient.user == user
        return user.type == UserType.ADMIN


class PrescriptionUpdateDestroy(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Only allow doctor associated with the prescription to edit and delete,
        # can only happen on the same day or earlier.
        if request.method in SAFE_METHODS:
            return True

        user = request.user
        if user.type == UserType.DOCTOR and obj.appointment.doctor.user == user:
            if datetime.now().date() > obj.appointment.date:
                raise PermissionDenied(detail="Edycja możliwa tego samego dnia, "
                                              "co wizyta (lub wcześniej).")
            return True
        return False


class IsReceptionistOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.type in [UserType.RECEPTIONIST, UserType.ADMIN]
