const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(
        process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then( () => console.log("Conectado ao MongoDB com sucesso!") )
    .catch( (err) => console.log(err) );
}

module.exports = connectToDB;