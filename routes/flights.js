const express = require('express');
const router = express.Router();

const flightsCtrl = require('../controllers/flights')


/* GET users listing. */
router.get('/', flightsCtrl.index);
router.get('/add', flightsCtrl.new);
router.get('/:id', flightsCtrl.show);
router.post('/', flightsCtrl.create);


module.exports = router;
