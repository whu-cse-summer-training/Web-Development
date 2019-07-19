from rest_framework import serializers
from rest_framework.utils import html, model_meta, representation
from users.models import User, Profile
from content.serializer import AnswerSerializer, QuestionSerializer

#简略用户信息，直接获取就行了
class SimpleInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname', 'avatar')

#用户profile，直接获取就行了
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('gender', 'birthday', 'school', 'major', 'condition')

#用户详细信息，包括直接在User中获取信息，再加上profile
#设置editable为false，视图函数会判断是否设为True
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('nickname', 'profile', 'editable')
        read_only_field = ('username')
    
    profile = ProfileSerializer()
    editable = serializers.BooleanField(default = False, read_only = True)

    #重载更新方法，ModelSerializer不能更新nested模型
    #先把profile的信息单独拿出来更新profile，然后修改一般的信息
    def update(self, instance, validated_data):
        info = model_meta.get_field_info(instance)
        profile = ProfileSerializer(instance.profile, data = validated_data['profile'])
        if profile.is_valid():
            profile.save()
        else:
            raise FError('fuck')
        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                m2m_fields.append((attr, value))
            elif attr != 'profile':
                setattr(instance, attr, value)
        instance.save()
        return instance

#收藏夹，直接获取User中的mylist
class MylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname', 'avatar', 'content')

    content = AnswerSerializer(many = True, source = 'mylist')

#历史记录，直接获取User中的history
class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname', 'avatar', 'content')

    content = AnswerSerializer(many = True, source = 'history')

#我的提问，直接获取User中的my_questions
class MyQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname', 'avatar', 'content')

    content = QuestionSerializer(many = True, source = 'my_questions')

#我的回答，直接获取User中的my_answers
class MyAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname', 'avatar', 'content')

    content = AnswerSerializer(many = True, source = 'my_answers')