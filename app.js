// module import
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {connectDatabase} = require('./models/Database');
// module import

// route import
const librarianAuthRoute = require('./routes/librarianAuthRoute');
const studentAuthRoute = require('./routes/studentAuthRoute');
const studentBookRoute = require('./routes/studentBookRoute');
const librarianBookRoute = require('./routes/librarianBookRoute');
// route import

// create app
const app = express();
// create app

// config
require('dotenv').config();
// config

// middleware
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    cors()
];
app.use(middleware);
// middleware

// route
app.get('/', (req, res) => {
    return res.status(200).json({title: 'Welcome to Library Management System API'});
});

app.use('/librarianAuth', librarianAuthRoute);
app.use('/studentAuth', studentAuthRoute);
app.use('/getBook', studentBookRoute);
app.use('/book', librarianBookRoute);

app.get('*', (req, res) => {
    return res.status(404).json({message: 'please enter correct address'});
});
// route

// server create
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
    connectDatabase();
});
// server create