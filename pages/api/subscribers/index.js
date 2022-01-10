const fs = require('fs');

let authors = require('../../../data/authordata.json');

export default async (req, res) => {
    const { method, query } = req;

    switch (method) {
        case 'GET': {
            try {
                let data = authors.filter(res => res.username == query.username)[0]['subscribers'];
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
        case 'POST': {
            try {
                authors.forEach(res => {
                    if (res.username == query.username) {
                        if (res.subscribers.filter(res1 => res1 == query.email).length == 0) {
                            res.subscribers.push(query.email);
                        } else {
                            res.status(400).json({
                                success: false
                            })
                            return;
                        }
                    }
                })
                saveData();
                res.status(201).json({
                    success: true
                })
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

function saveData() {
    fs.writeFileSync('data/authordata.json', JSON.stringify(authors, null, 4));
}