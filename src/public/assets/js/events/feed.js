function clearSession() {
    sessionStorage.removeItem('followapp-user');
    window.location.replace('./login.html');
}