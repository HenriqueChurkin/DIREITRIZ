# DIREITRIZ - Comunidade

Branch do Vitor para a parte de comunidade do projeto DIREITRIZ.

## Status

A funcionalidade de ranking da comunidade está terminada nesta branch.

## Estrutura

```text
backend/
  app.py

frontend/
  index.html
  app.jsx
  styles.css
  assets/
```

## Como rodar

Em um terminal, iniciar o backend:

```powershell
python backend/app.py
```

Em outro terminal, iniciar o frontend:

```powershell
python -m http.server 3000 -d frontend
```

Abrir no navegador:

```text
http://127.0.0.1:3000
```

API do ranking:

```text
http://127.0.0.1:8000/api/community
```
