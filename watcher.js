#!/usr/bin/env node

const qs = require("querystring")
const fs = require("fs");
const { exec } = require("child_process");

const cur = () => new Date().toLocaleString()
const log = (msg) => {console.log(` .. ${cur()} ${msg}`)}
const logerr = (msg) => {console.err(` .. ${cur()} ${msg}`)}

require("http").createServer((req, res) => {
console.log(`client: ${req.url} at ${cur()}`)
    if (req.method === "POST") {
        let body = ""
        req.on("data", (data) => body += data )
        req.on("end", () => {
            try {
                const data = qs.parse(body)
                const payload = JSON.parse(data.payload)
                log(`action: ${payload.action}`)
                log(`full_name: ${payload.repository.full_name}`)
                log(`updated_at: ${payload.repository.updated_at}`)
                log(`url: ${payload.package.registry.url}`)
                log(`version: ${payload.package.package_version.version}`)

                exec("./restart.sh", (error, stdout, stderr) => {
                    if (error) {
                        log(`error: ${error.message}`);
                        res.writeHead(500);
                        res.end(`UPDATE ERROR : ${error.message}`)
                        return;
                    }
                    if (stderr) {
                        log(`stderr: ${stderr}`);
                        res.writeHead(500);
                        res.end(`UPDATE ERROR : ${stderr}`)
                        return;
                    }
                    log(`stdout: ${stdout}`);
                    res.writeHead(200);
                    res.end("RESTART")
                })
            } catch (e) {
                logerr(e);
                logerr(e.message);
                res.writeHead(500);
                res.end(`Internal Error : ${e.message}`);
            }
        })
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
}).listen(3000);