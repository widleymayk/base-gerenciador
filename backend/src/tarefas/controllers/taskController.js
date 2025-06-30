const Task = require('../models/taskModel');

//obter todas as tarefas
exports.getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch(error){
        res.status(500).json({message: 'Erro ao buscar tarefas'});
    }
};

//criar todas as tarefas
exports.createTask = async (req, res) => {
    const task = new Task(req.body);

    try{
        await task.save();
        res.status(201).json(task);
    }catch(error){
        res.status(400).json({message: 'Erro ao criar tarefa'});
    }
};

//atualizar uma tarefa pelo ID
exports.updateTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!task){
            res.status(404).json({message: 'Erro ao criar tarefa'});
        }
        res.json(task);
    }catch(error){
        res.status(400).json({message: 'Erro ao atualizar tarefa'});
    }
};

exports.deleteTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id);

        if(!task){
            res.status(404).json({message: 'Erro ao criar tarefa'});
        }
        res.json({message: 'Tarefa deletada com sucesso'});
    }catch(error){
        res.status(400).json({message: 'Erro ao deletar tarefa'});
    }
};