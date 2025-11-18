const http = require('http')

const server = http.createServer((req, res) => {
    res.write('Weclome to our home page')
    res.end()
})

server.listen(3000)