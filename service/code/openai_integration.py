from enum import Enum

import openai
from pydantic import BaseModel


class MessageRole(str, Enum):
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"


class Message(BaseModel):
    role: MessageRole
    content: str


def conversation(messages: [Message]) -> [Message]:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=list(map(lambda message: message.__dict__, messages)),
        temperature=0.8,
    )

    messages.append(Message(role=MessageRole.ASSISTANT, content=response["choices"][0]['message']['content']))
    return messages


def init_assistant() -> [Message]:
    system_message = Message(
        role=MessageRole.SYSTEM,
        content="""
Du bist ein Assistent, der bei der Vorbereitung auf Klassenarbeiten hilft.
Für Deine Antworten verwendest Du Markdown.
""")
    return conversation([system_message])
