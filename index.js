require('dotenv').config();

const express = require('express');
const path = require('path'); // path é responsável por direcionar o caminho do arquivo
const routes = require('./routes/routes'); // importa as rotas
const connectToDB = require('./database/db'); // importa a conexão com o banco de dados
const bodyParser = require('body-parser');

connectToDB();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json()); // entender quando enviar informaçoes em json para a api
app.use(bodyParser.urlencoded({ extended: false })); // entender quando passar parametros via url

app.set('view engine', 'ejs'); // define a engine para renderizar as views
app.use(express.static(path.join(__dirname, 'public'))); // path é a pasta atual, join junta ela com a pasta public, onde ficam os arquivos estáticos, dessa forma, não é necessário colocar o caminho completo para os arquivos
app.use(express.urlencoded({ extended: true })); // permite que o express entenda os dados enviados pelo formulário
app.use(routes); // todas rotas que existirem no arquivo routes.js poderão ser acessadas no index

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// a dependência do nodemon existe para que o servidor seja reiniciado automaticamente a cada alteração no código