const http = require('http')

let server = http.createServer((req, res) => {
    let categoria = req.url

    if (categoria == '/tecnologia') {
        res.end('<h1>Setor de tecnologia</h1>')

    } else if (categoria == '/financeiro') {
        res.end('<h1>Setor de finanças</h1>')

    } else {
        res.end('<h1>Teste</h1>')
    }
})

server.listen(3000)