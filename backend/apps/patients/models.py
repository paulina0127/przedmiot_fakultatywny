from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_better_admin_arrayfield.models.fields import ArrayField
from phonenumber_field.modelfields import PhoneNumberField

User = get_user_model()


class Patient(models.Model):
    first_name = models.CharField(verbose_name=_("Imię"), max_length=100)
    last_name = models.CharField(verbose_name=_("Nazwisko"), max_length=100)
    pesel = models.CharField(verbose_name=_("PESEL"), max_length=11, unique=True)
    birthdate = models.DateField(verbose_name=_("Data urodzenia"))
    email = models.EmailField(verbose_name=_("Kontaktowy e-mail"), blank=True)
    phone_number = PhoneNumberField(verbose_name=_("Numer telefonu"), blank=True)
    street = models.CharField(verbose_name=_("Ulica"), max_length=100)
    postal_code = models.CharField(verbose_name=_("Kod pocztowy"), max_length=6)
    city = models.CharField(verbose_name=_("Miejscowość"), max_length=100)
    medicine = ArrayField(
        models.TextField(blank=True), verbose_name=_("Przyjmowane leki"), blank=True, default=list
    )
    allergies = ArrayField(
        models.TextField(blank=True), verbose_name=_("Alergie"), blank=True, default=list
    )
    diseases = ArrayField(
        models.TextField(blank=True), verbose_name=_("Choroby"), blank=True, default=list
    )
    user = models.OneToOneField(
        verbose_name=_("Użytkownik"),
        to=User,
        on_delete=models.CASCADE,
        related_name="patient",
        blank=True,
        null=True
    )
    link_key = models.CharField(verbose_name=_("Klucz łączenia profilu"), max_length=100, blank=True)
    image = models.ImageField(verbose_name=_("Zdjęcie"), blank=True, upload_to='patients/')

    class Meta:
        verbose_name = _("Pacjent")
        verbose_name_plural = _("Pacjenci")
        ordering = ["id"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
