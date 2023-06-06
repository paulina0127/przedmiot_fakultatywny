from datetime import datetime

from django.db.models import Q

from apps.appointments.models import Appointment
from apps.appointments.utils.choices import AppointmentStatus
from apps.employees.models import Schedule


def available_slots_list(doctor, date) -> list:
    if not doctor or not date:
        raise ValueError("Parametry 'doctor' i 'date' są wymagane.")
    # Get weekday name
    if isinstance(date, str):
        date = datetime.strptime(date, "%Y-%m-%d").date()
    weekday = date.strftime("%A").lower()

    # Return empty list if weekday is not on the schedule
    slots = []
    if weekday not in [field.name for field in Schedule._meta.fields]:
        return slots

    # Taken slots for the date
    taken_slots = (
        Appointment.objects.filter(doctor=doctor, date=date)
        .exclude(status=AppointmentStatus.CANCELLED)
        .values_list("time", flat=True)
    )

    # Doctor's availability for the date
    temp = Schedule.objects.filter(
        Q(start_date__isnull=False)
        & Q(start_date__lte=date, end_date__gte=date),
        doctor=doctor,
    )

    # First check if there are schedules with start-end dates that include the date
    if temp.count() > 0:
        doctor_availability = temp.values_list(weekday, flat=True)
    # Else return doctor's fixed schedule
    else:
        doctor_availability = list(
            Schedule.objects.filter(doctor=doctor).values_list(
                weekday, flat=True
            )
        )

    # Delete extra dimension in the list
    if len(doctor_availability) > 0:
        doctor_availability = doctor_availability[0]

    # Slots that are in doctor's availability but aren't in taken slots
    slots = [slot for slot in doctor_availability if slot not in taken_slots]

    return slots
