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

// const storage = require('node-persist');

// storage.setItem('name','yourname')
 


const dotenv = require("dotenv")
dotenv.config()

var server = express()
// server.listen(3000)


console.log('ttest');
if(typeof t === undefined)
var t;
if(!t)
t = 1


t+=1
console.log(t)



const f = async(ress) => {
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

        // ress.send({salut: "bonjour"});
        // return ;

        // const promises = res.rows.map(row => fetch(row.journal));
        // return
        responses = []
        promises = []
        images = []

        // options = { timeout : 5000 };
        // const controller = new AbortController();
        // const id = setTimeout(() => controller.abort(), options.timeout);

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
                        // while( j < result.rss.channel[0].item.length){

                        while( j === 0){



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
                            title: result.rss.channel[0].item[j].title[0],
                            creator: result.rss.channel[0].item[j]["dc:creator"],
                            pubDate: result.rss.channel[0].item[j].pubDate,
                            description: result.rss.channel[0].item[j].description,
                            link: new URL(result.rss.channel[0].link[0]).hostname.replace('www.',''),
                            id: generateUID(),
                            })
                            j++;
                        }


                        }catch(error){return error}
                    });

                        return responses

                    } )
                    .then(responses => {
                        // console.log(responses)
                        // if(i === res.rows.length - 1){

                            // console.log("LEEEEEEENNNNNNNGGGTHHH", responses.length)
                            if(responses.length >= 10 && responses.length < 15){
                            ress.send(responses)

                            // console.log('================')

                            // console.log(images)
                        }
            
                        return 1
                    })
                    .catch((err)=> err )

                    // clearTimeout(id);


                }catch (error) {
                return error
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
            f();
            res.end("hello api2")
        break;

    }
})

server.get("/api", (req, res) => {

    f(res);
    // res.send(new Date("Thu, 20 Jul 2023 22:15:05 +0000") > new Date("Wed, 19 Jul 2023 12:23:15 +0000"))
    // alert('Hi')

})


const f1 = async () => {
    // setData(data => null)

    responses = [];
    responsesT = [];
    responsesTrace = []
    let promises = [];
    let promises1 = [];
    images = []
    // var d = new Date();
    categories = []
    // d.setDate(d.getDate() - 3);
    // console.log(d)
    // return 
    // response = await fetch('https://6129-45-154-138-154.ngrok-free.app/api')
    // fetch('https://6129-45-154-138-154.ngrok-free.app/api-one')
    for (const value of feeds) {

        promises.push(fetch(value.feed)
            .then(response => response.text())
            .then(textResponse => {
                // console.log(textResponse)
                parseString(textResponse, async function (err, result) {

                    j = 0;
                    try {
                        while (j < result.rss.channel[0].item.length) {
                            // if(!result){
                            //     console.log(textResponse.substring(0,80));
                            // }

                            try {
                                // category = result.rss.channel[0].item[j].category

                                // if(category.every(v => !v.toLowerCase().includes('politiq') && 
                                // !v.toLowerCase().includes('afri')))
                                // categories.push(category[0])
                                // category.forEach(c => categories.push(c))


                                // category.forEach(c => categories.push({
                                //     category: c,
                                //     link: result.rss.channel[0].item[j].link[0],



                                // }));


                                // categories.push({
                                //     category,
                                //     link: result.rss.channel[0].item[j].link[0],
                                // })
                                // console.log('in');
                                // (async () => {
                                // await null;
                                // reccurences = categories.map(v => ({...v, category: v.category.toLowerCase()})).reduce((a,v, i) => {
                                //     if(!a[v.category])
                                //         a[v.category] = {
                                //             nb: 0,
                                //             link: []
                                //         }
                                //     a[v.category] = {
                                //         nb: a[v.category].nb + 1,
                                //         link: [...new Set([...a[v.category].link, v.link.replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, '')])]
                                //     }
                                //     return a;
                                // }, {})

                                // setCategories(Object.entries(reccurences).filter(v => v[1].link.length >=3).sort((a, b) => b[1].link.length - a[1].link.length))


                                // })();
                                //   setCategories(categories)

                                // console.log(categories)


                                // console.log(result.rss.channel[0].item[j].category.some(v => v.toLowerCase().includes('politiq')), result.rss.channel[0].item[j].category)
                                // console.log(result.rss.channel[0].link[0].replace(/(https:\/\/)|(www.)|(\/$)|(\/.+)/g, ''))
                                responses.push({
                                    title: result.rss.channel[0].item[j].title[0],
                                    creator: result.rss.channel[0].item[j]["dc:creator"],
                                    pubDate: result.rss.channel[0].item[j].pubDate,
                                    description: result.rss.channel[0].item[j].description,
                                    // domain: result.rss.channel[0].link[0].replace(/(https?:\/\/)|(www.)|(\/$)|(\/.+)/g, ''),
                                    domain: result.rss.channel[0].link[0].replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, ''),
                                    id: generateUID(),
                                    link: result.rss.channel[0].item[j].link[0],
                                    category: result.rss.channel[0].item[j].category

                                    // image: res2.match(/<meta property="og:image" content=[^>]+>/)[0].match(/content="[^"]+"/)[0].replace('content="', '').replace('"', ''),
                                });
                                // console.log('LLLLLLLLLLLLLLLL', result.rss.channel[0].item[j].link[0])
                                linkSource = result.rss.channel[0].item[j].link[0];

                                promises1.push(fetch(linkSource)
                                    .then(res1 => res1.text())
                                    .then(res2 => {
                                        try {
                                            image = res2.match(/<meta property="og:image" content=[^>]+>/)[0].match(/content="[^"]+"/)[0].replace('content="', '').replace('"', '');
                                            link = res2.match(/<meta property="og:url" content=[^>]+>/)[0].match(/content="[^"]+"/)[0].replace('content="', '').replace('"', '');
                                            // contain = res2.match(/<p[^>]*>(.*?)<\/p>/g).some(v => v.includes('politiq'))
                                            // console.log(res2.match(/<p[^>]*>(.*?)<\/p>/g).some(v => v.includes('politiq')), link)
                                            // console.log(link)
                                            // if(link.includes('zouzoua'))
                                            // console.log(res2.match(/<p[^>]*>(.*?)<\/p>/g), link)
                                            // if(link === 'https://panoramapapers.com/cameroun-detention-abusive-la-sante-damadou-vamoulke-continue-de-se-degrader/')
                                            // console.log(res2.match(/<p[^>]*>(.*?)<\/p>/), link)
                                            // console.log(link)
                                            // console.log('======IMAGE', image)

                                            // console.log('=======URL', link)



                                            // setData([...data, responses.filter(res => res.link.includes(link)).map(res => ({...res, image}))[0]])
                                            // console.log(responses.filter(res => res.link.includes(link)).map(res => ({...res, image}))[0])
                                            // setData(data => [...data, responses.filter(res => res.link.includes(link)).map(res => ({...res, image}))[0]])

                                            // if (responses.filter(res => res.link.includes(link)).map(res => ({...res, image}))[0] === undefined)
                                            // console.log('LIIIIK PPPPBBBBB', link, image, responses)
                                            // responsesT.push(responses.filter(res => res.link.includes(link)).map(res => ({...res, image}))[0])

                                            // ---- Condition Date et autres
                                            // responsesT.push(responses.filter(res => res.link.includes(link) && (new Date(res.pubDate) > d) && contain).map(res => ({...res, image}))[0])

                                            // Condition Date
                                            // responsesT.push(responses.filter(res => res.link.includes(link) && (new Date(res.pubDate) > d)).map(res => ({...res, image}))[0])


                                            // article = responses.filter(res => res.link.includes(link) && (new Date(res.pubDate) > d)).map(res => ({ ...res, image }))[0]

                                            article = responses.filter(res => res.link.includes(link)).map(res => ({ ...res, image, html: res2 }))[0]


                                            article.category.forEach(c => categories.push({
                                                category: c,
                                                link: article.link,
                                                title: article.title,
                                                inTitle: article.title.toLowerCase().includes(c.toLowerCase())
                                            }))
                                            // responsesT.push(article)
                                            // if(responsesT.length === 2){
                                            //     responsesT.filter(v => v.domain === article.domain).forEach(v =>{
                                            //     console.log(v)
                                            //     console.log('========================')
                                            // })
                                            // }

                                            if (responsesT.filter(v => v.domain === article.domain).length < 3) {
                                                if ((new Date(article.pubDate) > d))
                                                    responsesT.push(article)
                                                // setData(responsesT.filter(v => v))
                                            }

                                            // ---- Sans Condition
                                            // responsesT.push(responses.filter(res => res.link.includes(link)).map(res => ({...res, image}))[0])

                                            // ramdomize(responsesT)

                                            // console.log(responsesT.length)

                                            responsesTrace.push(article)
                                            // console.log(responses.length, responsesTrace.length)

                                            // if (responsesTrace.length === 100) {
                                                if (responsesTrace.length === 100) {

                                                // setData(responsesTrace.filter(v => v))
                                                console.log(focus.some(v => v))
                                                // console.log(focus.filter(v => v)[0].text)
                                                // if (focus.some(v => v) && new Date() - time < 200000) {
                                                if (focus.some(v => v)) {
                                                    let data = responsesTrace.filter(v => v).filter(val => val.category.some(v => v.toLowerCase().includes(focus.filter(v => v)[0].text)) && new Date(val.pubDate) > d)
                                                    // ramdomize(data)
                                                    // setData(data.filter((v, i) => i < 20))
                                                    // setRefreshing(false)

                                                } else {
                                                    // ramdomize(responsesT)
                                                    // setData(responsesT)
                                                    // setData(responsesT.filter((v, i) => i < 20))
                                                    // setLoading(false)


                                                    // responsesTrace.forEach(v => {
                                                    //     v.category.forEach(c => categories.push({
                                                    //         category: c,
                                                    //         link: v.link
                                                    //     }))
                                                    // })


                                                    // reccurences = categories.map(v => ({ ...v, category: v.category.toLowerCase() })).reduce((a, v, i) => {
                                                    //     if (!a[v.category])
                                                    //         a[v.category] = {
                                                    //             nb: 0,
                                                    //             link: []
                                                    //         }
                                                    //     a[v.category] = {
                                                    //         nb: a[v.category].nb + 1,
                                                    //         link: [...new Set([...a[v.category].link, v.link.replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, '')])]
                                                    //     }
                                                    //     return a;
                                                    // }, {})

                                                    // Beta
                                                    reccurences = categories.map(v => ({ ...v, category: v.category.toLowerCase() })).reduce((a, v, i, arr) => {
                                                        let keyword = (keyword1(v.category, arr) || v).category
                                                        if (!a[keyword])
                                                            // a[keyword] = 0
                                                            a[keyword] = {
                                                                nb: 0,
                                                                link: [],
                                                                nbInTitle: 0
                                                            }
                                                        // a[keyword] = a[keyword] + 1

                                                        // if(i < 2)
                                                        // console.log(keyword, v.category)

                                                        a[keyword] = {
                                                            nb: a[keyword].nb + 1,
                                                            link: [...new Set([...a[keyword].link, v.link.replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, '')])],
                                                            nbInTitle: v.inTitle ? a[keyword].nbInTitle + 1 : a[keyword].nbInTitle
                                                        }

                                                        return a;
                                                    }, {})

                                                    // Object.entries(reccurences).filter(v => v[1].link.length >= 3).sort((a, b) => b[1].link.length - a[1].link.length)
                                                    // .forEach(v => {
                                                    //     console.log(v)
                                                    // })

                                                    // setFocus(focus => focus.map(v => 0))
                                                    // setCategories(Object.entries(reccurences).filter(v => v[1].link.length >= 3).sort((a, b) => b[1].link.length - a[1].link.length))
                                                    // setRefreshing(false)
                                                }
                                            }

                                            // setReccurence(reccurences)

                                            // setStoreInfos(responsesTrace)

                                            // // setStoreCategories(Object.entries(reccurences))
                                            // setStoreCategories(categories)


                                            // if (responsesTrace.length === 100) {
                                            //     reccurences = categories.map(v => ({ ...v, category: v.category.toLowerCase() })).reduce((a, v, i) => {
                                            //         if (!a[v.category])
                                            //             a[v.category] = {
                                            //                 nb: 0,
                                            //                 link: []
                                            //             }
                                            //         a[v.category] = {
                                            //             nb: a[v.category].nb + 1,
                                            //             link: [...new Set([...a[v.category].link, v.link.replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, '')])]
                                            //         }
                                            //         return a;
                                            //     }, {})
                                            //     console.log(reccurences)
                                            //     // setCategories(Object.entries(reccurences).filter(v => v[1].link.length >= 3).sort((a, b) => b[1].link.length - a[1].link.length))

                                            // }

                                            // if(responsesT.length === 100){
                                            //     ramdomize(responsesT)
                                            //     setData(responsesT.filter(v => v).filter((v, i) => i<20))
                                            //     // console.log(categories)

                                            // }


                                            // ramdomize(responsesT)
                                            // setData(responsesT.filter(v => v).filter((v, i) => i<20))
                                            // console.log(categories)




                                            // console.log(responsesT)
                                            // ----- Condition Politique
                                            // responsesT.push(responses.filter(res => res.link.includes(link) && (new Date(res.pubDate) > d)).map(res => ({...res, image}))[0])

                                            // responsesT = responsesT.filter(v => v);



                                            // if(responsesT.length === 10){
                                            // console.log(responsesT)
                                            // console.log(responsesT.filter(v => new Date(v.pubDate) > new Date("2023-07-27")))
                                            // console.log(responsesT.every(v => new Date(v.pubDate) > new Date("2023-07-26")))
                                            // setData(responsesT)
                                            // }

                                            // console.log({
                                            //     title: result.rss.channel[0].item[j].title[0],
                                            //     creator: result.rss.channel[0].item[j]["dc:creator"],
                                            //     pubDate: result.rss.channel[0].item[j].pubDate,
                                            //     description: result.rss.channel[0].item[j].description,
                                            //     link: result.rss.channel[0].link[j].replace(/(https:\/\/)|(www.)|(\/$)|(\/.+)/g, ''),
                                            //     id: generateUID(),
                                            //     image: res2.match(/<meta property="og:image" content=[^>]+>/)[0].match(/content="[^"]+"/)[0].replace('content="', '').replace('"', ''),
                                            // })

                                            // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")


                                        } catch (err) { return err }

                                    })
                                    .catch(err => err)
                                )
                            } catch (err) {
                                // console.log(result.rss.channel[0].link)
                                return err
                            }

                            j++
                        }
                        // console.log('=============================================================',)
                        // console.log(responses.length, j)
                        // console.log('=============================================================')
                    } catch (err) { return err }
                })

                // responses = responses.filter(res => new Date(res.pubDate) > d ).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))

                // responses = [responses[0], responses[1]]

                // responses = responses.filter(res => (new Date(res.pubDate) > d) )
                // ramdomize(responses)



            })
            .catch(err => err)
        )

    }

    // await Promise.all(promises).then(async () => {
    //     await Promise.all(promises1).then(() => {

    //         console.log('nice');
    //     // category.some(v => v.toLowerCase().includes('politiq'))
    //     // let data = responsesT.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
    //     let data = responsesT;

    //     console.log(data)

    //     // Random
    //     for (i = data.length -1; i > 0; i--) {
    //         j = Math.floor(Math.random() * i)
    //         k = data[i]
    //         data[i] = data[j]
    //         data[j] = k
    //         }

    //     //   console.log(data)
    //     //  console.log(data.filter(v => v).filter(val => val.category.some(v => v.toLowerCase().includes('politiq'))))
    //     //  setData(data.filter(v => v).filter(val => val.category.some(v => {
    //     //     return [
    //     //         // 'politiq',
    //     //         'media'
    //     //         // 'afriq',

    //     // ].some(s => v.toLowerCase().includes(s))
    //     //  }

    //     //  )))

    //     //  console.log([...new Set(categories)])
    //     // console.log(categories)
    //         setData(data.filter(v => v))


    //     })



    //     })


};


server.get("/api-one", (req, res)=> {

    // res.send("api-one")

    response = fetch('https://ecomatin.net/feed')
    .then(response => response.text())
    .then(textResponse => {
        parseString(textResponse, function (err, result) {

            // console.log(result.rss.channel[0].item[0].link[0])
             try{
                    fetch(result.rss.channel[0].item[0].link[0])
                    .then(res1 => res1.text())
                    .then(res2 => {
                        // const dom = new JSDOM(res2);
                        const virtualConsole = new jsdom.VirtualConsole();
                        virtualConsole.on("error", () => {
                            // No-op to skip console errors.
                        });
                        const dom = new JSDOM(res2, { virtualConsole });                
                        // console.log(dom.window.document.querySelector('meta[property="og:image"]').content)

                        res.send({
                            title: result.rss.channel[0].item[0].title[0],
                            creator: result.rss.channel[0].item[0]["dc:creator"],
                            pubDate: result.rss.channel[0].item[0].pubDate,
                            description: result.rss.channel[0].item[0].description,
                            link: new URL(result.rss.channel[0].link[0]).hostname.replace('www.',''),
                            id: generateUID(),
                            image: dom.window.document.querySelector('meta[property="og:image"]').content,
                        })
        
                    })
                    .catch((err)=> err )
                    
                }catch(err){ return err}


            console.log(new URL(result.rss.channel[0].link[0]).hostname.replace('www.',''))
    
            // res.send({
            //     title: result.rss.channel[0].item[0].title[0],
            //                     creator: result.rss.channel[0].item[0]["dc:creator"],
            //                     pubDate: result.rss.channel[0].item[0].pubDate,
            //                     description: result.rss.channel[0].item[0].description,
            //                     link: new URL(result.rss.channel[0].link[0]).hostname.replace('www.',''),
            //                     id: generateUID(),
            //                     image: image,
            // })
        });
    })

})

server.get("/test", (req, res) => {
   console.log(generateUID());
    res.send("test")
    // res.send(new Date("Thu, 20 Jul 2023 22:15:05 +0000") > new Date("Wed, 19 Jul 2023 12:23:15 +0000"))
    // alert('Hi')

})

server.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
     // res.send(new Date("Thu, 20 Jul 2023 22:15:05 +0000") > new Date("Wed, 19 Jul 2023 12:23:15 +0000"))
     // alert('Hi')
 
 })

// server.get("/ct", (req, res) => {
//     console.log("bonjour");
//     // res.sendFile('./index.html');
//    // res.send(new Date("Thu, 20 Jul 2023 22:15:05 +0000") > new Date("Wed, 19 Jul 2023 12:23:15 +0000"))
//    // alert('Hi')

// })

function generateUID() {
    var firstPart = (Math.random() * 46656) | 0;
     var secondPart = (Math.random() * 46656) | 0;
     firstPart = ("000" + firstPart.toString(36)).slice(-3);
     secondPart = ("000" + secondPart.toString(36)).slice(-3);
     return firstPart + secondPart;
   }
   


// server.get("/", (req, res) => {
//      console.log("bonjour");
//     // res.send(new Date("Thu, 20 Jul 2023 22:15:05 +0000") > new Date("Wed, 19 Jul 2023 12:23:15 +0000"))
//     // alert('Hi')

// })

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

server.listen(3000)
//  server1.listen(3000, () => console.log("Server is running"))