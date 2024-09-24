class Crud {

    constructor(reference) {
        const { admin } = require('../config/Firebase');
        this.database = admin.database();
        this.reference = reference;
    }

    async cadastrar(dados) {
        try {
            await this.database.ref(this.reference).push(dados);
        } catch (error) {
            throw new Error(`Erro ao cadastrar dados: ${error.message}`);
        }
    }

    async atualizar(id, novosDados) {
        try {
            await this.database.ref(`${this.reference}/${id}`).update(novosDados);
        } catch (error) {
            throw new Error(`Erro ao atualizar dados: ${error.message}`);
        }
    }

    async listar() {
        try {
            const snapshot = await this.database.ref(this.reference).once('value');
            const data = snapshot.val();
            return data ? Object.entries(data).map(([id, dados]) => ({ id, ...dados })) : [];
        } catch (error) {
            throw new Error(`Erro ao listar dados: ${error.message}`);
        }
    }

    async obter(id) {
        try {
            const snapshot = await this.database.ref(`${this.reference}/${id}`).once('value');
            return snapshot.val();
        } catch (error) {
            throw new Error(`Erro ao obter dados: ${error.message}`);
        }
    }

    async deletar(id) {
        try {
            await this.database.ref(`${this.reference}/${id}`).remove();
        } catch (error) {
            throw new Error(`Erro ao deletar dados: ${error.message}`);
        }
    }

    async tamanho() {
        try {
            const snapshot = await this.database.ref(this.reference).once('value');
            const data = snapshot.val();
            return data ? Object.keys(data).length : 0;
        } catch (error) {
            throw new Error(`Erro ao obter tamanho: ${error.message}`);
        }
    }

    async buscarPorNome(nome) {
        try {
            const snapshot = await this.database.ref(this.reference)
                .orderByChild('nome')
                .startAt(nome)
                .endAt(nome + "\uf8ff")
                .once('value');
            return snapshot.val() || {};
        } catch (error) {
            throw new Error(`Erro ao buscar por nome: ${error.message}`);
        }
    }
}

module.exports = Crud;
