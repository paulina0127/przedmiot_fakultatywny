from django.urls import path

from .views import (
    PatientList,
    PatientDetail,
    DoctorList,
    DoctorDetail,
    PatientStatisticsList,
)

urlpatterns = [
    # Patients
    path("patients", PatientList.as_view(), name=PatientList.name),
    path("patients/<int:pk>", PatientDetail.as_view(), name=PatientDetail.name),
    # Doctors
    path("doctors", DoctorList.as_view(), name=DoctorList.name),
    path("doctors/<int:pk>", DoctorDetail.as_view(), name=DoctorDetail.name),
    # Patient statistics
    path(
        "patient_stats",
        PatientStatisticsList.as_view(),
        name=PatientStatisticsList.name,
    ),
]
