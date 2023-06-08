from django.contrib import admin
from django.urls import include, path

from .views import ApiRoot, serve_image

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", ApiRoot.as_view(), name=ApiRoot.name),
    path("media/<path:path>", serve_image, name="serve_image"),
    path("", include("apps.users.urls")),
    path("", include("apps.employees.urls")),
    path("", include("apps.patients.urls")),
    path("", include("apps.appointments.urls")),
]
