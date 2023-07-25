var express = require('express')
var parseString = require('xml2js').parseString;
// import { Pool, Client } from 'pg'
const { Pool, Client } = require("pg");
// var $ = require( "jquery" );

const jsdom = require('jsdom');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window );

// const { DOMParser } = require('xmldom');

// const xpath = require('xpath');


const http = require('http');

 



const dotenv = require("dotenv")
dotenv.config()

var server = express()
// server.listen(3000)


console.log('ttest');

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

        // const promises = res.rows.map(row => fetch(row.journal));
        // return
        responses = []
        promises = []
        images = []

        options = { timeout : 5000 };
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), options.timeout);

        // for (const row of res.rows) 
        for (let i = 0; i < res.rows.length; i++){
                console.log(res.rows[i].journal+"feed")
                try{
                    // promises.push(fetch(row.journal+"feed"
                    response = fetch(res.rows[i].journal+"feed"
                    // , {
                    //     ...options,
                    //     signal: controller.signal,
                    // }
                    )
                    // )
                    .then((response)=> response.text())
                    .then(textResponse => {

                        parseString(textResponse, function (err, result) {
                        // if(result)
                        // console.log(result.rss.channel[0].item)


                        try{
                        j=0
                        while( j < result.rss.channel[0].item.length){



                            // try{
                            //     fetch(result.rss.channel[0].item[j].link[0])
                            //     .then(res1 => res1.text())
                            //     .then(res2 => {
                            //         // const dom = new JSDOM(res2);
                            //         const virtualConsole = new jsdom.VirtualConsole();
                            //         virtualConsole.on("error", () => {
                            //             // No-op to skip console errors.
                            //         });
                            //         const dom = new JSDOM(res2, { virtualConsole });                
                            //         images.push(dom.window.document.querySelector('meta[property="og:image"]').content)
                    
                            //     })
                            //     .catch((err)=> err )
                    
                            // }catch(err){ return err}




                            responses.push({
                                // ...Object.values(...result.rss.channel[0].item)
                            title: result.rss.channel[0].item[j].title[0],
                            creator: result.rss.channel[0].item[j]["dc:creator"],
                            pubDate: result.rss.channel[0].item[j].pubDate,
                            description: result.rss.channel[0].item[j].description,
                            link: new URL(result.rss.channel[0].link[0]).hostname.replace('www.','')
                            })
                            j++;
                        }


                        }catch(error){console.log(error)}
                    });

                        return responses

                    } )
                    .then(responses => {
                        console.log(responses)
                        // if(i === res.rows.length - 1){
                        //     console.log(responses)

                        //     console.log('================')

                        //     console.log(images)
                        // }
            
                        return 1
                    })
                    .catch((err)=> console.log(err) )

                    // clearTimeout(id);


                }catch (error) {
                console.log(error)
                }
        
        }

        // result = await Promise.allSettled(promises)
        // for (const r of result.filter(r => r.status === 'fulfilled')) {
        //     const textResponse = await r.value.text();

        //     console.log(textResponse)
            
        //     // handle data
        //     // ...
        // }



        // .then(result=> console.log(result))
        // .then(result=> result.filter(r => r.status === 'fulfilled'))
        // return

        // Promise.all(promises)
        // .catch((err)=> console.log(err) )
        // .then((response)=> response.text())
        // .then(textResponse => {

        //     parseString(textResponse, function (err, result) {
        //     // if(result)
        //     try{
        //     responses.push({
        //     title: result.rss.channel[0].item[0].title[0],
        //     creator: result.rss.channel[0].item[0]["dc:creator"],
        //     pubDate: result.rss.channel[0].item[0].pubDate
        //     })
        //     }catch(error){console.log(error)}
        // });

        //     return responses

        // } )
        // .then(responses => console.log(responses))
        // .catch((err)=> console.log(err) )

        // setTimeout(() => {
        //     console.log("+++++++++++++++++++++++++++++++++")
        //     console.log(responses)
        //     console.log("*********************************")
        //     console.log(images)
        // }, 10000)

    }catch (error) {
        return error
    }

};


const server1 = http.createServer((req, res) => {
    // res.end("hello world")
    console.log(req.url)
    switch(req.url){
        case "/":
            res.end("Home")
        break;
        case "/api2c":
            console.log('f1');
            res.end("hello api2")
        break;

    }
})

server.get("/api", (req, res) => {

    f();
    // res.send(new Date("Thu, 20 Jul 2023 22:15:05 +0000") > new Date("Wed, 19 Jul 2023 12:23:15 +0000"))
    // alert('Hi')

})

server.get("/test", (req, res) => {
   console.log('test');
    res.send("test")
    // res.send(new Date("Thu, 20 Jul 2023 22:15:05 +0000") > new Date("Wed, 19 Jul 2023 12:23:15 +0000"))
    // alert('Hi')

})


server.get("/", (req, res) => {
     console.log("bonjour");
    // res.send(new Date("Thu, 20 Jul 2023 22:15:05 +0000") > new Date("Wed, 19 Jul 2023 12:23:15 +0000"))
    // alert('Hi')

})

server.get("/fetch", async (req, res) => {

    response = await fetch('https://ecomatin.net/feed');
    textResponse = await response.text();
    

    parseString(textResponse, function (err, result) {

        // console.log(result.rss.channel[0].item[0].link[0])

        console.log(new URL(result.rss.channel[0].link[0]).hostname.replace('www.',''))
        try{
            fetch(result.rss.channel[0].item[0].link[0])
            .then(res1 => res1.text())
            .then(res2 => {
                // console.log(res2)
                // const dom = new JSDOM(res2);
                // const document = new DOMParser().parseFromString(res2, 'text/html');

                const virtualConsole = new jsdom.VirtualConsole();
                virtualConsole.on("error", () => {
                    // No-op to skip console errors.
                });
                const dom = new JSDOM(res2, { virtualConsole });
                // dom.window.document.querySelectorAll("img").forEach(el => {
                //     console.log(el.src)
                // });
                // console.log($(res2).find('img').attr("src"));

                // var xpath = "//*[text()='a']";
                // var matchingElement = dom.window.document.evaluate(xpath, dom.window.document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                // nodeFromDocument = xpath.select("//*[text()='Saudi and Cameroonian defense ministers hold bilateral talks']", dom.window.document)
                // nodeFromDocument = xpath.select("//meta[@property='og:image']", dom.window.document)
                // console.log(nodeFromDocument)

                console.log(dom.window.document.querySelector('meta[property="og:image"]').content)

                // console.log($('meta[property="og:image"]', res2))
                // console.log($( `*:contains(${result.rss.channel[0].item[0].title[0]})`, res2)[0].text())
                // var text = document.querySelector('div[SomeText*]').innerTEXT;
            })

        }catch(err){ console.log(err)}

        res.send({
            link: result.rss.channel[0].item[0].link[0],
            title: result.rss.channel[0].item[0].title[0],
            creator: result.rss.channel[0].item[0]["dc:creator"],
            pubDate: result.rss.channel[0].item[0].pubDate,
            description: result.rss.channel[0].item[0].description
        })
    });
    
    

})

// server.listen(4000)
 server1.listen(3000, () => console.log("Server is running"))