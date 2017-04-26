var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var distinc=0;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();
    this.cFrame=0;
    this.gl.clearColor(25/255,25/255,112/255,0.9);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    // Scene elements
    this.floor = new MyQuad(this, 0, 1.5, 0, 1.5);
    this.cilinder = new MyCylinder(this,20,8);
    this.circle = new MyCircle(this,8);
    this.pointer = new MyPointer(this,1);
    this.clock = new MyClock(this, 12, 1);
    this.submarine = new MySubmarine(this);

    // Materials
    this.materialDefault = new CGFappearance(this);

    this.materialA = new CGFappearance(this);
    this.materialA.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialA.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialA.setSpecular(0, 0.2, 0.8, 1);
    this.materialA.setShininess(120);

    this.materialB = new CGFappearance(this);
    this.materialB.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialB.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialB.setSpecular(0.8, 0.8, 0.8, 1);
    this.materialB.setShininess(120);

    //Textures
    this.enableTextures(true);
    this.tableAppearance = new CGFappearance(this);
    this.tableAppearance.setAmbient(1, 1, 1, 0.2);
	this.tableAppearance.setDiffuse(1, 1, 1, 0.2);
	this.tableAppearance.setSpecular(1, 1, 1, 0.1);
	this.tableAppearance.setShininess(10);
    this.tableAppearance.loadTexture("../tp6/table.png");
    
    this.floorAppearance =new CGFappearance(this);
    this.floorAppearance.loadTexture("../tp6/floor.png");
    
    this.windowAppearance=new CGFappearance(this);
	this.windowAppearance.setAmbient(1, 1, 1, 0.2);
	this.windowAppearance.setDiffuse(1, 1, 1, 0.2);
	this.windowAppearance.setSpecular(1, 1, 1, 0.1);
	this.windowAppearance.setShininess(10);
    this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.windowAppearance.loadTexture("../tp6/window.png");
    
    this.slidesAppearance=new CGFappearance(this);
	this.slidesAppearance.setAmbient(1, 1, 1, 0.2);
	this.slidesAppearance.setDiffuse(1, 1, 1, 0.8);
	this.slidesAppearance.setSpecular(1, 1, 1, 0.1);
	this.slidesAppearance.setShininess(2);
    this.slidesAppearance.loadTexture("../tp6/slides.png");

    this.boardAppearance=new CGFappearance(this);
	this.boardAppearance.setAmbient(1, 1, 1, 0.2);
	this.boardAppearance.setDiffuse(1, 1, 1, 0.2);
	this.boardAppearance.setSpecular(1, 1, 1, 0.3);
	this.boardAppearance.setShininess(100);
    this.boardAppearance.loadTexture("../tp6/board.png");

    this.bottomOceanAppearance=new CGFappearance(this);
	this.bottomOceanAppearance.setAmbient(1, 1, 1, 0.2);
	this.bottomOceanAppearance.setDiffuse(1, 1, 1, 0.2);
	this.bottomOceanAppearance.setSpecular(1, 1, 1, 0.3);
	this.bottomOceanAppearance.setShininess(100);
	this.windowAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.bottomOceanAppearance.loadTexture("../tp6/fundo_oceano.jpg");
    
    this.poleTexture=new CGFappearance(this);
	this.poleTexture.setAmbient(0.1, 0.1, 0.1, 0.1);
	this.poleTexture.setDiffuse(0.1, 0.1, 0.1, 0.2);
	this.poleTexture.setSpecular(1, 1, 1, 0.3);
	this.poleTexture.setShininess(50);
    this.poleTexture.loadTexture("../tp6/metal2.png");
    
    this.setUpdatePeriod(1/60);
    
    this.option1=true; 
    this.option2=false; 
    this.speed=3;

}; 

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
    //this.setGlobalAmbientLight(0.5, 0.5,0.5, 1.0);

    // Positions for four lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[0].setVisible(true);
    this.lights[0].setAmbient(1, 1, 1, 1);
    this.lights[0].setDiffuse(0, 0, 1, 1.0);
    this.lights[0].enable();
    
    /*
    this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
    this.lights[1].setVisible(true); // show marker on light position (different from enabled)

    this.lights[2].setPosition(10.5, 6.0, 5, 1.0);
    this.lights[2].setVisible(true);

    //this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
    //this.lights[1].setVisible(true); // show marker on light position (different from enabled)
    //this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
    //this.lights[1].setVisible(true); // show marker on light position (different from enabled)

   

    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();

    this.lights[2].setAmbient(0, 0, 0, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1, 1, 1, 1);

    this.lights[2].setConstantAttenuation(0);
    this.lights[2].setLinearAttenuation(0)
    this.lights[2].setQuadraticAttenuation(0.2)
    this.lights[2].enable();*/
};

LightingScene.prototype.updateLights = function() {
    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
}

LightingScene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Update all lights used
    this.updateLights();

    // Draw axis
    this.axis.display();

    this.materialDefault.apply();  
    
    
    // ---- END Background, camera and axis setup


    // ---- BEGIN Geometric transformation section

    // ---- END Geometric transformation section


    // ---- BEGIN Primitive drawing section

    // Floor
    this.bottomOceanAppearance.apply();  
    this.pushMatrix();
    this.translate(7.5, 0, 7.5);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(15, 15, 0.2);
    this.floor.display();
    this.popMatrix();
    
    //Clock
    this.pushMatrix();
    this.translate(8,8,5);
	this.scale(0.7,0.7,0.3);
    this.clock.display();
    this.popMatrix();

    //Poste AKA Cylinder
    this.pushMatrix();
    this.translate(8,0,5);
    this.poleTexture.apply();
    this.rotate(-90 * degToRad,1, 0, 0);
    this.scale(0.1,0.1,1);
    this.cilinder.display();
    this.popMatrix();

    //Submarino
    this.pushMatrix();
    this.materialDefault.apply();
    //this.translate(-4,-6,5);
    this.submarine.display();
    this.popMatrix();
    
    
    // ---- END Primitive drawing section
}
LightingScene.prototype.update = function(currTime)
{
		this.clock.update(currTime);
        this.cFrame++;

}
LightingScene.prototype.doSomething = function ()
{ 
	console.log("Doing something..."); 
};