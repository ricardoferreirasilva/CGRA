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
    this.rightProppellerAngle=0;
    this.leftProppellerAngle=0;
    this.speed=0;
    
    this.movingForward=false;
    this.movingBack=false;
    this.movingUp=false;
    this.movingDown=false;
    this.movingRight=false;
    this.movingLeft=false
    
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
 			this.proppeller.setAngle(this.rightProppellerAngle);
 			this.proppeller.display();
 		this.scene.popMatrix();
 	//Left Proppeller
 		this.scene.translate(4.3,0,0);
 		this.scene.pushMatrix();
			this.proppeller.setAngle(this.leftProppellerAngle);
			this.proppeller.display();
		this.scene.popMatrix();
 	this.scene.popMatrix();
 	
};//rgb - xyz

MySubmarine.prototype.switchDirection = function(direction) {
	switch(direction){
	case 'left':{
		if (this.movingLeft != true)
			this.movingLeft=true;
	}
	break;
	case 'right':{
		if (this.movingRight != true)
			this.movingRight=true;
	}
	break;
	case 'forward':{
		this.speed+=0.1;
		//if (this.movingForward != true)
			//this.movingForward=true;
	}
	break;
	
	case 'back':{
		if (this.movingBack != true)
			this.movingBack=true;
	}
	break;
	
	case 'up':{
		if (this.movingUp != true)
			this.movingUp=true;
	}
	break;
	
	case 'down':{
		if (this.movingDown != true) 
			this.movingDown=true;
	}
	break;
	
	
	}

};

MySubmarine.prototype.stopMoving = function(direction) {
	switch(direction){
	case 'left':{
		if (this.movingLeft != false) 
			this.movingLeft=false;
	}
	break;
	case 'right':{
		if (this.movingRight != false) 
			this.movingRight=false;
	}
	break;
	
	case 'forward':{
		if (this.movingForward != false) 
			this.movingForward=false;
	}
	break;
	
	case 'back':{
		if (this.movingBack != false) 
			this.movingBack=false;
	}
	break;
	
	case 'up':{
		if (this.movingUp != false) 
			this.movingUp=false;
	}
	break;
	
	case 'down':{
		if (this.movingDown != false) 
			this.movingDown=false;
	}
	break;

	};
};

MySubmarine.prototype.update = function(currTime){
	  this.deltaTime = this.deltaTime || 0;
	    this.deltaTime = currTime - this.lastTime;
	    this.lastTime = currTime;
	    var perSecond = (this.deltaTime / (1000));
	    
		this.z += Math.cos(this.angle * degToRad) * this.speed * perSecond;
		this.x += Math.sin(this.angle * degToRad) * this.speed * perSecond;
		/*
	 if(this.movingForward){
		 this.accel+=0.0002;
	 }
	 else if(this.movingBack){
		 this.accel-=0.0002;
	 }
	 
	 if(this.movingUp){
		 
	 }
	 else if(this.movingDown){
		 
	 }
	 
	 if(this.movingRight){
		 
	 }
	 if(this.movingLeft){
		 
	 }
	 */
};

MySubmarine.prototype.periscopeUp = function(){
	
};

MySubmarine.prototype.periscopeDown = function(){
	
};