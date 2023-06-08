from django.urls import path

from .views import (DoctorDetail, DoctorList, ScheduleDetail, ScheduleList,
                    SpecializationDetail, SpecializationList)

urlpatterns = [
    # Doctors
    path("doctors", DoctorList.as_view(), name=DoctorList.name),
    path("doctors/<int:pk>", DoctorDetail.as_view(), name=DoctorDetail.name),
    # Specializations
    path("specializations", SpecializationList.as_view(), name=SpecializationList.name),
    path(
        "specializations/<int:pk>",
        SpecializationDetail.as_view(),
        name=SpecializationDetail.name,
    ),
    # Schedules
    path("schedules", ScheduleList.as_view(), name=ScheduleList.name),
    path("schedules/<int:pk>", ScheduleDetail.as_view(), name=ScheduleDetail.name),
]
