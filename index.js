const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('../access.log', 'utf8');

readStream.on('data', (line) => {
    console.log('89.123.1.41');
    console.log(line.includes('89.123.1.41'));
    console.log('34.48.240.111');
    console.log(line.includes('34.48.240.111'));
});

readStream.on('end', () => console.log('File reading finished'));
readStream.on('error', () => console.log(err));

const writeStream1 = fs.createWriteStream('./89.123.1.41_requests.log', 'utf8');
const writeStream2 = fs.createWriteStream('./34.48.240.111_requests.log', 'utf8');

const rl = readline.createInterface({
    input: readStream
});

rl.on('line', (line) => {
    if (line.includes('89.123.1.41')) {
        writeStream1.write(line);
        writeStream1.write('\n');
    }
    if (line.includes('34.48.240.111')) {
        writeStream2.write(line);
        writeStream2.write('\n');
    }
});