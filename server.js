const cluster = require('cluster');
const os = require('os');
const http = require('http');
const fs = require('fs');
const path = require('path');
const io = require('socket.io');

// const numCPUs = os.cpus().length;
//
// if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running`);
//
//     for (let i = 0; i < numCPUs; i++) {
//         console.log(`Forking process number ${i}...`);
//         cluster.fork();
//     }
//
// } else {
//     console.log(`Worker ${process.pid} started...`);
//
//     const isFile = (path) => fs.lstatSync(path).isFile();
//
//     http.createServer((req, res) => {
//         console.log(`Worker ${process.pid} handle this request...`);
//
//         const fullPath = path.join(process.cwd(), req.url);
//         if (!fs.existsSync(fullPath)) return res.end('File or directory not found');
//
//         if (isFile(fullPath)) {
//             return fs.createReadStream(fullPath).pipe(res);
//         }
//
//         let links = "";
//
//         fs.readdirSync(fullPath).forEach(fileName => {
//             const filePath = path.join(req.url, fileName);
//             links += `<li><a href="${filePath}">${fileName}</a></li>`;
//         });
//
//         const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('#links', links);
//
//         res.writeHead(200, {'Content-Type': 'text/html'})
//
//         return res.end(HTML)
//
//     }).listen(3000, 'localhost');
// }

// const isFile = (path) => fs.lstatSync(path).isFile();
//
// const app = http.createServer((req, res) => {
//
//     const fullPath = path.join(process.cwd(), req.url);
//     if (!fs.existsSync(fullPath)) return res.end('File or directory not found');
//
//     if (isFile(fullPath)) {
//         return fs.createReadStream(fullPath).pipe(res);
//     }
//
//     let links = "";
//
//     fs.readdirSync(fullPath).forEach(fileName => {
//         const filePath = path.join(req.url, fileName);
//         links += `<li><a href="${filePath}">${fileName}</a></li>`;
//     });
//
//     const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('#links', links);
//
//     res.writeHead(200, {'Content-Type': 'text/html'})
//
//     return res.end(HTML)
//
// });

const app = http.createServer((request, response) => {
    if (request.method === 'GET') {
        const filePath = path.join(__dirname, 'index.html');
        readStream = fs.createReadStream(filePath);
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
        socket.emit('SERVER_MSG', { msg: data.msg.split('').reverse().join('')});
    });
});
app.listen(3000, 'localhost');