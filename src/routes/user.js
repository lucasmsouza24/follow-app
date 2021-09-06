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

	let format = /[!@#$%^&*() +\-=\[\]{};':"\\|,.<>\/?]+/;
	// checking if arguments are missing
	if ((nick == "") || (email == "") || (pwd == "")) {
		// missing fields response
		res.json({
			"status": "error",
			"msg": "Preencha todos os campos."
		});

	} else if (format.test(nick)) {
		// checking if nick has special characters
		res.json({
			"status": "error",
			"msg": "O apelido não deve conter caracteres especiais."
		});
	} else if(nick.length < 3) {
		// checking nick length
		res.json({
			"status": "error",
			"msg": "Apelido deve ter pelo menos 3 caracteres."
		});
	} else if ((!email.endsWith(".com") && !email.endsWith(".com.br")) || email.indexOf("@") == -1 || email.length < 7) {
		// checking if email is valid
		res.json({
			"status": "error",
			"msg": "Formato de email desconhecido"
		})
	} else if (pwd.length < 6) {
		// checking if password has at least 6 caracters
		res.json({
			"status": "error",
			"msg": "Uma senha deve ter pelo menos 6 caractéres"
		})
	} else {
		// success validation
		
		// inserting user on database
		const sql = `INSERT INTO user(nick, email, pwd) VALUES (
		trim('${nick}'), 
		trim('${email}'), 
		MD5('${pwd}')
		);`;

		sequelize.query(sql, {
			type: sequelize.QueryTypes.INSERT
		}).then(function(result) {
			// success response
			res.json({
				"status": "ok",
				"msg": `Usuário cadastrado`
			})

		}).catch(function (err) {
			// fail response

			let message = "";
			if (err.errors[0].message == "user.nick must be unique") {
				message = "Apelido em uso!";
			} else if (err.errors[0].message == "user.email must be unique") {
				message = "Email em uso!";
			}
			res.json({
				"status": "error",
				"msg": message,
				"error": err
			})
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