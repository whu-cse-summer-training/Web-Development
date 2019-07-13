from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.db import models
import os

#存储路径，重载默认值，用户上传的头像会被命名为username_avatar
def user_avatar_path(instance,filename):
    import os
    ext = os.path.splitext(filename)[-1]
    return 'avatar/' + instance.username + '_avatar' + ext

#储存方法，重载默认值，用户在上传同名文件时会覆盖原有文件
class OverwriteStorage(FileSystemStorage):
    def get_available_name(self, name, max_length = None):
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name