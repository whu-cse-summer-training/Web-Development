from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from .functions import user_avatar_path
from .functions import OverwriteStorage


# Create your models here.

#性别和在读情况是枚举量
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


#用户类，重载AbstractUser，在setting.py中设置AUTH_USER_MODEL为users.User
class User(AbstractUser):
    username_validator = UnicodeUsernameValidator()

    #在注册账号时管理员将username置为学号，所有用户都是预注册的
    #nickname是用户名，username是学号
    #登录时使用username，但其余情况下“用户名”都是nickname而不是username
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
    nickname = models.CharField('用户名', max_length = 20, blank = True)
    #avatar头像，django模型中的图片域，重载了默认的储存路径和储存方法
    avatar = models.ImageField('头像', upload_to = user_avatar_path, storage = OverwriteStorage(), blank = True, null = True)
    mylist = models.ManyToManyField('content.Answer', related_name = '收藏夹', blank = True)
    history = models.ManyToManyField('content.Answer', related_name = '历史记录', blank = True)
    
    class Meta(AbstractUser.Meta):
        pass

#用户资料类，具体字段可以再添加
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete = models.PROTECT, default = None, related_name = 'profile')
    gender = models.SmallIntegerField('性别', choices = gender_choices, default = 2)
    birthday = models.DateField('生日', blank = True)
    school = models.CharField('所属学校', max_length = 20, blank = True)
    major = models.CharField('专业', max_length = 20, blank = True)
    condition = models.SmallIntegerField('在读情况', choices = condition_choices, blank = True)

    def __str__(self):
        return self.user.username + '用户资料'

#用户状态类，目前只有封禁状态，其他字段可以再添加
class Status(models.Model):
    user = models.OneToOneField(User, on_delete = models.PROTECT, default = None)
    if_banned = models.BooleanField('被封禁', default = False)

    def __str__(self):
        return self.user.username + '用户状态'

    class Meta():
        verbose_name_plural = 'Status'

#收藏夹，只能收藏回答，用户和回答多对多，记录收藏时间
class MylistInfo(models.Model):
    user = models.ForeignKey(User, on_delete = models.PROTECT)
    answer = models.ForeignKey('content.Answer', on_delete = models.PROTECT)
    add_time = models.DateTimeField('收藏时间', auto_now_add = True)

    def __str__(self):
        return self.user.username + '收藏”' + self.answer.__str__() + '“信息'

    class Meta():
        verbose_name_plural = 'MylistInfo'

#历史记录，只记录回答，用户和回答多对多，记录最后访问时间
class HistoryInfo(models.Model):
    user = models.ForeignKey(User, on_delete = models.PROTECT)
    answer = models.ForeignKey('content.Answer', on_delete = models.PROTECT)
    add_time = models.DateTimeField('最后访问', auto_now_add = True)

    def __str__(self):
        return self.user.username + '历史记录”' + self.answer.__str__() + '“信息'

    class Meta():
        verbose_name_plural = 'HistoryInfo'