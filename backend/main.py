from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── BANCO DE DADOS DE QUESTÕES (CIÊNCIA POLÍTICA) ──
questions_cp = [
    {
        "id": 1, "title": "QUESTÃO 1", "status": "pending",
        "text": "Quais são os três elementos fundamentais que constituem o Estado moderno?",
        "options": {
            "A": "Território, Povo e Soberania.",
            "B": "Governo, Exército e Leis.",
            "C": "Nação, Cultura e Religião.",
            "D": "Poder Legislativo, Executivo e Judiciário."
        },
        "correct": "A"
    },
    {
        "id": 2, "title": "QUESTÃO 2", "status": "pending",
        "text": "No sistema Parlamentarista, como se divide a chefia do Poder Executivo?",
        "options": {
            "A": "O Presidente detém todo o poder de forma monocrática.",
            "B": "Há uma divisão entre Chefia de Estado (Presidente/Monarca) e Chefia de Governo (Primeiro-Ministro).",
            "C": "O Poder Judiciário assume as funções executivas em caso de crise.",
            "D": "Não há divisão, pois o Primeiro-Ministro é eleito diretamente pelo povo."
        },
        "correct": "B"
    },
    {
        "id": 3, "title": "QUESTÃO 3", "status": "pending",
        "text": "Quem é o autor da obra 'O Espírito das Leis' (1748), que consolidou a teoria da separação dos poderes?",
        "options": {
            "A": "Thomas Hobbes.",
            "B": "John Locke.",
            "C": "Barão de Montesquieu.",
            "D": "Jean-Jacques Rousseau."
        },
        "correct": "C"
    },
    {
        "id": 4, "title": "QUESTÃO 4", "status": "pending",
        "text": "O conceito de 'Poliarquia', desenvolvido por Robert Dahl, caracteriza-se por:",
        "options": {
            "A": "Um regime de concentração total de poder em uma elite econômica.",
            "B": "Um sistema que combina alta participação política com altos níveis de competição eleitoral.",
            "C": "Uma forma de governo onde apenas os mais sábios (aristocratas) governam.",
            "D": "A ausência total de governo e instituições estatais."
        },
        "correct": "B"
    },
    {
        "id": 5, "title": "QUESTÃO 5", "status": "pending",
        "text": "Segundo a teoria aristotélica, qual é a forma degenerada (corrompida) da Monarquia?",
        "options": {
            "A": "Democracia.",
            "B": "Oligarquia.",
            "C": "Tirania.",
            "D": "Aristocracia."
        },
        "correct": "C"
    },
    {
        "id": 6, "title": "QUESTÃO 6", "status": "pending",
        "text": "O 'Estado de Natureza' como uma 'guerra de todos contra todos' é uma concepção atribuída a:",
        "options": {
            "A": "Thomas Hobbes.",
            "B": "Karl Marx.",
            "C": "Immanuel Kant.",
            "D": "Max Weber."
        },
        "correct": "A"
    },
    {
        "id": 7, "title": "QUESTÃO 7", "status": "pending",
        "text": "O sistema de 'Checks and Balances' (Freios e Contrapesos) serve primordialmente para:",
        "options": {
            "A": "Aumentar a arrecadação de impostos pelo Estado.",
            "B": "Garantir que nenhum dos três poderes se torne absoluto, mantendo a harmonia e limitação mútua.",
            "C": "Permitir que o Presidente dissolva o Congresso sempre que desejar.",
            "D": "Substituir a Constituição por decretos emergenciais."
        },
        "correct": "B"
    },
    {
        "id": 8, "title": "QUESTÃO 8", "status": "pending",
        "text": "Qual o principal marco teórico de Hans Kelsen para a Ciência Política e o Direito?",
        "options": {
            "A": "A teoria do contrato social.",
            "B": "A Teoria Pura do Direito e a hierarquia das normas (Pirâmide de Kelsen).",
            "C": "O conceito de mais-valia e luta de classes.",
            "D": "O estudo do carisma como forma de dominação legítima."
        },
        "correct": "B"
    },
    {
        "id": 9, "title": "QUESTÃO 9", "status": "pending",
        "text": "O que define um 'Estado Democrático de Direito'?",
        "options": {
            "A": "É um Estado onde a vontade da maioria prevalece sobre qualquer lei.",
            "B": "É o Estado submetido à Constituição e ao respeito irrestrito aos direitos fundamentais.",
            "C": "É um governo militar que busca a ordem social.",
            "D": "É um sistema onde as leis são criadas apenas pelo Poder Executivo."
        },
        "correct": "B"
    },
    {
        "id": 10, "title": "QUESTÃO 10", "status": "pending",
        "text": "A soberania, elemento essencial do Estado, significa que:",
        "options": {
            "A": "O Estado é dependente de outros países para tomar decisões.",
            "B": "O poder estatal é supremo na ordem interna e independente na ordem internacional.",
            "C": "O poder está dividido entre as empresas privadas e o governo.",
            "D": "As leis de um país não se aplicam aos estrangeiros em seu território."
        },
        "correct": "B"
    }
]

simulados_db = [
    { 
        "id": 1, "type": "Simulado Prova", "date": "13/03", 
        "subject": "Ciência Política", "questions": questions_cp 
    }
]

@app.get("/api/simulados")
def get_simulados():
    return simulados_db