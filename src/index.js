const express = require('express');
const morgan = require('morgan');

// Initializations
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //Entender los datos que llegan desde los inputs de formularios, false quiere decir que no imagenes ni archivos, solo strings o numeros 
app.use(express.json()); //Body-parser por default desde express - manejar en formato json

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});