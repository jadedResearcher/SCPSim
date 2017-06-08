//SCP 871 is a cake. Will eventually spawn a replacement cake. No problem if original cake is eaten, but if it wasn't, then there are two cakes with these properties, and so on until all is cake.
//cake can look like different things. keeps a list of string based image tags
//representing all possible cakes. will insert tags into pages html so that html 5 canvas can accesshttp://www.scp-wiki.net/scp-507

function scp871(max_x,max_y,scale){

	this.imageString = "";
	this.max_x = max_x;
	this.max_y = max_y;
	this.x = Math.floor(max_x/2);
	this.y = Math.floor(max_y/2);
	this.age = 0;
	this.dead = false;
	this.scale = scale;


	this.tick = function(){
		this.age += 1;
		if(this.age%24 == 0){
			this.makeNewCake();
		}
	}
	
	this.makeNewCake = function(){
		var a = new scp871(this.max_x,this.max_y, this.scale);
		subjects.push(a);
		if(this.dead == true){
			//remove self now that I've reproduced
			removeFromArray(subjects, this);
			//make my "child" match my image
			//Individual recurrences of SCP-871 have been observed to "mutate" over time, varying in minor characteristics between each instance, with larger changes occurring in roughly 5% of replacements.
			if(Math.random()*100 < 95){
				a.imageString = this.imageString;
				a.randomLocation();
			}
		}
	}
	
	this.remove = function(remover){
		//If any of these cakes is substantially damaged through any means other than being eaten by a human, including being eaten by a non-human animal, it will be replaced instantaneously.
		if(remover.traits().includes("Human")){
			this.dead = true; //don't remove yet, have to reproduce, first
		}
	}
	
	
	this.traits = function(){
		return ["Food","Unalive", "Inanimate", "PlantBased"];
	}
	
	this.proccessDead = function(){
		//do nothing, will handle death when it's time to make new cake
	}
	
	
	this.image = function(){
		if(this.imageString == ""){
			this.imageString = "cake" + Math.ceil(Math.random()*10) + ".png";
			this.randomLocation();
		}
		return this.imageString;
	}	
	
	//render my image to the provided canvas. should expect provided canvas to be buffer
	this.render = function(context){
		if(this.dead == false){
			addImageTag(this.image())
			var img=document.getElementById(this.image());
			var w = img.width * this.scale;
			var h = img.height * this.scale;
			context.drawImage(img,this.x,this.y,w,h);
		}
	}
	
	this.apocalpyse = function(){
		if(subjects.length > 10000){
			return "Apocalpyse event: Too many cakes to eat in time, whole world will soon be cake.";
		}
		return "";
	}
}
scp871.prototype = Object.create(subjectPrototype.prototype);
