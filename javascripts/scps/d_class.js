//d class personel are alive and human
//should be a circle with an expression and a color
//yellow happy, red rage, green sick, whatever.
//can and will eat anything edible. approaches edible food, eats it if in range.
// can be dead.

function dClass(x, y,max_x,max_y,scale){
	this.imageString = "";
	this.max_x = max_x;
	this.max_y = max_y;
	this.x = x;
	this.y = y;
	this.age = 0;
	this.velocity = 50;
	this.happy = 0;
	this.health = 100;
	this.scale = scale;
	this.remover;
	this.dead = false;

	
	this.traits = function(){
		return ["Human","Alive"];
	}
	
	this.destroySCP = function(){
		var near_subjects = getSubjectsNear(this, this.velocity * this.scale );
		for(var i = 0; i<near_subjects.length; i++){
			if(this.happy < 1 && near_subjects[i].dead == false && near_subjects[i].traits().includes("Food")){
				this.happy += 5;
				near_subjects[i].remove(this);
			}	
		}
	}
	
	this.remove = function(remover){
		this.remover = remover;
		this.dead = true;	
	}
	
	
	this.damage = function(amount, damager){
		this.health += -1* amount;	
		this.happy += -1 * amount;
	}

	this.heal = function(amount){
		this.health += amount;	
		this.happy += amount;
	}
	
	this.tick = function(){
		this.age += 1;
		if(this.health < 0){
			this.remove(this);
		}
		
		if(this.happy > 0){
			this.happy += -1;
		}
		this.destroySCP();
		
		if(this.happy < 1){
			this.moveTowardsSCP(this.lookForSCPWithTrait("Food"));
		}
		var scary = this.lookForSCPWithTrait("Monster")
		if(scary){
			this.happy += -5;
			this.moveAwaySCP(scary);
		}

	}
	
	this.proccessDead = function(){
		if(this.dead == true){
			//replace myself with a dead human
			removeFromArray(subjects, this);
			var noDeadBody = this.remover.onRemove(this);
			if(noDeadBody == false){
				subjects.push(new deadHuman(this.x, this.y, this.max_x, this.max_y, this.scale));
			}
		}
	}
	
	this.image = function(){
		if(this.imageString == ""){
			if(this.x == 0 && this.y == 0){
				this.randomLocation(); //init location
			}
		}
		
		if(this.happy > 0){
			this.imageString = "d_happy.png"
		}else if(this.happy < -5){
			this.imageString = "d_sad.png"
		}else{
			this.imageString = "d.png"
		}
		return this.imageString;
	}

	
}
   
dClass.prototype = Object.create(subjectPrototype.prototype);

