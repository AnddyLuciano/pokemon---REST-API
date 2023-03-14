const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const serveFavicon = require('serve-favicon');
const sequelize = require('./src/db/sequelize');
// const cors = require('cors');

const app = express();
const port = 4000;
app
    .use(bodyParser.json())
    .use(morgan('dev'))
    .use(serveFavicon('./pokemon.ico'))
    // .use(cors());
sequelize.initDb();
require('./src/routes/find_All_Pokemons')(app);
require('./src/routes/find_Pokemon_By_PK')(app);
require('./src/routes/create_Pokemon')(app);
require('./src/routes/update_Pokemon')(app);
require('./src/routes/delete_Pokemon')(app);
require('./src/routes/login')(app);
require('./src/service/mail')(app);
require('./src/routes/global')(app);

app.listen(port,()=>console.log(`App running on port ${port}`));