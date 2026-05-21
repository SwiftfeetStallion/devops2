const express = require("express");
const fs = require('node:fs');
const cors = require("cors");
const client = require('prom-client');

const app = express();

app.use(cors());
app.use(express.json());

const file_path = "/app/logs/app.log";
const port = process.env.PORT;
const greeting = process.env.GREETING;

const total_log_counter = new client.Counter({
    name: 'log_count',
    help: 'The number of log requests'
});

const success_log_counter = new client.Counter({
    name: 'success_log',
    help: 'The number of successful log requests'
});

const failure_log_counter = new client.Counter({
    name: 'failure_log',
    help: 'The number of failed log requests'
});

const request_time = new client.Histogram({
    name: 'request_time',
    help: 'The mean time of request in seconds'
});

app.get("/", async (_, response) => 
    response.send(greeting)
);

app.get("/status", async (_, response) =>
    response.json({"status": "ok"})
);

app.post("/log", async (request, response) => {
    const end = request_time.startTimer();
    const message = request.body.message + '\n';
    fs.appendFile(file_path, message, (err) => {
        if (err) {
            failure_log_counter.inc();
            response.status(500).json({"error": err.message});
            return;
        } else {
          success_log_counter.inc();
        }    
    });
    total_log_counter.inc()
    end();
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

app.get("/metrics", async (request, response) => {
  response.set('Content-Type', client.register.contentType);
  response.send(await client.register.metrics());
});


app.listen(port);


