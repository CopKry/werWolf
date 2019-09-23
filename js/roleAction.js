document.addEventListener('plusready', function() {
	var user = $getItem('user');
	var userList = user.userList;
	var steep = user.steep;
	user.steep = ++steep;
	var whoEnter = user.whoEnter;
	$createCard('putStatus', userList, 'roleAction');
	var nowBeCao;
	var witchDo;
	var witchIndex;
	var prev = $getByClassName('putStatus', 'card')[0];
	userList.forEach(function(value, index) {
		if (!value.survive) {
			$getByClassName('die')[index].style.opacity = 1;
		}
		if (value.look) {
			$getByClassName('look')[index].style.opacity = 1;
		}
		if(value.police){
			$getByClassName('police')[index].style.opacity = 1;
		}
		if (whoEnter == '女巫' && value.status == 'witch') {
			$addClassName($getByClassName('selectBox')[0], 'show')
			if (value.posison === 1) {
				var posison = $createElment('posison');
				posison.className += ' witchDiv'
				$getById('putWitchSelect').appendChild(posison)
				witchIndex = index;
			}
			var nothing = $createElment('nothing');
			nothing.innerText = '咸鱼真好o(^▽^)o'
			nothing.className += ' witchDiv'
			$getById('putWitchSelect').appendChild(nothing)
			if (value.antidote === 1) {
				var antidote = $createElment('antidote');
				antidote.className += ' witchDiv';
				$getById('putWitchSelect').appendChild(antidote);
				witchIndex = index;
			}
			var button = $createElment('button', 'id', 'witchSure');
			button.innerText = '确认选择';
			$getById('putWitchSelect').appendChild(button);
		}
	})
	var witchPrev = $getByTagName('putWitchSelect', 'div')[0];
	document.addEventListener('touchend', function(e) {
		var _self = e.target;
		if (_self.id == 'backBtn') {
			$openHtml("gameFlow.html");
		} else if (_self.className.indexOf('witchDiv') != -1) {
			$removeClassName(witchPrev, 'show')
			$addClassName(_self, 'show');
			if (_self.className.indexOf('nothing') != -1) {
				witchDo = '咸鱼';
			} else if (_self.className.indexOf('antidote') != -1) {
				witchDo = '救'
			} else {
				witchDo = '毒';
			}
			witchPrev = _self;
		} else if (_self.id == 'witchSure') {
			if (witchDo) {
				$removeClassName($getByClassName('selectBox')[0], 'show');
				$alertTitle('你选择了'+witchDo)
			} else {
				$alertTitle('请进行选择');
			}
		}
		switch (whoEnter) {
			case '狼人':
				var returnList = $roleActive(_self, prev, 'card', 'die', 'show', "num");
				prev = returnList[0];
				nowBeCao = returnList[1];
				break;
			case '女巫':
				if (witchDo == '咸鱼') {
					nowBeCao = 1;
				} else if (witchDo == '毒') {
					var returnList = $roleActive(_self, prev, 'card', 'poison', 'show', "num");
					prev = returnList[0];
					nowBeCao = returnList[1];
				} else if (witchDo == '救') {
					var returnList = $roleActive(_self, prev, 'card', 'antidote', 'show', "num");
					prev = returnList[0];
					nowBeCao = returnList[1];
				}
				break;
			case '预言':
				var returnList = $roleActive(_self, prev, 'card', 'look', 'show', "num");
				prev = returnList[0];
				nowBeCao = returnList[1];
				break;
			case '守卫':
				var returnList = $roleActive(_self, prev, 'card', 'defand', 'show', "num"); 
				prev = returnList[0];
				nowBeCao = returnList[1];
				break;
			case '警徽':
				var returnList = $roleActive(_self, prev, 'card', 'police', 'show', "num");
				prev = returnList[0];
				nowBeCao = returnList[1];
				break;
			case '投票':
				var returnList = $roleActive(_self, prev, 'card', 'die', 'show', "num");
				prev = returnList[0];
				nowBeCao = returnList[1];
			break;
		}
		if (_self.id == 'next') {
			if (typeof nowBeCao=="undefined") {
				$alertTitle('请操作人员')
			} else {
				if(!user.log){
					user.log=[]
				}
				switch (whoEnter) {
					case '狼人':
						userList[nowBeCao].survive = false;
						var log='第'+user.day+'天：狼人杀了'+(nowBeCao+1)+'号玩家,这个玩家的身份是'+userList[nowBeCao].status;
						user.log.push(log)
						break;
					case '女巫':
						if (witchDo == '救') {
							userList[witchIndex].antidote = 0;
							userList[nowBeCao].survive = true;
							var log='第'+user.day+'天：女巫救了'+(nowBeCao+1)+'号玩家,这个玩家的身份是'+userList[nowBeCao].status;
							user.log.push(log)
						} else if (witchDo == '毒') {
							userList[witchIndex].posison = 0;
							userList[nowBeCao].survive = false;
							var log='第'+user.day+'天：女巫毒杀了'+(nowBeCao+1)+'号玩家,这个玩家的身份是'+userList[nowBeCao].status;
							user.log.push(log)
						}
						break;
					case '预言':
						userList[nowBeCao].look = true;
						var log='第'+user.day+'天：预言家看了'+(nowBeCao+1)+'号玩家,知道了他的身份是'+userList[nowBeCao].status;
						user.log.push(log)
						break;
					case '守卫':
						userList[nowBeCao].guard = true;
						userList[nowBeCao].survive = true;
						var log='第'+user.day+'天：守卫守卫了'+(nowBeCao+1)+'号玩家,这个玩家的身份是'+userList[nowBeCao].status;
						user.log.push(log)
						break;
					case '警徽':
						userList[nowBeCao].police = true;
						var log='第'+user.day+'天：大家选了'+(nowBeCao+1)+'号玩家当了警长,这个玩家的身份是'+userList[nowBeCao].status;
						user.log.push(log)
						break;
					case '投票':
						userList[nowBeCao].survive = false;
						user.day=++user.day;
						user.steep=0;
						var log='第'+user.day+'天：大家票出了'+(nowBeCao+1)+'号玩家,这个玩家的身份是'+userList[nowBeCao].status;
						user.log.push(log)
						break;
				}
				$setItem('user', user);
				$openHtml('gameFlow.html');
			}
		}
	})
})
