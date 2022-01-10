const fs = require('fs');

let categories = require('../../../data/categorydata.json');

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET': {
            try {
                res.status(200).json({
                    success: true,
                    data: categories
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
