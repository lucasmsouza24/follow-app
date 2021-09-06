// request user name by id
axios.get(`/user/getUserNameById${id}`)
.then(response => {
    response = response.data;

    if (response.status == "ok") {
        // success request
        idUserItem.innerHTML = "@" + response.data.nick;
        idTextArea.setAttribute('placeholder', `followapp/${response.data.nick}>`);
    } else {
        // error request
        console.log(response.msg);
    }
})
.catch(err => {
    console.log(err);
})