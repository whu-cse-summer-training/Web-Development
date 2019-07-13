from django.db import models

# Create your models here.

class Tag(models.Model):
    name = models.CharField('Tag名称', max_length = 50)

    def __str__(self):
        return self.name

class Question(models.Model):
    caption = models.CharField('问题标题', max_length = 100)
    description = models.TextField('问题详细描述')
    author = models.ForeignKey('users.User', on_delete = models.PROTECT)
    modified_time = models.DateTimeField('最后编辑时间', auto_now = True)
    tag = models.ManyToManyField(Tag, blank = True)

    def __str__(self):
        return self.caption

class Answer(models.Model):
    content = models.TextField('回答正文')
    author = models.ForeignKey('users.User', on_delete = models.PROTECT)
    question = models.ForeignKey(Question, on_delete = models.PROTECT)
    modified_time = models.DateTimeField('最后编辑时间', auto_now = True)
    good = models.IntegerField('*好*', default = 0)
    bad = models.IntegerField('*不*', default = 0)

    def __str__(self):
        return self.author.__str__() + ' 在问题”' + self.question.__str__() + '”下的回答'

class CommentOfQuestion(models.Model):
    content = models.TextField('评论内容',)
    author = models.ForeignKey('users.User', on_delete = models.PROTECT)
    created_time = models.DateTimeField('评论时间', auto_now_add = True)
    question = models.ForeignKey(Question, on_delete = models.PROTECT)

    def __str__(self):
        return self.author.__str__() + ' 在问题“' + self.question.__str__() + '”下的评论'

    class Meta():
        verbose_name_plural = 'CommentsOfQuestions'

class CommentOfAnswer(models.Model):
    content = models.TextField('评论内容')
    author = models.ForeignKey('users.User', on_delete = models.PROTECT)
    created_time = models.DateTimeField('评论时间', auto_now_add = True)
    answer = models.ForeignKey(Answer, on_delete = models.PROTECT)

    def __str__(self):
        return self.author.__str__() + ' 在回答”' + self.answer.__str__() + '”下的评论'

    class Meta():
        verbose_name_plural = 'CommentsOfAnswers'

class QuestionStatus(models.Model):
    able_modify = models.BooleanField('可编辑', default = True)
    able_answer = models.BooleanField('可添加回答', default = True)
    question = models.OneToOneField(Question, on_delete = models.PROTECT)

    def __str__(self):
        return '问题”' + self.question.__str__() + '”的状态'

    class Meta():
        verbose_name_plural = 'QuestionsStatus'