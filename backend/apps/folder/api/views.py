from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    DestroyAPIView,
    UpdateAPIView,
    RetrieveAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.base.api.views import MoveItemInBasketMixin
from apps.folder.api.serializers import (
    CreateFolderSerializer,
    FolderListSerializer,
    FolderInfoPageHeaderSerializer,
)
from apps.folder.models import Folder


class CreateFolderAPIView(CreateAPIView, UpdateAPIView):
    """Создает новую папку"""

    permission_classes = (IsAuthenticated,)
    serializer_class = CreateFolderSerializer
    queryset = Folder.objects.all()

    def get_serializer_context(self):
        """Проставляем в контекст сериализатора пользователя и родительскую папку"""
        return {
            "user": self.request.user,
            "parent_folder": self.request.data.get("parent_folder", None),
        }


class FolderListAPIView(ListAPIView):
    """Список папок на главной странице файлов"""

    permission_classes = (IsAuthenticated,)
    serializer_class = FolderListSerializer
    pagination_class = None
    queryset = None

    def get_queryset(self):
        return Folder.objects.all().filter(
            in_basket=False,
            creator=self.request.user,
            head_folder=False,
            parent_folder_id__isnull=True,
        )


class FolderDestroyAPIView(MoveItemInBasketMixin):
    """Удаляет папку - перемещает в корзину"""

    queryset = Folder.objects.all()


class TrashFolderListAPIView(ListAPIView):
    """Список папок в корзине"""

    permission_classes = (IsAuthenticated,)
    serializer_class = FolderListSerializer
    pagination_class = None
    queryset = None

    def get_queryset(self):
        return Folder.objects.all().filter(
            in_basket=True, creator=self.request.user, head_folder=False
        )


class HardDeleteFolderDestroyAPIView(DestroyAPIView):
    """Удалене папки навсегда"""

    permission_classes = (IsAuthenticated,)
    queryset = Folder.objects.all()


class FolderListRetrieveAPIView(ListAPIView):
    """Просмотр папок в папке"""

    permission_classes = (IsAuthenticated,)
    queryset = None
    serializer_class = FolderListSerializer
    pagination_class = None

    def get_queryset(self):
        return Folder.objects.all().filter(
            in_basket=False,
            creator=self.request.user,
            head_folder=False,
            parent_folder_id=self.kwargs.get("pk"),
        )


class FolderInfoPageHeaderRetrieveAPIVIew(RetrieveAPIView):
    """Возвращает информацию для хедера с информацией о папке"""

    permission_classes = (IsAuthenticated,)
    queryset = Folder.objects.all()
    serializer_class = FolderInfoPageHeaderSerializer
