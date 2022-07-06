from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from apps.file.api.serializers import (
    UploadHeadFileInFolderSerializer,
    FileInFolderSerializer,
)
from apps.folder.models import Folder


class UploadHeadFileInFolderCreateAPIView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UploadHeadFileInFolderSerializer

    def get_serializer_context(self):
        """Проставляем в контекст сериализатора пользователя и родительскую папку"""
        return {
            "user": self.request.user,
            "parent_folder": self.request.data.get("parent_folder", None),
        }


class FileInFolderListAPIView(ListAPIView):
    """Список файлов на главной странице"""

    permission_classes = (IsAuthenticated,)
    pagination_class = None
    serializer_class = FileInFolderSerializer
    queryset = None

    def get_queryset(self):
        return Folder.objects.get(head_folder=True).files.filter(
            creator=self.request.user
        )
