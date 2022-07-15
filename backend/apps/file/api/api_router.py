from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from apps.file.api.views import (
    UploadHeadFileInFolderCreateAPIView,
    FileInHeadFolderListAPIView,
    FileDestroyAPIView,
    HardDeleteFileDestroyAPIView,
    TrashFileListAPIView,
    FileInFolderListAPIView,
    RetrieveFileSrcAPIView,
    FileSaveAPIVIEW,
    DrawerInfoFileRetrieveAPIView,
)

app_name = "file"

urlpatterns = [
    path(
        "upload/",
        UploadHeadFileInFolderCreateAPIView.as_view(),
        name="upload-head-file",
    ),
    path(
        "upload/<int:parent_folder>/",
        UploadHeadFileInFolderCreateAPIView.as_view(),
        name="upload-head-file-in-folder",
    ),
    path("list/", FileInHeadFolderListAPIView.as_view(), name="list-file"),
    path(
        "list/retrieve/<int:pk>/",
        FileInFolderListAPIView.as_view(),
        name="list-file-in-folder",
    ),
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
    path(
        "retrieve/file/<int:pk>/",
        RetrieveFileSrcAPIView.as_view(),
        name="retrieve-file",
    ),
    path("save/<int:pk>/", FileSaveAPIVIEW.as_view(), name="file-save"),
    path(
        "drawer/retrieve/<int:pk>/",
        DrawerInfoFileRetrieveAPIView.as_view(),
        name="drawer-retrieve-file",
    ),
]
