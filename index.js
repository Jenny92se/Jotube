/*console.log("Hi");

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'index/html'});
    res.end('Hello World');
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');*/

let express=require('express');
let app=express();
app.use(express.static('public'));
app.get('/',function(req,res){
    res.send('Hello home page');
});

app.get('/route',function(req,res){
    res.send('hello router');
})
app.get('/login',function(req,res){
    res.send('<h1>login please</h1>');

});

app.listen(8080,function(){
    console.log('connect 8080');
});