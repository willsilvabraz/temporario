//const Fila = require("../models/Fila");
const Collections = require("../services/Colections");
const { notifyClients } = require('../../websocket.js');

class ColectionsController {
    constructor(tipo, database) {
        this.colectionsModel = Collections.CriarCollection(tipo);
    }

    async cadastrar(req, res) {
        try {
            const dados = req.body;
            await this.colectionsModel.cadastrar(dados);
            notifyClients('Novo cadastro realizado');
            res.status(201).json({ message: 'Cadastrado realizado com sucesso.' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    async listar(req, res) {
        if(req.params.status !== null){
            try {
                const clientes = await this.colectionsModel.listar(req.params.status);
                res.status(200).json(clientes);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }else{
            try {
                const clientes = await this.colectionsModel.listar();
                res.status(200).json(clientes);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }

        }
        
    }

    async obter(req, res) {
        try {
            const id = req.params.id
            const clientes = await this.colectionsModel.obter(id);
            res.status(200).json(clientes);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const id = req.query.id
            const novosDados = req.body;
            await this.colectionsModel.atualizar(id, novosDados);
            notifyClients('Atualização realizada');
            res.status(200).json({ message: 'Atualização realizada com sucesso.' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const id = req.params.id
            await this.colectionsModel.deletar(id);
            res.status(200).json({ message: 'Remoçao concluida com sucesso.' });
            notifyClients('Remoção realizada');
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async tamanho(req, res) {
        try {
            const tamanho = await this.colectionsModel.tamanho();
            res.status(200).json({ tamanho });
        } catch (error) {
            res.status(400).json({ message: `Erro ao obter tamanho: ${error.message}` });
        }
    }

    async buscarPorNome(req, res) {
        try {
            const nome = req.params.nome;
            if (!nome) {
                return res.status(400).json({ message: 'faltou nome.' });
            }
            const resultado = await this.colectionsModel.buscarPorNome(nome);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ message: `Erro ao buscar por nome: ${error.message}` });
        }
    }

    async atual (req, res) {
        const status = req.params.status
        try {
            const paciente = await this.colectionsModel.atual(status);
            if (paciente) {
                res.status(200).json(paciente);
            } else {
                res.status(404).json({ message: 'Nenhum registro encontrado na fila.' });
            }
        } catch (error) {
            res.status(400).json({ message: `Erro ao obter próximo: ${error.message}` });
        }
    }
}

module.exports = ColectionsController;
