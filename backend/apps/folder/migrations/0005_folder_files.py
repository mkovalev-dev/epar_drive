# Generated by Django 4.0.2 on 2022-07-02 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_file_size'),
        ('folder', '0004_folder_head_folder'),
    ]

    operations = [
        migrations.AddField(
            model_name='folder',
            name='files',
            field=models.ManyToManyField(blank=True, to='base.File', verbose_name='Файлы папки'),
        ),
    ]
