const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;
const path = require('path');


const genAI = new GoogleGenerativeAI("AIzaSyD1EeqgPuVr19WOCvFwTKSPRzrJ-CteoeU");
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const analyzeText = async (req, res) => {
  try {
    // Read the uploaded file
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const fileContent = await fs.readFile(filePath, 'utf8');

    // Start a new chat
    const chat = model.startChat({ history: [] });

    // Send the message to the AI model
    const result = await chat.sendMessage(` summraize this context : ${fileContent}`);
    console.log(result.response.text());

    res.json({ summary: result.response.text() });
    

  }
  catch (error) {
    console.error('Error analyzing text:', error);
    res.status(500).json({ error: 'Error analyzing text' });
  }
};

module.exports = {
  analyzeText,
};
