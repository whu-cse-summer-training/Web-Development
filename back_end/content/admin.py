from django.contrib import admin
from .models import Tag, Question, Answer, CommentOfQuestion, CommentOfAnswer, QuestionStatus

# Register your models here.

admin.site.register(Tag)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(CommentOfQuestion)
admin.site.register(CommentOfAnswer)
admin.site.register(QuestionStatus)