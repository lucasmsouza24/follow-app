let express = require('express');
let router = express.Router();
let sequelize = require('../models').sequelize;

let env = process.env || 'development';

// publish post route
router.post('/publish', (req, res, nex) => {
    // body
    const content = req.body.content
    const post_img = req.body.post_img
    const date_time = req.body.datetime
    const fk_post = req.body.fk_post
    const fk_user = req.body.fk_user

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
        res.json({
            "status": "ok",
            "msg": `Publicado com sucesso`
        })
    })
    .catch(err => {
        res.json({
            status: "error",
            error: err
        })
    });

});

module.exports = router;