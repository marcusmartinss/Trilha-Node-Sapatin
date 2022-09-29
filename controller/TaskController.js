const getAll = (req, res) => {
    return res.render('index');
    // coloca-se só index pois quando está em uma arquitetura MVC do Node, o ejs já sabe que está na pasta views
};
// separa-se o método da rota do arquivo principal para que o código fique mais organizado

module.exports = {
    getAll,
};