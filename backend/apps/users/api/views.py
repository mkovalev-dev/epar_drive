from django.contrib.auth import login, logout
from django.shortcuts import render

# Create your views here.
from rest_framework import response, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from apps.users.api.serializers import LoginSerializer, UserSerializer
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
