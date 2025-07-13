from django.db import models
from django.contrib.auth.models import User
class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="post")
    content = models.TextField()
    video = models.FileField(upload_to='videos/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.author.username} - {self.created_at}"
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comment")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner")
    content = models.TextField()
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        if self.parent:
            return f"{self.author.username} to comment {self.parent.id}"
        return f"comment by {self.author.username} to comment {self.post.id}"
    def is_reply(self):
        return self.parent is not None

class Reaction(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="reactions")
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    is_like = models.BooleanField()
    class Meta:
        unique_together = ('post', 'author')