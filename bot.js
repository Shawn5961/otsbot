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
    console.log(message.content);
    let messageSplit = message.content.substring(message.content.indexOf(" ") + 1, message.content.length);
    console.log(messageSplit[1]);

    if (message.member.roles.cache.some(role => role.name === 'Admin')){
        // send back "Pong." to the channel the message was sent in
        message.channel.send('is admin');
    }
});