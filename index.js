const SlackBot = require('slackbots')
const axios = require('axios')

const bot = new SlackBot({
    token: 'xoxb-883833217717-885722925607-2nxHIbDkgCsVBreTWo7qtjMP',
    name: 'westbot'
})

//Sound's part

bot.on('start', () => {
    const params = {
        icon_emoji: ':alien:'
    }

    bot.postMessageToChannel(
        'general', 
        '*Hey, I\'m Online!!*', 
        params 
    )
})


// Error Handler

bot.on('error', (err) => console.log(err));

// Message Handler

bot.on('message', (data) => {
    if(data.type !== 'message'){
        return
    }

    handleMessage(data.text)
})

function handleMessage(message){
    if(message.includes(' chucknorris')){
        chuckjoke()
    }
    else if(message.includes(' icanjoke')){
        icanhazdadjoke()
    }
    else if(message.includes(' joke')){
        randomjoke()
    }
}

//Tell a Chuck Norris Joke
function chuckjoke(){
    axios.get('http://api.icndb.com/jokes/random')
    .then(res => {
        const joke = res.data.value.joke
        //sending the joke to slack
        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel(
            'general', 
            `${joke}`, 
            params 
        )
    })
}

//Tell a I can haz dad Joke
function icanhazdadjoke(){
    axios.get('https://icanhazdadjoke.com/slack')
    .then(res => {
        //console.log(res.data.attachments[0].text)
        const joke = res.data.attachments[0].text
        //sending the joke to slack
        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel(
            'general', 
            `${joke}`, 
            params 
        )
    })
}

//Generating Random Jokes 
function randomjoke(){
    const rand = Math.floor(Math.random() * Math.floor(2))
    //console.log(rand)
    if(rand == 0){
        chuckjoke()
    }
    else if(rand == 1){
        icanhazdadjoke()
    }
}

