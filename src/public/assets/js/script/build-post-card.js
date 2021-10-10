function buildPostCard(card) {

    // handling some img and liked data
    card.profile_img = card.profile_img || "users/default-profile.png"
    let post_img_url = card.post_img != null ? `<img class="post-card-content-img" src="./upload/${card.post_img}">` : "";
    let star_image = card.liked ? "starred.png" : "star.png";

    // getting feed container
    let feed = document.querySelector("#idFeedPosts");

    // creating and adding post card to feed
    let divCard = `<div id="post${card.id}" class="post-card"></div>`;
    feed.innerHTML += divCard

    // top
    document.querySelector(`#post${card.id}`).innerHTML += `
        <!-- top -->
        <div class="post-card-top">
            <img class="post-card-top-img" src="./upload/${card.profile_img}">
            <div class="post-card-top-user" onlick="redirectToUser(${card.fk_user})">@${card.nick}</div>
            <div class="post-card-top-date">${card.date_time}</div>
        </div>
    `;

    // content
    document.querySelector(`#post${card.id}`).innerHTML += `
        <!-- content -->
        <div class="post-card-content">
            <div class="post-card-content-text">${card.content}</div>` +
            post_img_url
        + `</div>`;

    // bottom
    document.querySelector(`#post${card.id}`).innerHTML += `
        <!-- bottom -->
        <div class="post-card-bottom">
            <!-- star -->
            <div class="post-card-bottom-stars card-button">
                <div class="post-card-bottom-stars-content" onclick="sendLike(${card.id})">
                    <img id="idPostLikeImg${card.id}" src="./assets/img/${star_image}" alt="">
                    <span id="idPostLikeSpan${card.id}">${card.likes}</span>
                </div>
            </div>
            <!-- commnent -->
            <div class="post-card-bottom-comments card-button">comentar</div>
        </div>
    `;
}

function sendLike(postid) {
    postImg = document.querySelector(`#idPostLikeImg${postid}`)
    postSpan = document.querySelector(`#idPostLikeSpan${postid}`)
    // console.log(postSpan)

    if (postImg.getAttribute("src") === "./assets/img/starred.png") {
        postImg.src = "./assets/img/star.png";
        postSpan.innerHTML = Number(postSpan.innerHTML) - 1;
    } else {
        postImg.src = "./assets/img/starred.png";
        postSpan.innerHTML = Number(postSpan.innerHTML) + 1;

        // request to send like
        axios.post('/posts/like', { 
            postid,
            userid: sessionStorage.getItem('followapp-user')});
    };
}
