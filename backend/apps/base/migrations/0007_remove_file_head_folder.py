# Generated by Django 4.0.2 on 2022-07-07 19:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_file_head_folder'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='head_folder',
        ),
    ]