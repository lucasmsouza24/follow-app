function clearSession() {
    sessionStorage.removeItem('followapp-user');
    window.location.replace('./login.html');
}

function changeFile() {
    let amount = idInputFile.files.length;

    idLabelInputFile.innerHTML = `${amount} arquivo(s)`;
}