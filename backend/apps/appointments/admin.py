from django.contrib import admin
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin

from .models import Appointment, Prescription


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin, DynamicArrayMixin):
    list_display = ["id", "doctor", "patient", "date", "time", "status"]


@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin, DynamicArrayMixin):
    list_display = ["id", "access_code", "created_at"]
