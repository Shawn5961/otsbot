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
    let messageSplit = message.content.split(new RegExp(' |\n'));
    console.log(youtubeRegex.test(messageSplit));

    console.log(messageSplit.length);
    messageSplit.forEach(consoleLog);

    function consoleLog(word, index){
        console.log(word);
        if (youtubeRegex.test(word)){

            youtubedl.getInfo(word, function(err, info) {
                if (err) throw err

                let filename = info.title.replace(/ /g, '_');
                filename = filename.title.replace(/#/g, '%23');
                let link = 'http://www.meascheese.com/ots/' + filename + '.mp3';

                youtubedl.exec(word, ['-x', '--audio-format', 'mp3', '-o', '/var/www/meascheese.com/shawn/public_html/ots/'+ info.title.replace(/ /g, '_') +'.%(ext)s'.replace(/ /g, '_')], {}, function(err, output){
                    if (err) throw err;
                    console.log(output.join(''))
                })

                message.channel.send('Audio file available at: ' + link);
            })

        }
    }

    if (message.member.roles.cache.some(role => role.name === 'Admin')){
        // send back "Pong." to the channel the message was sent in
        message.channel.send('is admin');
    }
});

Smooth_Reggae_R&B_Backing_Track_in_C#_Minor.mp3
Smooth_Reggae_R&B_Backing_Track_in_C#_Minor.mp3