from django.urls import path

from .views import PatientDetail, PatientList, PatientStatisticsList, UserLinkPatient

urlpatterns = [
    # Patients
    path("patients/link", UserLinkPatient.as_view(), name=UserLinkPatient.name),
    path("patients", PatientList.as_view(), name=PatientList.name),
    path("patients/<int:pk>", PatientDetail.as_view(), name=PatientDetail.name),
    # Patient statistics
    path(
        "patient_stats",
        PatientStatisticsList.as_view(),
        name=PatientStatisticsList.name,
    ),
]
