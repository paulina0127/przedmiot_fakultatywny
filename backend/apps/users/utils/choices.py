from django.db import models
from django.utils.translation import gettext_lazy as _


class UserType(models.TextChoices):
    NEW = "Nowy użytkownik", _("Nowy użytkownik")
    PATIENT = "Pacjent", _("Pacjent")
    DOCTOR = "Lekarz", _("Lekarz")
    RECEPTIONIST = "Recepcjonista", _("Recepcjonista")
    ADMIN = "Admin", _("Admin")
