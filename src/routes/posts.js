let express = require('express');
let router = express.Router();
let sequelize = require('../models').sequelize;

let env = process.env || 'development';

const multer = require('multer');
express.json();

// multer config
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/upload/posts/")
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({storage});

// publish post route
router.post('/publish', upload.single("file"), (req, res, next) => {

    // body
    const content = req.body.content.replace("'", "''");
    const date_time = getDateTime();
    const fk_post = req.body.fk_post == '' ? null : req.body.fk_post;
    const fk_user = req.body.fk_user
    let post_img = null;
    
    try {
        post_img = "/posts/" + req.file.filename;
    } catch (error) {
        post_img = null;
    }

    let sql = "";

    if (post_img == undefined || post_img == null) {
        sql = `INSERT INTO post(content, date_time, fk_post, fk_user) VALUES
        ('${content}', '${date_time}', ${fk_post}, ${fk_user})`;
        console.log("null");
    } else {
        // querying
        sql = `INSERT INTO post(content, post_img, date_time, fk_post, fk_user) VALUES
        ('${content}', '${post_img}', '${date_time}', ${fk_post}, ${fk_user})`;
        console.log("not null")
    }
        
    sequelize.query(sql, {
        type: sequelize.QueryTypes.INSERT
    })
    .then(result => {
        res.redirect("/");
    })
    .catch(err => {
        res.json({
            status: "error",
            error: err
        })
    });


});

function getDateTime() {
    // get date and time
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let MM = today.getMinutes();
    let ss = today.getSeconds();
    date = yyyy + '-' + mm + '-' + dd;
    time = `${hh}:${MM}:${ss}`;
    let datetime = `${date} ${time}`;
    return datetime;
}

module.exports = router;