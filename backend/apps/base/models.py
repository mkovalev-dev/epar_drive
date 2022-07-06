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
