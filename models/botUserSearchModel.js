const mongoose =require('mongoose');

var botUserSearchSchema = new mongoose.Schema({
    userName :{
        type:"String",
        required : 'This field is required.'
    },
    search:{
        type:[
            "String"
        ]
    }
});

mongoose.model('BotUserSearch',botUserSearchSchema);