idNavBar.innerHTML = `
    <img class="logo" src="./assets/img/follow-icon.png" alt="follow-icon">

    <div class="nav-item profile">
        <img src="./assets/img/default-profile.png">
        <div id="idUserItem">Perfil</div>
    </div>

    <div class="link-group">    
        <div class="nav-item active">Feed</div>
        <div class="nav-item">Assuntos</div>
        <div class="nav-item">Usuários</div>
        <div class="nav-item getout" onclick="clearSession()">Sair</div>
    </div>
`