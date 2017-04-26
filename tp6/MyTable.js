/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
    CGFobject.call(this, scene);
    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyQuad;
MyTable.prototype.display = function() {
	//pernas
    this.scene.pushMatrix();
    this.scene.materialDefault.apply();
    this.scene.scale(0.3, 3.5, 0.3);
    this.scene.translate(0, 0.5, 0);
    this.scene.pushMatrix();

    this.scene.pushMatrix();
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(16, 0, 0);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 10);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(16, 0, 10);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
    this.scene.popMatrix();

    //tampo
    this.scene.pushMatrix();
    this.scene.scale(5, 0.3, 3);
    this.scene.translate(0.5, 12, 0.5);
    this.scene.tableAppearance.apply();
    this.cube.display();
    this.scene.popMatrix();
    // X -RED
    // Y - BLUE
    // Z - GREEN

}