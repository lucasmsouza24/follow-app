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
    console.log("buildExplorer");
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