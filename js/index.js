document.addEventListener('plusready', function() {
	//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
	var ul = $getByTagName('announcementDiv', 'ul')[0];
	ul.innerHTML += ul.innerHTML;
	var liHeight = getComputedStyle(ul.children[0], null).height;
	var ulHeight = parseInt(liHeight) * ul.children.length / 2;
	var speed = ulHeight / 192
	var closeTime = null;
	closeTime = setInterval(function() {
		if (parseInt(ul.style.marginTop) <= -ulHeight) {
			ul.style.marginTop = 0;
		} else {
			ul.style.marginTop = (parseInt(ul.style.marginTop) - speed) + 'px'
		}
	}, 20)
	$getById('startGame').ontouchstart = function() {
		$addClassName(this, 'click');

	}
	$getById('startGame').ontouchend = function() {
		$removeClassName(this, 'click');
		$openHtml('selectPlayersNum.html');
	}
});
