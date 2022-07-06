from django.core.files.storage import default_storage
from rest_framework import serializers

from apps.base.constants import FileTypeConst
from apps.base.models import File, FileType
from apps.folder.models import Folder


class UploadHeadFileInFolderSerializer(serializers.ModelSerializer):
    """Сериализатор загрузки файлов"""

    file = serializers.FileField(source="path", write_only=True)

    def create(self, validated_data):
        file = validated_data.pop("path", None)
        prefix = ""
        size = file.size / 1000000
        name = file.name
        if (
            file.content_type
            == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ):
            prefix = ".xlsx"
        if (
            file.content_type
            == "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ):
            prefix = ".pptx"

        if (
            file.content_type
            == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ):
            prefix = ".docx"

        if file.content_type == "image/png":
            prefix = ".png"

        if file.content_type == "image/jpeg":
            prefix = ".jpg"
        instance = File.objects.create(
            path=file,
            name=name,
            prefix=prefix,
            size=size,
            file_type=FileType.objects.get(name=FileTypeConst.FOLDER_FILE),
            creator=self.context.get("user"),
        )
        if self.context.get("parent_folder"):
            pass
        else:
            folder = Folder.objects.get(head_folder=True)
        folder.files.add(instance)

        return instance

    class Meta:
        model = File
        fields = ("file",)


class FileInFolderSerializer(serializers.ModelSerializer):
    """Сериализатор списка файлов"""

    type = serializers.CharField(source="prefix")

    class Meta:
        model = File
        fields = ("name", "id", "type")
