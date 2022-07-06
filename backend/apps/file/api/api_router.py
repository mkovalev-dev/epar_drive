from django.urls import path

from apps.file.api.views import (
    UploadHeadFileInFolderCreateAPIView,
    FileInFolderListAPIView,
)

app_name = "file"

urlpatterns = [
    path(
        "upload/",
        UploadHeadFileInFolderCreateAPIView.as_view(),
        name="upload-head-file",
    ),
    path("list/", FileInFolderListAPIView.as_view(), name="list-file"),
]
