(function () {
	window.homeInit = homeInit;
	function homeInit () {
		var content = document.getElementById('content');
		var clientHeight = document.body.clientHeight;
		var clientWidth = document.body.clientWidth;

		var initHeight = clientHeight - 200
		var tmpToolbarHeight = initHeight+"px"
		var contentHeight = initHeight + "px";

		// content.style["min-height"] = (initHeight + 100) + "px";
		tmpToolbar.style.height = tmpToolbarHeight
		content.style.top = contentHeight;
		
		meImage.style.top = contentHeight;
		// meImage.style["padding-right"] = (clientWidth - 80) + "px";

		var scrollHeight = document.body.scrollTop;
		tmpToolbar.style.height = (initHeight - scrollHeight) + "px"

		window.onscroll = scroll;
		content.onscroll = scroll;
		scroll();
		function scroll () {

			var scrollHeight = document.body.scrollTop;

			if((initHeight - scrollHeight) < 100){
				tmpToolbar.className = "layout item-center ";
				// tmpToolbar.innerText = "努力，只为不成为当初厌恶！";
				tmpToolbar.innerText = "努力，只为能够真实的存在！";
			}else{
				tmpToolbar.className = "layout center column";
				tmpToolbar.innerHTML = 	'<p>再远，也不忘为何出发</p>'+
										'<p>再累，也不忘初心</p>'+
										'<p>寻找自己的路</p>'+
										'<p>积淀自己的故事</p>'
			}
			// console.log(initHeight - scrollHeight)
			
			if((initHeight - scrollHeight) < 60){
				tmpToolbar.style.height = "60px";
				fixedTopView.className = "layout boxShadow "
				
				meImage.style.position = "fixed"
				meImage.style.top = "60px";
			}else{
				tmpToolbar.style.height = (initHeight - scrollHeight) + "px"
				fixedTopView.className = "layout center"
				
				meImage.style.position = "relative"
				meImage.style.top = contentHeight;

				// meImage.style.top = (initHeight - scrollHeight) + "px";
			}
		}
	}
})()
homeInit();

(function () {
	sendEmail.onclick=function () {
		alert("sendEmail")
		console.log("sendEmail")
		// window.location = "myprotocol://lala";
		window.webkit.messageHandlers.myApp.postMessage({"message":"Hello there", "email":"382361909@qq.com"});
	}
})()