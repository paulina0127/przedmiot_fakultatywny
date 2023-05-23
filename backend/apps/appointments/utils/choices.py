from django.db import models
from django.utils.translation import gettext_lazy as _


class AppointmentStatus(models.TextChoices):
    TO_BE_CONFIRMED = "Oczekuje na potwierdzenie", _("Oczekuje na potwierdzenie")
    CONFIRMED = "Potwierdzona", _("Potwierdzona")
    COMPLETED = "Odbyta", _("Odbyta")
    CANCELLED = "Anulowana", _("Anulowana")


class PrescriptionStatus(models.TextChoices):
    CONFIRMED = "Zatwierdzona", _("Zatwierdzona")
    COMPLETED = "Zrealizowana", _("Zrealizowana")
    CANCELLED = "Anulowana", _("Anulowana")
