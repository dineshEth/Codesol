import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
     apiKey: process.env.OPENAI_API_KEY,
});

const openai =  new OpenAIApi(configuration);

const app =  express();
app.use(cors());
app.use(express.json());


// get()    :::::::   recive add from fronted
app.get('/', async(req, res)=>{
     res.status(200).send({
          message: 'Hello from Codesol',
     })
});

// post()     :::::::    allow to receive body or payload from frontend
app.post('/', async(req, res)=>{
     try {
          const prompt = req.body.prompt;
          const response = await openai.createCompletion({
               model:"text-davinci-003",
               prompt:`${prompt}`,
               temperature:0, // rist
               max_tokens:3000,// long responses
               top_p:1, 
               frequency_penalty:0, // less likly to say similar things : no repetiton
               presence_penalty:0,
          });
          res.status(200).send({
               bot: response.data.choices[0].text
          });
     } catch (error) {
          console.log(error)
          res.status(500).send({ error })
     }
})

app.listen(5000, ()=> console.log("Server is listening on port http://localhost:5000"));