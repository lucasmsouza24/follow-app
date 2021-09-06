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

// login onclick
function btnLogin() {
    let email = inputEmail.value;
    let pwd = inputPwd.value;

    authUser({
        email, 
        pwd
    })
}

// request /user/createUser
function createUser(user) {
    axios.post('/user/create', user)
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

function authUser(user) {
    // request to auth user
    axios.post('/user/auth', user)
    .then(function (res) {
        let data = res.data;

        if (data.status == "error") {
            showWarningBox(data.msg, "fail");
        } else {
            // login
            sessionStorage.setItem('followapp-user', data.id);
            showWarningBox('Carregando...', 'success');
            setTimeout(function() {
                window.location.replace("./feed.html");
            }, 800);
        }
    })
    .catch(function (err) {
        console.log(err);
    })
}

// show warning box
function showWarningBox(text, type) {
    resetWarningBox();
    // add new class
    idwarningbox.classList.add("warning-box");
    idwarningbox.classList.add(type);

    // add new text
    idwarningbox.innerHTML = text;
}

function resetWarningBox() {
    // reset class
    idwarningbox.classList.remove("fail"); 
    idwarningbox.classList.remove("success"); 
    idwarningbox.classList.remove("warning-box"); 
    idwarningbox.innerHTML = "";
}