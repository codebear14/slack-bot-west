const SlackBot = require('slackbots')
const axios = require('axios')

const bot = new SlackBot({
    token: 'xoxb-883833217717-885722925607-2nxHIbDkgCsVBreTWo7qtjMP',
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

    if(message.includes(' weather')){
        getWeather(city)
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