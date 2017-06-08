//SCP 871 is a cake. Will eventually spawn a replacement cake. No problem if original cake is eaten, but if it wasn't, then there are two cakes with these properties, and so on until all is cake.
//cake can look like different things. keeps a list of string based image tags
//representing all possible cakes. will insert tags into pages html so that html 5 canvas can accesshttp://www.scp-wiki.net/scp-507

function scp407(max_x,max_y,scale){

	this.imageString = "";
	this.max_x = max_x;
	this.max_y = max_y;
	this.x = 0;
	this.y = 0;
	this.age = 0;
	this.scale = scale;
	this.dead = false;
	
	//TODO create plants where anything is alive, kill the alive thing eventually (hp system?).
	//makes humans happy before they die.
	
	
	this.remove = function(traits){
		//If any of these cakes is substantially damaged through any means other than being eaten by a human, including being eaten by a non-human animal, it will be replaced instantaneously.
		if(traits.includes("Human")){
			this.dead = true; //don't remove yet, have to reproduce, first
		}
	}
	
	
	this.traits = function(){
		return ["Music","Inanimate"];
	}
	
	
	this.image = function(){
		if(this.imageString == ""){
			this.randomLocation();
		}
		
		if((this.age % 2) == 0){
			this.imageString = "speaker1.png"
		}else if((this.age % 3) == 0){
			this.imageString = "speaker2.png"
		}else{
			this.imageString = "speaker3.png"
		}
		return this.imageString;
	}	
	
	this.lookForGoodSCP = function(){
		var ret = [];
		for(var i = 0; i<subjects.length; i++){
			if(subjects[i].traits().includes("Alive")){
				ret.push( subjects[i]);
			}	
		}
		return ret;
	}
	
	this.lookForDeadSCP = function(){
		var ret = [];
		for(var i = 0; i<subjects.length; i++){
			if(subjects[i].traits().includes("Dead")){
				ret.push( subjects[i]);
			}	
		}
		return ret;
	}
	
	this.affectSCP = function(alive_subjects){
		if(alive_subjects == null){
			return;
		}
		for(var i = 0; i<alive_subjects.length; i++){
			if(this.age < 10){
				alive_subjects[i].heal(10);
			}else{
				alive_subjects[i].damage(10,this);
			}

		}
	}
	
	this.growPlants = function(dead_subjects){
		if(dead_subjects == null){
			return;
		}
		for(var i = 0; i<dead_subjects.length; i++){
			var a = new plant407(dead_subjects[i].x, dead_subjects[i].y, this.max_x,this.max_y,0, this.scale);
			subjects.push(a);
		}
	}
	
	this.tick = function(){
		this.age += 1;
		this.affectSCP(this.lookForGoodSCP());
		if(this.age == 30){
			this.growPlants(this.lookForDeadSCP());
		}
	}
	

	
}
scp407.prototype = Object.create(subjectPrototype.prototype);
