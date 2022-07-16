import os

from django.db import models
from django.utils import timezone
from django.dispatch import receiver

from apps.users.models import User


class FileType(models.Model):
    """Типы файлов"""

    name = models.CharField("Тип файла", max_length=255)
    created_date = models.DateTimeField("Дата создания", auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Тип файла"
        verbose_name_plural = "(Справочник) Типы файлов"


def get_file_path(file: "File", filename: str) -> str:
    """
    Возвращает путь до папки сохранения файла в зависимости
     от даты и типа файла
    """
    now = timezone.now()
    return "{file_type}/{year}/{month}/{day}/{filename}".format(
        year=now.strftime("%Y"),
        month=now.strftime("%m"),
        day=now.strftime("%d"),
        filename=filename,
        file_type=file.file_type.name,
    )


class File(models.Model):
    """Файловое хранилище"""

    name = models.CharField("Название файла", max_length=510)
    path = models.FileField("Файл", upload_to=get_file_path)
    file_type = models.ForeignKey(
        FileType, verbose_name="Тип файла", on_delete=models.SET_NULL, null=True
    )
    created_date = models.DateTimeField("Дата создания", auto_now=True)
    is_private = models.BooleanField("Закрытый файл", default=False)
    prefix = models.CharField("Префикс", max_length=255, null=True, blank=True)
    size = models.FloatField("Размер файла в МБ", default=0)
    creator = models.ForeignKey(
        User, on_delete=models.PROTECT, verbose_name="Создатель", null=True, blank=True
    )
    in_basket = models.BooleanField("В корзине", default=False)
    file_version = models.ManyToManyField("self", verbose_name="Версии файлов")
    updated_date = models.DateTimeField("Дата обновления файла", auto_now=True)
    allow_users = models.ManyToManyField(
        User, through="UserSharedPermission", symmetrical=False, related_name="file_to"
    )

    @property
    def shared(self):
        """Имеется ли общий доступ"""
        if self.allow_users.all().exists():
            return True
        return False

    @property
    def last_version(self):
        """Последняя версия файла"""
        return self.file_version.all().order_by("-created_date").first()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Файл"
        verbose_name_plural = "Файлы"


@receiver(models.signals.post_delete, sender=File)
def auto_delete_file(sender, instance, **kwargs):
    """
    Удаляет файл на сервере при удалении объекта `File`.
    """
    if instance.path:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)


class UserSharedPermission(models.Model):
    """Модель с правами пользователя в папках и файлах"""

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Пользователь"
    )
    read_only = models.BooleanField("Только чтение", default=True)
    folder_to = models.ForeignKey(
        "folder.Folder",
        on_delete=models.CASCADE,
        verbose_name="Папка",
        blank=True,
        null=True,
    )
    file_to = models.ForeignKey(
        "File", on_delete=models.CASCADE, verbose_name="Файл", blank=True, null=True
    )
    parent_permission = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        verbose_name="Родительские права",
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "Права пользователя в папках и файлах"
        verbose_name_plural = "Права пользователя в папках и файлах"
        unique_together = ("user", "folder_to", "file_to")
