const fs = require('fs');

let authors = require('../../../data/authordata.json');

export default async (req, res) => {
    const { query: { id }, method } = req;

    switch (method) {
        case 'GET': {
            try {
                let data = authors.filter(data => data.username === id);
                res.status(200).json({
                    success: true,
                    data: data
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
