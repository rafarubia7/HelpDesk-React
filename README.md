# Central de chamados de TI

Aplicação React para abertura e acompanhamento de chamados de suporte, com dados persistidos pelo JSON Server.

## Requisitos

- Node.js e npm

## Instalação

```bash
npm install
```

## Executar

Abra dois terminais na pasta do projeto. No primeiro, inicie a API:

```bash
npm run server
```

No segundo, inicie a aplicação:

```bash
npm run dev
```

A interface estará disponível em `http://localhost:5173` e a API em `http://localhost:3000/chamados`.

## Verificações

```bash
npm run lint
npm run build
```

O banco inicial de exemplo fica em `db.json`.