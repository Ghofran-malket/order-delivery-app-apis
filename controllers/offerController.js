const Offer = require('../models/offerModel.js');

const createOffersList = async (req, res) => {
    const offersData = [
        {
            title: 'Offer 1',
            description: 'des',
            image: 'sddsdssd',
            discountPercentage: '10',
            price: '40',
            startDate: Date('2025-12-31T23:59:59.000Z'),
            expireDate: Date('2025-12-31T23:59:59.000Z'),
            category: 'Fruit',
            store: req.params.storeId
        },
        {
            title: 'Offer 2',
            description: 'des',
            image: 'sddsdssd',
            discountPercentage: '10',
            price: '40',
            startDate: Date('2025-12-31T23:59:59.000Z'),
            expireDate: Date('2025-12-31T23:59:59.000Z'),
            category: 'Fruit',
            store: req.params.storeId
        },
        {
            title: 'Offer 3',
            description: 'des',
            image: 'sddsdssd',
            discountPercentage: '10',
            price: '40',
            startDate: Date('2025-12-31T23:59:59.000Z'),
            expireDate: Date('2025-12-31T23:59:59.000Z'),
            category: 'Fruit',
            store: req.params.storeId
        },
    ];
    const offers = await Offer.insertMany(offersData);
    
    if(offers){
        res.status(201).json({message: 'Offer list is created'})
    } else {
        res.status(400).json({message: 'Failed'});
    }
}
module.exports = { createOffersList }