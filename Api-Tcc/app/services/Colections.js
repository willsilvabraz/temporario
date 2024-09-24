
const Fila = require('../models/Fila');
const Paciente = require('../models/Paciente');

class Collections {
    static CriarCollection(tipo) {
        switch (tipo) {
            case 'paciente':
                return new Paciente();
            case 'fila':
                return new Fila();
            default:
                throw new Error('Tipo de cadastro desconhecido.');
        }
    }
}

module.exports = Collections;
