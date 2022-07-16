from rest_framework import status
from rest_framework.generics import DestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.base.api.serializers import UserSharedPermissionSerializer
from apps.base.models import UserSharedPermission


class MoveItemInBasketMixin(DestroyAPIView):
    """Миксин для помещения папки или файла в корзину"""

    permission_classes = (IsAuthenticated,)
    queryset = None

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.in_basket = True
        if instance._meta.model_name == "folder":
            instance.parent_folder_id = None
        instance.save()
        return Response(
            {"id": instance.id, "name": instance.name}, status=status.HTTP_200_OK
        )


class UserSharePermissionCreateAPIView(CreateAPIView, DestroyAPIView):
    """Создает и удаляет запись о правах в папке или файле"""

    permission_classes = (IsAuthenticated,)
    queryset = UserSharedPermission.objects.all()
    serializer_class = UserSharedPermissionSerializer
