from django.contrib.auth.models import Group
from rest_framework import serializers

from apps.base.models import UserSharedPermission
from apps.base.utils import json_error_template


class UserGroupSerializer(serializers.ModelSerializer):
    """Сериализатор групп пользователя"""

    class Meta:
        model = Group
        fields = ("name",)


def recursion_create_permissions(instance_permission, data):
    if data.exists():
        for i in data:
            UserSharedPermission.objects.create(
                folder_to=i,
                user=instance_permission.user,
                read_only=instance_permission.read_only,
                parent_permission=instance_permission,
            )
            if i.get_all_children_folders.exists():
                print(i)
                recursion_create_permissions(
                    instance_permission, i.get_all_children_folders
                )
            print(2)


class UserSharedPermissionSerializer(serializers.ModelSerializer):
    """Создает запись с правами на папку или файл"""

    def validate(self, attrs):
        """Проверяет наличие уже существующих прав"""
        if UserSharedPermission.objects.filter(
            user=attrs.get("user"),
            folder_to=attrs.get("folder_to"),
            file_to=attrs.get("file_to"),
        ).exists():
            raise serializers.ValidationError(
                json_error_template(f"Извините, но права пользователя уже существуют")
            )
        return attrs

    def create(self, validated_data):
        instance = super().create(validated_data)
        if instance.folder_to:
            for file in instance.folder_to.files.all():
                UserSharedPermission.objects.create(
                    file_to=file,
                    user=instance.user,
                    read_only=instance.read_only,
                    parent_permission=instance,
                )

            recursion_create_permissions(
                instance_permission=instance,
                data=instance.folder_to.get_all_children_folders,
            )
        return instance

    class Meta:
        model = UserSharedPermission
        fields = (
            "user",
            "folder_to",
            "file_to",
            "read_only",
        )
