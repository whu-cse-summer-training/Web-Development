from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializer import SimpleInfoSerializer, ProfileSerializer

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
            user = User.objects.get(pk = uid)
            serializer = ProfileSerializer(user)
            data = serializer.data
            if request.user == user:
                data['editable'] = True
            else:
                data['editable'] = False
            return Response(data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_404_NOT_FOUND)
