# Generated by Django 4.0.2 on 2022-07-14 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('folder', '0006_alter_folder_parent_folder'),
    ]

    operations = [
        migrations.AddField(
            model_name='folder',
            name='updated_date',
            field=models.DateTimeField(auto_now=True, verbose_name='Дата обновления папки'),
        ),
    ]