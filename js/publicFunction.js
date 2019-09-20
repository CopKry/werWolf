function Civilian(){
	this.status="civilian";
	this.survive=true;
	this.police=false;
	this.guard=false;
	this.look=false;
}
var civilian=new Civilian();
var werWolf=new Civilian();
var guard=new Civilian();
var prophet=new Civilian();
var witch=new Civilian();
werWolf.status='werWolf';
guard.status='guard';
prophet.status='prophet';
witch.status='witch';
witch.posison=1;
witch.antidote=1;
function $getById(id){
	return document.getElementById(id);
}
function $getByTagName(){
	if(arguments.length===1){
		return document.getElementsByTagName(arguments[0])
	}else if(arguments.length===2){
		return $getById(arguments[0]).getElementsByTagName(arguments[1])
	}
}

function $getByClassName(){
	if(arguments.length===1){
		return document.getElementsByClassName(arguments[0])
	}else if(arguments.length===2){
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

function $addClassName(el,className){
	el.classList.add(className);
}

function $removeClassName(el,className){
	el.classList.remove(className);
}

function $setItem(key,value){
	localStorage.setItem(key,JSON.stringify(value))
}

function $getItem(key){
	return JSON.parse(localStorage.getItem(key)) 
}