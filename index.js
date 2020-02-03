const express = require('express')
const path = require('path')
const fs = require("fs");
const http = require("http")
const app = express()
const PORT = process.env.PORT || 5000

http.createServer((req, res) => {
    let filePath = req.url
    if (filePath == "/"){
        filePath = "/index.html"
    }

    filePath = __dirname + filePath

    let fileExtension = path.extname(filePath)
    let contentType = 'text/html'

    switch (fileExtension){
        case ".css":
            contentType = 'text/css'
            break
        case ".js":
            contentType = 'text/javascript'
            break
        case ".html":
            contentType = 'text/html'
        default:
            contentType = "text/html"
    }

    fs.readFile(filePath, { encoding: 'UTF-8'}, (err, content) => {
        if (!err){
            res.writeHead(200, { "Content-Type": contentType})
            res.write(content)
            res.end()
        } else {
            res.writeHead(404, { "Content-Type": "text/html" })
            res.write("File Error")
            res.end()
        }
    })
}).listen(PORT)

/*
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => res.render('index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
*/