from django.utils import timezone
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
            parent_folder=self.context.get("parent_folder", None),
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
            **validated_data,
            creator=self.context.get("user"),
            parent_folder_id=self.context.get("parent_folder", None),
        )
        if parent := instance.parent_folder:
            parent.updated_date = timezone.now()
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


class FolderInfoPageHeaderSerializer(serializers.ModelSerializer):
    """Сериализатор информации в заголовке папки"""

    size = serializers.FloatField(source="size_folder")
    breadcrump = serializers.SerializerMethodField(read_only=True)

    def get_breadcrump(self, obj):
        data = []
        data_reversed = []
        data.append({"path": f"/folder/{obj.id}", "breadcrumbName": obj.name})
        instance = obj.parent_folder
        if instance:
            while instance.parent_folder_id:
                data.append(
                    {"path": f"/folder/{instance.id}", "breadcrumbName": instance.name}
                )
                instance = instance.parent_folder
            data.append(
                {"path": f"/folder/{instance.id}", "breadcrumbName": instance.name}
            )
        else:
            data.append({"path": f"/", "breadcrumbName": "На главную"})
        for item in data[::-1]:
            data_reversed.append(item)

        return data_reversed

    class Meta:
        model = Folder
        fields = (
            "name",
            "size",
            "breadcrump",
        )
