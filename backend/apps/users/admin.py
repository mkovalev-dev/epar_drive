from django.contrib import admin

# Register your models here.
from django.contrib.auth import admin as auth_admin, get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    # add_form = CustomUserCreationForm
    list_display = [
        "username",
        "first_name",
        "last_name",
        "patronymic",
        "is_superuser",
    ]
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (
            "Персональная информация",
            {"fields": ("first_name", "last_name", "patronymic")},
        ),
        (
            "Права доступа",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    # readonly_fields = ("is_verified",)
    search_fields = (
        "username",
        "first_name",
        "last_name",
        "email",
    )
