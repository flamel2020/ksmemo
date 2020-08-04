const qs = require("querystring")
const fs = require("fs");

const writeForm = `
    <div>
        <form id="writeform" action="/save" method="post">
            <input type="text" name=memo placeholder="write new memo" />
            <button type="submit" form="writeform" > save </button>
        </form>
    </div>
    `;

const makeMemo = (id, date, memo) => `
    <div>
        <form id="deleteform${id}" action="/delete" method="post">
            <input type="hidden" name="id" value="${id}" />
            <button type="submit" form="deleteform${id}"> remove </button>
            ${date} <br />
            memo : ${memo} <p />
        </form>
    </div>
    `;

const makeHtml = (writeform, memolist) => `
    <html>
        <head><title>Welcome to KSMEMO</title></head>
        <body>
            ${writeform}
            ${memolist}
        </body>
    </html>
    `;

const onlist = (req, res) => {
    if (!fs.existsSync('data')) {
        fs.mkdirSync('data')
    }
    fs.readdir("data", (err, files) => {
        console.log("files: " + files)
        let memolist = ""
        
        files.forEach( (file) => {
            const str = fs.readFileSync(`data/${file}`, "utf-8")
            const data = JSON.parse(str)
            memolist = makeMemo(data.id, data.date, data.memo) + memolist
        })
        
        const html = makeHtml(writeForm, memolist)
        res.writeHead(200);
        res.end(html);
    })
}
const onsave = (req, res) => {
    let body = ""
    req.on("data", (data) => body += data )
    req.on("end", () => {
        const data = qs.parse(body)
        console.log(data)
        data.id = Date.now();
        data.date = new Date().toLocaleString()
        fs.writeFile(`data/${data.id}.data`, JSON.stringify(data), "utf-8", (err) => {
            res.writeHead(302, {Location : '/'});
            res.end();
        })
    })
}
const ondelete = (req, res) => {
    let body = ""
    req.on("data", (data) => body += data )
    req.on("end", () => {
        const data = qs.parse(body)
        console.log(data)
        fs.unlink(`data/${data.id}.data`, (err) => {
            res.writeHead(302, {Location : '/'});
            res.end();
        })
    })
}

require("http").createServer((req, res) => {
    console.log("url:"+req.url);
    if (req.url === "/" ) {
        onlist(req, res);
    } else if (req.url === "/save" && req.method === "POST") {
        onsave(req, res)
    } else if (req.url === "/delete" && req.method === "POST") {
        ondelete (req, res)
    } else {
        res.writeHead(404)
        res.end("Not Found")
    }

}).listen(2000);
