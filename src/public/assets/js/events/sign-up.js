// sign up onclick
function btnSignup() {
    let nick = inputNick.value;
    let email = inputEmail.value;
    let pwd = inputPwd.value;

    const user = {
        nick,
        email,
        pwd
    }

    // create user request
    axios.post('/user/create', user)
    .then(function (res) {
        let log = res.data;

        // error request
        if (log.status == "error") {
            showWarningBox(log.msg, "fail");
        } else {
            // success request
            showWarningBox("Usuário cadastrado, redirecionando página...", "success");

            // redirect to login page
            setTimeout(function() {
                window.location.replace("./login.html");
            }, 1500)
        }

    }).catch(function (err) {
        showWarningBox(err, "success");
    })
}