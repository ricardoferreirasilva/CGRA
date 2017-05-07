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
	this.gui.add(this.scene, 'submarineAppearance', this.scene.submarineAppearanceList );
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5).name('Speed');

	this.gui.add(this.scene, 'relogio').name('Clock');

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (97):{//a - left
			console.log("Key 'a' pressed");
			this.scene.rotateLeft();
		}
		break;
		case (100):{//d - right
			console.log("Key 'd' pressed");
			this.scene.rotateRight();
		}
		break;
		case (119):{//w - up
			console.log("Key 'w' pressed");
			this.scene.translateForward();
		}
		break;
		case (115):{//s - down
			console.log("Key 's' pressed");
			this.scene.translateBackwards();
		}
		break;
	};
};
