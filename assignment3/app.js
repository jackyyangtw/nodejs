const express = require('express');
const bodyParser = require("body-parser");

const homeRoute = require('./routes/home');
const userRoute = require('./routes/users');

const app = express();
// 這個 middleware 會解析 urlencoded 格式的請求主體
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use("/",homeRoute.routes)
app.use(userRoute)

app.listen(3000);