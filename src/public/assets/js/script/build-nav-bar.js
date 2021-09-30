
idNavBar.innerHTML = `
    <img class="logo" src="./assets/img/follow-icon.png" alt="follow-icon">

    <div class="nav-item profile">
        <img src="./assets/img/default-profile.png">
        <div id="idUserItem">Perfil</div>
    </div>

    <div class="link-group">    
        <div id="idfeed" class="nav-item" onclick="redirectTo('./feed.html?location=feed')">Feed</div>
        <div id="idexplorer" class="nav-item" onclick="redirectTo('./feed.html?location=explorer')">Explorar</div>
        <div id="idtopics" class="nav-item" onclick="redirectTo('./feed.html?location=topics')">Assuntos</div>
        <div id="idusers" class="nav-item" onclick="redirectTo('./users.html')">Usuários</div>
        <div class="nav-item getout" onclick="clearSession()">Sair</div>
    </div>
`

// adicionando div ativa
const urlParams = new URLSearchParams(window.location.search);
const getLocation = urlParams.get('location') || "users";
let activeNavItem = document.querySelector("#id" + getLocation);

activeNavItem.classList.add("active");

// build content
buildContent(getLocation);

// função de redirect
function redirectTo(url) {
    window.location.href = url;
}