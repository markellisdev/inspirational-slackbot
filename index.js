const Slackbot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config()

const bot = new Slackbot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'inspire-bot'
})

bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }

    bot.postMessageToChannel(
        'inspirational-messages',
        'Get inspired while working with @inspirationalquotes',
        params
    );
    // post message to individual user
    // bot.postMessageToUser(
    //     'ellisfirst',
    //     'This is a message from your friendly inspirational bot. Be well!',
    //     params
    // );
})

// Error Handling
bot.on('error', (err) => {
    console.log(err);
})

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

// Response Handler
let handleMessage = message => {
    if(message.includes('inspire me')) {
        inspireMe()
    } else if(message.includes('help')) {
        runHelp()
    }
}


let inspireMe = () => {
    axios.get('https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json')
        .then(res => {
            const quotes = res.data;
            const random = Math.floor(Math.random() * quotes.length);
            const quote = quotes[random].quote
            const author = quotes[random].author

            const params = {
                icon_emoji: ':male-technologist:'
            }
            
            bot.postMessageToChannel(
                'inspirational-messages',
                `:zap: ${quote} - *${author}*`,
                params
            )
        })
        
}

function runHelp() {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel(
        'random',
        `Type *@inspirenuggets* with *inspire me* to get an inspiring techie quote, *random joke* to get a Chuck Norris random joke and *help* to get this instruction again`,
        params
    );
}

