from django.urls import path
from . import views

app_name = 'users'
urlpatterns = [
    path('', views.index),
    path('community/', views.community),
    path('id=<int:uid>', views.userspace, name = 'user_space')
]