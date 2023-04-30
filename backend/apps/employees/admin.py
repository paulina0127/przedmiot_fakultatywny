from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from .models import Doctor, Receptionist, Schedule, Specialization


@admin.register(Specialization)
class SpecializationAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "fem_name"]


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ["id", "doctor", "start_date", "end_date"]


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    def display_specializations(self, obj):
        specializations = obj.specializations.all()
        return ", ".join([str(s.name) for s in specializations])

    display_specializations.short_description = _("Specjalizacje")
    list_display = ["id", "first_name", "last_name", "display_specializations"]
    filter_horizontal = [
        "specializations",
    ]


@admin.register(Receptionist)
class ReceptionistAdmin(admin.ModelAdmin):
    list_display = ["id", "first_name", "last_name"]
