from rest_framework import generics
from rest_framework.permissions import (AllowAny,
                                        DjangoModelPermissionsOrAnonReadOnly)

from .models import Doctor, Schedule, Specialization
from .utils.serializers import (DoctorSerializer, ScheduleSerializer,
                                SpecializationSerializer)


# Display list of all doctors
class DoctorList(generics.ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    name = "doctors"
    filterset_fields = ["specializations"]
    search_fields = ["first_name", "last_name"]
    ordering_fields = ["id"]
    permission_classes = [AllowAny]


# Display single doctor
class DoctorDetail(generics.RetrieveAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    name = "doctor"
    permission_classes = [AllowAny]


# Display list of all specializations
class SpecializationList(generics.ListCreateAPIView):
    queryset = Specialization.objects.all()
    serializer_class = SpecializationSerializer
    name = "specializations"
    search_fields = ["name"]
    ordering_fields = ["id"]
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


# Display single specialization
class SpecializationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Specialization.objects.all()
    serializer_class = SpecializationSerializer
    name = "specialization"
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


# Display list of all schedules
class ScheduleList(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    name = "schedules"
    filterset_fields = ["doctor", "start_date"]
    ordering_fields = ["id", "start_date"]
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


# Display single schedule
class ScheduleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    name = "schedule"
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
