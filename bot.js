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
    let youtubeRegex = new RegExp('(https://youtu\.).*\w+')
    if(message.author.bot) return;

    console.log(message.content);
    let messageSplit = message.content.split(' ')
    console.log(youtubeRegex.test(messageSplit));

    console.log(messageSplit.length);
    messageSplit.forEach(consoleLog);

    function consoleLog(word, index){
        if (youtubeRegex.test(word)){
            let youtubeLink = word;
            message.channel.send('Word # ' + index + 'is a youtube link');

            const {exec} = require('child_process');
            exec('youtube-dl - f best -x --audio-format mp3 ' + word, (err, stdout, stderr) => {
                if (err){
                    console.error(err);
                } else {
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                }
                
                });
            }

        }
    }

    if (message.member.roles.cache.some(role => role.name === 'Admin')){
        // send back "Pong." to the channel the message was sent in
        message.channel.send('is admin');
    }
});