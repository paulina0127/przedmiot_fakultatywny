from django.utils import timezone
from .models import Visit, Prescription
from .utils.serializers import VisitSerializer, PrescriptionSerializer

from rest_framework import generics
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response
from .utils.choices import VisitStatus


# Display list of all visits
class VisitList(generics.ListCreateAPIView):
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer
    name = "visits"
    filterset_fields = ["status", "doctor", "patient"]
    search_fields = ["patient__first_name", "patient__last_name"]
    ordering_fields = ["id", "date"]
    permission_classes = [DjangoModelPermissions]


# Display single visit
class VisitDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer
    name = "visit"
    permission_classes = [DjangoModelPermissions]


# Display list of all prescriptions
class PrescriptionList(generics.ListCreateAPIView):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    name = "prescriptions"
    filterset_fields = ["visit"]
    ordering_fields = ["id", "added_at"]
    permission_classes = [DjangoModelPermissions]


# Display single prescription
class PrescriptionDetail(generics.RetrieveAPIView):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    name = "prescription"
    permission_classes = [DjangoModelPermissions]


# Visit statistics
class VisitStatisticsList(generics.ListAPIView):
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer
    name = "visit-stats"

    def get_queryset(self):
        today = timezone.now().date()

        # Query params
        period = self.request.query_params.get("period", "")
        start_date = self.request.query_params.get("start_date", "")
        end_date = self.request.query_params.get("end_date", "")

        # Filters
        # Today, this month, this year
        if period == "day":
            queryset = Visit.objects.filter(date__date=today)
        elif period == "month":
            queryset = Visit.objects.filter(date__month=today.month)
        elif period == "year":
            queryset = Visit.objects.filter(date__year=today.year)
        # Date range
        elif start_date:
            queryset = Visit.objects.filter(date__date__gte=start_date)
        elif end_date:
            queryset = Visit.objects.filter(date__date__lte=end_date)
        elif start_date and end_date:
            queryset = Visit.objects.filter(date__date__range=[start_date, end_date])
        else:
            queryset = Visit.objects.all()
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        # Counts
        all = queryset.count()
        completed = queryset.filter(status=VisitStatus.COMPLETED).count()
        cancelled = queryset.filter(status=VisitStatus.CANCELLED).count()

        stats = {"all": all, "completed": completed, "cancelled": cancelled}
        return Response(stats)
