# Generated by Django 4.0.2 on 2022-07-16 18:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_alter_usersharedpermission_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersharedpermission',
            name='parent_permission',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.usersharedpermission', verbose_name='Родительские права'),
        ),
    ]
