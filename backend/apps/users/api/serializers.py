from django.contrib.auth import authenticate
from rest_framework import serializers

from apps.base.api.serializers import UserGroupSerializer
from apps.users.admin import User


class LoginSerializer(serializers.Serializer):
    """Сериализатор авторизации пользователя"""

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(username=attrs["username"], password=attrs["password"])

        if not user:
            raise serializers.ValidationError("Неверный E-mail или пароль.")

        if not user.is_active:
            raise serializers.ValidationError("Пользователь неактивен.")

        return {"users": user}


class UserSerializer(serializers.ModelSerializer):
    """Сериализатор информации о пользователе"""

    groups = UserGroupSerializer(many=True)

    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "patronymic",
            "email",
            "groups",
        )
        read_only_fields = fields
