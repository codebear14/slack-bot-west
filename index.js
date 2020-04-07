const SlackBot = require('slackbots')
const axios = require('axios')

const bot = new SlackBot({
    token: 'SLACK TOKEN',
    name: 'westbot'
})

//Sound's part
let city = 'Kakinada'
const appID = '4653df8884b25794d1c3cd7acc8cd38a'

bot.on('start', () => {
    const params = {
        icon_emoji: ':alien:'
    }

    bot.postMessageToChannel(
        'general', 
        'Hey, I\'m Online.', 
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
    else if(message.includes(' yomama')){
        yomomma()
    }
    else if(message.includes(' joke')){
        randomjoke()
    }

    else if(message.includes(' weather')){
        getWeather(city)
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
//Tell a Yo momma Joke
function yomomma(){
    axios.get('https://api.yomomma.info/')
    .then(res => {
        //console.log(res.data.joke)
        const joke = res.data.joke
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

function getWeather(city){    
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appID}`)
        .then(res => {
            //console.log(res.data)
            const data = res.data
            const currentTemp = data.main.temp - 273.15
            const feelsLike = data.main.feels_like - 273.15
            const name = data.name
            const country = data.sys.country

            const params = {
                icon_emoji: ':alien:'
            }
        
            bot.postMessageToChannel(
                'general', 
                `> ${name}, ${country}: Current Temperature is ${currentTemp} and feels like ${Math.ceil(feelsLike)}`, 
                params 
            )
            
        })
}
//Generating Random Jokes 
function randomjoke(){
    const rand = Math.floor(Math.random() * Math.floor(3))
    //console.log(rand)
    if(rand == 0){
        chuckjoke()
    }
    else if(rand == 1){
        icanhazdadjoke()
    }
    else if(rand == 2){
        yomomma()
    }
}

