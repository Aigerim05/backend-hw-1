import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def ask_openai_agent(message: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Ты — OpenAI агент."},
            {"role": "user", "content": message}
        ]
    )
    return response.choices[0].message["content"]
