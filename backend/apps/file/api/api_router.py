from django.urls import path

from apps.file.api.views import (
    UploadHeadFileInFolderCreateAPIView,
    FileInFolderListAPIView,
    FileDestroyAPIView,
    HardDeleteFileDestroyAPIView, TrashFileListAPIView,
)

app_name = "file"

urlpatterns = [
    path(
        "upload/",
        UploadHeadFileInFolderCreateAPIView.as_view(),
        name="upload-head-file",
    ),
    path("list/", FileInFolderListAPIView.as_view(), name="list-file"),
    path(
        "rename/<int:pk>/",
        UploadHeadFileInFolderCreateAPIView.as_view(),
        name="rename-file",
    ),
    path("delete/<int:pk>/", FileDestroyAPIView.as_view(), name="file-delete"),
    path(
        "hard-delete/<int:pk>/",
        HardDeleteFileDestroyAPIView.as_view(),
        name="hard-delete-file",
    ),
    path("trash/", TrashFileListAPIView.as_view(), name="trash-file-list"),
]
