from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context = self.context)
        return serializer.data
class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    replies = RecursiveField(many=True, read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'created_at', 'parent', 'replies']
        read_only_fields = ['author', 'created_at']
class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    reactions_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id',
            'content',            
            'video',
            'created_at',
            'author',
            'comments',
            'reactions_count'
        ]

    def get_reactions_count(self, obj):
        return {
            "likes": obj.reactions.filter(is_like=True).count(),
            "dislikes": obj.reactions.filter(is_like=False).count()
        }

class ReactionSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model=Reaction
        fields=['id', 'post', 'author', 'is_like']
        read_only_fields= ['author']