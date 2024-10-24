const express = require('express')

const defaultIntervalController = require('../controllers/defaulIntervalController');
const changesController = require('../controllers/changesController');
const authController = require('../controllers/authController')

const intervalRouter = express.Router()

intervalRouter.route('/')
    .post(defaultIntervalController.addInterval)
    .get(defaultIntervalController.getInterval)
    .put(defaultIntervalController.updateInterval)

intervalRouter.route('/days')
    .get(defaultIntervalController.getDays)

intervalRouter.route('/change')
    .post(changesController.addChange)
    .get(changesController.getChanges)

intervalRouter.route('/change/:id')
    .put(changesController.updateChange)
    .delete(changesController.deleteChange)
    
module.exports = intervalRouter;