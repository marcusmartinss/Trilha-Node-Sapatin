const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(
        "mongodb+srv://root:admin@to-do-list.ewsmruk.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then( () => console.log("Conectado ao MongoDB com sucesso!") )
    .catch( (err) => console.log(err) );
}

module.exports = connectToDB;