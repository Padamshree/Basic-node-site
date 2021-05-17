const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    let url = new URL(`https://localhost:8000/${req.url}`);
    let filename = url.pathname.slice(2);
    if (filename === '') {
        filename = 'index.html';
    }
    fs.stat(filename, (err, stats) => {
        if (err) {
            fs.readFile("404.html", (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data)
                return res.end();
            });
        } else {
            fs.readFile(filename, (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        }
    });
}).listen(8080);