# Generated by Django 4.0.2 on 2022-07-16 16:28

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0001_initial'),
        ('base', '0011_rename_folder_usersharedpermission_folder_to'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usersharedpermission',
            old_name='file',
            new_name='file_to',
        ),
        migrations.AlterField(
            model_name='file',
            name='allow_users',
            field=models.ManyToManyField(related_name='file_to', through='base.UserSharedPermission', to=settings.AUTH_USER_MODEL),
        ),
    ]
