const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require ('morgan');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;
const CONCETION_URL = 'mongodb+srv://admin:brillas27@cluster0.1juxb.mongodb.net/<dbname>?retryWrites=true&w=majority';
const routes = require ('./routes/routes');

 mongoose.connect(CONCETION_URL , { useNewUrlParser: true , useUnifiedTopology: true})
 .then( () => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
 .catch( (error) => console.log(error))
 mongoose.set('useFindAndModify', false);

//Settings
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json({limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended: true}));
app.use(cors());
//Routes
app.use('/todo', routes);

//Static files
// console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

// app.listen(app.get ('port'),() => {
//     console.log('en el servidor ');
// })