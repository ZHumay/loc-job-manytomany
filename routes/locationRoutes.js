const express = require('express');
const { locationController } = require('../controllers/locationController');

const locationRoutes = express.Router();

locationRoutes.get('/', locationController.getAll);

locationRoutes.post('/', locationController.add);

locationRoutes.get('/:id', locationController.getById);

locationRoutes.delete('/:id', locationController.deleteById);

locationRoutes.put('/:id', locationController.update);

locationRoutes.get('/:locationId/jobs', locationController.getJobsByLocationId);

module.exports = {
  locationRoutes
};
