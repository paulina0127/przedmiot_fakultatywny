from django.urls import path

from .views import (
    VisitList,
    VisitDetail,
    PrescriptionList,
    PrescriptionDetail,
    VisitStatisticsList,
)

urlpatterns = [
    # Visits
    path("visits", VisitList.as_view(), name=VisitList.name),
    path("visits/<int:pk>", VisitDetail.as_view(), name=VisitDetail.name),
    # Prescriptions
    path("prescriptions", PrescriptionList.as_view(), name=PrescriptionList.name),
    path(
        "prescriptions/<int:pk>",
        PrescriptionDetail.as_view(),
        name=PrescriptionDetail.name,
    ),
    # Visit statistics
    path("visit_stats", VisitStatisticsList.as_view(), name=VisitStatisticsList.name),
]
