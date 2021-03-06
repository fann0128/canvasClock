var dom = document.querySelector('#clock');
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;
var rem = width / 200;

function draw_background() {
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.lineWidth = 5*rem;
	ctx.arc(0,0,r-5,0,2*Math.PI,false);
	ctx.stroke();

	var clockHours = [3,4,5,6,7,8,9,10,11,12,1,2];

	ctx.textAlign="center";
	ctx.textBaseline="middle";
	ctx.font = 18 * rem + "px Arial";
	clockHours.forEach(function(number,i) {
		var x = Math.cos(30*i*Math.PI / 180) * (r - 23 * rem);
		var y = Math.sin(30*i*Math.PI / 180) * (r - 23 * rem);
		ctx.fillText(number,x,y);
	});

	for (var i = 0; i <= 60; i++) {

		var x = Math.cos(6*i*Math.PI / 180) * (r - 10 * rem);
		var y = Math.sin(6*i*Math.PI / 180) * (r - 10 * rem);
		ctx.beginPath();
		if(i % 5 === 0){
			ctx.fillStyle = '#000';
			ctx.arc(x,y,2,0,2*Math.PI,false);
		}else{
			ctx.fillStyle = '#ccc';
			ctx.arc(x,y,2,0,2*Math.PI,false);
		}
		ctx.fill();
	}
}

function  drawHour(hour , minute) {
	ctx.save();
	ctx.beginPath();
	var rad = Math.PI / 6 * hour;

	rad += minute * Math.PI / 360;
	ctx.rotate(rad);
	ctx.lineWidth = 6 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0,0);
	ctx.lineTo(0,-r / 2);
	ctx.stroke();
	ctx.restore();
}

function  drawMinute(minute) {
	ctx.save();
	ctx.beginPath();
	var radMin = Math.PI * minute / 30;
	ctx.rotate(radMin);
	ctx.lineWidth = 4 * rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0,0);
	ctx.lineTo(0,-r / 1.5);
	ctx.stroke();
	ctx.restore();
}

function drawSec(Sec) {
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = '#c14543';
	var rad = Math.PI / 30 * Sec;
	ctx.rotate(rad);
	ctx.moveTo(-2 * rem,0);
	ctx.lineTo(2 * rem,0);
	ctx.lineTo(1 * rem, - r + 16 * rem);
	ctx.lineTo(-1 * rem, - r + 16 * rem);
	ctx.fill();
	ctx.restore();
}

function drawDot(){
	ctx.beginPath();
	ctx.fillStyle = '#ccc';
	ctx.arc(0,0,3,0,2*Math.PI,false);
	ctx.fill();
}

function draw(){
	ctx.clearRect(0,0,width,height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	draw_background();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSec(second);
	drawDot();
	ctx.restore();
}
draw();
setInterval(draw,1000);