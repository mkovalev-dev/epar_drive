from django.urls import path

from apps.base.api.views import UserSharePermissionCreateAPIView

app_name = "base"

urlpatterns = [
    path(
        "create/user/share/permission/",
        UserSharePermissionCreateAPIView.as_view(),
        name="create-user-share-permission",
    ),
    path(
        "create/user/share/permission/<int:pk>/",
        UserSharePermissionCreateAPIView.as_view(),
        name="create-user-share-permission-destroy",
    ),
]
