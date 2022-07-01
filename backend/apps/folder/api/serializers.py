from rest_framework import serializers, status
from rest_framework.response import Response

from apps.base.utils import json_error_template
from apps.folder.models import Folder


class CreateFolderSerializer(serializers.ModelSerializer):
    """Сериализатор создания папки"""

    def validate(self, attrs):
        """Проверяет наличие папки с таким же названием у пользователя"""
        if Folder.objects.filter(
            name=attrs.get("name"),
            parent_folder=self.context.get("parent_folder"),
            creator=self.context.get("user"),
        ).exists():
            raise serializers.ValidationError(
                json_error_template(
                    f"Папка с именем «{attrs.get('name')}» уже существует"
                )
            )
        return attrs

    def create(self, validated_data):
        instance = Folder.objects.create(
            **validated_data, creator=self.context.get("user")
        )
        return instance

    class Meta:
        model = Folder
        fields = ("name",)


class FolderListSerializer(serializers.ModelSerializer):
    """Сериализатор списка папок"""

    type = serializers.CharField(default="folder")

    class Meta:
        model = Folder
        fields = (
            "id",
            "name",
            "type",
        )
