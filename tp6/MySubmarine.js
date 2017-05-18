/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySubmarine(scene) {
    CGFobject.call(this, scene);
    this.ver_angle=0;
    this.hor_angle=0;
    this.x=0;
    this.z=0;
    this.y=0;
    //Flippers
    this.horizontalFlipperAngle=0;
    this.verticalFlipperAngle=0;
    
    //Periscope
    this.peri_y=0;
    this.peri_maxy=6;
    this.peri_miny=-4.5;
    this.peri_speed=0.1;
    
    //proppellers
    this.rightProppellerAngle=0;
    this.leftProppellerAngle=0;
    this.minPropAngle=0.1;
    
    //move forward/back
    this.speed=0.00;
    this.minSpeed=1;
    this.accel=0.05;
	this.speedDrag = 0.003;
	
	//move right/left
	this.ver_rotAc=0.0001;
	this.ver_rotSpeed=0.00;
	this.ver_rotDrag=0.00001;
	
	//move up/down
	this.hor_rotAc=0.0001;
	this.hor_rotSpeed=0.00;
	this.hor_rotDrag=0.00001;
    
    this.rotateLeft=false;
	this.rotateRight=false;
	this.moveForward=false;
	this.moveBack=false;
	this.moveUp=false;
	this.moveDown=false;
	this.showTorpedo=false;
    
    this.triangle= new MyTriangle(scene);
    this.hemisphere= new MyHemiSphere(scene,20,8);
    this.cylinder= new MyCylinder(scene,20,1);
    this.cube = new MyUnitCubeQuad(scene);
    this.circle = new MyCircle(scene, 20);
    this.flipper= new MyFlipper(scene);
    this.proppeller= new MyProppeller(scene);
    this.torpedo= new MyTorpedo(scene);
    
    this.triangle.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MyTriangle;
MySubmarine.prototype.display = function() {
	
	this.scene.submarineAppearances[this.scene.currSubmarineAppearance].apply();
	this.scene.translate(this.x,this.y,this.z);
	this.scene.rotate(this.ver_angle,0, 1, 0);
	this.scene.rotate(this.hor_angle,1, 0, 0);
		
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
		this.scene.translate(0,this.peri_y,0);
		//horizontal tube
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
		//vertical tube
		this.scene.pushMatrix();
			this.scene.scale(1,12,0.1);
			this.scene.rotate(90 * degToRad,1, 0,0);
			this.cylinder.display();
		this.scene.popMatrix();
		this.scene.popMatrix();	
	
	 //Back Flippers
    this.scene.pushMatrix();
    	
    	this.scene.translate(0,0,0.15);
    	this.scene.rotate(180 * degToRad,1, 0, 0);
    	this.scene.rotate(90 * degToRad,0, 1, 0);
    	this.scene.pushMatrix();
    		this.scene.rotate(-this.horizontalFlipperAngle * degToRad,0,0, 1);
	 		this.flipper.display();
	 	this.scene.popMatrix();
	 		
	 	this.scene.pushMatrix();
	 		this.scene.rotate(this.verticalFlipperAngle * degToRad,0,1,0);
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
	 	this.scene.pushMatrix();
	 		this.scene.rotate(this.horizontalFlipperAngle * degToRad,0,0,1);
	 		this.flipper.display();
	 	this.scene.popMatrix();
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
 	if(this.showTorpedo)
	 {

		this.torpedo.display();
	 }
};

MySubmarine.prototype.handleKeyDown = function(direction) {
	switch(direction){
	/*
		If turning left, increment rotational speed with rotational acceleration.
		If turning right, decrement rotational speed with rotational acceleration.
		On update, constantly rotate with rotate speed. Positive values -> Left. Negative -> Right

	*/
	case 'left':{
		this.rotateLeft=true;
		//this.rotateRight=false;
		
		//rotateFin
		if(this.verticalFlipperAngle<40){
			this.verticalFlipperAngle+=1;
		}
		else this.verticalFlipperAngle=40;
	}
	break;
	case 'right':{
		this.rotateRight=true;
		//this.rotateLeft=false;
		
		//rotateFin
		if(this.verticalFlipperAngle>-40){
			this.verticalFlipperAngle-=1;
		}
		else this.verticalFlipperAngle=-40;
	}
	break;
	case 'forward':{
		this.moveForward=true;
	}
	break;
	case 'back':{
		this.moveBack=true;
	}
	break;
	case 'up':{
		this.moveUp=true;
		if(this.horizontalFlipperAngle<40){
			this.horizontalFlipperAngle+=1;
		}
		else this.horizontalFlipperAngle=40;
	}
	break;
	case 'down':{
		this.moveDown=true;
		if(this.horizontalFlipperAngle>-40){
			this.horizontalFlipperAngle-=1;
		}
		else this.horizontalFlipperAngle=-40;
	}
	break;	
	}
};

MySubmarine.prototype.handleKeyUp = function(direction) {
	switch(direction){
	case 'left':{
		this.rotateLeft=false;
		this.ver_rotSpeed = 0;
		//rotateFin
		if(this.verticalFlipperAngle>0){
			this.verticalFlipperAngle-=5;
		}
		else this.verticalFlipperAngle=0;
	}
	break;
	case 'right':{
		this.rotateRight=false;
		this.ver_rotSpeed = 0;
		//rotateFin
		if(this.verticalFlipperAngle<0){
			this.verticalFlipperAngle+=5;
		}
		else this.verticalFlipperAngle=0;
	}
	break;
	case 'forward':{
		this.moveForward=false;
	}
	break;
	case 'back':{
		this.moveBack=false;
	}
	break;
	case 'up':{
		this.moveUp=false;
		if(this.horizontalFlipperAngle<0){
			this.horizontalFlipperAngle+=5;
		}
		else this.horizontalFlipperAngle=0;
	}
	break;
	case 'down':{
		this.moveDown=false;
		if(this.horizontalFlipperAngle>0){
			this.horizontalFlipperAngle-=5;
		}
		else this.horizontalFlipperAngle=0;
	}
	break;
	};
}

MySubmarine.prototype.update = function(currTime){

	this.torpedo.update(currTime);
	this.lastime = this.lastime || currTime;
 	var dt = currTime - this.lastime;
	this.lastime = currTime;
	
	var minPropAngle=(dt/1000)*360 * degToRad;//1 rotacao por segundo
	
	if(this.moveForward){
		if(this.speed==0){
			this.speed+=this.minSpeed;
		}else {
			this.speed+=this.accel;
		}
	}else if(this.moveBack){
		if(this.speed==0){
			this.speed-=this.minSpeed;
		}else {
			this.speed-=this.accel;
		}
	}
	 
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
	
	if(!this.rotateLeft && this.rotateRight){
		this.ver_rotSpeed -= this.ver_rotAc;
		console.log("rotAC: " + this.ver_rotAc + " rotSpeed: " + this.ver_rotSpeed);
	}
	else if(this.rotateLeft && !this.rotateRight){
		this.ver_rotSpeed += this.ver_rotAc;
		console.log("rotAC: " + this.ver_rotAc + " rotSpeed: " + this.ver_rotSpeed);
	}
	else if(this.rotateLeft && this.rotateRight){
		this.ver_rotSpeed += this.ver_rotAc;
		this.ver_rotSpeed -= this.ver_rotAc;
		console.log("rotAC: " + this.ver_rotAc + " rotSpeed: " + this.ver_rotSpeed);
	}
	this.ver_angle += this.ver_rotSpeed;
	
	//Horizontal Angle update
	
	if(this.moveDown){
		this.hor_rotSpeed += this.hor_rotAc;
		console.log("hor_rotAC: " + this.hor_rotAc + " hor_rotSpeed: " + this.hor_rotSpeed);
	}
	else if(this.moveUp){
		this.hor_rotSpeed -= this.hor_rotAc;
		console.log("hor_rotAC: " + this.hor_rotAc + " hor_rotSpeed: " + this.hor_rotSpeed);
	}
	
	this.hor_angle+=this.hor_rotSpeed;
	
	//Drag apply
	
	if(this.ver_rotSpeed > 0.0000) 
		this.ver_rotSpeed -= this.ver_rotDrag;
	else if(this.ver_rotSpeed < 0.0000) 
		this.ver_rotSpeed += this.ver_rotDrag;
	
	if(this.hor_rotSpeed > 0.0000)
	{
		this.hor_rotSpeed -= this.hor_rotDrag;
		this.limitHorizontalAngles();
	}
	else if(this.hor_rotSpeed < 0.0000)
	{
		this.hor_rotSpeed += this.hor_rotDrag;
		this.limitHorizontalAngles();
	}
	
	if(this.speed > 0.0000) 
		this.speed-=this.speedDrag;
	else if(this.speed < 0.0000) 
		this.speed+=this.speedDrag;
	
	
	//Movement Update
	console.log(this.hor_angle);
	this.z += Math.cos(this.ver_angle) * this.speed*dt/1000;
	this.x += Math.sin(this.ver_angle) * this.speed*dt/1000;
	this.y -= Math.tan(this.hor_angle) * (this.speed *dt/ 1000) * Math.cos(this.hor_angle);
	
};
MySubmarine.prototype.limitHorizontalAngles = function(){
		if(this.y > 1)
		{
			if(this.hor_angle > 0.1){
				this.hor_angle = 0.1;
				this.hor_rotSpeed = 0;
			}
			if(this.hor_angle < -0.1) {
				this.hor_angle = -0.1;
				this.hor_rotSpeed = 0;
			}
		}
		else
		{
			
			if(this.hor_angle > 0) {
				this.hor_angle = 0;
				this.hor_rotSpeed = 0;
			}
			if(this.hor_angle < -0.1) {
				this.hor_angle = -0.1;
				this.hor_rotSpeed = 0;
			}
		}
};
MySubmarine.prototype.periscopeUp = function(){
	if(this.peri_y<this.peri_maxy)
		this.peri_y+=this.peri_speed;
};


MySubmarine.prototype.periscopeDown = function(){
	if(this.peri_y>this.peri_miny)
		this.peri_y-=this.peri_speed;
};

MySubmarine.prototype.torpedoLockTarget = function(){
	this.showTorpedo=true;
};