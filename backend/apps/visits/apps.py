from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class VisitsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.visits"
    verbose_name = _("Wizyty")
