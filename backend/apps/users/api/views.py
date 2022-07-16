from django.contrib.auth import login, logout
from django.shortcuts import render

# Create your views here.
from rest_framework import response, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import ListAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from apps.users.api.serializers import (
    LoginSerializer,
    UserSerializer,
    UserShareSerializer,
)
from apps.users.models import User
from apps.users.utils import IsNotAuthenticated


class UserLoginApi(APIView):
    """Авторизация пользователя"""

    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsNotAuthenticated,)
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["users"]
        login(request, user)
        return response.Response(UserSerializer(user).data)


class UserCheckLogin(APIView):
    """Проверка авторизации пользователя"""

    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = UserSerializer(request.user).data
        return response.Response(serializer)


class UserLogoutApi(APIView):
    """Выход из системы пользователем"""

    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        logout(request)
        return response.Response("Exit", status=status.HTTP_200_OK)


class UserShareListAPIView(ListAPIView):
    """Возвращает список пользователей с которыми можно поделиться папкой или файлом"""

    permission_classes = (IsAuthenticated,)
    serializer_class = UserShareSerializer
    queryset = None
    pagination_class = None

    def get_queryset(self):
        return User.objects.all().exclude(username=self.request.user.username)

    def get_serializer_context(self):
        """Проставляем в контекст сериализатора id папки/файла и тип"""
        return self.kwargs
