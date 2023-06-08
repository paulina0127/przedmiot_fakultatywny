from django.contrib.auth.models import AbstractUser, Group
from django.db import models
from django.utils.translation import gettext_lazy as _

from .utils.choices import UserType
from .utils.managers import UserManager


class User(AbstractUser):
    username = None
    email = models.EmailField(verbose_name=_("E-mail (login)"), unique=True)
    type = models.CharField(
        verbose_name=_("Rodzaj"),
        blank=True,
        max_length=50,
        choices=UserType.choices,
        default=UserType.NEW,
    )
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        db_table = "auth_user"
        verbose_name = _("Użytkownik")
        verbose_name_plural = _("Użytkownicy")
        ordering = ["id"]


class Group(Group):  # Proxy model to display the default Group model in users page
    class Meta:
        proxy = True
        verbose_name = _("Grupa")
        verbose_name_plural = _("Grupy")
