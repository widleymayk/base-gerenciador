const mongoose = require('mongoose');
const moment = require('moment-timezone');

// Fuso horário 
const timezone = 'America/Recife';

const taskSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true
  },
  descricao: {
    type: String,
    trim: true,
    maxlength: [255, 'A descrição não pode ter mais de 255 caracteres']
  },
  status: {
    type: String,
    enum: ['pendente', 'em_andamento', 'concluida'],
    message: 'Status inválido',
    default: 'pendente'
  },
  prioridade: {
    type: String,
    enum: ['baixa', 'media', 'alta'],
    default: 'media',
    required: [true, 'A prioridade é obrigatória']
  },
  data: {
    type: Date,
    required: [true, 'A data é obrigatória'],

    // Validação para garantir que a data de vencimento seja maior que a data atual
    validate: function (value) {
      // Verifica se a data selecionada é maior que a data atual
      const today = moment().tz(timezone).startOf('day');
      // Converte a data selecionada para o fuso horário do Brasil
      const dataSelecionada = moment(value).tz(timezone).startOf('day');
      // Verifica se a data selecionada é maior que a data atual
      return dataSelecionada.isAfter(today, 'day');
    }
  },
  responsaveis: {
    type: String,
    required: [true, 'O responsável é obrigatório'],

    // Validação para garantir que o responsável seja um usuário válido
    validate: {
      // Validação para garantir que o responsável seja um usuário válido
      validator: arrayLimit,
    }
  },
  criadoEm: {
    type: Date,
    default: () => moment().tz(timezone).toDate()
  },
  atualizadoEm: {
    type: Date,
    default: () => moment().tz(timezone).toDate()
  }
});

function arrayLimit(val) {
  return val.length > 0;
}

taskSchema.pre('save', function(next) {
  this.atualizadoEm = moment().tz(timezone).toDate();
  next();
});

const Tarefa = mongoose.model('Tarefa', taskSchema);

module.exports = Tarefa;

