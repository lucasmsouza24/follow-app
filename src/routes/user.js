// dependencias
let express = require('express');
let router = express.Router();
let sequelize = require('../models').sequelize;

let env = process.env.NODE_ENV || 'development';

// cria novo usuário no bando de dados
router.post('/createUser', (req, res, next) => {
	
	// req params
	nick = req.body.nick;
	email = req.body.email;
	pwd = req.body.pwd;

	// checking if arguments are missing
	if (nick !== undefined && email !== undefined && pwd !== undefined) {

		// inserting user on database
		const sql = `INSERT INTO user(nick, email, pwd) VALUES ('${nick}', '${email}', MD5('${pwd}'));`;

		sequelize.query(sql, {
			type: sequelize.QueryTypes.INSERT
		}).then(function(result) {
			// success response
			res.json({
				"status": "ok",
				"msg": `user ${result[0]} inserted`
			})

		}).catch(function (err) {
			// fail response
			res.json({
				"status": "error",
				"msg": err.errors[0].message,
				"error": err
			})
		});

	} else {
		// missing fields response
		res.json({
			"status": "error",
			"msg": "missing fields"
		});
	}

})

// exemplo de rota
router.get('/testRoute', function(req, res, next) {

    // exemplo de resposta em json
    let obj = {
        nome: "Bikolas",
        sobrenome: "Narcha",
        idade: 320
    }
    
    res.json(obj)

    // exemplo de consulta no banco
    // let sql = "";

	// if (env == "dev") {
	// 	sql = "SELECT * FROM table;";
	// } else {
    //     sql = "";
    // }

	// sequelize.query(instrucaoSql, {
	// 	type: sequelize.QueryTypes.SELECT
	// })
	// .then(resultado => {
	// 	res.json(resultado);
	// }).catch(erro => {
	// 	console.error(erro);
	// 	res.status(500).send(erro.message);
	// })
})

module.exports = router;