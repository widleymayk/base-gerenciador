const mongoose = require('mongoose');
const moment = require('moment-timezone');

//Fuso horário 
const timezone = 'America/Recife';
const taskSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true
  },
  descricao: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pendente', 'em_andamento', 'concluida'],
    default: 'pendente'
  },
  prioridade: {
    type: String,
    enum: ['baixa', 'media', 'alta'],
    default: 'media'
  },
  dataVencimento: {
    type: Date
  },
  responsavel: {
    type: String,
    required: true
  },
  dataCriacao: {
    type: Date,
    default: () => moment().tz(timezone).toDate()
  },
  dataAtualizacao: {
    type: Date,
    default: () => moment().tz(timezone).toDate()
  }
});

// Middleware para atualizar dataAtualizacao automaticamente
taskSchema.pre('save', function(next) {
  this.dataAtualizacao = moment().tz(timezone).toDate();
  next();
});

