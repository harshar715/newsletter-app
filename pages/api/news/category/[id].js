const fs = require('fs');

let news = require('../../../../data/newsdata.json');

export default async (req, res) => {
    const { query: { id }, method } = req;

    switch (method) {
        case 'GET': {
            try {
                if(id == 'today' || id == 'yesterday' || id == 'latest_posts_and_reviews') {
                    res.status(200).json({
                        success: true,
                        data: news
                    });
                } else {
                    let data = news.filter(data => data.category === id);
                    res.status(200).json({
                        success: true,
                        data: data
                    });
                }
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
