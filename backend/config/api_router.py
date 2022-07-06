from django.urls import path, include

app_name = "api"

urlpatterns = [
    path("base/", include("apps.base.api.api_router", namespace="base")),
    path("users/", include("apps.users.api.api_router", namespace="users")),
    path("folder/", include("apps.folder.api.api_router", namespace="folder")),
    path("file/", include("apps.file.api.api_router", namespace="file")),
]
