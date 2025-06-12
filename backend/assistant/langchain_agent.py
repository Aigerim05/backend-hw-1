# backend/assistant/langchain_agent.py
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
import os

def ask_langchain_agent(message: str) -> str:
    chat = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), model_name="gpt-4")
    response = chat([HumanMessage(content=message)])
    return response.content
