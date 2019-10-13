// mongoose password: password1234
// mongo cluster: mongodb+srv://Priest:<password>@cluster0-iuer3.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const path = require('path')

const stuffRoute = require('./routes/stuffs-route')
const userRoutes = require('./routes/user-route')

const app = express();

// connect mongo client/ mongoose
mongoose.connect('mongodb+srv://Priest:password1234@cluster0-iuer3.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully onnected to MongoDB Atlas');        
    })
    .catch((error) => {
        console.log('Unable to onnect to MongoDB Atlass');
        console.error(error);        
})

// cross origin request
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoute);
app.use('/api/auth', userRoutes);

module.exports = app;
