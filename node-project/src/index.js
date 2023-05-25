const express = require("express");
const bodyParser = require("body-parser"); //body参数解析
const app = express();
var index = require('./routes/index');


app.use(bodyParser.urlencoded({ extended: false })); //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse application/json

//处理跨域请求
let ip = '';
app.all('*', function (req, res, next) {
    ip = req.ip;
    console.log(ip);
    //允许的来源
    res.header("Access-Control-Allow-Origin", "*");
    //允许的头部信息，如果自定义请求头，需要添加以下信息，允许列表可以根据需求添加
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    //允许的请求类型
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
})

//  主页输出 "Hello World"
app.get('/test', function (req, res, next) {
    res.send('hello world!');
  });

app.use('/study', index)

var server = app.listen(9999, function () {
    // var host = server.address().address;
    var port = server.address().port;

    console.log(`端口`, port);
})
