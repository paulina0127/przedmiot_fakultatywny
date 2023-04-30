from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.employees.models import Doctor
from apps.employees.utils.choices import Slot
from apps.patients.models import Patient

from .utils.choices import AppointmentStatus


class Appointment(models.Model):
    status = models.CharField(
        verbose_name=_("Status"),
        max_length=50,
        choices=AppointmentStatus.choices,
        blank=True,
    )
    date = models.DateField(verbose_name=_("Data"))
    time = models.CharField(
        verbose_name=_("Godzina"), choices=Slot.choices, max_length=10
    )
    symptoms = models.TextField(verbose_name=_("Objawy"), blank=True, null=True)
    medicine = models.TextField(verbose_name=_("Stosowane leki"), blank=True, null=True)
    recommendations = models.TextField(
        verbose_name=_("Zalecenia"), blank=True, null=True
    )
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

    def save(self, *args, **kwargs):
        # Set status as to be verified on create
        if not self.pk:
            self.status = AppointmentStatus.TO_BE_VERIFIED
        super(Appointment, self).save(*args, **kwargs)


class Prescription(models.Model):
    access_code = models.CharField(verbose_name=_("Kod dostępu"), max_length=4)
    created_at = models.DateTimeField(verbose_name=_("Wystawiono"), auto_now_add=True)
    medicine = models.TextField(verbose_name=_("Leki"))
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
