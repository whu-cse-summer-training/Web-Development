from rest_framework import serializers
from content.models import Answer, CommentOfAnswer, Question

class RecommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('content', 'good', 'bad', 'question_caption', 'author_avatar', 'get_absolute_url', 'author_space_url', 'comment_count', 'question_page_url')

    question_caption = serializers.CharField(source = 'question.caption')
    author_avatar = serializers.ImageField(source = 'author.avatar')
    author_space_url = serializers.URLField(source = 'author.profile.get_absolute_url')
    question_page_url = serializers.URLField(source = 'question.get_absolute_url')
    comment_count = serializers.SerializerMethodField()
    
    def get_comment_count(self, obj):
        return obj.comment.all().count()

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('content', 'get_absolute_url', 'author_nickname', 'author_avatar', 'author_space_url', 'question_caption', 'question_page_url')
        read_only_field = ('good', 'bad', 'modified_time')

    author_nickname = serializers.CharField(source = 'author.nickname', read_only = True)
    author_avatar = serializers.ImageField(source = 'author.avatar', read_only = True)
    author_space_url = serializers.URLField(source = 'author.profile.get_absolute_url', read_only = True)
    question_caption = serializers.CharField(source = 'question.caption', read_only = True)
    question_page_url = serializers.URLField(source = 'question.get_absolute_url', read_only = True)

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('caption', 'description', 'tags', 'author_avatar', 'author_nickname', 'author_space_url', 'answers')
        read_only_field =('modified_time')

    author_nickname = serializers.CharField(source = 'author.nickname', read_only = True)
    author_avatar = serializers.ImageField(source = 'author.avatar', read_only = True)
    author_space_url = serializers.URLField(source = 'author.profile.get_absolute_url', read_only = True)
    answers = AnswerSerializer(many = True, read_only = True)
    tags = serializers.SerializerMethodField()

    def get_tags(self, obj):
        return obj.tag.values('name')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentOfAnswer
        fields = ('content', 'created_time', 'author_avatar', 'author_nickname', 'author_space_url')

    author_nickname = serializers.CharField(source = 'author.nickname', read_only = True)
    author_avatar = serializers.ImageField(source = 'author.avatar', read_only = True)
    author_space_url = serializers.URLField(source = 'author.profile.get_absolute_url', read_only = True)