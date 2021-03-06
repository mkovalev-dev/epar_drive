from django.urls import path

from apps.folder.api.views import (
    CreateFolderAPIView,
    FolderListAPIView,
    FolderDestroyAPIView,
    TrashFolderListAPIView,
    HardDeleteFolderDestroyAPIView,
    FolderListRetrieveAPIView,
    FolderInfoPageHeaderRetrieveAPIVIew,
)

app_name = "folder"

urlpatterns = [
    path("create/", CreateFolderAPIView.as_view(), name="folder-create"),
    path("list/", FolderListAPIView.as_view(), name="folder-list"),
    path("delete/<int:pk>/", FolderDestroyAPIView.as_view(), name="folder-delete"),
    path("rename/<int:pk>/", CreateFolderAPIView.as_view(), name="folder-rename"),
    path("trash/", TrashFolderListAPIView.as_view(), name="trash-folder-list"),
    path(
        "hard-delete/<int:pk>/",
        HardDeleteFolderDestroyAPIView.as_view(),
        name="hard-delete-folder",
    ),
    path(
        "list/retrieve/<int:pk>/",
        FolderListRetrieveAPIView.as_view(),
        name="folder-list-retrieve",
    ),
    path(
        "header/info/retrieve/<int:pk>/",
        FolderInfoPageHeaderRetrieveAPIVIew.as_view(),
        name="header-info-retrieve",
    ),
]
