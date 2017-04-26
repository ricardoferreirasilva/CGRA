/**
 * MyPaperplane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPaperplane(scene) {
    CGFobject.call(this, scene);
    this.cube = new MyUnitCubeQuad(this.scene);
    this.state=0;
	this.dist=10;
	this.height=8;
	this.angle=0;
    this.cube.initBuffers();
   
};

MyPaperplane.prototype = Object.create(CGFobject.prototype);
MyPaperplane.prototype.constructor = MyQuad;
MyPaperplane.prototype.display = function() {

	this.scene.translate(-12, 6, -6);
	this.scene.rotate(-90 * degToRad,0,0, 1);
	this.scene.translate(14, 5, -4);
    //corpo
	this.scene.pushMatrix();
    this.scene.translate(-2, -6, 6);
    this.scene.scale(0.05, 3, 0.5);
    this.cube.display();
    this.scene.popMatrix();

    //asa de cima
    this.scene.pushMatrix();

    this.scene.translate(-2, -6.5, 6.25);
    this.scene.rotate(-90 * degToRad,0, 1, 0);
    this.scene.rotate(90 * degToRad,1, 0, 0);
    this.scene.scale(0.05, 2.5,0.75); 
    this.cube.display();
    //asa de baixo
    this.scene.pushMatrix();
    this.scene.translate(-7, 0, 0);
    this.cube.display();
    
    //asa de trás
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -2);
    this.scene.scale(1, 0.5,1);
    this.cube.display();

    this.scene.popMatrix();
    this.scene.popMatrix();
    this.scene.popMatrix();

    //asa traseira de cima
    this.scene.pushMatrix();
    this.scene.translate(-2, -6, 6);
    this.scene.scale(0.05, 0.5, 0.5);
    this.scene.translate(1, 2.5,1);
    this.cube.display();
    this.scene.popMatrix();

}
MyPaperplane.prototype.update=function(){
	if(this.dist>=0.5){
		this.dist=this.dist-0.1;
	 	this.height=this.height+Math.random()*0.1;
	}
	else if(this.height>4.25){
		// this.angle=-90 * degToRad;
   		
   		 this.height-=Math.random()*0.1;
	}
	 
};