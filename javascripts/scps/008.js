//basic zombie virus. not gonna render a "virus" so, scp008 is an infected human.
//runs quickly at living humans.  movements "sporadic"
//when it kills them, they become scp 008 instead of corpses.
function scp008(x,y,max_x,max_y,scale){
	this.imageString = "";
	this.max_x = max_x;
	this.max_y = max_y;
	this.x = x;
	this.y = y;
	this.age = 0;
	this.scale = scale;
	this.velocity = 100;
	this.health = 200;
	this.dead = false;
	
	this.traits = function(){
		return ["Dead","Meat", "Monster"];
	}
	
	this.image = function(){
		if(this.imageString == ""){
			this.imageString = "008.png";
		}
		return this.imageString;
	}	
		
	this.lookForGoodSCP = function(){
		var ret;
		var distance = 9999;
		for(var i = 0; i<subjects.length; i++){
			if(subjects[i].traits().includes("Human") && subjects[i].traits().includes("Alive")){
				var tmp = subjects[i];
				var d = Math.sqrt( (tmp.x-this.x)*(tmp.x-this.x) + (tmp.y-this.y)*(tmp.y-this.y) );
				if(Math.abs(d) < distance){
					distance = Math.abs(d);
					ret = tmp;
				}
			}	
		}
		return ret;
	}
	
	this.destroySCP = function(){
		var near_subjects = getSubjectsNear(this, this.velocity * this.scale );
		for(var i = 0; i<near_subjects.length; i++){
			if(near_subjects[i].traits().includes("Alive")&& near_subjects[i].traits().includes("Human")){
				near_subjects[i].remove(this);
			}	
		}
	}
	
	this.onRemove = function(scp){
		//make new 008 instead of corpse
		subjects.push(new scp008(scp.x, scp.y, scp.max_x, scp.max_y, this.scale));
		return true;
	}
	
	
	this.tick = function(){
		this.age += 1;
		if(this.health < 0){
			this.dead = true;
		}

		this.destroySCP();
		this.moveTowardsSCP(this.lookForGoodSCP());
	}
}

scp008.prototype = Object.create(subjectPrototype.prototype);
