from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
from .utils.choices import Gender

User = get_user_model()


class Patient(models.Model):
    first_name = models.CharField(verbose_name=_("Imię"), max_length=100)
    last_name = models.CharField(verbose_name=_("Nazwisko"), max_length=100)
    pesel = models.CharField(verbose_name=_("PESEL"), max_length=11, unique=True)
    birthdate = models.DateField(verbose_name=_("Data urodzenia"))
    email = models.EmailField(verbose_name=_("Adres e-mail"), blank=True, null=True)
    phone_number = PhoneNumberField(
        verbose_name=_("Numer telefonu"), blank=True, null=True
    )
    street = models.CharField(verbose_name=_("Ulica"), max_length=100)
    postal_code = models.CharField(verbose_name=_("Kod pocztowy"), max_length=6)
    city = models.CharField(verbose_name=_("Miejscowość"), max_length=100)
    medicine = models.TextField(
        verbose_name=_("Przyjmowane leki"), blank=True, null=True
    )
    alergies = models.TextField(verbose_name=_("Alergie"), blank=True, null=True)
    diseases = models.TextField(verbose_name=_("Choroby"), blank=True, null=True)
    user = models.OneToOneField(
        verbose_name=_("Użytkownik"),
        to=User,
        on_delete=models.CASCADE,
        related_name="patient",
    )
    image = models.ImageField(verbose_name=_("Zdjęcie"), blank=True, null=True)

    class Meta:
        verbose_name = _("Pacjent")
        verbose_name_plural = _("Pacjenci")
        ordering = ["id"]

    def __str__(self):
        return self.first_name + " " + self.last_name


class Specialization(models.Model):
    name = models.CharField(verbose_name=_("Nazwa"), max_length=100)
    fem_name = models.CharField(verbose_name=_("Feminatyw"), max_length=100)

    class Meta:
        verbose_name = _("Specjalizacja")
        verbose_name_plural = _("Specjalizacje")
        ordering = ["id"]

    def __str__(self):
        return self.name


class Doctor(models.Model):
    first_name = models.CharField(verbose_name=_("Imię"), max_length=100)
    last_name = models.CharField(verbose_name=_("Nazwisko"), max_length=100)
    gender = models.CharField(
        verbose_name=_("Płeć"), choices=Gender.choices, max_length=50
    )
    specializations = models.ManyToManyField(
        verbose_name=_("Specjalizacja"), to=Specialization
    )
    user = models.OneToOneField(
        verbose_name=_("Użytkownik"),
        to=User,
        on_delete=models.CASCADE,
        related_name="doctor",
    )
    image = models.ImageField(verbose_name=_("Zdjęcie"), blank=True, null=True)

    class Meta:
        verbose_name = _("Lekarz")
        verbose_name_plural = _("Lekarze")
        ordering = ["id"]

    def __str__(self):
        return self.first_name + " " + self.last_name


class Receptionist(models.Model):
    first_name = models.CharField(verbose_name=_("Imię"), max_length=100)
    last_name = models.CharField(verbose_name=_("Nazwisko"), max_length=100)
    user = models.OneToOneField(
        verbose_name=_("Użytkownik"),
        to=User,
        on_delete=models.CASCADE,
        related_name="receptionist",
    )
    image = models.ImageField(verbose_name=_("Zdjęcie"), blank=True, null=True)

    class Meta:
        verbose_name = _("Recepcjonista")
        verbose_name_plural = _("Recepcjoniści")
        ordering = ["id"]

    def __str__(self):
        return self.first_name + " " + self.last_name
