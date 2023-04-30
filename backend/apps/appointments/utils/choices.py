from django.db import models
from django.utils.translation import gettext_lazy as _


class AppointmentStatus(models.TextChoices):
    TO_BE_VERIFIED = "Oczekuje na weryfikację", _("Oczekuje na weryfikację")
    VERIFIED = "Zweryfikowana", _("Zweryfikowana")
    COMPLETED = "Odbyta", _("Odbyta")
    CANCELLED = "Anulowana", _("Anulowana")
