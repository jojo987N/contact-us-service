var express = require('express')
var parseString = require('xml2js').parseString;
// import { Pool, Client } from 'pg'
const { Pool, Client } = require("pg")

const dotenv = require("dotenv")
dotenv.config()

var server = express()

const f = async() => {
    try{
    const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: true
  });


    await client.connect();
    const res = await client.query('SELECT * FROM news')
    console.log(res.rows)
    }catch (error) {
        console.log(error)
    }
};

f();


// console.log(123344)

// i = 0
// setInterval(() => {
//     console.log(i)
//     i+=1
// }, 1000)

server.get("/", (req, res) => {

    res.send(new Date("Thu, 20 Jul 2023 22:15:05 +0000") > new Date("Wed, 19 Jul 2023 12:23:15 +0000"))
    // alert('Hi')

})

server.get("/fetch", async (req, res) => {

    // response = await fetch('https://actucameroun.com/rss');
    // textResponse = await response.text();

    // parseString(textResponse, function (err, result) {
    //     res.send({
    //         title: result.rss.channel[0].item[0].title[0],
    //         creator: result.rss.channel[0].item[0]["dc:creator"],
    //         pubDate: result.rss.channel[0].item[0].pubDate
    //     })
    // });
    
    

})

server.listen(3000)