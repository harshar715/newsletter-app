const fs = require('fs');
const formidable = require('formidable');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
let news = require('../../data/newsdata.json');
let authors = require('../../data/authordata.json');

const endpoint = async (req, res) => {

    const form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, function (err, fields, files) {

        var oldPath = files.file.filepath;
        var newPath = 'public/images/' + files.file.newFilename;
        var rawData = fs.readFileSync(oldPath);

        fs.writeFile(newPath, rawData, async function (err) {
            if (err) {
                console.log(err)
                return res.send("Error")
            } else {
                news.forEach(resl => {
                    if (resl.id == req.query.id) {
                        resl.image = files.file.newFilename;
                    }
                })
                saveData();
                let obj = news.filter(resl => resl.id == req.query.id)[0];
                var transporter = nodemailer.createTransport(smtpTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    auth: {
                        user: 'harshar715@gmail.com',
                        pass: 'lrxzjnesfjqcymot'
                    }
                }));

                var mailOptions = {
                    from: 'harshar715@gmail.com',
                    to: authors[0]['subscribers'].join(','),
                    subject: 'New post from ' + authors[0]['name'] + ' - ' + obj['title'],
                    html: `
                    <div>
                        <h2>${obj['title']}</h2>
                        <div style="margin-top: 20px;">
                            <h3>${obj['content'][0]['title']}</h3>   
                        </div>
                        <a style="font-size: 18px; padding: 10px; min-width: 200px; border: 2px solid #000; border-radius: 5px; color: #fff; background-color: #000;" href="${process.env.BASE_URI}/detail/${obj['id']}"> Click Here To Read More </a>
                    </div>
                    `
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                return res.send("Successfully uploaded")
            }
        })
    });
}

export const config = {
    api: {
        bodyParser: false,
    },
};
export default endpoint;

function saveData() {
    fs.writeFileSync('data/newsdata.json', JSON.stringify(news, null, 4));
}

function encodeImageFileAsURL(file) {
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    // console.log('data:image/jpg;base64,' + new Buffer(bitmap).toString('base64'))
    return 'data:image/jpg;base64,' + new Buffer(bitmap).toString('base64');
}