from datetime import datetime, timedelta

from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission, SAFE_METHODS

from apps.appointments.utils.choices import AppointmentStatus, PrescriptionStatus
from apps.users.utils.choices import UserType


class AppointmentBaseAccess(BasePermission):
    def has_permission(self, request, view):
        if request.user.type == UserType.DOCTOR:
            return request.method != 'POST'
        return True

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
    # Patient can cancel 12h before day of appointment
    # Allow only certain keys in request data
    # Allow editing for workers only on the same day (or earlier)
    def has_object_permission(self, request, view, obj):
        # Allow read access to everyone (read object permissions in AppointmentBaseAccess)
        if request.method in SAFE_METHODS or request.user.type == UserType.ADMIN:
            return True

        data = request.data
        if request.user.type == UserType.PATIENT:
            twelve_hours_ago = datetime.now().date() - timedelta(hours=12)
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
    # Only doctor and admin can create a prescription
    # object access to patient (read), doctor (read/write) associated with prescription
    def has_permission(self, request, view):
        if request.method == 'POST':
            if request.user.type not in [UserType.ADMIN, UserType.DOCTOR]:
                return False
        return True

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.type == UserType.DOCTOR:
            return obj.appointment.doctor.user == user
        if user.type == UserType.PATIENT:
            return request.method in SAFE_METHODS and obj.appointment.patient.user == user
        return user.type == UserType.ADMIN


class PrescriptionUpdate(BasePermission):
    # Allow doctor associated with the prescription to cancel
    # allow read access to everyone (read object permissions in PrescriptionBaseAccess)
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        user = request.user
        if user.type == UserType.DOCTOR and obj.appointment.doctor.user == user:
            if obj.status == PrescriptionStatus.COMPLETED:
                raise PermissionDenied(detail="Nie można anulować już zrealizowanej recepty.")
            if len(request.data) != 1 and request.data.get('status') != PrescriptionStatus.CANCELLED:
                raise PermissionDenied(detail="Już wystawioną receptę można tylko anulować.")
            return True
        return False


class IsReceptionistOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.type in [UserType.RECEPTIONIST, UserType.ADMIN]
