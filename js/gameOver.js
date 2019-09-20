document.addEventListener('plusready', function() {
	var user=$getItem('user');
	var log=user.log;
	log.forEach(function(value,index){
		var log=$createElment('log');
		log.innerText=value;
		$getById('putLog').appendChild(log);
	})
	$getById('winner').innerText=user.winner;
	document.addEventListener('touchend',function(e){
		var _self=e.target;
		if (_self.id == 'backBtn') {
			$openHtml('gameFlow.html'); 
		}else if(_self.id=='again'){
			$openHtml('selectPlayersNum.html'); 
		}else if(_self.id=='close'){
			var webiew = plus.webview.currentWebview()
			webiew.back()
		}
	})
})