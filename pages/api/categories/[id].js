const fs = require('fs');

let categories = require('../../../data/categorydata.json');

export default async (req, res) => {
    const { query: { id }, method } = req;

    switch (method) {
        case 'GET': {
            try {
                let category = categories.filter(data => data.code === id);
                res.status(200).json({
                    success: true,
                    data: category
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    error: error
                })

            }
            break;
        }
        default: {
            res.status(400).json({
                success: false
            })

        }
    }
}
