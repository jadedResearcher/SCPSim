//it's a kiddie pool that allows teleportation to set destinations.
//just want to use it as a way to auto spawn more d subjects.
function scp120(max_x,max_y,scale){
	this.imageString = "";
	this.max_x = max_x;
	this.max_y = max_y;
	this.x = Math.floor(max_x/2);
	this.y = Math.floor(max_y/2); //spawner is set to be located in center of chamber
	this.age = 0;
	this.scale = scale;
	this.dead = false;
	
	this.image = function(){
		if(this.imageString == ""){
			this.imageString = "120.png";
		}
		return this.imageString;
	}
	
	this.tick = function(){
		this.age += 1;
		if(this.age%10 == 1){
			var d = new dClass(this.x,this.y,canvas.width,canvas.height,this.scale);
			subjects.push(d);
		}
	}

}
scp120.prototype = Object.create(subjectPrototype.prototype);
