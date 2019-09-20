document.addEventListener('plusready', function() {
	var user=$getItem('user')
	var userList=user.userList;
	userList=$randomArr(userList);
	$createCard('putStatus',userList,'selectStatus');
	document.addEventListener("touchstart", function(e) {
		var _self = e.target;
		if (_self.id == "startGame" || _self.id == 'backBtn') {
			$addClassName(_self, 'click');
		}
	})
	var clickNum=0;
	document.addEventListener('touchend', function(e) {
		var _self = e.target;
		if (_self.id == 'backBtn') {
			$removeClassName(_self, 'click');
			$openHtml('selectPlayersNum.html');
		}else if(_self.className=='cardBack'){
			for(var i=0;i<userList.length;i++){
				if(clickNum%2===1){
					$addClassName($getByClassName('cardBack')[i],'hidden')
				}else{ 
					$removeClassName($getByClassName('cardBack')[i],'hidden');
				}
			}
			$addClassName(_self,'hidden');
		}else if(_self.className.indexOf("card")!=-1){
			$removeClassName(_self.getElementsByClassName('cardBack')[0],'hidden')	
		}else if(_self.parentNode.className.indexOf("card")!=-1){
			$removeClassName(_self.parentNode.getElementsByClassName('cardBack')[0],'hidden')	
		}
		else if(_self.id=='lookAll'){
			if(clickNum%2===0){
				for(var i=0;i<userList.length;i++){
					$addClassName($getByClassName('cardBack')[i],'hidden');
					_self.innerText='上帝闭眼哦嚯嚯'
				}
			}else{
				for(var i=0;i<userList.length;i++){
					$removeClassName($getByClassName('cardBack')[i],'hidden');
					_self.innerText='上帝开眼呀哈哈'
				}
			}
			clickNum++
		}else if(_self.id=='next'){
			user.userList=userList;
			$setItem('user',user);
			$alertTitle('游戏，开始了')
			$openHtml('gameFlow.html');
		}
	})
})
