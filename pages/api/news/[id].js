const fs = require('fs');

let news = require('../../../data/newsdata.json');

export default async (req, res) => {
    const { query: { id }, method } = req;

    switch (method) {
        case 'GET': {
            try {
                let data = news.filter(data => data.id == id)[0];
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
