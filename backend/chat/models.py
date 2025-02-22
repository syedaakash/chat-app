from django.db import models


class Message(models.Model):
    username = models.CharField(max_length=255)  # User who sent the message
    text = models.TextField()  # Message content
    timestamp = models.DateTimeField(auto_now_add=True)  # Time message was sent

    def __str__(self):
        return f"{self.username}: {self.text[:30]}..."
