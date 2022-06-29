from django.contrib.auth.models import Group
from rest_framework import serializers


class UserGroupSerializer(serializers.ModelSerializer):
    """Сериализатор групп пользователя"""

    class Meta:
        model = Group
        fields = ("name",)
