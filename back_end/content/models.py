from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.

class Tag(models.Model):
    name = models.CharField(_('Tag名称'), max_length = 50)

    def __str__(self):
        return self.name

class Question(models.Model):
    caption = models.CharField(_('问题标题'), max_length = 100)
    description = models.TextField(_('问题详细描述'),)
    author = models.ForeignKey('users.User', on_delete = models.PROTECT)
    modified_time = models.DateTimeField(_('最后编辑时间'), auto_now = True)
    tag = models.ManyToManyField(Tag, blank = True)

    def __str__(self):
        return self.caption

class Answer(models.Model):
    content = models.TextField(_('回答正文'),)
    author = models.ForeignKey('users.User', on_delete = models.PROTECT)
    question = models.ForeignKey(Question, on_delete = models.PROTECT)
    modified_time = models.DateTimeField(_('最后编辑时间'), auto_now = True)
    good = models.IntegerField(_('*好*'), default = 0)
    bad = models.IntegerField(_('*不*'), default = 0)

    def __str__(self):
        return self.author.__str__() + '在问题”' + self.question.__str__() + '”下的回答'

class CommentOfQuestion(models.Model):
    content = models.TextField(_('评论内容'),)
    author = models.ForeignKey('users.User', on_delete = models.PROTECT)
    created_time = models.DateTimeField(_('评论时间'), auto_now_add = True)
    question = models.ForeignKey(Question, on_delete = models.PROTECT)

    def __str__(self):
        return self.author.__str__() + '在问题“' + self.question.__str__() + '”下的评论'

    class Meta():
        verbose_name_plural = 'CommentsOfQuestions'

class CommentOfAnswer(models.Model):
    content = models.TextField(_('评论内容'),)
    author = models.ForeignKey('users.User', on_delete = models.PROTECT)
    created_time = models.DateTimeField(_('评论时间'), auto_now_add = True)
    answer = models.ForeignKey(Answer, on_delete = models.PROTECT)

    def __str__(self):
        return self.author.__str__() + '在回答”' + self.answer.__str__() + '”下的评论'

    class Meta():
        verbose_name_plural = 'CommentsOfAnswers'

class QuestionStatus(models.Model):
    able_modify = models.BooleanField(_('可编辑'), default = True)
    able_answer = models.BooleanField(_('可添加回答'), default = True)
    question = models.OneToOneField(Question, on_delete = models.PROTECT)

    def __str__(self):
        return '问题”' + self.question.__str__() + '”的状态'

    class Meta():
        verbose_name_plural = 'QuestionsStatus'