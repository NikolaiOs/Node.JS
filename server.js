const cluster = require('cluster');
const os = require('os');
const http = require('http');
const fs = require('fs');
const path = require('path');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        console.log(`Forking process number ${i}...`);
        cluster.fork();
    }

} else {
    console.log(`Worker ${process.pid} started...`);

    const isFile = (path) => fs.lstatSync(path).isFile();

    http.createServer((req, res) => {
        console.log(`Worker ${process.pid} handle this request...`);

        const fullPath = path.join(process.cwd(), req.url);
        if (!fs.existsSync(fullPath)) return res.end('File or directory not found');

        if (isFile(fullPath)) {
            return fs.createReadStream(fullPath).pipe(res);
        }

        let links = "";

        fs.readdirSync(fullPath).forEach(fileName => {
            const filePath = path.join(req.url, fileName);
            links += `<li><a href="${filePath}">${fileName}</a></li>`;
        });

        const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('#links', links);

        res.writeHead(200, {'Content-Type': 'text/html'})

        return res.end(HTML)

    }).listen(3000, 'localhost');
}