from django.utils import timezone
from rest_framework import serializers

from apps.base.constants import FileTypeConst
from apps.base.models import File, FileType, UserSharedPermission
from apps.file.utils import get_prefix_file
from apps.folder.models import Folder
from apps.users.api.serializers import UserSerializer


class UploadHeadFileInFolderSerializer(serializers.ModelSerializer):
    """Сериализатор загрузки файлов"""

    file = serializers.FileField(source="path", write_only=True, required=False)

    def create(self, validated_data):
        file = validated_data.pop("path", None)
        size = file.size / 1000000
        name = file.name

        prefix = get_prefix_file(file.content_type)

        instance = File.objects.create(
            path=file,
            name=name,
            prefix=prefix,
            size=size,
            file_type=FileType.objects.get(name=FileTypeConst.FOLDER_FILE),
            creator=self.context.get("user"),
        )
        if parent_id := self.context.get("parent_folder"):
            folder = Folder.objects.get(id=parent_id)

            for permission_user in folder.usersharedpermission_set.all():
                if permission_user.parent_permission:
                    parent_permission = permission_user.parent_permission
                else:
                    parent_permission = permission_user
                UserSharedPermission.objects.create(
                    file_to=instance,
                    user=permission_user.user,
                    read_only=permission_user.read_only,
                    parent_permission=parent_permission,
                )
            if folder.creator not in instance.allow_users.all():
                UserSharedPermission.objects.create(
                    file_to=instance,
                    user=folder.creator,
                    read_only=False,
                )
        else:
            folder = Folder.objects.get(head_folder=True)
        folder.files.add(instance)

        folder.updated_date = timezone.now()
        folder.save()

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
    src = serializers.SerializerMethodField()
    read_only = serializers.SerializerMethodField()

    def get_src(self, obj):
        instance = obj.file_version.all().order_by("-created_date").first()
        if instance:
            return instance.path.url
        return obj.path.url

    def get_read_only(self, obj):
        if (
            user_permission := self.context.get("user")
            .get_all_shared_permissions.filter(file_to=obj)
            .first()
        ):
            return user_permission.read_only
        return False

    class Meta:
        model = File
        fields = (
            "name",
            "id",
            "type",
            "src",
            "shared",
            "read_only",
        )


class FileSaveSerializer(serializers.ModelSerializer):
    """Сериализатор сохранения новой версии файла"""

    file = serializers.FileField(source="path", write_only=True)

    def update(self, instance, validated_data):
        file = validated_data.pop("path", None)
        size = file.size / 1000000
        version_count = instance.file_version.all().count() + 1
        name = f"Версия_{version_count}_{instance.name}"
        file.name = name
        prefix = get_prefix_file(file.content_type)
        instance_version = File.objects.create(
            path=file,
            name=name,
            prefix=prefix,
            size=size,
            file_type=FileType.objects.get(name=FileTypeConst.VERSION_FILE),
            creator=self.context.get("user"),
        )
        instance.file_version.add(instance_version)
        return instance_version

    class Meta:
        model = File
        fields = (
            "file",
            "name",
        )
        extra_kwargs = {"name": {"required": False}}


class DrawerInfoFileSerializer(serializers.ModelSerializer):
    """Сериализатор информации в выпадающем меню действий"""

    url = serializers.CharField(source="last_version.path.url")
    creator = UserSerializer()

    class Meta:
        model = File
        fields = (
            "id",
            "name",
            "size",
            "created_date",
            "updated_date",
            "url",
            "creator",
            "shared",
        )
