var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
const client = new Discord.Client();
client.login(auth.token);

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', function(message) {
    let youtubeRegex = '(https://youtu\.).*\w+'
    if(message.author.bot) return;

    console.log(message.content);
    let messageSplit = message.content.split(' ')
    if(messageSplit.includes(youtubeRegex)){
        message.channel.send('that\'s youtube');
    }

    if (message.member.roles.cache.some(role => role.name === 'Admin')){
        // send back "Pong." to the channel the message was sent in
        message.channel.send('is admin');
    }
});