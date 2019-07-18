from django.db import models
from django.urls import reverse

# Create your models here.

#Tag类
class Tag(models.Model):
    name = models.CharField('Tag名称', max_length = 50)

    def __str__(self):
        return self.name

#问题类
class Question(models.Model):
    caption = models.CharField('问题标题', max_length = 100)
    description = models.TextField('问题详细描述')
    author = models.ForeignKey('users.User', on_delete = models.PROTECT, related_name = 'my_questions', null = True)
    modified_time = models.DateTimeField('最后编辑时间', auto_now = True)
    tag = models.ManyToManyField(Tag, blank = True)

    def __str__(self):
        return self.caption

    def get_absolute_url(self):
        return reverse('content:question_page', kwargs={'qid': self.pk})

#回答类，先有问题再有回答
class Answer(models.Model):
    content = models.TextField('回答正文')
    author = models.ForeignKey('users.User', on_delete = models.PROTECT, related_name = 'my_answers', null = True)
    question = models.ForeignKey(Question, on_delete = models.PROTECT, related_name = 'answers', null = True)
    modified_time = models.DateTimeField('最后编辑时间', auto_now = True)
    good = models.IntegerField('*好*', default = 0)
    bad = models.IntegerField('*不*', default = 0)

    def __str__(self):
        return self.author.__str__() + ' 在问题”' + self.question.__str__() + '”下的回答'

    def get_absolute_url(self):
        return reverse('content:answer_page', kwargs={'aid': self.pk})

    def add_good(self):
        self.good += 1
        self.save(update_fields = ['good'])

    def add_bad(self):
        self.bad += 1
        self.save(update_fields = ['bad'])

#问题评论类，先有问题再有评论
class CommentOfQuestion(models.Model):
    content = models.TextField('评论内容',)
    author = models.ForeignKey('users.User', on_delete = models.PROTECT)
    created_time = models.DateTimeField('评论时间', auto_now_add = True)
    question = models.ForeignKey(Question, on_delete = models.PROTECT, related_name = 'comment')

    def __str__(self):
        return self.author.__str__() + ' 在问题“' + self.question.__str__() + '”下的评论'

    class Meta():
        verbose_name_plural = 'CommentsOfQuestions'

#回答评论类，先有回答再有评论，又先要有问题再有回答
class CommentOfAnswer(models.Model):
    content = models.TextField('评论内容')
    author = models.ForeignKey('users.User', on_delete = models.PROTECT, null = True)
    created_time = models.DateTimeField('评论时间', auto_now_add = True)
    answer = models.ForeignKey(Answer, on_delete = models.PROTECT, related_name = 'comments', null = True)

    def __str__(self):
        return self.author.__str__() + ' 在回答”' + self.answer.__str__() + '”下的评论'

    class Meta():
        verbose_name_plural = 'CommentsOfAnswers'

#问题状态，是否可编辑和是否可添加回答，目前没有计划增加别的字段
class QuestionStatus(models.Model):
    able_modify = models.BooleanField('可编辑', default = True)
    able_answer = models.BooleanField('可添加回答', default = True)
    question = models.OneToOneField(Question, on_delete = models.PROTECT, related_name = 'status')

    def __str__(self):
        return '问题”' + self.question.__str__() + '”的状态'

    class Meta():
        verbose_name_plural = 'QuestionsStatus'