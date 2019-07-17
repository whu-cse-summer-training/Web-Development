from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Answer, Question
from .serializer import RecommandSerializer, QuestionSerializer

class RecommandView(APIView):
    def post(self, request, format = None):
        answers = Answer.objects.all()
        serializer = RecommandSerializer(answers, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)

class QuestionView(APIView):
    def post(self, request, format = None, qid = 0):
        try:
            question = Question.objects.get(pk = qid)
        except Question.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
        serializer = QuestionSerializer(question)
        return Response(serializer.data, status = status.HTTP_200_OK)