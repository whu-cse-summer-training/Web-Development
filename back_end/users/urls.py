from django.urls import path
from . import views

#欢迎页，首页，用户个人信息
app_name = 'users'
urlpatterns = [
    path('', views.index),
    path('community/', views.community),
    path('id=<int:uid>', views.userspace, name = 'user_space')
]