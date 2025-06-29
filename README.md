# Backend Finans

Este é o backend do projeto Finans, desenvolvido em Node.js com Express e integração com a API do Google Gemini para geração de quizzes financeiros.

## Funcionalidades

- API REST para geração de quizzes personalizados
- Integração com Google Gemini AI
- CORS habilitado para comunicação com frontend
- Suporte a diferentes categorias de perguntas

## Tecnologias Utilizadas

- Node.js
- Express.js
- Google Generative AI
- CORS
- dotenv

## Configuração Local

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Edite o arquivo `.env` e adicione sua API Key do Google Gemini:
```
GEMINI_API_KEY=sua_api_key_aqui
```

4. Execute o servidor:
```bash
npm start
```

## Deploy no Render

### Pré-requisitos

1. Conta no Render (render.com)
2. API Key do Google Gemini
3. Repositório Git com o código

### Passos para Deploy

1. **Faça push do código para um repositório Git** (GitHub, GitLab, etc.)

2. **No Render:**
   - Acesse render.com e faça login
   - Clique em "New +" e selecione "Web Service"
   - Conecte seu repositório Git
   - Configure as seguintes opções:
     - **Name**: finans-backend (ou nome de sua escolha)
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Root Directory**: deixe vazio se o backend está na raiz, ou coloque `backend` se está em subpasta

3. **Configure as Variáveis de Ambiente:**
   - Na seção "Environment Variables", adicione:
     - `GEMINI_API_KEY`: sua chave da API do Google Gemini

4. **Deploy:**
   - Clique em "Create Web Service"
   - Aguarde o build e deploy automático

### Após o Deploy

- Seu backend estará disponível em uma URL como: `https://finans-backend.onrender.com`
- Anote esta URL para configurar no seu frontend
- O Render fará redeploy automático a cada push no repositório

### Configuração no Frontend

No seu frontend hospedado no Netlify, atualize as chamadas da API para usar a URL do Render:

```javascript
// Substitua localhost pela URL do Render
const API_URL = 'https://finans-backend.onrender.com';

// Exemplo de chamada
fetch(`${API_URL}/generate-quiz`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})
```

## Endpoints da API

### POST /generate-quiz

Gera um quiz personalizado baseado na categoria fornecida.

**Body:**
```json
{
  "category": "Investimentos",
  "previousQuestionsTexts": ["pergunta1", "pergunta2"]
}
```

**Response:**
```json
[
  {
    "question": "Qual é a principal vantagem dos investimentos em renda fixa?",
    "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
    "answer": "A",
    "explanation": "Explicação detalhada..."
  }
]
```

## Troubleshooting

### Problemas Comuns

1. **Erro 500 - API Key não configurada**
   - Verifique se a variável `GEMINI_API_KEY` está configurada no Render

2. **CORS Error**
   - O CORS já está configurado para aceitar todas as origens

3. **Deploy falha**
   - Verifique se o `package.json` tem o script "start"
   - Confirme se todas as dependências estão no `package.json`

### Logs

Para ver os logs no Render:
1. Acesse seu serviço no dashboard do Render
2. Vá na aba "Logs" para ver os logs em tempo real

## Suporte

Para dúvidas ou problemas, verifique:
1. Logs do Render
2. Configuração das variáveis de ambiente
3. Status da API do Google Gemini

