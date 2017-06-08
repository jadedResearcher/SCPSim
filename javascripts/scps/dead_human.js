//d class personel are alive and human
//should be a circle with an expression and a color
//yellow happy, red rage, green sick, whatever.
//can and will eat anything edible. approaches edible food, eats it if in range.
// can be dead.

function deadHuman(x,y,max_x,max_y,scale){
	this.imageString = "";
	this.max_x = max_x;
	this.max_y = max_y;
	this.x = x;
	this.y = y;
	this.age = 0;
	this.scale = scale;

	this.traits = function(){
		return ["Human","Dead"];
	}
	
	this.tick = function(){
		this.age += 1;
		if(this.age > 200){
			this.remove(this);
		}
	}
	
	this.image = function(){
		if(this.imageString == ""){
			if(this.x < 0){
				this.randomLocation();
			}
			this.imageString = "d_dead.png"
		}
		if(this.age > 100){
			this.imageString = "d_skel.png"
		}
		return this.imageString;
	}

	
}
   
deadHuman.prototype = Object.create(subjectPrototype.prototype);

