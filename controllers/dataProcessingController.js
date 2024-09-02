const processData = require('../jobs/dataProcessingJob');

const processDataRequest = async (req, res) => {
    try {
        const data = req.body;
        const result = await processData(data);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    processDataRequest,
};
