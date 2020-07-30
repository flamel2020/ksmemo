#!/usr/bin/env node

const qs = require("querystring")
const fs = require("fs");
const process = require("child_process");

const cur = () => new Date().toLocaleString()
const log = (msg) => {console.log(` .. ${cur()} ${msg}`)}
const logerr = (msg) => {console.error(` .. ${cur()} ${msg}`)}

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
                log(`url: ${payload.registry_package.registry.url}`)
                log(`version: ${payload.registry_package.package_version.version}`)

                const result = process.spawnSync("./restart.sh", [], {timeout: 20*1000})
                if (result.error) {
                    log(`error: ${result.error}`);
                    res.writeHead(500);
                    res.end(`RESTART ERROR : ${result.error}`)
                    return;
                }
                log(`stdout: ${result.stdout}`);
                res.writeHead(200);
                res.end("RESTART")
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