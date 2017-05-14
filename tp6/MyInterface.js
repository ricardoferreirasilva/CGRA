/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	//this.gui.add(this.scene, 'rotateLeft');	
	//this.gui.add(this.scene, 'rotateRight');	
	//this.gui.add(this.scene, 'translateForward');	
	//this.gui.add(this.scene, 'translateBackwards');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Luzes");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean	
	group.add(this.scene, 'luz0').name('Light 0');
	group.add(this.scene, 'luz1').name('Light 1');
	group.add(this.scene, 'luz2').name('Light 2');

	//Texture drop Down box
	this.gui.add(this.scene, 'submarineAppearance', this.scene.submarineAppearanceList ).name('Textures');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5).name('Speed');

	this.gui.add(this.scene, 'relogio').name('Clock');

	return true;
};

MyInterface.prototype.processKeyDown = function(event) {
	CGFinterface.prototype.processKeyDown.call(this,event);
	switch (event.keyCode)
	{
		case (97)://a - left
			this.scene.submarine.switchDirection('left');
			break;
		case (65)://a - left
			this.scene.submarine.switchDirection('left');
			break;
		case (100)://d - right
			this.scene.submarine.switchDirection('right');
			break;
		case (68)://d - right
			this.scene.submarine.switchDirection('right');
			break;
		case (119)://w - forward
			this.scene.submarine.switchDirection('forward');
			
		case (87)://w - forward
			this.scene.submarine.switchDirection('forward');
			break;
		case (83)://s - back
			this.scene.submarine.switchDirection('back');
			break;
		case (115)://s - back
			this.scene.submarine.switchDirection('back');
			break;
		case (81)://Q subir
			this.scene.submarine.switchDirection('up');
			break;
		case (113)://Q subir
			this.scene.submarine.switchDirection('up');
			break;
		case (69)://E descer
			this.scene.submarine.switchDirection('down');
			break;
		case (101)://E descer
			this.scene.submarine.switchDirection('down');
			break;
		case(80)://p subir periscopio
			this.scene.submarine.periscopeUp();
			break;
		case(112)://p subir periscopio
			this.scene.submarine.periscopeUp();
			break;
		case(76)://l descer periscopio
			this.scene.submarine.periscopeDown();
			break;
		case(108)://l descer periscopio
			this.scene.submarine.periscopeDown();
			break;
	};
};

/**
 * processKeyUp
 * @param event {Event}
 */

MyInterface.prototype.processKeyUp = function(event) {
	CGFinterface.prototype.processKeyUp.call(this, event);
	switch (event.keyCode)
	{
	case (97)://a - left
		this.scene.submarine.handleKeyUp('left');
		break;
	case (65)://a - left
		this.scene.submarine.handleKeyUp('left');
		break;
	case (100)://d - right
		this.scene.submarine.handleKeyUp('right');
		break;
	case (68)://d - right
		this.scene.submarine.handleKeyUp('right');
		break;
	case (119)://w - forward
		this.scene.submarine.handleKeyUp('forward');
		break;
	case (87)://w - forward
		this.scene.submarine.handleKeyUp('forward');
		break;
	case (115)://s - back
		this.scene.submarine.handleKeyUp('back');
		break;
	case (83)://s - back
		this.scene.submarine.handleKeyUp('back');
		break;
	/*case (113)://Q subir
		this.scene.submarine.handleKeyUp('up');
		break;
	case (81)://Q subir
		this.scene.submarine.handleKeyUp('up');
		break;
	case (101)://E descer
		this.scene.submarine.handleKeyUp('down');
		break;
	case (69)://E descer
		this.scene.submarine.handleKeyUp('down');
		break;*/
	};
};

