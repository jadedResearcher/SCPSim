//0 73 is alive and can move around.
//within a radius of it, plants instantly die. cannot eat plant based materials (can it eat cake?)
//has a mark on it's head.
//anything that hurts it is hurt worse. can not be damaged.
function scp073(max_x,max_y,scale){
	this.imageString = "";
	this.max_x = max_x;
	this.max_y = max_y;
	this.x = 0;
	this.y = 0;
	this.age = 0;
	this.dead = false;
	this.velocity = 50;
	this.scale = scale;
	this.health = 100;
	this.goNear = true;
	
	this.traits = function(){
		return ["Human","Alive", "Immortal"];
	}
	
	this.image = function(){
		if(this.imageString == ""){
			this.imageString = "073.png";
			this.randomLocation(); //init location
		}
		return this.imageString;
	}
	
	//reflects damage back
	this.damage = function(amount, damager){
		damager.health += -1* amount;	
	}
	
	this.remove = function(remover){
		remover.remove(this);
	}
	
	this.cycleCuriosity = function(){
		if(this.goNear ==  true && (Math.random() *100) >96){
			this.goNear = !this.goNear;
		}else if(this.goNear ==  false && (Math.random() *100) >90){ //slightly more likely to stop goFar
			this.goNear = !this.goNear;
		}
	}
	

	this.tick = function(){
		this.age += 1;
		this.destroySCP();
		//wander
		if(this.goNear == true){
			this.moveTowardsSCP(this.nearestSCP());
		}else{
			this.moveTowardsSCP(this.furthestSCP());
		}
		this.cycleCuriosity();
		//this.moveTowardsXY(this.randomNumberNear(this.x, this.velocity * 3*this.scale),this.randomNumberNear(this.y, this.velocity * 3*this.scale));
	}
	
	this.destroySCP = function(){
		var near_subjects = getSubjectsNear(this, 200*this.scale );
		for(var i = 0; i<near_subjects.length; i++){
			if(near_subjects[i].traits().includes("Plant") ||near_subjects[i].traits().includes("PlantBased") ){	
				near_subjects[i].remove(this);
			}	
		}
	}
	
}
scp073.prototype = Object.create(subjectPrototype.prototype);
