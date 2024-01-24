const axios = require("axios");
const cheerio = require("cheerio");
const e = require("express");
const express = require("express");
const app = express();
const url = "https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap";
const url2 = "https://es.wikipedia.org/wiki";

app.get("/",  (req, res) => {
    let enlaces = [];
    axios.get(url).then((response) => {
        if (response.status == 200) {
            const html = response.data;
            const $ = cheerio.load(html)
            $('#mw-pages a').each((index, element) => {
                let enlace = $(element).attr("href")
                let enlace2 = url2 + enlace;

                enlaces.push(encodeURIComponent(enlace2));
            })
           axios.all(enlaces.map((endpoint) => axios.get(endpoint))).then((data) =>{ if (response.status == 200){console.log(data)}})
        }
        
    })
    
  
    
})
    app.listen(3001, () => {
        console.log("Esta escuchando en http://127.0.0.1:3001")
    })

/*
             let dato = new Object();
                                dato = {
                                    titulo: "",
                                    pes: "",
                                    img: ""
                                }
                                if (res.status == 200) {
                                    const html2 = res.data;
                                    const che = cheerio.load(html2)
            
                                    let pageTitle = che("title").text()
                                    dato.titulo = pageTitle;
            
                                    che("p").each((index, element) => {
                                        const pe = che(element)
                                        dato.pes = pe
                                    })
                                    che("img").each((index, element) => {
                                        const img = che(element).attr("src")
                                        dato.img = img;
                                    })
                                    console.log(dato)
                                }*/
                        