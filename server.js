const http = require('http');
const app = require('./src/app.js');

const PORT = process.env.PORT || 8000;

app.initialize("Duh");
let server = http.createServer(app);
server.listen(PORT);
console.log(`server is listening to ${PORT}.`);