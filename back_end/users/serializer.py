from rest_framework import serializers
from users.models import User

class SimpleInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'nickname', 'avatar')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'nickname', 'avatar', 'gender', 'birthday', 'school', 'major', 'condition', 'editable')

    gender = serializers.IntegerField(source = 'profile.gender')
    birthday = serializers.DateField(source = 'profile.birthday')
    school = serializers.CharField(source = 'profile.school')
    major = serializers.CharField(source = 'profile.major')
    condition = serializers.IntegerField(source = 'profile.condition')
    editable = serializers.BooleanField(default = False)