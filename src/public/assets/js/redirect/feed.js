let id = sessionStorage.getItem('followapp-user');

if (id == null) {
    window.location.replace('./login.html');
} else {
    // window.location.replace('./feed.html');
}