require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

console.log('Iniciando servidor...');
console.log('API Key configurada:', process.env.GEMINI_API_KEY ? 'Sim' : 'Não');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/generate-quiz', async (req, res) => {
  console.log('=== NOVA REQUISIÇÃO ===');
  try {
    const { category, previousQuestionsTexts } = req.body;
    console.log('Categoria recebida:', category);
    console.log('Perguntas anteriores:', previousQuestionsTexts?.length || 0);
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Você é um assistente que gera quizzes para a categoria "${category}".
Evite repetir perguntas similares às seguintes, que o usuário já respondeu recentemente:
${previousQuestionsTexts.join("\n")}

Gere 10 perguntas, cada uma com 4 alternativas e uma explicação didática para o usuário.

**Instruções Adicionais:**
- Certifique-se de que as 4 alternativas para cada pergunta tenham um tamanho (número de palavras/caracteres) e complexidade semelhantes, para que a resposta correta não se destaque visualmente.
- A explicação deve ser clara, concisa e realmente didática, aprofundando o entendimento do usuário sobre o tema da pergunta.

Formato de saída: JSON array com perguntas, opções, resposta correta e explicação, por exemplo:

[
  {
    "question": "Pergunta 1?",
    "options": ["A", "B", "C", "D"],
    "answer": "B",
    "explanation": "Explicação didática..."
  }
]`;

    console.log('Enviando prompt para Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Resposta recebida (primeiros 200 chars):', text.substring(0, 200));

    // Limpar a resposta para extrair apenas o JSON
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }
    
    console.log('Texto limpo (primeiros 200 chars):', cleanText.substring(0, 200));
    
    const parsedResponse = JSON.parse(cleanText);
    console.log('JSON parseado com sucesso! Número de perguntas:', parsedResponse.length);
    
    res.json(parsedResponse);
  } catch (error) {
    console.error('ERRO DETALHADO:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Erro ao gerar quiz', 
      details: error.message,
      stack: error.stack 
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});


