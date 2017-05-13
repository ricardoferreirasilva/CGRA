/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySubmarine(scene) {
    CGFobject.call(this, scene);
    this.angle=0;
    this.x=0;
    this.z=0;
    this.y=0;
    this.r=2;
    this.flipperAngle=0;
    
    //proppellers
    this.rightProppellerAngle=0;
    this.leftProppellerAngle=0;
    this.minPropAngle=0.1;
    
    this.speed=0.00;
    this.minSpeed=1;
    this.accel=0.05;
    
    this.rotateLeft=false;
	this.rotateRight=false;
    
    this.triangle= new MyTriangle(scene);
    this.hemisphere= new MyHemiSphere(scene,20,8);
    this.cylinder= new MyCylinder(scene,20,1);
    this.cube = new MyUnitCubeQuad(scene);
    this.circle = new MyCircle(scene, 20);
    this.flipper= new MyFlipper(scene);
    this.proppeller= new MyProppeller(scene);
    
    this.triangle.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MyTriangle;
MySubmarine.prototype.display = function() {
	
	this.scene.submarineAppearances[this.scene.currSubmarineAppearance].apply();
	
	this.scene.translate(this.x,this.y,this.z);
	this.scene.rotate(this.angle,0, 1, 0);
		
	//Submarine Display
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.5*0.92);
		this.scene.scale(0.73,1,1);		
		//Back Hemisphere
		this.scene.pushMatrix();
			this.scene.scale(0.5*0.92,0.5*0.92,0.5*0.92);
			this.scene.rotate(180 * degToRad,0, 1, 0);
			this.hemisphere.display();
		this.scene.popMatrix();	
		//Cylinder (Body)
		this.scene.pushMatrix();
			this.scene.scale(0.5*0.92,0.5*0.92,4.08);
			this.cylinder.display();
		this.scene.popMatrix();
		//Cylinder (Top)
		this.scene.pushMatrix();
			this.scene.translate(0,0.92,-0.75);
			this.scene.rotate(180 * degToRad,0, 0, 1);
			this.scene.rotate(-90 * degToRad,1, 0, 0);
			this.scene.scale(0.5*0.88,0.5*0.88,1*0.57);
			this.scene.translate(0,-7,-0.2);
			this.cylinder.display();
			//Circle on the Top
			this.scene.pushMatrix();
				this.scene.rotate(180 * degToRad,1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();
			//Cilindro (parte q está a entrar no corpo, "pescoço")
			this.scene.translate(0,0,0.5);
			this.cylinder.display();
		this.scene.popMatrix();
		//front Hemisphere
		this.scene.pushMatrix();
			this.scene.scale(0.5*0.92,0.5*0.92,0.5*0.92);
			this.scene.translate(0,0,8.85);
			this.hemisphere.display();
		this.scene.popMatrix();	
	this.scene.popMatrix();
	
	
	//Periscope
	this.scene.pushMatrix();
		this.scene.translate(0,0,-0.75);
		this.scene.scale(0.05,0.05,0.5);
		this.scene.translate(0,26.65,7.5);
		this.scene.pushMatrix();
			this.scene.translate(0,-0.20,-0.1);
			this.scene.scale(1,1,0.45);
			this.cylinder.display();
			this.scene.pushMatrix();
				this.scene.translate(0,0,1);
				this.circle.display();
			this.scene.popMatrix();
			this.scene.rotate(180 * degToRad,1, 0,0);
			this.circle.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.scale(1,6,0.1);
			this.scene.rotate(90 * degToRad,1, 0,0);
			this.cylinder.display();
		this.scene.popMatrix();	
	this.scene.popMatrix();	
	
	 //Back Flippers
    this.scene.pushMatrix();
    	this.scene.rotate(this.flipperAngle * degToRad,1,0, 0);
    	this.scene.translate(0,0,0.15);
    	this.scene.rotate(180 * degToRad,1, 0, 0);
    	this.scene.rotate(90 * degToRad,0, 1, 0);
	 	this.flipper.display();
	 	this.scene.pushMatrix();
	 		this.scene.rotate(90 * degToRad,1,0, 0);
	 		this.flipper.display();
	 	this.scene.popMatrix();
	 
	this.scene.popMatrix();
	
	//Up Flipper
	 this.scene.pushMatrix();
		this.scene.translate(0,0,0.15);
		this.scene.rotate(180 * degToRad,1, 0, 0);
		this.scene.rotate(90 * degToRad,0, 1, 0);
		this.scene.rotate(180 * degToRad,0,1, 0);
	 	this.scene.scale(1,1,(1.42/2.34));
	 	this.scene.translate(-2.8,-0.8,0);
	 	this.flipper.display();
 	this.scene.popMatrix();
 	
 	//Proppellers
 	this.scene.pushMatrix();
 	//Right Proppeller
 		this.scene.translate(-0.425,-0.4,0.5);
 		this.scene.scale(0.5*0.4,0.5*0.4,0.22);
 		this.scene.pushMatrix();
 			this.proppeller.decAngle(this.rightProppellerAngle);
 			this.proppeller.display();
 		this.scene.popMatrix();
 	//Left Proppeller
 		this.scene.translate(4.3,0,0);
 		this.scene.pushMatrix();
			this.proppeller.incAngle(this.leftProppellerAngle);
			this.proppeller.display();
		this.scene.popMatrix();
 	this.scene.popMatrix();
 	
};//rgb - xyz

MySubmarine.prototype.switchDirection = function(direction) {
	switch(direction){
	case 'left':{
		if(!this.rotateLeft){
			this.rotateLeft=true;
			this.rotateRight=false;
		}
		
	}
	break;
	case 'right':{
		if(!this.rotateRight){
			this.rotateLeft=false;
			this.rotateRight=true;
		}
	}
	break;
	case 'forward':{
		if(this.speed==0){
			this.speed+=this.minSpeed;
		}else {
			this.speed+=this.accel;
		}			
	}
	break;
	case 'back':{
		if(this.speed==0){
			this.speed-=this.minSpeed;
		}else {
			this.speed-=this.accel;
		}
	}
	break;
	case 'up':{
		
	}
	break;
	case 'down':{
		
	}
	break;	
	}
};

MySubmarine.prototype.stopMoving = function(direction) {
	switch(direction){
	case 'left':{
		this.rotateLeft=false;
		this.rotateRight=false;
	}
	break;
	case 'right':{
		this.rotateLeft=false;
		this.rotateRight=false;
	}
	break;
	};
	
}

MySubmarine.prototype.update = function(currTime){
	this.lastime = this.lastime || currTime;
 	var dt = currTime - this.lastime;
	this.lastime = currTime;
	
	var minPropAngle=(dt/1000)*360 * degToRad;//1 rotacao por segundo
	
	
	 
	//Proppeller's angles update 
	if(this.speed==0){
		this.rightProppellerAngle=0;
		this.leftProppellerAngle=0;
	}
	else if(this.speed <=this.minSpeed && this.speed>0){
		this.rightProppellerAngle+= this.minPropAngle;
		this.leftProppellerAngle-= this.minPropAngle;
	}
	else {
		this.rightProppellerAngle+=this.minPropAngle*this.speed*360 * degToRad;
		this.leftProppellerAngle-=this.minPropAngle*this.speed*360 * degToRad;
	}
	 
	//Vertical Fin angle update
	if(this.rotateLeft)
		this.angle-=0.5;
	else if(this.rotateRight)
		this.angle+=0.5;
	
	//Movement Update
	this.z += Math.cos(this.angle * degToRad) * this.speed*dt/1000;
	this.x += Math.sin(this.angle * degToRad) * this.speed*dt/1000;
	
	
};

MySubmarine.prototype.periscopeUp = function(){
	
};

MySubmarine.prototype.periscopeDown = function(){
	
};