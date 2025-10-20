from django.urls import path
from .views import PostListCreateAPIView, PostRetrieveAPIView, CommentListCreateAPIView, ReactionCreateUpdateAPIView
from .views import PostDeleteView
urlpatterns = [
    path('posts/', PostListCreateAPIView.as_view(), name='post-list'),
    path('posts/<int:id>/', PostRetrieveAPIView.as_view(), name='post-detail'),
    path('posts/<int:post_id>/comments/', CommentListCreateAPIView.as_view(), name='post_comments'),
    path('posts/<int:post_id>/react/', ReactionCreateUpdateAPIView.as_view(), name='post-reaction'),
    path('posts/delete/<int:pk>/', PostDeleteView.as_view(), name='delete_post'),

]
