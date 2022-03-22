"use strict";
// const http = require('http');
// const hostname = '127.0.0.1';
// const express = require('express');
// const port = process.env.PORT || 3000;
// // const crypto = require('crypto');
//
// // const start = new Date();
//
// // const server = http.createServer((req, res) => {
// //     res.statusCode = 200;
// //     res.setHeader('Content-Type', 'text/json');
// //     const crypted = crypto.pbkdf2Sync('Hello World', '5', 10, 64, 'sha512');
// //     res.end(JSON.stringify(crypted));
// // });
//
// const app = express();
//
// app.listen(port, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
//
// app.get('/api', (req: Request, res: Response) => {
//     res.json({ message: 'Hello from server!'});
// })
function sum(num1, num2) {
    return num1 + num2;
}
console.log(sum(8, 4));
