from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import IntegrityError
from .models import Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password1 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password1']

    def validate(self, data):
        if data['password'] != data['password1']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('password1')
        try:
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data.get('email'),
                password=validated_data['password']
            )
        except IntegrityError:
            raise serializers.ValidationError({"username": "This username is already taken."})
        return user

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Profile
        fields = ['username', 'email', 'bio', 'image', 'website']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username  
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username  
        return data
