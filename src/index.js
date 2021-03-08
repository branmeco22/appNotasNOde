// Leer variables de ambiente
require('dotenv').config();

const app = require('./server');
require('./database');

// El servidor esta escuchando
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    console.log('Environment:', process.env.NODE_ENV);
});