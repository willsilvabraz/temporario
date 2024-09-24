const Crud = require('./Crud-firebase');

class Fila extends Crud {
    constructor() {
        super('fila');
    }

    async cadastrar(paciente) {

        try {
            const prioridadeMap = {
                'urgente': 1,
                'preferencial': 2,
                'normal': 3
            };

            const agora = new Date();
            const dados = {
                nome: paciente.nome,
                status: paciente.status,
                horaChegada: agora.toISOString(),
                prioridade: prioridadeMap[paciente.prioridade] || 3
            };

            await this.database.ref(this.reference).child(paciente.id).set(dados);
            return dados;
        } catch (error) {
            console.error(`Erro ao cadastrar paciente: ${error.message}`);
            throw new Error(`Erro ao cadastrar paciente: ${error.message}`);
        }
    }

    async listar(status) {

        try {
            let snapshot;

            if (status) {
                snapshot = await this.database.ref(this.reference)
                    .orderByChild('status')
                    .equalTo(status)
                    .once('value');
            } else {
                snapshot = await this.database.ref(this.reference).once('value');
            }

            const pacientes = snapshot.val();
            if (pacientes) {
                const listaPacientes = Object.entries(pacientes)
                    .map(([id, dados]) => ({ id, ...dados }))
                    .sort((a, b) => {
                        if (a.prioridade !== b.prioridade) {
                            return a.prioridade - b.prioridade;
                        }
                        return new Date(a.horaChegada) - new Date(b.horaChegada);
                    });

                return listaPacientes.length > 0 ? listaPacientes : null;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao listar pacientes: ${error.message}`);
            throw new Error(`Erro ao listar pacientes: ${error.message}`);
        }
    }

}

module.exports = Fila;
