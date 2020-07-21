server = require("http").createServer((req, res) => {
    console.log("hello")
    res.end("hello world!322");
}).listen(3000);