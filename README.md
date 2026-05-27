# DIREITRIZ - Comunidade

Branch do Vitor para a parte de comunidade do projeto DIREITRIZ.

## Status

A funcionalidade de ranking da comunidade está terminada nesta branch.

## O que foi feito

- Separação entre backend e frontend.
- Backend em Python servindo a API do ranking.
- Frontend em React com HTML/CSS.
- Tela principal limpa para outras partes do projeto.
- Menu lateral com acesso à comunidade.
- Ranking da comunidade centralizado, com avatares, XP, dias de ofensiva e barras de progresso verdes.
- Comportamento de navegação ajustado:
  - clicar em comunidade abre o ranking;
  - clicar novamente em comunidade mantém o ranking aberto;
  - clicar em outro ícone fecha o ranking.

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
