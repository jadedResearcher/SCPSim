//initially appears to be fruit. 
//if something alive approaches, bursts into random insects.
//otherwise vanishes on it's own.
//insects pursue living creatures and kill them. 
//on death, the creature spawns a new 417 tree.
function fruit417(x,y,max_x,max_y, tree,scale){
	this.imageString = "";
	this.max_x = max_x;
	this.max_y = max_y;
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.age = 0;
	this.velocity = 100;
	this.burst = false;
	this.tree = tree;
	this.dead = false;
	
		
	this.image = function(){
		if(this.imageString == ""){
			this.imageString = "fruit.png";
			//this.imageString = "bug" + Math.ceil(Math.random()*3) + ".png";
		}else if((this.burst == true) && this.imageString == "fruit.png"){
			this.imageString = "bug" + Math.ceil(Math.random()*3) + ".png";
		}
		return this.imageString;
	}
	
	this.traits = function(){
		if(this.burst == true){
			return ["Animal", "Monster"];
		}else{
			return ["Plant", "Food"];
		}
	}
	

	
	this.destroySCP = function(){
		var near_subjects = getSubjectsNear(this, this.velocity * this.scale );
		for(var i = 0; i<near_subjects.length; i++){
			if(near_subjects[i].dead == false && near_subjects[i].traits().includes("Alive")){
				near_subjects[i].remove(this);
			}	
		}
	}
	
	this.checkBurst = function(){
		var near_subjects = getSubjectsNear(this, 50*this.scale );
		for(var i = 0; i<near_subjects.length; i++){
			if(near_subjects[i].dead == false && near_subjects[i].traits().includes("Alive")){
				this.burstNow();
			}	
		}
	}
	
	this.burstNow = function(){
		this.burst = true;
	}
	
	this.onRemove = function(scp){
		//make new 417 on top of corpse
		subjects.push(new scp417(scp.x-(50*this.scale), scp.y-(180*this.scale), scp.max_x, scp.max_y, this.scale));
		return false;
	}
	
	this.remove = function(remover){
		this.dead = true;
		removeFromArray(this.tree.fruit, this);
	}
	
	this.tick = function(){
		this.age += 1;
		if(this.age > 24){
			this.remove(this);
		}
		//buzz
		if(this.burst == true){
			this.destroySCP();
			var old_x = this.x;
			this.moveTowardsSCP(this.lookForSCPWithTrait("Alive"));
			if(old_x == this.x){//buzz
				this.moveTowardsXY(this.randomNumberNear(this.x, 3),this.randomNumberNear(this.y, 3));
			}
		}else{
			this.checkBurst();
		}
	}
	
	
}

fruit417.prototype = Object.create(subjectPrototype.prototype);
