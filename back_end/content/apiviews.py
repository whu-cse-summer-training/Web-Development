from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Answer, Question, Tag
from users.models import User
from .serializer import RecommandSerializer, QuestionSerializer, AnswerSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


@method_decorator(csrf_exempt, name='dispatch')
class RecommandView(APIView):
    def post(self, request, format = None):
        answers = Answer.objects.all()
        serializer = RecommandSerializer(answers, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class QuestionView(APIView):
    def post(self, request, format = None, qid = 0):
        try:
            question = Question.objects.get(pk = qid)
        except Question.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
        serializer = QuestionSerializer(question)
        return Response(serializer.data, status = status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class AnswerView(APIView):
    def post(self, request, format = None, aid = 0):
        try:
            answer = Answer.objects.get(pk = aid)
        except Answer.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
        serializer = AnswerSerializer(answer)
        return Response(serializer.data, status = status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class GoodView(APIView):
    def post(self, request,format = None, aid = 0):
        if  request.user.is_authenticated:
            try:
                answer = Answer.objects.get(pk = aid)
            except Answer.DoesNotExist:
                return Response(status = status.HTTP_404_NOT_FOUND)
            answer.add_good()
            return Response(status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

@method_decorator(csrf_exempt, name='dispatch')
class BadView(APIView):
    def post(self, request,format = None, aid = 0):
        if  request.user.is_authenticated:
            try:
                answer = Answer.objects.get(pk = aid)
            except Answer.DoesNotExist:
                return Response(status = status.HTTP_404_NOT_FOUND)
            answer.add_bad()
            return Response(status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

@method_decorator(csrf_exempt, name='dispatch')
class AddMylistView(APIView):
    def post(self, request,format = None, aid = 0):
        if  request.user.is_authenticated:
            try:
                answer = Answer.objects.get(pk = aid)
            except Answer.DoesNotExist:
                return Response(status = status.HTTP_404_NOT_FOUND)
            request.user.mylist.add(answer)
            return Response(status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

@method_decorator(csrf_exempt, name='dispatch')
class AddHistoryView(APIView):
    def post(self, request,format = None, aid = 0):
        if  request.user.is_authenticated:
            try:
                answer = Answer.objects.get(pk = aid)
            except Answer.DoesNotExist:
                return Response(status = status.HTTP_404_NOT_FOUND)
            request.user.history.add(answer)
            return Response(status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

@method_decorator(csrf_exempt, name='dispatch')
class AddQuestionView(APIView):
    def post(self, request,format = None):
        if  request.user.is_authenticated:  
            serializer = QuestionSerializer(data = request.data)
            if serializer.is_valid(raise_exception = True):
                tags = request.data['tags']
                obj = serializer.save()
                obj.author = request.user
                obj.save()
            else:
                return Response(status = status.HTTP_400_BAD_REQUEST)
            for tag in tags:
                try:
                    t = Tag.objects.get(name = tag['name'])
                except Tag.DoesNotExist:
                    t = Tag(name = tag['name'])
                    t.save()
                obj.tag.add(t)
            return Response(status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

@method_decorator(csrf_exempt, name='dispatch')
class AddAnswerView(APIView):
    def post(self, request,format = None, qid = 0):
        if  request.user.is_authenticated:  
            try:
                question = Question.objects.get(pk = qid)
            except Question.DoesNotExist:
                return Response(status = status.HTTP_404_NOT_FOUND)
            serializer = AnswerSerializer(data = request.data)
            if serializer.is_valid(raise_exception = True):
                obj = serializer.save()
                obj.author = request.user
                obj.save()
            else:
                return Response(status = status.HTTP_400_BAD_REQUEST)
            return Response(status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)