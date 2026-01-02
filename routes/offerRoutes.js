const express = require('express');
const router = express.Router();

const { createOffersList, getOffersList } = require('../controllers/offerController');

router.post('/:storeId/createOffers', createOffersList);
router.get('/getOffers', getOffersList);

module.exports = router;