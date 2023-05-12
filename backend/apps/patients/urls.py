from django.urls import path

from .views import PatientDetail, PatientList, PatientStatisticsList, CreateUserPatient, CreateUserLinkPatient

urlpatterns = [
    # Patients
    path("patients/register", CreateUserPatient.as_view(), name=CreateUserPatient.name),
    path("patients/link", CreateUserLinkPatient.as_view(), name=CreateUserLinkPatient.name),
    path("patients", PatientList.as_view(), name=PatientList.name),
    path("patients/<int:pk>", PatientDetail.as_view(), name=PatientDetail.name),
    # Patient statistics
    path(
        "patient_stats",
        PatientStatisticsList.as_view(),
        name=PatientStatisticsList.name,
    ),
]
