const mongoose =require('mongoose');
const dotenv = require("dotenv").config();
const env = dotenv.parsed.NODE_ENV || "development";
const config = require("./../config.json")[env];

mongoose.connect(config.mongoDbURL,{useNewUrlParser:true,useFindAndModify: false,useUnifiedTopology: true
},(err)=>{
    if(!err){
        console.log('MongoDB Connection Succeeded');
    }else{
        console.log('Error in DB connection :'+err); 
    }
});

require('./botUserSearchModel');

