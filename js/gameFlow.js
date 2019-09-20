document.addEventListener('plusready', function() {
	var wolfDieNum = 0;
	var civilian = 0;
	var gold=0;
	var user = $getItem('user')
	var userList = user.userList;
	userList.forEach(function(value, index) {
		if(value.survive==false){
			if(value.status=='werWolf'){
				wolfDieNum++
			}else if(value.status=='civilian'){
				civilian++
			}else{
				gold++
			}
		}
	})
  	if(wolfDieNum==user.statusNum[1]){
		$alertTitle('游戏结束，好人获胜')
		user.winner='好人'
		$setItem('user',user)
		$openHtml('gameOver.html');
	}else if(civilian==user.statusNum[0]||gold==user.statusNum[2]){
		$alertTitle('游戏结束，狼人获胜')
		user.winner='狼人';
		$setItem('user',user);
		$openHtml('gameOver.html');
		
	}
	if (!user.day) {
		$getById('day').innerText = 1;
		user.day = 1;
	} else {
		$getById('day').innerText = user.day;
	}
	var textList = [
		'狼人睁眼',
		'女巫睁眼',
		'预言家睁眼',
		'守卫睁眼',
		'竞选警长',
		'警徽选择',
		'警长发言',
		'所有人发言',
		'投票'
	]
	if (Number($getById('day').innerText) > 1) {
		textList.splice(4, 2);
	}
	textList.forEach(function(value, index) {
		{
			var btn = document.createElement('a');
			btn.className = 'btn flowBtn';
			btn.innerText = value;
			btn.dataset.steep = index;
			$getByClassName('mainDiv')[0].appendChild(btn);
			if (index === 3) {
				var line = document.createElement('div');
				line.className = 'line';
				$getByClassName('mainDiv')[0].appendChild(line);
			}
		}
	})
	document.addEventListener('click', function(e) {
		var _slef = e.target;
		if (_slef.className.indexOf('flowBtn') != -1) {
			if (!$getItem('user').steep) {
				var steep = 0;
				user.steep = 0;
			} else {
				var steep = $getItem('user').steep
			}
			if (_slef.dataset.steep != steep) {
				$alertTitle("请按照步骤进行操作，OK？");
			} else {
				var whoEnter = _slef.innerText.substring(0, 2);
				user.whoEnter = whoEnter;
				if (whoEnter == '竞选' || whoEnter == '警长' || whoEnter == '所有') {
					user.steep = ++user.steep;
					$setItem('user', user);
				} else {
					$setItem('user', user);
					$openHtml('roleAction.html');
				}
			}
		} else if (_slef.id == 'backBtn') {
			$openHtml('selectStatus.html');
		}
	})
})
