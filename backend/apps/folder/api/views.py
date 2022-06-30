from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from apps.folder.api.serializers import (
    CreateFolderSerializer,
    FolderListSerializer,
)
from apps.folder.models import Folder


class CreateFolderAPIView(CreateAPIView):
    """Создает новую папку"""

    permission_classes = (IsAuthenticated,)
    serializer_class = CreateFolderSerializer

    def get_serializer_context(self):
        """Проставляем в контекст сериализатора пользователя и родительскую папку"""
        return {
            "user": self.request.user,
            "parent_folder": self.request.data.get("parent_folder", None),
        }


class FolderListAPIView(ListAPIView):
    """Список папок и файлов"""

    permission_classes = (IsAuthenticated,)
    serializer_class = FolderListSerializer
    pagination_class = None
    queryset = Folder.objects.all()
