window.onload = function () {
}

function cellClick (elem, e) {
	console.log(elem.getAttribute("id"))
	var cellId = elem.getAttribute("id")
    var message = {
        "cellId": cellId
    }
    window.webkit.messageHandlers.achievement.postMessage(message);	
}