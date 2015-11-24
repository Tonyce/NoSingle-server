
window.onload = function () {

	var underlines = document.getElementsByClassName('cmn-t-underline');
	for (var i = 0; i < underlines.length; i++) {
		var underline = underlines[i];
		(function(underline, i){
			var timer = setTimeout(function () {
				console.log("before:",underline.className)
				underline.className = underline.className + " animate";	
				console.log(underline.className)
				clearTimeout(timer)
			}, 500 * i)
		})(underline, i)
	};

	var sendEmail = document.getElementById('sendEmail');
	sendEmail.onclick = function () {
		var email = document.getElementById('email').innerText;
		window.webkit.messageHandlers.userEmail.postMessage({"message":"Hello there", "email": email});
	}
	
	var addFriend = document.getElementById('addFriend');
	addFriend.onclick = function () {
		window.webkit.messageHandlers.userAddFriend.postMessage({"message":"addFriend", "email":"382361909@qq.com"});
	}
	var focus = document.getElementById('focus');
	focus.onclick = function () {
		// window.webkit.messageHandlers.userProfile.postMessage({"message":"focus", "email":"382361909@qq.com"});
	}
}




// var body = document.getElementsByTagName('body')
// document.addEventListener("DOMContentLoaded", function(event) {
//     console.log("body fully loaded and parsed");
// });
// setTimeout(function () {
// 	underline.style.width = "100%"
// }, 5000)
// 	