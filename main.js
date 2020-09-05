require('./models/db');

const discord=require("discord.js");
const request = require('request');
const mongoose =require('mongoose');

const botUserSearch = mongoose.model('BotUserSearch');
const client= new discord.Client();
const prefixGoogle="!google";
const prefixRecent= "!recent";

client.once('ready',()=>{
    console.log("First Dicord Bot is online");
});

client.on('message',async message=>{
    if(message.author.bot){
        return;
    }
    else if(message.content.startsWith(prefixGoogle)){//if it starts with !google
        var args = message.content.slice(prefixGoogle.length);
        console.log(args);
        var command=args.trim();
        console.log(command);
        var authorName=message.author.toString();
       
        let data =await botUserSearch.findOne({userName: authorName});
        console.log("data",data);

        if(data){//if author is found then just update the search array
            console.log("update");
            let data =await botUserSearch.update({userName:authorName},{$push:{search:command
            }})
            console.log("***",data)
        }
        else{
            //if no author is found then insert the user with the search array
            console.log("insert")
            var botuser = new botUserSearch();
            botuser.userName=authorName;
            botuser.search.push(command);
            botuser.save();
            console.log("after insert")
        }

        var newCustomSearchAPIKey="AIzaSyDTwcNrRD-iDxQUrKo7b4rkNFSxeC4DChU"
        var baseURL="https://www.googleapis.com/customsearch/v1?key="
        var baseURLCX="&cx=";
        var searchEngineId="7142410b0498d4c10";
        var query="&q="+command;
        var search=baseURL+newCustomSearchAPIKey+baseURLCX+searchEngineId+query;
        console.log("search "+search);
        
        request(search, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(body.url);
            
            console.log(body.items)
            if(body.items)
            {
                console.log(body.items.length);
                var searchItems=body.items;
                for(var i=0;i<body.items.length;i++)
                {
                    message.channel.send( body.items[i].link);
                    if(i==4)
                    break;
                }
            }
          });

    }
    else if(message.content.startsWith(prefixRecent)){//if it starts with !recent
        var args = message.content.slice(prefixGoogle.length);
        console.log(args);
        var command=args.trim();
        console.log(command);
        var authorName=message.author.toString();

        let data =await botUserSearch.findOne({userName: authorName});
        console.log("data in recent",data);
        if(data){//if data found for user
            var da =[];
            //iterate over all element
            data.search.forEach(element => {
                if(element.includes(command)){//if keyword is in search 
                    da.push(element);
                }
            });
            //if no element with the keyword
            if(da.length==0){
                message.channel.send("BOT: Oops!! NO Search with this keyword for you")
            }
            da.reverse();//reversing so the latest element can be found
            //loop for sending the elements to the dicord
            da.forEach(element=>{
                message.channel.send( element);
            });
        }
        else //if no data found for this user
        {
            message.channel.send("BOT: Oops!! NO Search with this keyword for you");  
        }
    }
    else if(message.content==='hi'){
        message.channel.send("hey");
    }
});

client.login("NzUwMzMwMTg0OTAwODA0NzI5.X049cA.t8dFcSwUI-e6QpJ2vFrcNO3LX44");