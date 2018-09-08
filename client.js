var GIFURLS = ["https://media.giphy.com/media/10thPb0Ycbqfqo/giphy.gif","https://media.giphy.com/media/3o6Ygn9aoNq2NzN87C/giphy.gif", "https://media.giphy.com/media/xUOxeTDAS04N7lRrHy/giphy.gif",
"https://media.giphy.com/media/3o6ZsZ5O7DSSWpsfo4/giphy.gif","https://media.giphy.com/media/26xBzXAMMtuAJ6vTi/giphy.gif","https://media.giphy.com/media/3o85xlpmZ9qSJe3a92/giphy.gif","https://media.giphy.com/media/l378zAQJ4AxXOZgaY/giphy.gif",
"https://i.giphy.com/media/l41lHDSvmwnQGDUD6/giphy.webp","https://i.giphy.com/media/3oEdv8zNFUJHGPNRHq/giphy.webp","https://media.giphy.com/media/l41lQGPh41y5aobn2/giphy.gif",
"https://media.giphy.com/media/xTiTnI8sdOkGMKzL44/giphy.gif","https://media.giphy.com/media/l41m4IRJqzgtFQ4O4/giphy.gif","https://i.giphy.com/media/3o85xluSS9Tw1auAP6/giphy.webp","https://i.giphy.com/media/xTiTnBHZGDu75XXUd2/giphy.webp", 
"https://media.giphy.com/media/3o6UBigHdm2Qf1BtiE/giphy.gif","https://media.giphy.com/media/l1J9CYd8C83r3NQWs/giphy.gif","https://media.giphy.com/media/26vIeYC291WKCoYOk/giphy.gif","https://media.giphy.com/media/3o6UB1VLGepNPVvvva/giphy.gif",
"https://media.giphy.com/media/xT0BKw60uEitOCHQli/giphy.gif","https://media0.giphy.com/media/xTiTnK9R1V5TR4GPni/giphy.gif","https://media.giphy.com/media/3o6UAYHdyr3C0I0axq/giphy.gif","https://media.giphy.com/media/26xBQ0H9qnLt7emJy/giphy.gif",
"https://media.giphy.com/media/l378bEsqgmNjfLDJC/giphy.gif","https://media.giphy.com/media/3o85xFF9CJQgxEceAg/giphy.gif","https://i.giphy.com/media/3o85xHpvtw7atu1SJa/giphy.webp", "https://i.giphy.com/media/l41m3kXt4r96Sb3AQ/giphy.webp",//
"https://media.giphy.com/media/l0GRjjcrCsZTEu34c/giphy.gif","https://media.giphy.com/media/3o6UBgcIcU6NqkxChi/giphy.gif","https://media.giphy.com/media/3o85xAuO9kQ9c4mBFK/giphy.gif","https://media.giphy.com/media/3oEdv1PTY2qPFcrddu/giphy.gif",
"https://media.giphy.com/media/3oEduWkrgeKRvpHOM0/giphy.gif","https://media3.giphy.com/media/l41m5CYd6sG8N4DwQ/giphy.gif","https://i.giphy.com/media/l41lK7WQersqEnGX6/giphy.webp","https://media.giphy.com/media/3o85xINQTYl6oc8QzS/giphy.gif"]


// Menu Image Slideshow
setInterval(changeMenuGIF, 400);
var gifindex = 0;
function changeMenuGIF() {
    var img = document.getElementById("menu-image");
    img.setAttribute("src", GIFURLS[gifindex]);
    gifindex = (gifindex + 1) % GIFURLS.length;
}

var startBtn = document.querySelector(".menu button");
startBtn.addEventListener("click", function () {
    document.getElementById("menu-screen").style.display = 'none';
    document.getElementById("game-screen").style.display = 'block';
    console.log("Game running...");
    var giftable = createGifTable();
    console.log(giftable);

    // a closure is used to give "flipCard" access to "giftable"
    var flipCard = function () {
        console.log("Card flipped: " + this.id);
        console.log("Change to gif: " + giftable[this.id]);
        var card = document.getElementById(this.id);
        var img = card.children[0];
        img.setAttribute("src", giftable[this.id]);
    }
    // a closure is used in "dealCards" to allow access "flipCard" while assigning an event listener to each card
    var dealCards = function () {
        var gameboard = document.getElementById("gameboard");
        for (let i = 0; i < 25; i++) {
            let card = document.createElement("div");
            let id = (i < 12 ? i+1 : i)
            if (i !== 12) {
                let cardbg = document.createElement("img");
                cardbg.setAttribute("src","https://images.pexels.com/photos/376533/pexels-photo-376533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
                card.appendChild(cardbg);
                card.setAttribute("class", "card");
                card.setAttribute("id", id);
                card.addEventListener("click", flipCard);
            } else {
                let p1 = document.createElement("p");
                let p2 = document.createElement("p");
                p1.innerText = "SCORE";
                p2.innerText = 0;
                p2.setAttribute("id", "score-value");
                card.appendChild(p1);
                card.appendChild(p2);
                card.setAttribute("class", "score-card");
            }
            gameboard.appendChild(card);
        }
    };
    dealCards();    
});




// create a hash table of gifs for card faces
function createGifTable() {
    var gifset = new Set();
    while (gifset.size < 12) {
        let url = GIFURLS[getRandomInt(GIFURLS.length)];
        gifset.add(url);
    }
    var gifarray = Array.from(gifset);
    var gifarray = shuffle(gifarray.concat(gifarray));4
    var shuffled = shuffle(gifarray);
    giftable = {};
    for (var i=0; i<24; i++) {
        giftable[i+1] = shuffled[i];
    }
    return giftable;
 }

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

 // Fisher-Yates Shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}














/*
"http://gph.is/1USHCER","http://gph.is/2l1zkk9","http://gph.is/1USIfhs","http://gph.is/1Ji7GVO","http://gph.is/1nM4Mkx",
"http://gph.is/1JiavWV","https://gph.is/1TPSYYT","http://gph.is/1SxDnjX","http://gph.is/1USFywB","http://gph.is/1USIoSa",
"http://gph.is/2l1NMbM","http://gph.is/1ZhQXWU","http://gph.is/1USGukk","http://gph.is/1USJAVA","http://gph.is/1UT9cl6",
"http://gph.is/2jlSqh0","http://gph.is/2l1Uyyx","http://gph.is/2ksAMcS","http://gph.is/1KuIaj5","http://gph.is/1Q1Y8lC",
"http://gph.is/1ZYpgVu","http://gph.is/1UQKWzy","http://gph.is/1UQBrAo","http://gph.is/1EhpwIy","http://gph.is/1USyujz",
"http://gph.is/2jlOiNR","http://gph.is/1Z7LG4i","http://gph.is/1nLXfT0","http://gph.is/1SPigYF","http://gph.is/2kaFyyJ",
"http://gph.is/2kGh4tq","http://gph.is/1USGPUc","http://gph.is/2jlNtoo","http://gph.is/1USJduj","http://gph.is/2kGyztz",
"http://gph.is/1TIMqO7","https://gph.is/1UQxWK9","https://gph.is/2oq1ZPG","http://gph.is/2ugCiTt","http://gph.is/1E3gC1c",
"https://gph.is/1VV7rDL","http://gph.is/1PZan43","http://gph.is/1ZnKEGM","http://gph.is/2jlW7mR","http://gph.is/1nS1ixx",
"https://gph.is/2jlTKR3","http://gph.is/1TRYjik","http://gph.is/16OKOYP","http://gph.is/1CEQvws","http://gph.is/19iZj7E",
"https://gph.is/14t7RsD","http://gph.is/1jcQoso","http://gph.is/16xUpI3","http://gph.is/1aQbojB","https://gph.is/13kzW2z",
"http://gph.is/I9XUJK","http://gph.is/17KPdxc","http://gph.is/17VZ15K","http://gph.is/14t7Jtl","http://gph.is/16sUn3r",
"http://gph.is/I3xUzj","http://gph.is/1gQ9mGM","https://gph.is/1j7cN9J","http://gph.is/1nomg1h","http://gph.is/2mb0Ux8",
"https://gph.is/2rNdaUa","http://gph.is/1xPHG0v","http://gph.is/1SxrA58","http://gph.is/1nROHdG","https://gph.is/XJawwI",
"https://gph.is/1P8ovBr","https://gph.is/2hpYvKE","https://gph.is/1MeoXA3"]
*/