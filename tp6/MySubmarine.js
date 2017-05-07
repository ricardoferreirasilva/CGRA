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
    this.r=2;
    this.flipperAngle=0;
    this.rightProppellerAngle=0;
    this.leftProppellerAngle=0;
    
    this.movingForward=false;
    this.movingBackwards=false;
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
	
	this.scene.translate(this.x,0,this.z);
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

MySubmarine.prototype.rotateLeft = function() {
	this.angle+=5* degToRad;

this.primitiveType = this.scene.gl.TRIANGLES;
};

MySubmarine.prototype.rotateRight = function() {
	this.angle-=5* degToRad;
	
this.primitiveType = this.scene.gl.TRIANGLES;
};

MySubmarine.prototype.translateForward = function() {
	this.z += (this.r*Math.cos(this.angle));
	this.x += (this.r*Math.sin(this.angle));
	
this.primitiveType = this.scene.gl.TRIANGLES;
};

MySubmarine.prototype.translateBackwards= function() {
	this.z -= (this.r*Math.cos(this.angle));
	this.x -= (this.r*Math.sin(this.angle));
	
this.primitiveType = this.scene.gl.TRIANGLES;
};

MySubmarine.prototype.update = function(temp){
	
		var dt = temp - this.previousInstant;
	    this.previousInstant = temp;
	    
		this.z += (this.Math.cos(this.angle)*dt*this.scene.speed);
		this.x += (this.Math.sin(this.angle)*dt*this.scene.speed);
	/*
	 if(this.movingForward){
		 
	 }
	 else if(this.movingBackwards){
		 
	 }
	 else if(this.movingUp){
		 
	 }
	 else if(this.movingDown){
		 
	 }
	 else if(this.movingRight){
		 
	 }
	 else if(this.movingLeft){
		 
	 }
	*/
};
