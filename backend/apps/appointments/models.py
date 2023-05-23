from datetime import timedelta
from apps.employees.models import Doctor
from apps.employees.utils.choices import Slot
from apps.patients.models import Patient
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django_better_admin_arrayfield.models.fields import ArrayField

from .utils.choices import AppointmentStatus, PrescriptionStatus


class Appointment(models.Model):
    status = models.CharField(
        verbose_name=_("Status"),
        max_length=50,
        choices=AppointmentStatus.choices,
        default=AppointmentStatus.TO_BE_CONFIRMED,
    )
    date = models.DateField(verbose_name=_("Data"))
    time = models.CharField(
        verbose_name=_("Godzina"), choices=Slot.choices, max_length=10
    )
    symptoms = ArrayField(
        models.TextField(blank=True), verbose_name=_("Objawy"), blank=True, default=list
    )
    medicine = ArrayField(
        models.TextField(blank=True),
        verbose_name=_("Stosowane leki"),
        blank=True,
        default=list,
    )
    recommendations = models.TextField(verbose_name=_("Zalecenia"), blank=True)
    doctor = models.ForeignKey(
        verbose_name=_("Lekarz"),
        to=Doctor,
        on_delete=models.CASCADE,
        related_name="appointments",
    )
    patient = models.ForeignKey(
        verbose_name=_("Pacjent"),
        to=Patient,
        on_delete=models.CASCADE,
        related_name="appointments",
    )

    class Meta:
        verbose_name = _("Wizyta")
        verbose_name_plural = _("Wizyty")
        ordering = ["id"]

    def __str__(self):
        return f"{self.doctor}, {self.patient} - {self.date} {self.time}"


class Prescription(models.Model):
    access_code = models.CharField(verbose_name=_("Kod dostępu"), max_length=4)
    medicine = ArrayField(models.CharField(max_length=255), verbose_name=_("Leki"))
    status = models.CharField(
        verbose_name=_("Status"),
        max_length=50,
        choices=PrescriptionStatus.choices,
        default=PrescriptionStatus.CONFIRMED,
    )
    created_at = models.DateTimeField(verbose_name=_("Wystawiono"), auto_now_add=True)
    expires_at = models.DateTimeField(verbose_name=_("Wygasa"), default=timezone.now() + timedelta(days=30))
    appointment = models.ForeignKey(
        verbose_name=_("Wizyta"),
        to=Appointment,
        on_delete=models.CASCADE,
        related_name="prescriptions",
    )

    class Meta:
        verbose_name = _("Recepta")
        verbose_name_plural = _("Recepty")
        ordering = ["id"]
