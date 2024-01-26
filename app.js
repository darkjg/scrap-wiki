const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const url = "https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap";
const url2 = "https://es.wikipedia.org";

app.get("/", async (req, res) => {
    let enlaces = [];
    try {
        axios.get(url).then(async (response) => {
            if (response.status == 200) {
                const html = response.data;
                const $ = cheerio.load(html)
                $('#mw-pages a').each((index, element) => {
                    let enlace = $(element).attr("href")
                    let enlace2 = url2 + enlace;
                    enlaces.push((enlace2));
                })
                const datosCompletos = []

                for (const link of enlaces) {

                    let data = {
                        imagenes: [],
                        pes: []
                    }

                    const respuesta = await axios.get(link)
                    const html = respuesta.data
                    const $ = cheerio.load(html)

                    data.titulo = $('title').text()

                    $("img").each((index, element) => {
                        const src = $(element).attr("src")
                        data.imagenes.push(src)
                    })

                    $("p").each((index, element) => {
                        const parf = $(element).text()
                        data.pes.push(parf)
                    })
                    datosCompletos.push(data)
                    console.log(data)
                    console.log(datosCompletos.length)

                }

                res.send(`
                <ul>
                  ${datosCompletos.map(dato => `<li><h2>${dato.titulo}</h2>
                  imagenes: ${dato.imagenes.map(img => `<p>${img}</p>`).join('')} 
                  párrafos: ${dato.pes.map(pes => `<p>${pes}</p>`).join('')} 
                  </li>`).join('')}
                </ul>
               `
                )
            }






        })

    } catch {

    }

})
app.listen(3001, () => {
    console.log("Esta escuchando en http://127.0.0.1:3001")
})

