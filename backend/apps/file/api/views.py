import os

from django.views.decorators.csrf import csrf_exempt
from exceltojson import excel2json
from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    UpdateAPIView,
    DestroyAPIView,
    RetrieveAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.base.api.views import MoveItemInBasketMixin
from apps.base.models import File
from apps.file.api.serializers import (
    UploadHeadFileInFolderSerializer,
    FileInFolderSerializer, FileSaveSerializer,
)
from apps.folder.models import Folder


class UploadHeadFileInFolderCreateAPIView(CreateAPIView, UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UploadHeadFileInFolderSerializer
    queryset = File.objects.all()

    def get_serializer_context(self):
        """Проставляем в контекст сериализатора пользователя и родительскую папку"""
        return {
            "user": self.request.user,
            "parent_folder": self.kwargs.get("parent_folder", None),
        }


class FileInHeadFolderListAPIView(ListAPIView):
    """Список файлов на главной странице"""

    permission_classes = (IsAuthenticated,)
    pagination_class = None
    serializer_class = FileInFolderSerializer
    queryset = None

    def get_queryset(self):
        return Folder.objects.get_or_create(
            name="Техническая папка",
            creator=self.request.user,
            in_basket=False,
            defaults={"head_folder": True},
        )[0].files.filter(creator=self.request.user, in_basket=False)


class FileDestroyAPIView(MoveItemInBasketMixin):
    """Удаляет файл - перемещает в корзину"""

    queryset = File.objects.all()


class HardDeleteFileDestroyAPIView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = File.objects.all()


class TrashFileListAPIView(ListAPIView):
    """Список файлов в корзине"""

    permission_classes = (IsAuthenticated,)
    serializer_class = FileInFolderSerializer
    pagination_class = None
    queryset = None

    def get_queryset(self):
        return Folder.objects.get(head_folder=True).files.filter(
            creator=self.request.user, in_basket=True
        )


class FileInFolderListAPIView(ListAPIView):
    """Список файлов в папке"""

    permission_classes = (IsAuthenticated,)
    pagination_class = None
    serializer_class = FileInFolderSerializer
    queryset = None

    def get_queryset(self):
        return Folder.objects.get(id=self.kwargs.get("pk")).files.filter(
            creator=self.request.user, in_basket=False
        )


class RetrieveFileSrcAPIView(RetrieveAPIView):
    """Отдает путь к файлу и его мета информацию"""

    permission_classes = (IsAuthenticated,)
    serializer_class = FileInFolderSerializer
    queryset = File.objects.all()


class FileSaveAPIVIEW(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FileSaveSerializer

    def post(self, *args, **kwargs):
        print(1)