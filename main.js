const Discord=require("discord.js");

const client= new Discord.Client();

const prefix="";

client.once('ready',()=>{
    console.log("First Dicord Bot is online");
});

client.on('message',message=>{
    if(!message.content.startsWith(prefix)||message.author.bot)
    return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command=args.shift().toLowerCase();
    if(command==='hi'){
            message.channel.send("hey");
        }
});

client.login("NzUwMzMwMTg0OTAwODA0NzI5.X049cA.t8dFcSwUI-e6QpJ2vFrcNO3LX44");