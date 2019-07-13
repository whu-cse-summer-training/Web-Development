from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from .functions import user_avatar_path

# Create your models here.

gender_choices = (
    (0, '男'),
    (1, '女'),
    (2, '保密')
)

condition_choices = (
    (0, '本科在读'),
    (1, '硕士在读'),
    (2, '博士在读'),
    (3, '毕业')
)

class User(AbstractUser):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        '学号',
        max_length = 20,
        unique = True,
        help_text='学号即用户名，账号由管理员预设置',
        validators = [username_validator],
        error_messages={
            'unique': '学号不能重复！',
            },
        )
    #在注册账号时管理员将用户名置为学号
    #nickname是用户名，username是学号
    nickname = models.CharField('用户名', max_length = 20, blank = True)
    avatar = models.ImageField('头像', upload_to = user_avatar_path, blank = True, null = True)
    mylist = models.ManyToManyField('content.Answer', related_name = '收藏夹')
    history = models.ManyToManyField('content.Answer', related_name = '历史记录')
    
    class Meta(AbstractUser.Meta):
        pass

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete = models.PROTECT, default = None)

    gender = models.SmallIntegerField('性别', choices = gender_choices, default = 2)
    birthday = models.DateField('生日', blank = True)
    school = models.CharField('所属学校', max_length = 20, blank = True)
    major = models.CharField('专业', max_length = 20, blank = True)
    condition = models.SmallIntegerField('在读情况', choices = condition_choices, blank = True)

    def __str__(self):
        return self.user.username + '用户资料'

class Status(models.Model):
    user = models.OneToOneField(User, on_delete = models.PROTECT, default = None)
    if_banned = models.BooleanField('被封禁', default = False)

    def __str__(self):
        return self.user.username + '用户状态'

    class Meta():
        verbose_name_plural = 'Status'

class MylistInfo:
    user = models.ForeignKey(User, on_delete = models.PROTECT)
    answer = models.ForeignKey('content.Answer', on_delete = models.PROTECT)
    add_time = models.DateTimeField('收藏时间', auto_now_add = True)

    def __str__(self):
        return self.user.username + '收藏”' + self.answer.__str__() + '“信息'

    class Meta():
        verbose_name_plural = 'MylistInfo'

class HistoryInfo:
    user = models.ForeignKey(User, on_delete = models.PROTECT)
    answer = models.ForeignKey('content.Answer', on_delete = models.PROTECT)
    add_time = models.DateTimeField('最后访问', auto_now_add = True)

    def __str__(self):
        return self.user.username + '历史记录”' + self.answer.__str__() + '“信息'

    class Meta():
        verbose_name_plural = 'HistoryInfo'