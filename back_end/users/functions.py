from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.db import models
import os

def user_avatar_path(instance,filename):
    import os
    ext = os.path.splitext(filename)[-1]
    return 'avatar/' + instance.username + '_avatar' + ext

class OverwriteStorage(FileSystemStorage):
    '''
    Muda o comportamento padrão do Django e o faz sobrescrever arquivos de
    mesmo nome que foram carregados pelo usuário ao invés de renomeá-los.
    '''
    def get_available_name(self, name, max_length = None):
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name