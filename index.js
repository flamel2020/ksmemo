require("http").createServer((req, res) => {
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
            <form action="/save" method="post">
                <input type="textarea" name=memo placeholder="write new memo" />
                <input type="button" value="save" />
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