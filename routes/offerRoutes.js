const express = require('express');
const router = express.Router();

const { createOffersList } = require('../controllers/offerController');

router.post('/:storeId/createOffers', createOffersList);

module.exports = router;