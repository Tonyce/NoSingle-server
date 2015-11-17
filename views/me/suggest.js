
window.onload = function () {
    // var suggestDom = document.getElementById('suggest');
    // suggestDom.addEventListener('focus', 
    //     function(){
    //         // document.addEventListener('touchend', docTouchend,false);
    //         // window.scrollTo(0, 0);
    //         // document.body.scrollTop = 0;
    //     }, false);
}


var concelButton = document.getElementById('cancel');
    concelButton.onclick = function (e, elem) {
        var message = {
            "type":"cancel"
        }
        window.webkit.messageHandlers.suggest.postMessage(message);
    }

var commitButton = document.getElementById('commit');
    commitButton.onclick = function (e, elem) {
        var suggestDom = document.getElementById('suggest');
        var suggest = suggestDom && suggestDom.value
        var message = {
            "type": "commit",
            "suggest": suggest || ""
        }
        window.webkit.messageHandlers.suggest.postMessage(message);
    }
