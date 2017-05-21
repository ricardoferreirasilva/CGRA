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
    this.torpedo;
    this.showTorpedo=false;
    this.background = new MyCylinder(this, 8,20);
    
    //targets
    this.homer_target = new MyTarget(this,1,0.5,1);
	this.homer_target.appearence=0;
    this.bullseye_target = new MyTarget(this,3,0.5,3);
    this.bullseye_target.appearence=1;
    this.naperon_target= new MyTarget(this, 8, 0.5, 4);
    this.naperon_target.appearence=2;
    this.metal_target= new MyTarget(this, 6,0.5,6);
    this.metal_target.appearence=3;
    this.sponge_target= new MyTarget(this, 1,0.5,4);
    this.sponge_target.appearence=4;
    this.targets=[];
    this.targets[0]=this.homer_target;
    this.targets[1]=this.bullseye_target;
    this.targets[2]=this.naperon_target;
    this.targets[3]=this.metal_target;
    this.targets[4]=this.sponge_target;
    
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
    
    this.metal_darkAppearence=new CGFappearance(this);
	this.metal_darkAppearence.setAmbient(0.1, 0.1, 0.1, 0.1);
	this.metal_darkAppearence.setDiffuse(1,1, 1, 0.2);
	this.metal_darkAppearence.setSpecular(1, 1, 1, 0.3);
	this.metal_darkAppearence.setShininess(50);
    this.metal_darkAppearence.loadTexture("../tp6/metal_dark.png");
    
    this.metalAppearence= new CGFappearance(this);
    this.metalAppearence.setAmbient(1, 1, 1, 0.1);
	this.metalAppearence.setDiffuse(1, 1, 1, 0.2);
	this.metalAppearence.setSpecular(1, 1, 1, 0.3);
	this.metalAppearence.setShininess(50);
	this.metalAppearence.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.metalAppearence.loadTexture("../tp6/metal.jpg");
     
    this.metal_comicsAppearence= new CGFappearance(this);
    this.metal_comicsAppearence.setAmbient(1, 1, 1, 0.1);
	this.metal_comicsAppearence.setDiffuse(1, 1, 1, 0.2);
	this.metal_comicsAppearence.setSpecular(1, 1, 1, 0.3);
	this.metal_comicsAppearence.setShininess(50);
	this.metal_comicsAppearence.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.metal_comicsAppearence.loadTexture("../tp6/metal_comics.jpg");
    
    this.metal_rustyAppearence= new CGFappearance(this);
    this.metal_rustyAppearence.setAmbient(1, 1, 1, 0.1);
	this.metal_rustyAppearence.setDiffuse(1, 1, 1, 0.2);
	this.metal_rustyAppearence.setSpecular(1, 1, 1, 0.3);
	this.metal_rustyAppearence.setShininess(50);
	this.metal_rustyAppearence.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.metal_rustyAppearence.loadTexture("../tp6/metal_rusty.png");
    
    this.homerAppearence= new CGFappearance(this);
    this.homerAppearence.setAmbient(1, 1, 1, 0.1);
	this.homerAppearence.setDiffuse(1, 1, 1, 0.2);
	this.homerAppearence.setSpecular(1, 1, 1, 0.3);
	this.homerAppearence.setShininess(50);
    this.homerAppearence.loadTexture("../tp6/homer.png");
    
    this.bullseyeAppearence= new CGFappearance(this);
    this.bullseyeAppearence.setAmbient(1, 1, 1, 0.1);
	this.bullseyeAppearence.setDiffuse(1, 1, 1, 0.2);
	this.bullseyeAppearence.setSpecular(1, 1, 1, 0.3);
	this.bullseyeAppearence.setShininess(50);
    this.bullseyeAppearence.loadTexture("../tp6/bullseye.jpg");
    
    this.spongeAppearence= new CGFappearance(this);
    this.spongeAppearence.setAmbient(1, 1, 1, 0.1);
	this.spongeAppearence.setDiffuse(1, 1,1, 0.2);
	this.spongeAppearence.setSpecular(1, 1, 1, 0.3);
	this.spongeAppearence.setShininess(50);
	this.spongeAppearence.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.spongeAppearence.loadTexture("../tp6/sponge.jpg");
    
    this.naperonAppearence= new CGFappearance(this);
    this.naperonAppearence.setAmbient(1, 1, 1, 0.1);
	this.naperonAppearence.setDiffuse(1,1, 1, 0.2);
	this.naperonAppearence.setSpecular(1, 1, 1, 0.3);
	this.naperonAppearence.setShininess(50);
    this.naperonAppearence.loadTexture("../tp6/naperon.png");
    
    this.oceanAppearence= new CGFappearance(this);
    this.oceanAppearence.setAmbient(1, 1, 1, 0.1);
	this.oceanAppearence.setDiffuse(1,1, 1, 0.2);
	this.oceanAppearence.setSpecular(1, 1, 1, 0.3);
	this.oceanAppearence.setShininess(100);
    this.oceanAppearence.loadTexture("../tp6/ocean.jpg");

    this.submarineAppearance = this.materialDefault;
    this.submarineAppearances=[];
    this.submarineAppearances[0]=this.materialDefault;
    this.submarineAppearances[1]=this.floorAppearance;
    this.submarineAppearances[2]=this.metalAppearence;
    this.submarineAppearances[3]=this.metal_darkAppearence;
    this.submarineAppearances[4]=this.metal_comicsAppearence;
    this.submarineAppearances[5]=this.metal_rustyAppearence;
    this.submarineAppearances[6]=this.spongeAppearence;
    
    this.currSubmarineAppearance=0; // indica o indice da textura atual do submarino
    this.submarineAppearanceList= ['standard','wood', 'metal', 'dark metal', 'comics metal', 'rusty metal', 'sponge'];
 
    this.setUpdatePeriod(1/60);
    
    this.luz0=false
    this.luz1=false; 
    this.luz2=false;
    this.speed=3;
    this.relogio = false;

}; 

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
    //this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);

    // Positions for four lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[0].setVisible(true);
    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(1, 1, 0, 1.0);
    this.lights[0].enable();

    this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
    this.lights[1].setVisible(true); // show marker on light position (different from enabled)
 	this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();

    this.lights[2].setPosition(10.5, 6.0, 5, 1.0);
    this.lights[2].setVisible(true);
    this.lights[2].setAmbient(0, 0, 0, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1, 1, 1, 1);
    this.lights[2].setConstantAttenuation(0);
    this.lights[2].setLinearAttenuation(0)
    this.lights[2].setQuadraticAttenuation(0.2)
    this.lights[2].enable();
};

LightingScene.prototype.updateLights = function() {
    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
        if(this.luz0) 
        	this.lights[0].enable();
        else this.lights[0].disable(); 

        if(this.luz1) 
        	this.lights[1].enable();
        else this.lights[1].disable(); 

        if(this.luz2) 
        	this.lights[2].enable();
        else this.lights[2].disable(); 
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
	    this.translate(8,5,0);
		this.scale(0.7,0.7,0.3);
	    this.clock.display();
    this.popMatrix();

    //Poste AKA Cylinder
    this.pushMatrix();
	    this.translate(8,0,0.15);
	    this.rotate(-90 * degToRad,1, 0, 0);
	    this.scale(0.1,0.1,4.5);
	    this.cilinder.display();
    this.popMatrix();

    //Submarino
    this.pushMatrix();
    	this.materialDefault.apply();
    	this.rotate(90 * degToRad,0, 1, 0);
   	 	this.submarine.display();
   	this.popMatrix();
    
   	//Target

	for(i=0;i<5;i++){
		this.pushMatrix();
			this.translate(this.targets[i].x,this.targets[i].y,this.targets[i].z);
			this.targets[i].display();
		this.popMatrix();
	}
	
	//Torpedo
	this.pushMatrix();
		if(this.torpedo != null)
			this.torpedo.display();
	this.popMatrix();
   	
   	/*
   	//BackGround
   	this.pushMatrix();
   		this.oceanAppearence.apply();
   		this.scale(100,500,100);
   		this.rotate(90 * degToRad,1, 0, 0);
   		this.translate(0,0,-0.5);
   		this.background.display();
   	this.popMatrix();*/
    // ---- END Primitive drawing section
}
LightingScene.prototype.update = function(currTime)
{
	//Clock Update
	if(this.relogio){
		this.clock.update(currTime);
        this.cFrame++;
	}
    this.submarine.update(currTime);
	if(this.torpedo != null) this.torpedo.update(currTime);
	
	//GUI Appearance choice    
    switch (this.submarineAppearance) {
    case "standard":
        this.currSubmarineAppearance = 0;
        break;
    case "wood":
        this.currSubmarineAppearance = 1;
        break;
    case "metal":
        this.currSubmarineAppearance = 2;
        break;
    case "dark metal":
    	this.currSubmarineAppearance=3;
    	break;
    case "comics metal":
    	this.currSubmarineAppearance=4;
    	break;
    case "rusty metal":
    	this.currSubmarineAppearance=5;
    	break;
    case "sponge":
    	this.currSubmarineAppearance=6;
    	break;
    }
}
LightingScene.prototype.launchTorpedo = function()
{
    this.torpedo = new MySpawnTorpedo(this,this.submarine.x,this.submarine.y,this.submarine.z, this.submarine.hor_angle, this.submarine.ver_angle);
    console.log("TOR: " + this.torpedo.x + " " +  this.torpedo.y + " " +  this.torpedo.z + " ");
    console.log("SUB: " + this.submarine.x + " " +  this.submarine.y + " " +  this.submarine.z + " ");
    //this.showTorpedo = true;
}

