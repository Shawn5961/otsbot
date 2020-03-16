var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
const fs = require('fs')
const youtubedl = require('youtube-dl')

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
    let youtubeRegex = new RegExp('(https?:\/\/[^\s]+)');
    if(message.author.bot) return;

    console.log(message.content);
    let messageSplit = message.content.split(' ')
    console.log(youtubeRegex.test(messageSplit));

    console.log(messageSplit.length);
    messageSplit.forEach(consoleLog);

    function consoleLog(word, index){
        console.log(word);
        if (youtubeRegex.test(word)){
            youtubedl.exec(word, ['-x', '--audio-format', 'mp3', '-o', '\"%(title)s.%(ext)s\"']);
            //const video = youtubedl(word, ['-x --audio-format mp3 -o \"%(title)s.%(ext)s\"']);
            message.channel.send('Word # ' + index + 'is a youtube link');
        }
    }

    if (message.member.roles.cache.some(role => role.name === 'Admin')){
        // send back "Pong." to the channel the message was sent in
        message.channel.send('is admin');
    }
});