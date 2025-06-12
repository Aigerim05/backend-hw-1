# backend/assistant/a2a_router.py
from fastapi import APIRouter
from pydantic import BaseModel
from assistant.openai_agent import ask_openai_agent
from assistant.langchain_agent import ask_langchain_agent

router = APIRouter()

class AssistantRequest(BaseModel):
    message: str

@router.post("/assistant")
def cooperative_agents(request: AssistantRequest):
    # Первый агент отвечает
    openai_reply = ask_openai_agent(request.message)
    
    # Второй агент использует ответ первого
    combined_message = f"Первый агент сказал: {openai_reply}. Что ты думаешь об этом?"
    langchain_reply = ask_langchain_agent(combined_message)

    return {
        "openai_agent": openai_reply,
        "langchain_agent": langchain_reply
    }
