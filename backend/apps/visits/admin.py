from django.contrib import admin

from .models import Prescription, Visit


@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    list_display = ["id", "date", "doctor", "patient", "status"]


@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ["id", "access_code", "added_at"]
