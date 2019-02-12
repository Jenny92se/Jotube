/*console.log("Hi");

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'index/html'});
    res.end('Hello World');
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');*/

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import {
    userRouter
} from "./router"

//const express = require('express');
const app = express();

/*
const PORT = 8080;

const handleListening = () => {
    console.log(`Listening on : http://localhost:${PORT}`);
}

app.listen(8080, function () {
    console.log('connect 8080');
});
app.listen(PORT, handleListening);
*/

const handleHome = (req, res) =>
    res.send('Hello from Home');


const handleProfile = (req, res) =>
    res.send("you are my profile");

//this is middleware
const betweenHome = (req, res, next) => {
    console.log("I'm between");
    next();
    // if you don't use "next()", the respond will not be reached.
}

/*
- adapt to every route  
 app.use(betweenHome);

- only adapt to this route
app.get("/", betweenHome, handleHome);

 after middleware we use route
*/
/*morgan : loggin middleware
 <options>
 -tiny: simple log.(GET / 304 - -2.974 ms)
 -combined: detail log(::1 - -[12 / Feb / 2019: 10: 53: 05 + 0000]
     "GET /profile HTTP/1.1"
     304 - "-"
     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
 - dev : colored tiny
*/
app.use(morgan("dev"));

/*
security middleware
*/
app.use(helmet());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/*
router
*/

app.get("/", handleHome);

app.get("/profile", handleProfile);

// if someone connect to /user than useRouter will be  invoked
app.use("/user", userRouter);

/* "http://localhost:8080/profile" 로 접속


app.use(express.static('public'));
app.get('/', function (req, res) {
    res.send('Hello home page');
});
*/

export default app;