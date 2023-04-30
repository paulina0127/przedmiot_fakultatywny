from django.urls import path

from .views import (AppointmentDetail, AppointmentList,
                    AppointmentStatisticsList, AvailableSlotsList,
                    PrescriptionDetail, PrescriptionList)

urlpatterns = [
    # Appointments
    path("appointments", AppointmentList.as_view(), name=AppointmentList.name),
    path(
        "appointments/<int:pk>",
        AppointmentDetail.as_view(),
        name=AppointmentDetail.name,
    ),
    # Prescriptions
    path("prescriptions", PrescriptionList.as_view(), name=PrescriptionList.name),
    path(
        "prescriptions/<int:pk>",
        PrescriptionDetail.as_view(),
        name=PrescriptionDetail.name,
    ),
    # Appointment statistics
    path(
        "appointment_stats",
        AppointmentStatisticsList.as_view(),
        name=AppointmentStatisticsList.name,
    ),
    # Available slots
    path("slots", AvailableSlotsList.as_view(), name=AvailableSlotsList.name),
]
