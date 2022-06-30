from django.urls import path

from apps.folder.api.views import CreateFolderAPIView, FolderListAPIView

app_name = "folder"

urlpatterns = [
    path("create/", CreateFolderAPIView.as_view(), name="folder-create"),
    path("list/", FolderListAPIView.as_view(), name="folder-list"),
]
