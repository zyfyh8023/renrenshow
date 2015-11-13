/*
*
*	Global Variable
*
*/
var current_time;

var $footTime = $('#timer');
var curren_second = parseInt($footTime.attr('time'));

function getDate(date) {
	var Y = date.getFullYear();
	var M = date.getMonth()+1;
	if (M < 10) M = '0' + M;
	var D = date.getDate();
	if (D < 10) D = '0' + D;
	var h = date.getHours();
	if (h < 10) h = '0' + h;
	var m = date.getMinutes();
	if (m < 10) m = '0' + m;
	return (Y+'-'+M+'-'+D+' '+h+':'+m);
}

function SetCurrentTime() {
	var date = new Date();
	date.setTime(curren_second);
	current_time = getDate(date);
	var s = date.getSeconds();
	if (s < 10) s = '0' + s;
	current_time += ':' + s;
	$footTime.text(current_time);
	curren_second += 1000;
}

$(document).ready(function(){
	SetCurrentTime();
	setInterval(SetCurrentTime, 1000);
});