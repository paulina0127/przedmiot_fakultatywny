from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.profiles.models import Doctor, Patient

from .utils.choices import VisitStatus


class Visit(models.Model):
    status = models.CharField(
        verbose_name=_("Status"), max_length=50, choices=VisitStatus.choices, blank=True
    )
    date = models.DateTimeField(verbose_name=_("Data"))
    symptoms = models.TextField(verbose_name=_("Objawy"), blank=True, null=True)
    medicine = models.TextField(verbose_name=_("Stosowane leki"), blank=True, null=True)
    recommendations = models.TextField(
        verbose_name=_("Zalecenia"), blank=True, null=True
    )
    doctor = models.ForeignKey(
        verbose_name=_("Lekarz"),
        to=Doctor,
        on_delete=models.CASCADE,
        related_name="visists",
    )
    patient = models.ForeignKey(
        verbose_name=_("Pacjent"),
        to=Patient,
        on_delete=models.CASCADE,
        related_name="visits",
    )

    class Meta:
        verbose_name = _("Wizyta")
        verbose_name_plural = _("Wizyty")
        ordering = ["id"]

    def __str__(self):
        return f"{self.doctor} - {self.patient} - {self.date.strftime('%Y-%m-%d %H:%M:%S')}"

    def save(self, *args, **kwargs):
        # Set status as to be verified on create
        if not self.status:
            self.status = VisitStatus.TO_BE_VERIFIED
        super(Visit, self).save(*args, **kwargs)


class Prescription(models.Model):
    access_code = models.CharField(verbose_name=_("Kod dostępu"), max_length=4)
    added_at = models.DateTimeField(
        verbose_name=_("Data wystawienia"), auto_now_add=True
    )
    medicine = models.TextField(verbose_name=_("Leki"))
    visit = models.ForeignKey(
        verbose_name=_("Wizyta"),
        to=Visit,
        on_delete=models.CASCADE,
        related_name="prescriptions",
    )

    class Meta:
        verbose_name = _("Recepta")
        verbose_name_plural = _("Recepty")
        ordering = ["id"]

    def __str__(self):
        return self.access_code + " " + self.added_at
