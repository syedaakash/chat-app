import json

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from .models import Message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = "general"
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        last_messages = await self.get_last_messages()
        for message in last_messages:
            await self.send(text_data=json.dumps({
                "username": message.username,
                "message": message.text,
            }))

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data['message']
        username = data.get('username', 'Anonymous')

        await self.save_message(username, message)

        # Broadcast message to room
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "username": username,
                "message": message,
            }
        )

    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "username": event["username"],
            "message": event["message"]
        }))

    @sync_to_async(thread_sensitive=True)
    def save_message(self, username, message):
        Message.objects.create(username=username, text=message)

    @sync_to_async
    def get_last_messages(self):
        return list(Message.objects.order_by("-timestamp")[:10][::-1])
