from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


# def validate_bool(value):
#     """Валидатор на уже опубликованные сообщения на главном экране"""
#     from apps.base.models import HomeNotifications
#
#     if value and HomeNotifications.objects.filter(is_active=True).count() > 0:
#         raise ValidationError(
#             _(
#                 "У вас уже есть опубликованное сообщение, снимите с публикации и продолжите редактирование!"
#             )
#         )
#
#
# def validate_user_fields(value):
#     from apps.base.models import UserFiledsPoint
#
#     if value and UserFiledsPoint.objects.filter(field=value).exists():
#         raise ValidationError(_("Вы уже добавили это поле!"))
#
#
# def validate_file_extension(file_field):
#     """Валидатор расширения файлов, смотрит FileType.extension."""
#     allowed_extensions = file_field.instance.file_type.extensions
#     if allowed_extensions is not None:
#         allowed_extensions = tuple(allowed_extensions.split(","))
#         if not file_field.name.lower().endswith(allowed_extensions):
#             raise ValidationError(
#                 "Недопустимое расширение файла. Доступны:"
#                 + file_field.instance.file_type.extensions
#             )
