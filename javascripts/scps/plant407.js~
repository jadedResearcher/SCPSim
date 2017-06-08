//a plant spawned from 407 grows quickly.
function plant407(x,y,max_x,max_y, evolve_num, scale){
	this.imageString = "";
	this.max_x = max_x;
	this.max_y = max_y;
	this.x = x;
	this.y = y;
	this.age = 0;
	this.velocity = 50;
	this.scale = scale
	this.happy = 0;
	this.health = 100;
	this.evolve_num = evolve_num;
	

	this.traits = function(){
		return ["Plant","Alive"];
	}
	
	this.image = function(){
		if(this.imageString == ""){
			//at first, fungus more common than plants
			if(Math.random()*100 < evolve_num){
				this.imageString = "plant" + Math.ceil(Math.random()*10) + ".png";
			}else{
				this.imageString = "fungus" + Math.ceil(Math.random()*10) + ".png";
			}
		}
		
		if(this.age > 10 || subjects.length > 10000){
			this.imageString = "mold.png";
		}
		return this.imageString;
	}
	
	this.apocalpyse = function(){
		if(subjects.length > 10000){
			return "Apocalpyse event: Too many plants, whole world will soon be super-evolved plants.";
		}
		return "";
	}
	
	this.tick = function(){
		this.age += 1;
		if(this.age == 3 || this.age == 6){
			var a = new plant407(this.randomNumberNear(this.x, 50*this.scale), this.randomNumberNear(this.y, 50*this.scale), this.max_x,this.max_y, this.evolve_num +5,this.scale);
			subjects.push(a);
		}
		

	}
	
	
}
   
plant407.prototype = Object.create(subjectPrototype.prototype);

