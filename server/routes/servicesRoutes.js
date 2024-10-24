const express = require('express');

const authController = require('../controllers/authController');
const biographyController = require('../controllers/biographyController');
const qualificationController = require('../controllers/qualificationController');
const imageController = require('../controllers/imageController');
const serviceController = require('../controllers/serviceController');
const pricingController = require('../controllers/pricingController');

const upload = require('../utils/upload')
const serviceRouter = express.Router()

serviceRouter.route('/about')
    .post(authController.protect, biographyController.createBiography)
    .get(biographyController.getBiography)
    .put(authController.protect, biographyController.updateBiography)
    .delete(authController.protect, biographyController.deleteBiography)
    
serviceRouter.route('/qualification')
    .post(authController.protect, qualificationController.createQualification)
    .get(qualificationController.getQualifications)

serviceRouter.route('/qualification/:id')
    .get(qualificationController.getQualification)
    .delete(authController.protect, qualificationController.deleteQualification)
    .put(authController.protect, qualificationController.updateQualification)

serviceRouter.route('/gallery')
    .post(authController.protect, upload.single('image'), imageController.addImage)
    .get(imageController.getImages)

serviceRouter.route('/gallery/:id')
    .delete(authController.protect, imageController.deleteImage)

serviceRouter.route('/services')
    .post(authController.protect, serviceController.addService)
    .get(serviceController.getServices)

serviceRouter.route('/services/:id')
    .put(authController.protect, serviceController.updateService)
    .delete(authController.protect, serviceController.deleteService)


serviceRouter.route('/pricing')
    .post(authController.protect, pricingController.addPricing)
    .get(pricingController.getPricing)

serviceRouter.route('/pricing/:id')
    .put(authController.protect, pricingController.updatePricing)
    .delete(authController.protect, pricingController.deletePricing)

module.exports = serviceRouter;
