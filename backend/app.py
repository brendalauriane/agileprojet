from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os

app = FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

tickets = []

class Ticket(BaseModel):
    title: str
    description: str

@app.get("/tickets")
def get_tickets():
    return tickets

@app.post("/tickets")
def create_ticket(ticket: Ticket):
    new_ticket = {
        "id": len(tickets) + 1,
        "title": ticket.title,
        "description": ticket.description,
        "status": "todo"
    }
    tickets.append(new_ticket)
    return new_ticket

@app.put("/tickets/{id}")
def update_ticket(id: int, data: dict):
    for t in tickets:
        if t["id"] == id:
            t.update(data)
    return {"message": "updated"}

@app.delete("/tickets/{id}")
def delete_ticket(id: int):
    global tickets
    tickets = [t for t in tickets if t["id"] != id]
    return {"message": "deleted"}

@app.post("/ai/analyze")
def analyze(ticket: Ticket):

    prompt = f"""
    Tu es un expert Agile senior.

    Analyse ce ticket :
    {ticket.title} - {ticket.description}

    Donne :
    - 3 critères d’acceptation
    - Story points (1,2,3,5,8,13)
    - Priorité (faible, moyenne, haute)
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return {"analysis": response.choices[0].message.content}