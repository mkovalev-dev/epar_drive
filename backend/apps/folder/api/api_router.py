from django.urls import path

from apps.folder.api.views import (
    CreateFolderAPIView,
    FolderListAPIView,
    FolderDestroyAPIView,
)

app_name = "folder"

urlpatterns = [
    path("create/", CreateFolderAPIView.as_view(), name="folder-create"),
    path("list/", FolderListAPIView.as_view(), name="folder-list"),
    path("delete/<int:pk>/", FolderDestroyAPIView.as_view(), name="folder-delete"),
    path("rename/<int:pk>/", CreateFolderAPIView.as_view(), name="folder-rename"),
]
