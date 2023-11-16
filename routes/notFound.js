const express = require('express');

const router = express.Router();

const errorsController = require('../controllers/errors');

router.use(errorsController.get404);

module.exports = router;
