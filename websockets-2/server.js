const express = require('express');
const { Server } = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.set('view engine', 'pug');
app.use(express.static('public'))

app.use((req, res) => {
    res.render('index');
});

app.get('/', (res, req) => {
    console.log('got it');
})

const port = 8080;
server.listen(port, () => console.log('listening on port ' + port));
