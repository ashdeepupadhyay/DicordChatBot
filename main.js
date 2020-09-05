require('./models/db');

const discord=require("discord.js");

const mongoose =require('mongoose');

const botUserSearch = mongoose.model('BotUserSearch');
const client= new discord.Client();
const prefixGoogle="!google";
const prefixRecent= "!recent";

client.once('ready',()=>{
    console.log("First Dicord Bot is online");
});

client.on('message',message=>{
    if(message.author.bot){
        return;
    }
    else if(message.content.startsWith(prefixGoogle)){
        var args = message.content.slice(prefixGoogle.length);
        console.log(args);
        var command=args.trim();
        console.log(command);
    }
    else if(message.content.startsWith(prefixRecent)){
        var args = message.content.slice(prefixGoogle.length);
        console.log(args);
        var command=args.trim();
        console.log(command);
    }
    else if(message.content==='hi'){
        message.channel.send("hey");
    }
});

client.login("NzUwMzMwMTg0OTAwODA0NzI5.X049cA.t8dFcSwUI-e6QpJ2vFrcNO3LX44");