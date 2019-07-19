from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from rest_framework import status
from django.contrib.auth import login, logout
from .models import User
from .serializer import SimpleInfoSerializer, UserSerializer, MylistSerializer, HistorySerializer, MyQuestionSerializer, MyAnswerSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

#验证是否登录，登录则返回信息，否则401
@method_decorator(csrf_exempt, name='dispatch')
class SimpleInfoView(APIView):
    def post(self, request, format=None):
        if  request.user.is_authenticated:
            user = User.objects.get(pk = request.user.pk)
            serializer = SimpleInfoSerializer(user)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

#验证是否登录，登录则返回信息，否则401
#用户不存在则返回404
#如果访问的个人信息页是自己的，设置editable为True
@method_decorator(csrf_exempt, name='dispatch')
class ProfileView(APIView):
    def post(self, request, format = None, uid = 0):
        if request.user.is_authenticated:
            try:
                user = User.objects.get(pk = uid)
            except User.DoesNotExist:
                return Response(status = status.HTTP_404_NOT_FOUND)
            serializer = UserSerializer(user)
            data = serializer.data
            if request.user == user:
                data['editable'] = True
            else:
                data['editable'] = False
            return Response(data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)


#编辑个人信息，需要登录，而且只能更新自己的信息
#有重载更新方法，如获取的信息一样将profile作为json的一个键可以一键更新子类
#发送格式不对返回400
@method_decorator(csrf_exempt, name='dispatch')
class EditProfileView(APIView):
    def post(self, request, format = None, uid = 0):
        if request.user.is_authenticated and request.user.pk == uid:
            user = User.objects.get(pk = uid)
            serializer = UserSerializer(user, data = request.data)
            if serializer.is_valid(raise_exception = True):
                serializer.save()
                return Response(status = status.HTTP_200_OK)
            else:
                print(serializer.data)
                return Response(status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

#收藏夹内容，需要登录，且只能查看自己的收藏夹
@method_decorator(csrf_exempt, name='dispatch')
class MylistView(APIView):
    def post(self, request, format =None, uid = 0):
        if request.user.is_authenticated and request.user.pk == uid:
            user = User.objects.get(pk = uid)
            serializer = MylistSerializer(user)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

#历史记录，需要登录，且只能查看自己的历史记录
@method_decorator(csrf_exempt, name='dispatch')
class HistoryView(APIView):
    def post(self, request, format =None, uid = 0):
        if request.user.is_authenticated and request.user.pk == uid:
            user = User.objects.get(pk = uid)
            serializer = HistorySerializer(user)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

#我的提问，需要登录，且只能查看自己的提问
@method_decorator(csrf_exempt, name='dispatch')
class MyQuestionView(APIView):
    def post(self, request, format = None, uid = 0):
        if request.user.is_authenticated and request.user.pk == uid:
            user = User.objects.get(pk = uid)
            serializer = MyQuestionSerializer(user)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

#我的回答，需要登录，且只能查看自己的回答
@method_decorator(csrf_exempt, name='dispatch')
class MyAnswerView(APIView):
    def post(self, request, format = None, uid = 0):
        if request.user.is_authenticated and request.user.pk == uid:
            user = User.objects.get(pk = uid)
            serializer = MyAnswerSerializer(user)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

#登录，没有用到序列化器，如果在已经登录时登录别的账号还会自动把原来账号登出
#账号密码不正确返回404
@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    def post(self, request, format = None):
        username = request.data['username']
        password = request.data['password']
        try:
            user = User.objects.get(username = username, password = password)
        except User.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
        if user.is_authenticated:
            if request.user.is_authenticated:
                logout(request)
            login(request, user)
            return HttpResponseRedirect('/community')
        else:
            return Response(status = status.HTTP_404_NOT_FOUND)