//a physical object that starts warping the test chamber itself.
//at first it just makes the test chamber bigger  can i scale all scps inside it and the test chamber pic??
//scaling also needs to affect movement speed (where applicable)
//then it starts adding rooms with doors. rooms start "normal" but start looking weirder and weirder.
//then it starts making things out of the wrong material (modify textures?)
function scp184(max_x,max_y, scale){
	this.imageString = "";
	this.max_x = max_x;
	this.max_y = max_y;
	this.x = 0;
	this.y = 0;
	this.age = 0;
	this.scale = scale;
	this.dead = false;
	this.image = function(){
		if(this.imageString == ""){
			this.imageString = "184.png";
			this.randomLocation(); //init location
		}
		return this.imageString;
	}
	
	this.tick = function(){
		this.age += 1;
		//Initially, SCP-184 only extends the walls out, causing rooms to become much larger without adjusting the height of the room. This expansion continues until the original dimensions of the room have been tripled.
		if(this.age%10 == 1 && this.age < 75){ //don't go forever
			setWorldScale(this.scale -.1);
		}
		//TODO At this point, SCP-184 starts creating wholly new rooms. (do i care about wall detection?)
		
		//TODO After a period of time, however, the expansion process appears to break down. (Jenny Note: Mazes, wrong textures, etc)
	}
}

scp184.prototype = Object.create(subjectPrototype.prototype);
