document.addEventListener('plusready', function() {
	var userList=$getItem('user').userList;
	$alertTitle(userList[0].status);
	userList=$randomArr(userList);
	for(var i=0;i<userList.length;i++){
		var status;
		var backBgClass;
		switch(userList[i].status){
			case 'civilian':
			status='村民';
			break;
			case 'werWolf':
			status='狼人'
			break;
			case 'guard':
			status='守卫'
			break;
			case 'prophet':
			status='预言家'
			break;
			case 'witch':
			status='女巫'
			break;
		}
		var pStr="<p class='num'>"+(i+1)+"</p><p class='status'>"+status+"</p>"
		var div=document.createElement('div');
		var face=document.createElement('div');
		var cardBack=document.createElement('div')
		cardBack.className='cardBack'
		face.className='face '+userList[i].status;
		div.appendChild(cardBack)
		div.appendChild(face);
		div.className='card '+userList[i].status;
		div.innerHTML+=pStr;
		$getById('putStatus').appendChild(div);
	}
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
				$removeClassName($getByClassName('cardBack')[i],'hidden');
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
				}
			}else{
				for(var i=0;i<userList.length;i++){
					$removeClassName($getByClassName('cardBack')[i],'hidden');
				}
			}
			clickNum++
		}else if(_self.id=='next'){
			var user={};
			user.userList=userList;
			$setItem('user',user);
			$alertTitle('游戏，开始了')
		}
	})
})
