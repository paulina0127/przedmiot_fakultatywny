from django_filters import FilterSet, ModelMultipleChoiceFilter
from apps.employees.models import Doctor
from django import forms
from ..models import Patient
from django.utils.translation import gettext_lazy as _


class PatientFilter(FilterSet):
    doctor = ModelMultipleChoiceFilter(
        queryset=Doctor.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        method="filter_doctor",
        label=(_("Lekarz")),
    )

    class Meta:
        model = Patient
        fields = ["doctor"]

    def filter_doctor(self, queryset, name, value):
        if not value:
            return queryset
        return queryset.filter(appointments__doctor__in=value).distinct()
