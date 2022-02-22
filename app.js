function configureLiveReload() {
    const livereload = require("livereload");
    const liveReloadServer = livereload.createServer();
    const connectLiveReload = require("connect-livereload");

    liveReloadServer.watch(path.join(__dirname, 'public'));

    liveReloadServer.server.once("connection", () => {
        console.log('liveReloadServer::connection')
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });

    app.use(connectLiveReload());
}

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var sassMiddleware = require('node-sass-middleware');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV !== "production") configureLiveReload()
// app.use(sassMiddleware({
    //   src: path.join(__dirname, 'public'),
    //   dest: path.join(__dirname, 'public'),
    //   indentedSyntax: true, // true = .sass and false = .scss
    //   sourceMap: true
    // }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);



module.exports = app;
