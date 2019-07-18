from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializer import SimpleInfoSerializer, UserSerializer, MylistSerializer, HistorySerializer, MyQuestionSerializer, MyAnswerSerializer

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