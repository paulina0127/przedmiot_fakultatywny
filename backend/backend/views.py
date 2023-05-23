from apps.appointments.views import (
    AppointmentList,
    AppointmentStatisticsList,
    AvailableSlotsList,
    PrescriptionList,
)
from apps.employees.views import DoctorList, ScheduleList, SpecializationList
from apps.patients.views import PatientList, PatientStatisticsList
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
import os
from django.conf import settings
from django.http import HttpResponse, Http404


def serve_image(request, path):
    # Construct the absolute path to the file
    abs_path = os.path.join(settings.MEDIA_ROOT, path)

    # Check if the file exists
    if not os.path.exists(abs_path):
        raise Http404("File not found")

    # Get the file extension
    file_extension = os.path.splitext(abs_path)[1].lower()

    # Set the appropriate content type based on the file extension
    if file_extension in [".jpg", ".jpeg"]:
        content_type = "image/jpeg"
    elif file_extension == ".png":
        content_type = "image/png"
    else:
        content_type = "application/octet-stream"

    # Open the file as binary data
    with open(abs_path, "rb") as f:
        file_data = f.read()

    # Return the file data as a response
    response = HttpResponse(file_data, content_type=content_type)
    response["Content-Disposition"] = "inline; filename=" + os.path.basename(abs_path)
    return response


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
                # "prescriptions": reverse(PrescriptionList.name, request=request),
                "available_slots": reverse(AvailableSlotsList.name, request=request),
                # Statistics
                "patient_stats": reverse(PatientStatisticsList.name, request=request),
                "appointment_stats": reverse(
                    AppointmentStatisticsList.name, request=request
                ),
            }
        )
