from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class User(AbstractUser):
    """Пользователь"""

    first_name = models.CharField("Имя", max_length=255)
    last_name = models.CharField("Фамилия", max_length=255)
    patronymic = models.CharField("Отчество", max_length=255, blank=True, null=True)
    email = models.EmailField("E-Mail", unique=True)

    @property
    def get_all_shared_permissions(self):
        from apps.base.models import UserSharedPermission

        return UserSharedPermission.objects.filter(user=self)

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return f"{self.username}"
