from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    DestroyAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.folder.api.serializers import (
    CreateFolderSerializer,
    FolderListSerializer,
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
    """Список папок и файлов на главной странице файлов"""

    permission_classes = (IsAuthenticated,)
    serializer_class = FolderListSerializer
    pagination_class = None
    queryset = Folder.objects.all().filter(in_basket=False)


class FolderDestroyAPIView(DestroyAPIView):
    """Удаляет папку - перемещает в корзину"""

    permission_classes = (IsAuthenticated,)
    queryset = Folder.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.in_basket = True
        instance.save()
        return Response(
            {"id": instance.id, "name": instance.name}, status=status.HTTP_200_OK
        )


class TrashFolderListAPIView(ListAPIView):
    """Список папок и файлов в корзине"""

    permission_classes = (IsAuthenticated,)
    serializer_class = FolderListSerializer
    pagination_class = None
    queryset = Folder.objects.all().filter(in_basket=True)


class HardDeleteFolderDestroyAPIView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Folder.objects.all()
