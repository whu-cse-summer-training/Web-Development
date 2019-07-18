from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from rest_framework import status
from django.contrib.auth import login, logout
from .models import User
from .serializer import SimpleInfoSerializer, UserSerializer, MylistSerializer, HistorySerializer, MyQuestionSerializer, MyAnswerSerializer
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt

class SimpleInfoView(APIView):
    def post(self, request, format=None):
        if  request.user.is_authenticated:
            user = User.objects.get(pk = request.user.pk)
            serializer = SimpleInfoSerializer(user)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_404_NOT_FOUND)

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

class MylistView(APIView):
    def post(self, request, format =None, uid = 0):
        if request.user.is_authenticated and request.user.pk == uid:
            user = User.objects.get(pk = uid)
            serializer = MylistSerializer(user)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

class HistoryView(APIView):
    def post(self, request, format =None, uid = 0):
        if request.user.is_authenticated and request.user.pk == uid:
            user = User.objects.get(pk = uid)
            serializer = HistorySerializer(user)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

class MyQuestionView(APIView):
    def post(self, request, format = None, uid = 0):
        if request.user.is_authenticated and request.user.pk == uid:
            user = User.objects.get(pk = uid)
            serializer = MyQuestionSerializer(user)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

class MyAnswerView(APIView):
    def post(self, request, format = None, uid = 0):
        if request.user.is_authenticated and request.user.pk == uid:
            user = User.objects.get(pk = uid)
            serializer = MyAnswerSerializer(user)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

class LoginView(APIView):
    def post(self, request, format = None):
        username = request.data['username']
        password = request.data['password']
        print(username, password)
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