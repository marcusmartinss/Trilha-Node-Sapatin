const Task = require('../models/Task');

let message = "";
let type = "";

const getAllTasks = async (req, res) => {
    try {
        setTimeout(() => {
            message = "";
            type = "";
        }, 2000);
        const tasksList = await Task.find(); // procura todas as tasks do banco de dados
        return res.render('index', { 
            tasksList,
            task: null,
            taskDelete: null,
            message,
            type
        }); // renderiza a página inicial com a lista de tasks
    } catch (error) {
        res.status(500).send({ error: error.message }); // se der erro, retorna a mensagem de erro recebida do objeto Error
    }
    return res.render('index'); // coloca-se só index pois quando está em uma arquitetura MVC do Node, o ejs já sabe que está na pasta views
}; // separa-se o método da rota do arquivo principal para que o código fique mais organizado

const createTask = async (req, res) => {
    const task = req.body;

    if (!task.task) { // se não tiver task, recarrega a página
        message = "Insira um texto antes de adicionar uma tarefa!";
        type = "danger";
        return res.redirect('/');
    }

    try {
        await Task.create(task); // cria a task
        message = "Tarefa criada com sucesso!";
        type = "success";
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
            res.render("index", {
                task,
                taskDelete: null,
                tasksList,
                message,
                type
            });
        } else {
            const taskDelete = await Task.findOne({ _id: req.params.id });
            res.render("index", {
                task: null,
                taskDelete,
                tasksList,
                message,
                type
            });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updateOneTask = async (req, res) => {
    try {
        const task = req.body;
        await Task.updateOne({ _id: req.params.id }, task); // atualiza a task do id que foi passado como parâmetro (id, o que será atualizado)
        message = "Tarefa atualizada com sucesso!";
        type = "success";
        res.redirect('/');
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const deleteOneTask = async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id }); // deleta a task do id que foi passado como parâmetro
        message = "Tarefa deletada com sucesso!";
        type = "success";
        res.redirect('/');
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const checkTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });
        task.check = !task.check;
        
        await Task.updateOne({ _id: req.params.id }, task);
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
    checkTask
};