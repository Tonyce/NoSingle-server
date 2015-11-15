var infoButton = document.getElementById('info');
    infoButton.onclick = function (e, elem) {
        var authorId = this.getAttribute("author-id")
        var authorName = this.getAttribute("author-name")
        var authorImage = this.getAttribute("author-image")
        var authorWord = this.getAttribute("author-word")
        var authorBaseInfo = {
            "type":"user", 
            "userId": authorId,
            "name": authorName,
            "imageUrl": authorImage,
            "believeWord": authorWord
        }
        window.webkit.messageHandlers.myApp.postMessage(authorBaseInfo);
    }

var thumbUpButton = document.getElementById('thumbUp');
thumbUpButton.onclick = function () {
    var currentColor = document.getElementById("thumbUp").children[0].style.fill;
    console.log(currentColor)
    if (currentColor == "#9e9e9e" || currentColor == "rgb(158, 158, 158)") {
        document.getElementById("thumbUp").style["border-color"] = "#2196F3"
        document.getElementById("thumbUp").children[0].style.fill = "#2196F3";
    }else {
        document.getElementById("thumbUp").children[0].style.fill = "#9E9E9E";
        document.getElementById("thumbUp").style["border-color"] = "#9E9E9E";
    }
}

var favoriteButton = document.getElementById('favorite');
favoriteButton.onclick = function () {
    var currentColor = document.getElementById("favorite").children[0].style.fill;
    console.log(currentColor)
    if (currentColor == "#9e9e9e" || currentColor == "rgb(158, 158, 158)") {
        document.getElementById("favorite").style["border-color"] = "#2196F3"
        document.getElementById("favorite").children[0].style.fill = "#2196F3";
    }else {
        document.getElementById("favorite").children[0].style.fill = "#9E9E9E";
        document.getElementById("favorite").style["border-color"] = "#9E9E9E"
    }
}