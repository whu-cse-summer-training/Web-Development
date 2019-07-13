from django.contrib import admin
from .models import User, Profile, Status, MylistInfo, HistoryInfo

# Register your models here.

admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Status)
admin.site.register(MylistInfo)
admin.site.register(HistoryInfo)