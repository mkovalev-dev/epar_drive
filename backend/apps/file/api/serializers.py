from rest_framework import serializers

from apps.base.constants import FileTypeConst
from apps.base.models import File, FileType
from apps.folder.models import Folder


class ContentTypeConst:
    XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    PNG = "image/png"
    JPEG = "image/jpeg"


class PrefixFileConst:
    XLSX = ".xlsx"
    PPTX = ".pptx"
    DOCX = ".docx"
    PNG = ".png"
    JPEG = ".jpeg"


class UploadHeadFileInFolderSerializer(serializers.ModelSerializer):
    """Сериализатор загрузки файлов"""

    file = serializers.FileField(source="path", write_only=True, required=False)

    def create(self, validated_data):
        file = validated_data.pop("path", None)
        prefix = ""
        size = file.size / 1000000
        name = file.name
        if file.content_type == ContentTypeConst.XLSX:
            prefix = PrefixFileConst.XLSX
        elif file.content_type == ContentTypeConst.PPTX:
            prefix = PrefixFileConst.PPTX
        elif file.content_type == ContentTypeConst.DOCX:
            prefix = PrefixFileConst.DOCX
        elif file.content_type == ContentTypeConst.PNG:
            prefix = PrefixFileConst.PNG
        elif file.content_type == ContentTypeConst.JPEG:
            prefix = PrefixFileConst.JPEG

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
        fields = (
            "file",
            "name",
        )
        extra_kwargs = {"name": {"required": False}}


class FileInFolderSerializer(serializers.ModelSerializer):
    """Сериализатор списка файлов"""

    type = serializers.CharField(source="prefix")

    class Meta:
        model = File
        fields = ("name", "id", "type")
