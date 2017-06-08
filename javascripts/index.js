var canvas;
var context;

window.onload = function() {
	canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    drawAutumnDay();
    //fade_in($("#girl"));
    hanaBarbara($("#flies"));
};

function drawAutumnDay(){
    var img=document.getElementById("bg");
    console.log(img);
    var tmp_canvas = getBufferCanvas();
    console.log(tmp_canvas);
	var tmp_context = tmp_canvas.getContext("2d");
	console.log(tmp_context);
	tmp_context.drawImage(img,0,0);
	console.log("before copy");
	copyTmpCanvasToRealCanvas(tmp_canvas);
}

function getBufferCanvas(){
	var tmp_canvas = document.createElement('canvas');
	tmp_canvas.height = canvas.height;
	tmp_canvas.width = canvas.width;
	return tmp_canvas;
}

function copyTmpCanvasToRealCanvas(tmp_canvas){
	context.drawImage(tmp_canvas, 0, 0);
}

function test(){
	  $( "#girl" ).animate({
    opacity: 0.25,
    left: "+=50",
  }, 5000, function() {
    // Animation complete.
  });
}

function fade_in(obj){
	obj.animate({opacity: 1.0}, 10000, function(){});
}

function flicker(obj){
	var x = randomMovement();
	var y = randomMovement();
	var opacity = Math.random()/4+0.5;
	obj.animate({left: x, top: y, opacity: opacity}, {queue:false, duration:500, complete:function(){flicker(obj)}});
}

function hanaBarbara(obj){
	var x = bigRandomMovement();
	obj.animate({left: x}, {queue:false, duration:5000, complete:function(){hanaBarbara(obj)}});
}
function bigRandomMovement(){
	var num = Math.random() *100;
	if(Math.random()>.5){
		num = num * -1;
	}
	return "+=" + num;
}


function randomMovement(){
	var num = Math.random() *10;
	if(Math.random()>.5){
		num = num * -1;
	}
	return "+=" + num;
}
