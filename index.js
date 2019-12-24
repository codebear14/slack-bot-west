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
}

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
            `Chuck Norris: ${joke}`, 
            params 
        )
    })
}