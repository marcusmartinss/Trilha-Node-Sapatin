const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasksList = await Task.find(); // procura todas as tasks do banco de dados
        return res.render('index', { tasksList }); // renderiza a página inicial com a lista de tasks
    } catch (error) {
        res.status(500).send({ error: error.message }); // se der erro, retorna a mensagem de erro recebida do objeto Error
    }
    return res.render('index'); // coloca-se só index pois quando está em uma arquitetura MVC do Node, o ejs já sabe que está na pasta views
}; // separa-se o método da rota do arquivo principal para que o código fique mais organizado

const createTask = async (req, res) => {
    const task = req.body;

    if (!task.task) { // se não tiver task, recarrega a página
        return res.redirect('/');
    }

    try {
        await Task.create(task); // cria a task
        return res.redirect('/'); // redireciona para a página inicial
    } catch (error) {
        res.status(500).send({ error: error.message }); // se der erro, retorna o erro
    }
    
};

module.exports = {
    getAllTasks,
    createTask,
};