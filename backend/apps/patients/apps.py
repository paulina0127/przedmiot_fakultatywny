from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class PatientsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.patients"
    verbose_name = _("Pacjenci")
