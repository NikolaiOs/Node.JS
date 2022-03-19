const colors = require('colors');

// let foo = 'Hello World!';
// console.log(foo);
// console.log(colors.red(foo));

// let n = 10;
//
// nextP:
//     for (let i = 2; i <= n; i++) {
//         for (let j = 2; j < i; j++) {
//             if (i % j == 0) continue nextP;
//         }
//         console.log(i);
//     }

// const primeNumber = () => {
//     let n = 10;
//
//     for (let i = 3; i <= n; i++) {
//         let foo = true;
//
//         for (let j = 2; j < i; j++) {
//             if (i % j === 0) {
//                 foo = false;
//                 break;
//             }
//         }
//         if (foo) console.log(i);
//     };
// };
// primeNumber();


const color = () => {
    if (i % 3 === 0) {
        console.log(colors.green(i));
    } else if ((i + 1) % 3 === 0) {
        console.log(colors.yellow(i));
    } else  {
        console.log(colors.red(i));
    }
};

const primeNumber = () => {
    let n = 10;

    for (let i = 3; i <= n; i++) {
        let foo = true;

        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                foo = false;
                break;
            }
        }
        if (foo) console.log(i)
    }
};

primeNumber();
