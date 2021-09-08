function clearSession() {
    sessionStorage.removeItem('followapp-user');
    window.location.replace('./login.html');
}

function changeFile() {
    let amount = idInputFile.files.length;

    idLabelInputFile.innerHTML = `${amount} arquivo(s)`;
}

// function publish() {
//     // get input values
//     let content = idTextArea.value;
//     let post_img = idInputFile.files[0] || null;
//     let fk_post = null;
//     let fk_user = sessionStorage.getItem('followapp-user');
//     let datetime = getDateTime();
    
//     // building body
//     const body = {
//         fk_user,
//         content,
//         post_img,
//         datetime,
//         fk_post
//     }
    
//     // request
//     axios.post('/posts/publish', body)
//     .then(res => {
//         console.log(res);
//         alert("publicação realizada com sucesso!");
//         window.location.reload();
//     })
//     .catch(res => {
//         console.log(res);
//         window.location.reload();
//     })
// }

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