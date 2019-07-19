from rest_framework import serializers
from content.models import Answer, CommentOfAnswer, Question

#首页推荐
#获取回答的内容，还要获取回答的作者和对应问题的标题，同时还有问题的页面url，回答作者的空间url
#额外获得回答的赞，踩和评论数
class RecommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('content', 'good', 'bad', 'question_caption', 'author_avatar', 'get_absolute_url', 'author_space_url', 'comment_count', 'question_page_url')

    question_caption = serializers.CharField(source = 'question.caption')
    author_avatar = serializers.ImageField(source = 'author.avatar')
    author_space_url = serializers.URLField(source = 'author.profile.get_absolute_url')
    question_page_url = serializers.URLField(source = 'question.get_absolute_url')
    comment_count = serializers.SerializerMethodField()
    
    #获取评论数
    def get_comment_count(self, obj):
        return obj.comment.all().count()

#回答信息，包括回答内容，作者头像，用户名，问题标题，还有问题页面和作者空间的url
#其他信息有回答的赞，踩，修改时间
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

#问题信息，包括标题，详细描述，修改时间，所有的tag，作者用户名和头像，作者空间链接
#要获取问题下的所有回答，引用上面的序列化器，包括回答的url链接
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

    #获取tag函数，不获取整个tag对象，只取tag名字
    def get_tags(self, obj):
        return obj.tag.values('name')

#评论，包括评论内容，评论时间，评论的作者用户名和头像，作者的空间链接
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentOfAnswer
        fields = ('content', 'created_time', 'author_avatar', 'author_nickname', 'author_space_url')

    author_nickname = serializers.CharField(source = 'author.nickname', read_only = True)
    author_avatar = serializers.ImageField(source = 'author.avatar', read_only = True)
    author_space_url = serializers.URLField(source = 'author.profile.get_absolute_url', read_only = True)