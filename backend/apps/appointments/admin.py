from django.contrib import admin

from .models import Appointment, Prescription


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ["id", "doctor", "patient", "date", "time", "status"]


@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ["id", "access_code", "created_at"]
