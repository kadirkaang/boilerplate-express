let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config();

console.log("Hello World");
let absolutePath = __dirname + '/views/index.html'

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))


const logger = (req, res, next) => {
    const method = req.method;
    const path = req.path;
    const ip = req.ip;

    console.log(`${method} ${path} - ${ip}`);
    next();
}

const addTimestamp = (req, res, next) => {
    req.time = new Date().toString();
    next();
};
  
app.use(logger);

app.get('/', (req, res) => {
    res.sendFile(absolutePath);
});

app.get('/json', (req, res) => {
    const message = "Hello json";
    
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({ message: message.toUpperCase() });
    } else {
        res.json({ message: message });
    }
});

app.get('/now', addTimestamp, (req, res) => {
    res.json({time: req.time});
});

app.get('/:word/echo', (req, res) => {
    res.json({echo: req.params.word});
});

app.get('/name', (req, res) => {
    let firstname = req.query.first;
    let lastname = req.query.last;
    res.json({
        name: firstname + " " + lastname,
    });
});

app.post('/name', (req ,res) => {
    let fullName = req.body.first + ' ' + req.body.last;
    res.json({name: fullName});
});































 module.exports = app;
