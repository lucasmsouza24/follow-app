// login onclick
function btnLogin() {
    let email = inputEmail.value;
    let pwd = inputPwd.value;

    const user = {
        email, 
        pwd
    }

    // auth user request
    axios.post('/user/auth', user)
    .then(function (res) {
        let data = res.data;

        // error request
        if (data.status == "error") {
            showWarningBox(data.msg, "fail");
        } else {
            // success request and login redirect
            sessionStorage.setItem('followapp-user', data.id);
            showWarningBox('Carregando...', 'success');
            setTimeout(function() {
                window.location.replace("./feed.html");
            }, 500);
        }
    })
    .catch(function (err) {
        console.log(err);
    })
}