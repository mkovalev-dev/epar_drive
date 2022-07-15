from django.urls import path

from apps.users.api.views import (
    UserLoginApi,
    UserCheckLogin,
    UserLogoutApi,
    UserShareListAPIView,
)

app_name = "users"

urlpatterns = [
    path("login/", UserLoginApi.as_view(), name="login"),
    path("check-login/", UserCheckLogin.as_view(), name="check-login"),
    path("logout/", UserLogoutApi.as_view(), name="logout"),
    path("share/", UserShareListAPIView.as_view(), name="share"),
]
