document.addEventListener('plusready', function() {
	var prev = $getByClassName('choose')[0]
	var userList=[];
	var isChoose=false;
	document.addEventListener("touchstart",function(e){
		var _self = e.target;
		if(_self.id=="startGame"||_self.id=='backBtn'){
			$addClassName(_self,'click');
		}
	})
	var statusNum = [];
	document.addEventListener('touchend', function(e) {
		var _self = e.target;
		if (_self.id == 'backBtn') {
			$removeClassName(_self,'click');
			$openHtml('index.html');
		} else if (_self.className.indexOf('choose') != -1) {
			isChoose=true;
			$removeClassName(prev, 'click');
			$addClassName(_self, 'click');
			prev = _self;
			userList = [];
			for (var i = 0; i < 3; i++) {
				userList.push(civilian);
				userList.push(werWolf);
			}
			userList.push(witch);
			userList.push(guard);
			userList.push(prophet);
			switch (parseInt(_self.innerText)) {
				case 9:
					statusNum = [3, 3, 3];
					break;
				case 10:
					userList.push(civilian);
					statusNum = [4, 3, 3]
					break;
				case 11:
					userList.push(civilian);
					userList.push(werWolf);
					statusNum = [4, 4, 3]
					break;
			}
			var pText = "<p>" + "村民数量:" + statusNum[0] + "</p>" + "<p>" + "狼人数量:" + statusNum[1] + "</p>" + "<p>" + "神的数量:" +
				statusNum[2] + "</p>"
			$getById("showNum").innerHTML = pText;
		}else if(_self.id=="startGame"){
			$removeClassName(_self,'click');
			if(!isChoose){
				$alertTitle('请选择人数再进行游戏。');
			}else{	
				var user={};
				user.userList=userList;
				user.statusNum=statusNum;
				$setItem('user',user);
				$alertTitle('游戏开始,哦嚯嚯嚯。');
				$openHtml("selectStatus.html"); 
			}
			
		}
	})
})
