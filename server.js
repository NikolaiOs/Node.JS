const http = require('http');
const fs = require('fs');
const path = require('path');
const io = require('socket.io');

const app = http.createServer((request, response) => {
    const isFile = (path) => fs.lstatSync(path).isFile();
    const fullPath = path.join(process.cwd(), request.url);

    if (!fs.existsSync(fullPath)) return response.end('File or directory not found');
    if (isFile(fullPath)) {
        return fs.createReadStream(fullPath).pipe(response);
    }
    let links = "";
    fs.readdirSync(fullPath).forEach(fileName => {
        const filePath = path.join(request.url, fileName);
        links += `<li><a href="${filePath}">${fileName}</a></li>`;
    });
    const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('#links', links);
    response.writeHead(200, {'Content-Type': 'text/html'})
    return response.end(HTML)

    if (request.method === 'GET') {
        const filePath = path.join(__dirname, 'index.html');
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(response);
    } else if (request.method === 'POST') {
        let data = '';
        request.on('data', chunk => {
            data += chunk;
        });
        request.on('end', () => {
            const parsedData = JSON.parse(data);
            console.log(parsedData);
            response.writeHead(200, { 'Content-Type': 'json'});
            response.end(data);
        });
    } else {
        response.statusCode = 405;
        response.end();
    }
});

const socket = io(app);

socket.on('connection', function (socket) {
    console.log('New connection');
    socket.on('CLIENT_MSG', (data) => {
        socket.broadcast.emit('SERVER_MSG', { msg: data.msg.split('').reverse().join('')});
    });

    socket.on('disconnect', function() {
        console.log('User disconnect')
    });
});

app.listen(3000, 'localhost');