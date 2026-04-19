const express = require("express");
const fs = require('node:fs');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const file_path = "/app/logs/app.log";
const port = process.env.PORT;
const greeting = process.env.GREETING;


app.get("/", async (_, response) => 
    response.send(greeting)
);

app.get("/status", async (_, response) =>
    response.json({"status": "ok"})
);

app.post("/log", async (request, response) => {
    const message = request.body.message + '\n';
    fs.appendFile(file_path, message, (err) => {
        if (err) {
            response.status(500).json({"error": err.message});
            return;
        }     
    });
    response.send("Log was added");
});

app.get("/logs", async (_, response) => {
    fs.readFile(file_path, 'utf8', (error, data) => {
        if (error) {
            response.status(500).json({"error": error.message});
            return;
        }
        const array = data.split("\n");
        array.pop();
        const answer = array.map(line => `<p>${line}</p>`).join('');
        response.send(answer);
    });
});


app.listen(port);


