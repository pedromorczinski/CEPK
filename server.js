
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const dir = __dirname;

http.createServer((req, res) => {
    let file = path.join(dir, decodeURIComponent(req.url.split("?")[0]));

    if (req.url === "/" || req.url.startsWith("/?")) {
        file = path.join(dir, "index.html");
    }

    if (!file.startsWith(dir)) {
        res.writeHead(403);
        return res.end("Acesso negado");
    }

    fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end("Arquivo não encontrado");
        }

        const ext = path.extname(file);
        const types = {
            ".html": "text/html; charset=utf-8",
            ".css": "text/css",
            ".js": "application/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".svg": "image/svg+xml",
            ".ico": "image/x-icon"
        };

        res.writeHead(200, {
            "Content-Type": types[ext] || "application/octet-stream"
        });
        res.end(data);
    });
}).listen(port, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${port}`);
});
