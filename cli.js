#!/c/nodejs/node

const fs = require("fs/promises");
const path = require("path");
const inquirer = require("inquirer");
const yargs = require("yargs");

let currentDirectory = process.cwd();

const options = yargs
    .positional('d', {
        describe: 'Path to directory',
        default: process.cwd(),
    })
    .positional('p', {
        describe: 'Pattern',
        default: '',
    }).argv;

console.log(options);

class ListItem {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }
};

const run = async () => {
    const list = await fs.readdir(currentDirectory);
    const items = list.map(fileName =>
        new ListItem(path.join(currentDirectory, fileName), fileName));

    const item = await inquirer.prompt([
            {
                name: 'fileName',
                type: 'list',
                message: `Выберите файл: ${currentDirectory}`,
                choices: items.map(item => ({ name: item.fileName, value: item })),
            }
        ])
        .then(answer => answer.fileName);

    const data = await fs.readFile(item.path, 'utf-8');

    console.log(data);
};

run();