from django.db import models
from django.utils.translation import gettext_lazy as _


class Gender(models.TextChoices):
    MALE = "Mężczyzna", _("Mężczyzna")
    FEMALE = "Kobieta", _("Kobieta")
    NON_BINARY = "Osoba niebinarna", _("Osoba niebinarna")
