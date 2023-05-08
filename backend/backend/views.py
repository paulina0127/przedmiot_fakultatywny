from apps.appointments.views import (AppointmentList,
                                     AppointmentStatisticsList,
                                     AvailableSlotsList, PrescriptionList)
from apps.employees.views import DoctorList, ScheduleList, SpecializationList
from apps.patients.views import PatientList, PatientStatisticsList
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse


class ApiRoot(generics.GenericAPIView):
    name = "api"

    def get(self, request, *args, **kwargs):
        return Response(
            {
                "specializations": reverse(SpecializationList.name, request=request),
                "schedules": reverse(ScheduleList.name, request=request),
                "doctors": reverse(DoctorList.name, request=request),
                "patients": reverse(PatientList.name, request=request),
                "appointments": reverse(AppointmentList.name, request=request),
                "prescriptions": reverse(PrescriptionList.name, request=request),
                "available_slots": reverse(AvailableSlotsList.name, request=request),
                # Statistics
                "patient_stats": reverse(PatientStatisticsList.name, request=request),
                "appointment_stats": reverse(
                    AppointmentStatisticsList.name, request=request
                ),
            }
        )
