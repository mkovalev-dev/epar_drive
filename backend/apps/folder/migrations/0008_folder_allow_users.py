# Generated by Django 4.0.2 on 2022-07-16 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('folder', '0007_folder_updated_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='folder',
            name='allow_users',
            field=models.ManyToManyField(through='base.UserSharedPermission', to='folder.Folder'),
        ),
    ]
