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
      fs.writeFile("data.txt", data.memo, "utf-8", (err) => res.end("errror"))
    })
    }
    const getMemo = (i) => `
        <div>
            <input type="button" value="remove" onclick="alert("remove01") /> 
            ${new Date().toLocaleString()} <br />
            memo ${i} ssjfkjdslkfjadlfkklkd;l;lkajdfkljadslfkaksadjkfkdaslfjdakslfjdsklfjadslfk
            dfjklaalkasdfklasdjflkadjkldsaj
            adsjklfjaslfklakdlsjfl;dks<p />
        </div>
        `;
    const memolist = [1,2,3,4,5,6].map(i => getMemo(i)).join("")
    const writeform = `
        <div>
            <form id="writeform" action="/save" method="post">
                <input type="textarea" name=memo placeholder="write new memo" />
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