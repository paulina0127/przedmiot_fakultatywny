from django.contrib import admin

from .models import Doctor, Patient, Receptionist


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ["id", "first_name", "last_name", "pesel"]


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ["id", "first_name", "last_name", "specialization"]


@admin.register(Receptionist)
class ReceptionistAdmin(admin.ModelAdmin):
    list_display = ["id", "first_name", "last_name"]
