from django.contrib import admin
from django.urls import include, path

from .views import ApiRoot

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", ApiRoot.as_view(), name=ApiRoot.name),
    path("", include("apps.users.urls")),
    path("", include("apps.employees.urls")),
    path("", include("apps.patients.urls")),
    path("", include("apps.appointments.urls")),
]
