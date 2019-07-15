from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializer import SimpleInfoSerializer

class SimpleInfoView(APIView):
    def post(self, request, format=None):
        print(request.headers["sessionid"])
        if  request.session.username != '':
            user = User.objects.get(username = request.session.usrename)
            serializer = SimpleInfoSerializer(user)
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_404_NOT_FOUND)