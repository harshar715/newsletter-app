const fs = require('fs');

let authors = require('../../../data/authordata.json');

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET': {
            try {
                res.status(200).json({
                    success: true,
                    data: authors
                });
            } catch (error) {
                res.status(400).json({
                    success: false,
                    error: error
                })

            }
            break;
        }
    }
}