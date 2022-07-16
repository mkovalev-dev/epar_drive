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


class UserShareSerializer(serializers.ModelSerializer):
    """Сериализатор для списка пользователей в модуле поделиться"""

    groups = UserGroupSerializer(many=True)
    shared = serializers.SerializerMethodField()

    def get_shared(self, obj):
        if self.context.get("type") == "folder":
            instance = obj.get_all_shared_permissions.filter(
                folder_to_id=self.context.get("id")
            ).first()
        else:
            instance = obj.get_all_shared_permissions.filter(
                file_to_id=self.context.get("id")
            ).first()
        if instance:
            return {"read_only": instance.read_only, "id": instance.id}
        return None

    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "patronymic",
            "groups",
            "shared",
        )
