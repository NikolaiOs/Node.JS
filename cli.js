const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
// const yargs = require("yargs");

const currentDirectory = process.cwd();

// const options = yargs
//     .positional("p", {describe: 'Path', default: process.cwd()})
//     .argv;
// console.log(options);
//
// class item {
//     constructor(path, fileName) {
//         this.path = path;
//         this.fileName = fileName;
//     }
// }



const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
};

const list = fs.readdirSync(currentDirectory).filter(isFile);
inquirer
    .prompt([
        {
            name: "fileName",
            type: "list",
            message: "Choose file:",
            choices: list,
        },
    ])
    .then((answer) => {
        const filePath = path.join(currentDirectory, answer.fileName);
        fs.readFile(filePath,'utf8', (err, data) => {
            console.log(data);
        });
    });