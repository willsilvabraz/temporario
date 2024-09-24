const Crud = require('./Crud-firebase');

class Paciente extends Crud {
    constructor() {
        super('pacientes');
    }

    async cadastrar(dados) {
        try {
            if (
                dados.nome && dados.dataNasc && dados.cpf &&
                dados.nome.trim() !== '' && dados.dataNasc.trim() !== '' &&
                dados.cpf.trim() !== ''
            ) {
                await super.cadastrar({
                    nome: dados.nome,
                    dataNasc: dados.dataNasc,
                    cpf: dados.cpf
                });
            } else {
                throw new Error('Dados inválidos: nome, data de nascimento e CPF são obrigatórios.');
            }
        } catch (error) {
            console.error(`Erro ao cadastrar paciente: ${error.message}`);
            throw new Error(`Erro ao cadastrar paciente: ${error.message}`);
        }
    }

    async atualizar(id, dados) {
        try {
            if (id) {
                await super.atualizar(id, { dados });
            } else {
                throw new Error('Dados inválidos: nome, data de nascimento e CPF são obrigatórios.');
            }
        } catch (error) {
            console.error(`Erro ao atualizar paciente: ${error.message}`);
            throw new Error(`Erro ao atualizar paciente: ${error.message}`);
        }
    }
}

module.exports = Paciente;
