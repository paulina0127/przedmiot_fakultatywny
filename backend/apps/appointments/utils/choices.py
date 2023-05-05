from django.db import models
from django.utils.translation import gettext_lazy as _


class AppointmentStatus(models.TextChoices):
    TO_BE_CONFIRMED = "Oczekuje na potwierdzenie", _("Oczekuje na potwierdzenie")
    CONFIRMED = "Potwierdzona", _("Potwierdzona")
    COMPLETED = "Odbyta", _("Odbyta")
    CANCELLED = "Anulowana", _("Anulowana")
