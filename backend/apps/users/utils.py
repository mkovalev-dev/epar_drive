from rest_framework.permissions import BasePermission


class IsNotAuthenticated(BasePermission):
    """Проверка что пользователь не авторизован"""

    message = "Вы уже вошли в систему."

    def has_permission(self, request, view):
        return not bool(request.user and request.user.is_authenticated)