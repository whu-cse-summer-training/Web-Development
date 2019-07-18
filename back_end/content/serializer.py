from rest_framework import serializers
from content.models import Answer, CommentOfAnswer, Question

class RecommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('content', 'good', 'bad', 'question_caption', 'author_avatar', 'author_space_url', 'comment_count')

    question_caption = serializers.CharField(source = 'question.caption')
    author_avatar = serializers.ImageField(source = 'author.avatar')
    author_space_url = serializers.URLField(source = 'author.profile.get_absolute_url')
    comment_count = serializers.SerializerMethodField()
    
    def get_comment_count(self, obj):
        return obj.comment.all().count()

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('content', 'author_nickname', 'author_avatar', 'author_space_url', 'good', 'bad', 'modified_time')

    author_nickname = serializers.CharField(source = 'author.nickname')
    author_avatar = serializers.ImageField(source = 'author.avatar')
    author_space_url = serializers.URLField(source = 'author.profile.get_absolute_url')

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('author_nickname', 'author_space_url','author_avatar', 'caption', 'description', 'modified_time', 'tags', 'author_avatar', 'answers')

    author_nickname = serializers.CharField(source = 'author.nickname')
    author_avatar = serializers.ImageField(source = 'author.avatar')
    author_space_url = serializers.URLField(source = 'author.profile.get_absolute_url')
    answers = AnswerSerializer(many = True)
    tags = serializers.SerializerMethodField()

    def get_tags(self, obj):
        return obj.tag.values('name')