const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasksList = await Task.find(); // procura todas as tasks do banco de dados
        return res.render('index', { tasksList, task: null, taskDelete: null }); // renderiza a página inicial com a lista de tasks
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

const getById = async (req, res) => {
    try {
        const tasksList = await Task.find();
        if (req.params.method == "update") {
            const task = await Task.findOne({ _id: req.params.id });
            res.render("index", { task, taskDelete: null, tasksList });
        } else {
            const taskDelete = await Task.findOne({ _id: req.params.id });
            res.render("index", { task: null, taskDelete, tasksList });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const updateOneTask = async (req, res) => {
    try {
        const task = req.body;
        await Task.updateOne({ _id: req.params.id }, task); // atualiza a task do id que foi passado como parâmetro (id, o que será atualizado)
        res.redirect('/');
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const deleteOneTask = async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id }); // deleta a task do id que foi passado como parâmetro
        res.redirect('/');
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getById,
    updateOneTask,
    deleteOneTask,
};