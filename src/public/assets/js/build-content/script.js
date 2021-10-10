function buildContent(type) {
    
    switch (type) {
        case "explorer":
            buildExplorer();
            break;
        case "feed":
            buildFeed();
            break;
        case "users":
            buildUsers();
            break;
        case "topics":
            buildTopics();
            break;
    }
}

function buildExplorer() {

     // querying all posts
     axios.post('/posts/explorer-posts/', { userid: sessionStorage.getItem('followapp-user') })
     .then(result => {
         
         // itering each result to build all cards
         result.data.forEach(element => buildPostCard(element));
 
     })
}

function buildFeed() {
    console.log("buildFeed");
}

function buildUsers() {
    console.log("buildUsers");
}

function buildTopics() {
    console.log("buildTopics");
}