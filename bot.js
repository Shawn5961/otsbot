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

//Set Regex to find link
let youtubeRegex = new RegExp('(https?:\/\/[^\s]+)');

client.on('message', function(message) {
    //Ignore bot messages
    if(message.author.bot) return;

    //Check if user has 'One Take Saturday' role
    if (message.member.roles.cache.some(role => role.name === 'One Take Saturday')){
        
        //console.log(message.content);
        let messageSplit = message.content.split(new RegExp(' |\n'));
        //console.log(youtubeRegex.test(messageSplit));
        //console.log(messageSplit.length);

        //Iterate through words in message
        messageSplit.forEach(parseMessage);

        //Pass word at index
        function parseMessage(url, index){
            //Check if YouTube Regex is true
            if (youtubeRegex.test(url)){

                //Get info on video
                youtubedl.getInfo(url, function(err, info) {
                    if (err) throw err

                    //Sanitize filename
                    //Replace whitespace with _, replace # with %23 to allow proper URL encoding
                    let filename = info.title.replace(/ /g, '_');
                    filename = filename.replace(/#/g, '%23');

                    //Set variable for URL to filename
                    let link = 'http://www.meascheese.com/ots/' + filename + '.mp3';

                    //Execute youtube-dl on specified URL
                    //Extracts audio as mp3, sets output destination as video title (sanitized)
                    youtubedl.exec(url, ['-x', '--audio-format', 'mp3', '-o', '/var/www/meascheese.com/shawn/public_html/ots/'+ info.title.replace(/ /g, '_') +'.%(ext)s'.replace(/ /g, '_')], {}, function(err, output){
                        if (err) throw err;
                        console.log(output.join(''))
                    })

                    //Post links to channel
                    message.channel.send('Audio file available at: ' + link);
                })
            }
        }
    }
});