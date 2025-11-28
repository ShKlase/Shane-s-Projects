import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['POST', 'GET'],
    credentials: true
  }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
})

app.post('/correct', async (req, res) => {
    const userInput = req.body.inputs;
    console.log("Received input:", userInput);
  
    
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a grammar correction assistant. Fix grammar, spelling, and clarity in the user's text."
            },
            {
              role: "user",
              content: userInput
            }
          ],
          temperature: 0.2
        })
      });
  
      const text = await response.text();
      console.log("Raw HF response:", text);
  
      if (!response.ok) {
        return res.status(response.status).json({ error: text });
      }
  
      const data = JSON.parse(text);
      res.json(data);
    
  });