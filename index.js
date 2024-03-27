// Configurações
const express = require('express');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');


const app = express();
const PORT = 8000;

//DB
const db = require('./db/connection')

// Template engine
app.engine('handlebars', exphbs.engine());
app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}))


//Importação de rotas
const notesRoutes = require('./routes/notes');


//Rotas
app.get('/', async function(req, res) {

   
        const notes = await db.getDb().collection('notes').find({}).toArray();

        res.render('home', {notes});


})

app.use('/notes',notesRoutes )



db.initDb((err, db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(8000, () => {
            console.log('Servidor rodando na porta 8000');
        });
    }
});
