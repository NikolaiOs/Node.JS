const colors = require('colors');

const primeNumber = () => {
    let start = 2;
    let end = 100;

    for (let i = start; i <= end; i++) {
        let foo = true;

        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                foo = false;
                break;
            }
        }

        if (foo) {
            printColor(i)
        }

    }
};

const printColor = (i) => {
    if (i % 3 === 0) {
        console.log(colors.yellow(i));
    } else if ((i + 1) % 3 === 0) {
        console.log(colors.green(i));
    } else  {
        console.log(colors.red(i));
    }
};

primeNumber();
