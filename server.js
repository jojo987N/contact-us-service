var express = require('express')

var server = express()

// console.log(123344)

i = 0
setInterval(() => {
    console.log(i)
    i+=1
}, 1000)

server.get("/", (req, res) => {

    res.send('GII')
    // alert('Hi')

})

server.get("/fetch", async (req, res) => {

    // res.send('GII1');
    // alert('Hi')
    // res.setHeader('Content-Type', 'text/xml');
    response = await fetch('https://actucameroun.com/rss');
    // response = await fetch('../feed1.txt');
    textResponse = await response.text();
    // console.log(textResponse)
    res.send(textResponse)
    
    

})

server.listen(3000)