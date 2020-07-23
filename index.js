const qs = require("querystring")
const fs = require("fs")
require("http").createServer((req, res) => {
    console.log(req.url);
    if (req.url === "/save") {
    let body = ""
    req.on("data", (data) => body += data )
    req.on("end", () => {
      const data = qs.parse(body)
      console.log(data)
      data.id = Date.now();
      data.date = new Date().toLocaleString()
      fs.writeFile(`data/${id}.data`, JSON.stringify(data), "utf-8", (err) => res.end("errror"))
    })
    }
    fs.readdir(data, (err, files) => {
      files.forEach( (file) => {
        console.log(file)
        fs.readFile(`data/${file}`, "utf-8", (err, str) => {
          const data = JSON.parse(str)
          
        } )
      })
    })
    const getMemo = (id, date, memo) => `
        <div>
            <input type="button" value="remove" onclick="alert("remove${id}") /> 
            ${data} <br />
            memo : ${memo} <p />
        </div>
        `;
    const memolist = [1,2,3,4,5,6].map(i => getMemo(i)).join("")
    const writeform = `
        <div>
            <form id="writeform" action="/save" method="post">
                <input type="text" name=memo placeholder="write new memo" />
                <button type="submit" form="writeform" > save </button>
            </form>
        </div>
        `;
    const html = `
        <html>
            <head><title>ksmemo</title></head>
            <body>
                ${writeform}
                ${memolist}
            </body>
        </html>
        `;
    
    res.writeHead(200);
    res.end(html);

}).listen(3000);