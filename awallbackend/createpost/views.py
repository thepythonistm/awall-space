from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from .models import *
from .serializers import PostSerializer, CommentSerializer, ReactionSerializer
from django.shortcuts import get_object_or_404

class PostListCreateAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]


    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    Lookup_field = 'id'
class CommentListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    def get_queryset(self):
        post_id=self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id, parent__isnull=True).order_by('-created_at')
    def perform_create(self,serializer):
        post_id=self.kwargs['post_id']
        serializer.save(author=self.request.user,post_id=post_id)
class ReactionCreateUpdateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, post_id):
        post = get_object_or_404(post, id=post_id)
        is_like = request.data.get('is_like', True)
        reaction, created = Reaction.objects.update_or_create(
            post=post,
            author=request.user,
            defaults={'is_like' : is_like}
        )
        return Response(ReactionSerializer(reaction).data, status=status.HTTP_200_OK)

    

