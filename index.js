//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

const { Configuration, OpenAIApi } = require("openai");
const express = require ('express')
const bodyParser =require('body-parser')
const cors = require('cors')


const configuration = new Configuration({
    organization: "org-4GdvRv3EsLPj9Gsrg1OQ1qzJ",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
  

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080;

app.post('/',async(req,res)=>{

    const {message} = req.body;
    console.log(message,"message");

     const response = await openai.createCompletion({
         model: "text-davinci-003",
         prompt: `${message}`,
         max_tokens: 100,
         temperature: 0.5,
       });
    
      res.json({
        message:response.data.choices[0].text,
      })
})


app.listen(port,()=>{
     console.log(`Listening on port ${port}`);
})

