function Civilian() {
	this.status = "civilian";
	this.survive = true;
	this.police = false;
	this.guard = false;
	this.look = false;
}
var civilian = new Civilian();
var werWolf = new Civilian();
var guard = new Civilian();
var prophet = new Civilian();
var witch = new Civilian();
werWolf.status = 'werWolf';
guard.status = 'guard';
prophet.status = 'prophet';
witch.status = 'witch';
witch.posison = 1;
witch.antidote = 1;

function $getById(id) {
	return document.getElementById(id);
}

function $getByTagName() {
	if (arguments.length === 1) {
		return document.getElementsByTagName(arguments[0])
	} else if (arguments.length === 2) {
		return $getById(arguments[0]).getElementsByTagName(arguments[1])
	}
}

function $getByClassName() {
	if (arguments.length === 1) {
		return document.getElementsByClassName(arguments[0])
	} else if (arguments.length === 2) {
		return $getById(arguments[0]).getElementsByClassName(arguments[1])
	}
}

function $alertTitle(string) {
	plus.nativeUI.toast(string)
}

function $openHtml(url, slide) {
	slide = slide == undefined ? 'slide-in-right' : slide;
	plus.webview.open(url, 'new', {}, slide, 200);
}

function $addClassName(el, className) {
	el.classList.add(className);
}

function $removeClassName(el, className) {
	el.classList.remove(className);
}

function $setItem(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

function $getItem(key) {
	return JSON.parse(localStorage.getItem(key))
}

function $randomArr(arr) {
	var length = arr.length,
		randomIndex,
		temp;
	while (length) {
		randomIndex = Math.floor(Math.random() * (length--));
		temp = arr[randomIndex];
		arr[randomIndex] = arr[length];
		arr[length] = temp
	}
	return arr;
}

function $createElment() {
	if (arguments.length === 1) {
		var el = document.createElement('div');
		el.className = arguments[0];
	} else if (arguments.length === 3) {
		var el = document.createElement(arguments[0]);
		el[arguments[1]] = arguments[2];
	}
	return el;
}

function $createCard(box, userList, userType) {
	for (var i = 0; i < userList.length; i++) {
		var status;
		switch (userList[i].status) {
			case 'civilian':
				status = '村民';
				break;
			case 'werWolf':
				status = '狼人'
				break;
			case 'guard':
				status = '守卫'
				break;
			case 'prophet':
				status = '预言家'
				break;
			case 'witch':
				status = '女巫'
				break;
		}
		var pStr = "<p class='num'>" + (i + 1) + "</p><p class='status'>" + status + "</p>"
		var div = $createElment('card ' + userList[i].status);
		var face = $createElment('face ' + userList[i].status)
		div.appendChild(face);
		div.innerHTML += pStr;
		if (userType == 'roleAction') {
			var die = $createElment('die');
			var look = $createElment('look');
			var defand = $createElment('defand');
			var poison = $createElment('poison');
			var antidote = $createElment('antidote');
			var state = $createElment('state');
			var police = $createElment('police');
			state.appendChild(poison);
			state.appendChild(defand);
			state.appendChild(antidote);
			div.appendChild(state);
			div.appendChild(die);
			div.appendChild(look);
			div.appendChild(police);
		} else if (userType = 'selectStatus') {
			var cardBack = $createElment('cardBack');
			cardBack.innerText = i + 1;
			div.appendChild(cardBack);
		}
		$getById(box).appendChild(div);
	}
}

function $roleActive(_self, prev, clickEl, showElName, className, index) {
	if (_self.className.indexOf(clickEl) != -1) {
		$removeClassName(prev.getElementsByClassName(showElName)[0], className)
		$addClassName(_self.getElementsByClassName(showElName)[0], className)
		prev = _self;
		nowBeCao = Number(_self.getElementsByClassName(index)[0].innerText) - 1;
	} else if (_self.parentNode.className.indexOf(clickEl) != -1) {
		$removeClassName(prev.getElementsByClassName(showElName)[0], className)
		$addClassName(_self.parentNode.getElementsByClassName(showElName)[0], className)
		prev = _self.parentNode;
		nowBeCao = Number(_self.parentNode.getElementsByClassName(index)[0].innerText) - 1;
	} else if (_self.parentNode.parentNode.className.indexOf(clickEl) != -1) {
		$removeClassName(prev.getElementsByClassName(showElName)[0], className)
		$addClassName(_self.parentNode.parentNode.getElementsByClassName(showElName)[0], className)
		prev = _self.parentNode.parentNode;
		nowBeCao = Number(_self.parentNode.parentNode.getElementsByClassName(index)[0].innerText) - 1;
	}
	var returnList = [prev, nowBeCao]
	return returnList;
}
