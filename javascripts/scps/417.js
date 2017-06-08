// a tree. if it has fruit and you try to remove it, they all burst into insects.
//every X ticks, generates a new 417-1 somewhere on the upper portion of the tree.
function scp417(x,y,max_x,max_y,scale){
	this.imageString = "";
	this.max_x = max_x;
	this.max_y = max_y;
	this.x = x;
	this.y = y;
	this.age = 0;
	this.health = 200;
	this.fruit = [];
	this.scale = scale;
	this.dead = false;
	
	this.image = function(){
		if(this.imageString == ""){
			this.imageString = "417.png";
			if(this.x == 0 && this.y == 0){
				this.randomLocation(); //init location
			}
		}
		return this.imageString;
	}
	
	this.makeFruit = function(){
		var x3 = this.randomNumberNear(this.x, 50*this.scale)+50*this.scale;
		var y3 = this.randomNumberNear(this.y, 25*this.scale);
		var a = new fruit417(x3, y3, this.max_x,this.max_y, this, this.scale);
		this.fruit.push(a);
		subjects.push(a);
	}
	
	this.remove = function(remover){
		this.dead = true;
		for(var i = 0; i< this.fruit.length; i++){
			this.fruit[i].burstNow();  //all my fruit burst if i am attacked.
		}
		
	}
	
	this.tick = function(){
		this.age += 1;
		if(this.age%24 == 1){
			this.makeFruit();
			this.makeFruit();
			this.makeFruit();
		}
	}
	
	this.traits = function(){
		return ["Plant"];
	}
	
}

scp417.prototype = Object.create(subjectPrototype.prototype);
