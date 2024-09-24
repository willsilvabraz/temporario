const express = require('express');
const router = express.Router();
const CollectionsController = require('../controllers/ColectionsController');

const pacientesController = new CollectionsController('paciente');
const filaController = new CollectionsController('fila');

router.post('/fila/cadastrar', (req, res) => filaController.cadastrar(req, res));
router.get('/fila/listar', (req, res) => filaController.listar(req, res));
router.get('/fila/listar/:status', (req, res) => filaController.listar(req, res));
router.get('/fila/obter/:id', (req, res) => filaController.obter(req, res));
router.put('/fila/atualizar', (req, res) => filaController.atualizar(req, res));
router.delete('/fila/deletar/:id', (req, res) => filaController.deletar(req, res));
router.get('/fila/tamanho', (req, res) => filaController.tamanho(req, res));
router.get('/fila/buscar/:nome', (req, res) => filaController.buscarPorNome(req, res));
router.get('/fila/atual/:status', (req, res) => filaController.atual(req, res));

router.post('/pacientes/cadastrar', (req, res) => pacientesController.cadastrar(req, res));
router.get('/pacientes/listar', (req, res) => pacientesController.listar(req, res));
router.get('/pacientes/obter/:id', (req, res) => pacientesController.obter(req, res));
router.put('/pacientes/atualizar', (req, res) => pacientesController.atualizar(req, res));
router.delete('/pacientes/deletar/:id', (req, res) => pacientesController.deletar(req, res));
router.get('/pacientes/tamanho', (req, res) => pacientesController.tamanho(req, res));
router.get('/pacientes/buscar/:nome', (req, res) => pacientesController.buscarPorNome(req, res));

module.exports = router;
