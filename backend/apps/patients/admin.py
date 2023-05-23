from django.contrib import admin
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin

from .models import Patient


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin, DynamicArrayMixin):
    list_display = ["id", "first_name", "last_name", "pesel", "birthdate", "user"]
