from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from .utils.choices import Gender, Slot
from .utils.fields import ChoiceArrayField

User = get_user_model()
from django.utils import timezone


class Specialization(models.Model):
    name = models.CharField(verbose_name=_("Nazwa"), max_length=100)
    fem_name = models.CharField(verbose_name=_("Feminatyw"), max_length=100)

    class Meta:
        verbose_name = _("Specjalizacja")
        verbose_name_plural = _("Specjalizacje")
        ordering = ["id"]

    def __str__(self):
        return f"{self.name}"


class Doctor(models.Model):
    first_name = models.CharField(verbose_name=_("Imię"), max_length=100)
    last_name = models.CharField(verbose_name=_("Nazwisko"), max_length=100)
    gender = models.CharField(
        verbose_name=_("Płeć"), choices=Gender.choices, max_length=50
    )
    specializations = models.ManyToManyField(
        verbose_name=_("Specjalizacje"), to=Specialization
    )
    user = models.OneToOneField(
        verbose_name=_("Użytkownik"),
        to=User,
        on_delete=models.CASCADE,
        related_name="doctor",
    )
    image = models.ImageField(verbose_name=_("Zdjęcie"), blank=True, upload_to='doctors/')

    class Meta:
        verbose_name = _("Lekarz")
        verbose_name_plural = _("Lekarze")
        ordering = ["id"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Receptionist(models.Model):
    first_name = models.CharField(verbose_name=_("Imię"), max_length=100)
    last_name = models.CharField(verbose_name=_("Nazwisko"), max_length=100)
    user = models.OneToOneField(
        verbose_name=_("Użytkownik"),
        to=User,
        on_delete=models.CASCADE,
        related_name="receptionist",
    )
    image = models.ImageField(verbose_name=_("Zdjęcie"), blank=True, upload_to='receptionists/')

    class Meta:
        verbose_name = _("Recepcjonista")
        verbose_name_plural = _("Recepcjoniści")
        ordering = ["id"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Schedule(models.Model):
    start_date = models.DateField(verbose_name=_("Początek tygodnia"), blank=True, null=True)
    end_date = models.DateField(
        verbose_name=_("Koniec tygodnia"), blank=True, null=True, editable=False
    )
    doctor = models.ForeignKey(
        verbose_name=_("Lekarz"),
        to=Doctor,
        on_delete=models.CASCADE,
        related_name="schedule"
    )
    monday = ChoiceArrayField(
        verbose_name=_("Poniedziałek"),
        base_field=models.CharField(choices=Slot.choices, max_length=5),
        default=list
    )
    tuesday = ChoiceArrayField(
        verbose_name=_("Wtorek"),
        base_field=models.CharField(choices=Slot.choices, max_length=5),
        default=list
    )
    wednesday = ChoiceArrayField(
        verbose_name=_("Środa"),
        base_field=models.CharField(choices=Slot.choices, max_length=5),
        default=list
    )
    thursday = ChoiceArrayField(
        verbose_name=_("Czwartek"),
        base_field=models.CharField(choices=Slot.choices, max_length=5),
        default=list
    )
    friday = ChoiceArrayField(
        verbose_name=_("Piątek"),
        base_field=models.CharField(choices=Slot.choices, max_length=5),
        default=list
    )

    class Meta:
        verbose_name = _("Grafik lekarza")
        verbose_name_plural = _("Grafik lekarzy")
        ordering = ["id"]

    def __str__(self):
        if self.start_date:
            return f"{self.doctor}: {self.start_date} - {self.end_date}"
        else:
            return f"{self.doctor}"


    def save(self, *args, **kwargs):
        # Add week's end date on create
        if self.start_date:
            self.end_date = self.start_date + timezone.timedelta(days=6)
        super(Schedule, self).save(*args, **kwargs)
