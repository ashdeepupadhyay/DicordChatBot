const mongoose =require('mongoose');
const dotenv = require("dotenv").config();
const env = dotenv.parsed.NODE_ENV || "development";
const config = require("./../config.json")[env];

mongoose.connect(config.mongoLabUrl,{useNewUrlParser:true,useFindAndModify: false,useUnifiedTopology: true
},(err)=>{
    if(!err){
        console.log('MongoDB Connection Succeeded');
    }else{
        console.log('Error in DB connection :'+err); 
    }
});

// require('./botUserSearchModel');

// const { MongoClient } = require("mongodb");

// // Replace the uri string with your MongoDB deployment's connection string.
// const uri =config.mongoLabUrl;

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();

//     const database = client.db('sample_mflix');
//     const collection = database.collection('movies');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await collection.findOne(query);

//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
require('./botUserSearchModel');
