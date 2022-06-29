from django.contrib import admin

from apps.base.models import File, FileType


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    """(Хранилище) Файлы"""

    list_display = [
        "name",
    ]


@admin.register(FileType)
class FileTypeAdmin(admin.ModelAdmin):
    list_display = ["name", "created_date"]
