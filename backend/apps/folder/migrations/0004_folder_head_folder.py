# Generated by Django 4.0.2 on 2022-07-02 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('folder', '0003_folder_in_basket'),
    ]

    operations = [
        migrations.AddField(
            model_name='folder',
            name='head_folder',
            field=models.BooleanField(default=False, verbose_name='Главная папка с файлами'),
        ),
    ]
