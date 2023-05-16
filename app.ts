const http = require('http');
const fs = require('fs');
const qs = require('qs');

let userInfo = []

let server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./form.html', "utf-8", (err, data) => {
            if (err) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                return res.end('404 NOT Found');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        })
    } else {
        let dataToServer: string = '';
        req.on('data', (chunk) => {
            dataToServer += chunk;
        });
        req.on('end', () => {
            userInfo.push(qs.parse(dataToServer));
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(`${userInfo[0].name}, ${userInfo[0].mail}, ${userInfo[0].phone}, ${userInfo[0].address}`);
            return res.end();
        })
        req.on("error", () => {
            return res.end('error');
        })
    }
});
server.listen(8080, 'localhost', () => {
    console.log('sever is running http://localhost:8080/')
})