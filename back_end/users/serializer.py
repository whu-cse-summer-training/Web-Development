from rest_framework import serializers
from rest_framework.utils import html, model_meta, representation
from users.models import User, Profile
from content.serializer import AnswerSerializer, QuestionSerializer

class SimpleInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname', 'avatar')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('gender', 'birthday', 'school', 'major', 'condition')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'nickname', 'profile', 'editable')
        read_only_field = ('username')
    
    profile = ProfileSerializer()
    editable = serializers.BooleanField(default = False, read_only = True)

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

class MylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname', 'avatar', 'content')

    content = AnswerSerializer(many = True, source = 'mylist')

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname', 'avatar', 'content')

    content = AnswerSerializer(many = True, source = 'history')

class MyQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname', 'avatar', 'content')

    content = QuestionSerializer(many = True, source = 'my_questions')

class MyAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname', 'avatar', 'content')

    content = AnswerSerializer(many = True, source = 'my_answers')