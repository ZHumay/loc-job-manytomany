const express = require('express');
const { jobController } = require('../controllers/jobController');

const jobRoutes = express.Router();

jobRoutes.get('/', jobController.getAll);

jobRoutes.post('/', jobController.add);

jobRoutes.get('/:id', jobController.getById);

jobRoutes.delete('/:id', jobController.deleteById);

jobRoutes.put('/:id', jobController.update);

module.exports = {
  jobRoutes
};
