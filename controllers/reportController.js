const Report = require('../models/reportModel.js');

const report = async (req, res) => {
    const { orderId, genieId, customerId, description, reports } = req.body;

    //check if data not null
    if(orderId == null || genieId == null || customerId == null || description == null || reports == null){
        res.status(500).json({ error: 'Some data is null' });
    }

    //create the report doc
    const report = await Report.create({
        orderId: orderId,
        genieId: genieId,
        customerId: customerId,
        description: description,
        reports: reports
    });

    if(report){
        res.status(201).json({
            id: report._id,
            orderId: report.orderId,
            genieId: report.genieId,
            customerId: report.customerId,
            description: report.description,
            reports: report.reports
        });
    } else {
        res.status(400).json({message: 'invalid report data'});
    }

}

module.exports = { report };
