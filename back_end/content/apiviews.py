from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Answer, Question, Tag, CommentOfAnswer
from users.models import User
from .serializer import RecommandSerializer, QuestionSerializer, AnswerSerializer, CommentSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


#首页推荐，任何人都可以使用
#banner也使用这个api
@method_decorator(csrf_exempt, name='dispatch')
class RecommandView(APIView):
    def post(self, request, format = None):
        answers = Answer.objects.all()
        serializer = RecommandSerializer(answers, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)

#查看问题，任何人都可以使用
#如果直接输入url找问题，问题不存在回复404
@method_decorator(csrf_exempt, name='dispatch')
class QuestionView(APIView):
    def post(self, request, format = None, qid = 0):
        try:
            question = Question.objects.get(pk = qid)
        except Question.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
        serializer = QuestionSerializer(question)
        return Response(serializer.data, status = status.HTTP_200_OK)

#查看回答，任何人都可以使用
#如果直接输入url找回答，回答不存在返回404
@method_decorator(csrf_exempt, name='dispatch')
class AnswerView(APIView):
    def post(self, request, format = None, aid = 0):
        try:
            answer = Answer.objects.get(pk = aid)
        except Answer.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
        serializer = AnswerSerializer(answer)
        return Response(serializer.data, status = status.HTTP_200_OK)

#点赞，需要登录，没有使用序列化器
#如果网页试图点赞不存在的回答就返回404
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

#点赞，需要登录，没有使用序列化器
#如果网页试图点赞不存在的回答就返回404
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

#加入收藏，需要登录
#如果要添加的问题不存在返回404
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

#加入历史记录，需要登录，理论上每打开一个回答都会自动加入历史记录
#如果要加入的回答不存在，返回404
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

#添加提问，需要登录
#按照获取问题的格式发送json，包括tag，格式不正确返回400
#如果要添加的tag不存在，这个视图会先创建这个tag然后添加
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

#添加回答，需要登录
#在url中指定回答对应的问题，问题不存在则返回404
#按照获取回答的格式发送json请求，格式不正确返回400
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
                obj.question = question
                obj.save()
            else:
                return Response(status = status.HTTP_400_BAD_REQUEST)
            return Response(status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)

#查看评论，任何人都可以使用
#在url中指定回答的id，如果回答不存在返回404
class CommentView(APIView):
    def post(self, request,format = None, aid = 0):
        try:
            answer= Answer.objects.get(pk = aid)
        except Answer.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
        comments = answer.comments.all()
        serializer = CommentSerializer(comments, many = True)         
        return Response(serializer.data, status = status.HTTP_200_OK)

#添加评论，需要登录
#如获取评论一样的格式发送json请求，格式错误返回400
#需在url中指定回答的id，不存在则返回404
class AddCommentView(APIView):
    def post(self, request,format = None, aid = 0):
        if  request.user.is_authenticated:  
            try:
                answer= Answer.objects.get(pk = aid)
            except Answer.DoesNotExist:
                return Response(status = status.HTTP_404_NOT_FOUND)
            serializer = CommentSerializer(data = request.data)
            if serializer.is_valid(raise_exception = True):
                obj = serializer.save()
                obj.author = request.user
                obj.answer = answer
                obj.save()
            else:
                return Response(status = status.HTTP_400_BAD_REQUEST)
            return Response(status = status.HTTP_200_OK)
        else:
            return Response(status = status.HTTP_401_UNAUTHORIZED)