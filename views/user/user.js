
window.onload = function () {
	console.log("load...")
	var underlines = document.getElementsByClassName('cmn-t-underline')
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
	// var timer = setTimeout(function () {
	// 	// var underLine = document.getElementById('underline');
	// 	console.log("before:",underline.className)
	// 	underLine.className = underLine.className + " animate";	
	// 	console.log(underline.className)
	// 	clearTimeout(timer)
	// }, 100)
}

// var body = document.getElementsByTagName('body')
// document.addEventListener("DOMContentLoaded", function(event) {
//     console.log("body fully loaded and parsed");
// });
// setTimeout(function () {
// 	underline.style.width = "100%"
// }, 5000)
// 	