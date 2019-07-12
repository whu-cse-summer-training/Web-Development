from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator
from .functions import user_avatar_path

# Create your models here.

class User(AbstractUser):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _('学号'),
        max_length = 20,
        unique = True,
        help_text=_('学号即用户名，账号由管理员预设置'),
        validators = [username_validator],
        error_messages={
            'unique': _('学号不能重复！'),
            },
        )
    #在注册账号时管理员将用户名置为学号
    #nickname是用户名，username是学号
    nickname = models.CharField(_('用户名'), max_length = 20, blank = True)
    avatar = models.ImageField(_('头像'), upload_to = user_avatar_path, blank = True, null = True)
    
    class Meta(AbstractUser.Meta):
        pass

class Profile(models.Model):
    #个人资料有啥以后再说
    user = models.OneToOneField(User, on_delete = models.PROTECT, default = None)

    def __str__(self):
        return self.user.username + '用户资料'

class Status(models.Model):
    user = models.OneToOneField(User, on_delete = models.PROTECT, default = None)
    if_banned = models.BooleanField(_('被封禁'), default = False)

    def __str__(self):
        return self.user.username + '用户状态'

    class Meta():
        verbose_name_plural = 'Status'