const fs = require('fs');

let news = require('../../../data/newsdata.json');

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET': {
            try {
                res.status(200).json({
                    success: true,
                    data: news
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
                let obj = {...JSON.parse(req.body)};
                obj.id = news.length > 0 ? Math.max(...news.map(x => x.id)) + 1 : 0;
                obj.createdAt = new Date().toISOString();
                news.push(obj);
                saveData();
                res.status(201).json({
                    success: true,
                    data: obj
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
    fs.writeFileSync('data/newsdata.json', JSON.stringify(news, null, 4));
}