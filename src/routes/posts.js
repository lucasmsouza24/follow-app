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
    // const date_time = getDateTime();
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
        ('${content}', NOW(), ${fk_post}, ${fk_user})`;
        // console.log("null");
    } else {
        // querying
        sql = `INSERT INTO post(content, post_img, date_time, fk_post, fk_user) VALUES
        ('${content}', '${post_img}', NOW(), ${fk_post}, ${fk_user})`;
        // console.log("not null")
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

// get explorer posts
router.post('/explorer-posts', (req, res, next) => {

    console.log("user: ", req.body.userid)

    let sql = `SELECT p.id, u.nick, u.id as 'fk_user', u.profile_img, p.post_img, p.date_time, p.content, p.post_img, (SELECT l2.id FROM likes as l2 WHERE l2.fk_post = p.id AND l2.fk_user = ${req.body.userid}) as 'liked', (SELECT count(l.id) FROM likes AS l WHERE l.fk_post = p.id) AS 'likes', p.date_time FROM post AS p INNER JOIN user AS u ON u.id = p.fk_user ORDER BY date_time DESC LIMIT 20;`

    // querying
    sequelize.query(sql, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
        for (let post of result) {
            post.date_time = post.date_time.toISOString().slice(0, 10);
            post.liked = post.liked != null
            // console.log(post.date_time)
        }
        res.json(result);
    })
    .catch(err => {
        res.json(err);
    })

})

// like
router.post('/like', (req, res, next) => {

    // attributes
    let user = req.body.userid;
    let post = req.body.postid;

    // sql query
    const sql = `INSERT INTO likes(fk_user, fk_post) VALUES
    (${user}, ${post}) `;

    // querying
    sequelize.query(sql, {type: sequelize.QueryTypes.INSERT})
})

module.exports = router;