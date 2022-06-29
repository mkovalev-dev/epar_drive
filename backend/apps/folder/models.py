from django.db import models

from apps.users.models import User


class Folder(models.Model):
    """Модель папок"""

    name = models.CharField("Название", max_length=255)
    created_date = models.DateTimeField("Дата создания", auto_now=True)
    creator = models.ForeignKey(
        User, on_delete=models.PROTECT, verbose_name="Создатель"
    )

    class Meta:
        verbose_name = "Папка"
        verbose_name_plural = "Папки"
