// sign up onclick
function btnSignup() {
    let nick = inputNick.value;
    let email = inputEmail.value;
    let pwd = inputPwd.value;

    createUser({
        nick,
        email,
        pwd
    })
}

// request /user/createUser
function createUser(user) {
    axios.post('/user/createUser', user)
    .then(function (res) {
        let log = res.data;

        if (log.status == "error") {
            showWarningBox(log.msg, "fail");
        } else {
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

// show warning box
function showWarningBox(text, type) {
    // reset class
    idwarningbox.classList.remove("fail"); 
    idwarningbox.classList.remove("success"); 

    // add new class
    idwarningbox.classList.add("warning-box");
    idwarningbox.classList.add(type);

    // add new text
    idwarningbox.innerHTML = text;
}