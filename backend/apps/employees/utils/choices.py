from django.db import models
from django.utils.translation import gettext_lazy as _


class Gender(models.TextChoices):
    MALE = "Mężczyzna", _("Mężczyzna")
    FEMALE = "Kobieta", _("Kobieta")
    NON_BINARY = "Osoba niebinarna", _("Osoba niebinarna")


class Slot(models.TextChoices):
    SLOT_1 = "09:00", "9:00"
    SLOT_2 = "09:30", "9:30"
    SLOT_3 = "10:00", "10:00"
    SLOT_4 = "10:30", "10:30"
    SLOT_5 = "11:00", "11:00"
    SLOT_6 = "11:30", "11:30"
    SLOT_7 = "12:00", "12:00"
    SLOT_8 = "12:30", "12:30"
    SLOT_9 = "13:00", "13:00"
    SLOT_10 = "14:00", "14:00"
    SLOT_11 = "14:30", "14:30"
    SLOT_12 = "15:00", "15:00"
    SLOT_13 = "15:30", "15:30"
    SLOT_14 = "16:00", "16:00"
    SLOT_15 = "16:30", "16:30"
