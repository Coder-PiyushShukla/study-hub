const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

if (!process.env.GEMINI_API_KEY) {
  console.error("CRITICAL ERROR: GEMINI_API_KEY is missing from .env file!");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are the SmartPortal AI Placement Mentor, an elite career coach for engineering students. 
Strict Rules:
1. Provide actionable, highly structured advice.
2. If reviewing a resume, be brutally honest but constructive.
3. NEVER hallucinate company data. Give generalized top-tier MNC advice if unsure.
4. Keep responses formatted clearly using bullet points and short paragraphs.
5. Do not write code for them unless explicitly asked for a specific algorithm approach.`;

router.post('/chat', upload.single('resume'), async (req, res) => {
  try {
    const { message, history } = req.body;
    let context = '';

    if (req.file && req.file.mimetype === 'application/pdf') {
      const pdfData = await pdf(req.file.buffer);
      context = `\n\nUSER'S RESUME TEXT FOR ANALYSIS:\n${pdfData.text}`;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const formattedHistory = history ? JSON.parse(history).map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    })) : [];

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: "System instructions: " + SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I am ready to mentor." }] },
        ...formattedHistory
      ]
    });

    const finalMessage = context ? `${message}${context}` : message;
    const result = await chat.sendMessage(finalMessage);
    const responseText = result.response.text();

    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("GEMINI AI ERROR:", error);
    res.status(500).json({ error: 'AI processing failed.', details: error.message });
  }
});

module.exports = router;