from django.contrib import admin

# Register your models here.
from apps.folder.models import Folder


@admin.register(Folder)
class FolderAdmin(admin.ModelAdmin):
    list_display = ["name", "created_date"]
