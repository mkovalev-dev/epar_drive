from django.db import models

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
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        verbose_name="Родительская папка",
        related_name="parent_folder_rm",
    )
    in_basket = models.BooleanField("В корзине", default=False)
    head_folder = models.BooleanField("Главная папка с файлами", default=False)
    files = models.ManyToManyField(File, verbose_name="Файлы папки", blank=True)

    class Meta:
        verbose_name = "Папка"
        verbose_name_plural = "Папки"
