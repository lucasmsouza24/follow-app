// ambiente (dev/prod)
process.env.NODE_ENV = 'dev';

// dependências
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// rotas
let indexRouter = require('./routes/index');
let userRouter = require('./routes/user');
let postsRouter = require('./routes/posts');

let app = express();

// config básica express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// iniciando rotas
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/posts', postsRouter);

module.exports = app;