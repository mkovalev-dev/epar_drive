# Generated by Django 4.0.2 on 2022-07-16 15:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_usersharedpermission_file_allow_users_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usersharedpermission',
            old_name='folder',
            new_name='folder_to',
        ),
    ]
