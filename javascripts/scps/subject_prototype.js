//has all default methods and values for something to be kept in the subject array.
function subjectPrototype(){
	this.imageString = "";
	this.max_x = max_x;
	this.max_y = max_y;
	this.x = 0;
	this.y = 0;
	this.age = 0;
	this.dead = false;
	this.health = 100;
	this.scale = 1.0;
}
subjectPrototype.prototype.moveTowardsSCP = function(scp){
	if(!scp){
		return;
	}
	var dx = scp.x - this.x;
	var dy = scp.y - this.y;
	var angle = Math.atan2(dy, dx)
	var xVelocity = this.velocity * Math.cos(angle)*this.scale;
	var yVelocity = this.velocity * Math.sin(angle)*this.scale;
	var newX = this.x + xVelocity;
	var newY = this.y + yVelocity;
	this.move(newX, newY);
}

subjectPrototype.prototype.moveAwaySCP = function(scp){
	if(!scp){
		return;
	}
	var dx = scp.x - this.x;
	var dy = scp.y - this.y;
	var angle = Math.atan2(dy, dx)
	var xVelocity = this.velocity * Math.cos(angle) *this.scale;
	var yVelocity = this.velocity * Math.sin(angle) *this.scale;
	var newX = this.x - xVelocity;
	var newY = this.y - yVelocity;
	this.move(newX, newY);
}

//TODO return nearest scp with this trait
subjectPrototype.prototype.lookForSCPWithTrait = function(trait){
		var ret;
		var distance = 9999;
		for(var i = 0; i<subjects.length; i++){
			if(subjects[i] != this && subjects[i].dead == false && subjects[i].traits().includes(trait)){
				var tmp = subjects[i];
				var d = Math.sqrt( (tmp.x-this.x)*(tmp.x-this.x) + (tmp.y-this.y)*(tmp.y-this.y) );
				if(Math.abs(d) < distance){
					distance = Math.abs(d);
					ret = tmp;
					if(distance < (this.velocity * this.scale * 2)){
						return ret; //close enough, don't go through everything if you've found something that close.
					}
				}
			}	
		}
		return ret;
}

subjectPrototype.prototype.nearestSCP = function(){
		var ret;
		var distance = 9999;
		for(var i = 0; i<subjects.length; i++){
			if(subjects[i] != this && subjects[i].dead == false){
				var tmp = subjects[i];
				var d = Math.sqrt( (tmp.x-this.x)*(tmp.x-this.x) + (tmp.y-this.y)*(tmp.y-this.y) );
				if(Math.abs(d) < distance){
					distance = Math.abs(d);
					ret = tmp;
					if(distance < (this.velocity * this.scale * 2)){
						return ret; //close enough, don't go through everything if you've found something that close.
					}
				}
			}	
		}
		return ret;
}

subjectPrototype.prototype.furthestSCP = function(){
		var ret;
		var distance = 0;
		for(var i = 0; i<subjects.length; i++){
			if(subjects[i] != this && subjects[i].dead == false){
				var tmp = subjects[i];
				var d = Math.sqrt( (tmp.x-this.x)*(tmp.x-this.x) + (tmp.y-this.y)*(tmp.y-this.y) );
				if(Math.abs(d) > distance){
					distance = Math.abs(d);
					ret = tmp;
					if(distance > (this.max_x/2)){
						return ret; //close enough, don't go through everything if you've found something that far.
					}
				}
			}	
		}
		return ret;
}

subjectPrototype.prototype.moveTowardsXY = function(x,y){
	var dx = x - this.x;
	var dy = y - this.y;
	var angle = Math.atan2(dy, dx)
	var xVelocity = this.velocity * Math.cos(angle) *this.scale;
	var yVelocity = this.velocity * Math.sin(angle) *this.scale;
	var newX = this.x + xVelocity;
	var newY = this.y + yVelocity;
	this.move(newX, newY);
}

subjectPrototype.prototype.move = function(newX, newY){
	var wiggle = 50 * this.scale;
	if(newX > 0+wiggle && newX < this.max_x-wiggle){
		this.x = newX;
	}
	
	if(newY > 0 + wiggle && newY < this.max_y - wiggle){
		this.y = newY;
	}
}


subjectPrototype.prototype.proccessDead = function(){
	if(this.dead == true){
		removeFromArray(subjects, this);
	}
}

subjectPrototype.prototype.traits = function(){
	return ["None"];
}

subjectPrototype.prototype.onRemove = function(scp){
	//by default, don't do anything special when you destroy something
	return false;
}

subjectPrototype.prototype.remove = function(remover){
	this.dead = true; //let subclasses react to this fact appropriately
}

subjectPrototype.prototype.tick = function(){
	this.age += 1;	
}

subjectPrototype.prototype.damage = function(amount, damager){
	this.health += -1* amount;	
}

subjectPrototype.prototype.heal = function(amount){
	this.health += amount;	
}

subjectPrototype.prototype.randomLocation = function(){
	//generate x and y between 0 and max x and max y
	var wiggle = 0 * this.scale;
	this.x = Math.floor(Math.random()*(this.max_x-wiggle));
	this.y = Math.floor(Math.random()*(this.max_y-wiggle));
}

subjectPrototype.prototype.randomNumberNear = function(x, radius){
	var amount = Math.floor(Math.random()*radius);
	if(Math.random()*100 > 50){
		return x - amount;
	}else{
		return x + amount;
	}

}


subjectPrototype.prototype.image = function(){
	if(this.imageString == ""){
		this.randomLocation(); //init location
		this.imageString = "default.png"
	}
	return this.imageString;
}

	
subjectPrototype.prototype.render = function(context){
	addImageTag(this.image())
	var img=document.getElementById(this.image());
	var w = img.width * this.scale;
	var h = img.height * this.scale;
	context.drawImage(img,this.x,this.y,w,h);
}

subjectPrototype.prototype.apocalpyse = function(){
	return "";
}

