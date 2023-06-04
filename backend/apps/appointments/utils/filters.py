from django_filters import FilterSet, MultipleChoiceFilter, DateFilter
from django.forms import CheckboxSelectMultiple
from django.utils.translation import gettext_lazy as _
from .choices import AppointmentStatus
from ..models import Appointment


class AppointmentFilter(FilterSet):
    status = MultipleChoiceFilter(
        choices=AppointmentStatus.choices,
        widget=CheckboxSelectMultiple,
        method="filter_status",
    )
    start_date = DateFilter(
        field_name="date", lookup_expr="gte", label=_("Data początkowa")
    )
    end_date = DateFilter(field_name="date", lookup_expr="lte", label=_("Data końcowa"))

    class Meta:
        model = Appointment
        fields = ["status", "doctor", "patient", "date", "start_date", "end_date"]

    def filter_status(self, queryset, name, value):
        if not value:
            return queryset
        return queryset.filter(status__in=value)
