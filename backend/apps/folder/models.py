from django.db import models
from django.db.models import Q
from django.dispatch import receiver

from apps.base.models import File
from apps.users.models import User


class Folder(models.Model):
    """Модель папок"""

    name = models.CharField("Название", max_length=255)
    created_date = models.DateTimeField("Дата создания", auto_now=True)
    creator = models.ForeignKey(
        User, on_delete=models.PROTECT, verbose_name="Создатель"
    )
    parent_folder = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Родительская папка",
        related_name="parent_folder_rm",
    )
    in_basket = models.BooleanField("В корзине", default=False)
    head_folder = models.BooleanField("Главная папка с файлами", default=False)
    files = models.ManyToManyField(File, verbose_name="Файлы папки", blank=True)
    updated_date = models.DateTimeField("Дата обновления папки", auto_now=True)
    allow_users = models.ManyToManyField(
        User,
        through="base.UserSharedPermission",
        symmetrical=False,
        related_name="folder_to",
    )

    @property
    def shared(self):
        """Имеется ли общий доступ"""
        if self.allow_users.all().exists():
            return True
        return False

    @property
    def size_folder(self):
        """Вычисление размера папки"""
        size = 0.0
        files = self.files.all()
        for file in files:
            if file.file_version.all().count() > 0:
                size += file.file_version.all().order_by("-created_date").first().size
            else:
                size += file.size

        return size

    @property
    def get_all_children_folders(self):
        return Folder.objects.filter(parent_folder=self)

    class Meta:
        verbose_name = "Папка"
        verbose_name_plural = "Папки"


@receiver(models.signals.pre_delete, sender=Folder)
def auto_delete_file(sender, instance, **kwargs):
    """
    Удаляет файлы в папках.
    """
    if files := instance.files.all():
        for file in files:
            file.delete()
