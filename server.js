const https = require("https");
const http = require("http");
const fs = require("fs");
const app = require('./src/app.js');

const privateKey = fs.readFileSync('privatekey.pem').toString();
const certificate = fs.readFileSync('certificate.pem').toString();

const options = {key: privateKey, cert: certificate};
const PORT = process.env.PORT || 8000;

http.createServer(app).listen(PORT)
https.createServer(options, app).listen(443)
console.log(`server is listening in http: ${PORT}.`);
console.log(`server is listening in https: 443.`);