import { Configuration, OpenAIApi } from "openai";
import {process} from './env'


const openAiApiKey = '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'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

delete configuration.baseOptions.headers['User-Agent'];

const openai = new OpenAIApi(configuration)


const OPEN_AI_ENDPOINT='https://api.openai.com/v1/chat/completions'



const chatbotConversation = document.getElementById('chatbot-conversation')

const conversationArr = [
    {
        role:'system',
        content:'You are a highly knowledgable assistant that is always ready to help'
    }
]

document.addEventListener('submit', (e) => {
    e.preventDefault()
    const userInput = document.getElementById('user-input')

    //Pushing the user input to the conversation array
    conversationArr.push({
        role: 'user',
        content: userInput.value
    })
    console.log(conversationArr);
    fetchReply();
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech','speech-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value
    userInput.value = ''
    chatbotConversation.scrollTop  = chatbotConversation.scrollHeight
})

function renderReply(text){
    const replySpeechBubble = document.createElement('div')
    replySpeechBubble.classList.add('speech','speech-ai')
    chatbotConversation.appendChild(replySpeechBubble)
    replySpeechBubble.textContent = text   
}

async function fetchReply(){
  try{
    const response  = await openai.createChatCompletion({
      model:'gpt-3.5-turbo',
      messages: conversationArr
    })

  console.log(response.data.choices[0].message.content);
  const reply = response.data.choices[0].message.content
  renderReply(reply)

  }catch(e){
    console.log(e);
  } 
}

