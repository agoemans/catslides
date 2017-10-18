var SlideText = function(txtObj){
    PIXI.Text.call(this, txtObj.txt, {
        fontFamily: 'Droid Serif',
        fontSize: txtObj.size,
        fill: 'black',
        align: 'center'
    });

    this.x = txtObj.x;
    this.y = txtObj.y;

    this.anchor.set(0.5, 0.5);

    this.visible = false;

}

SlideText.prototype = Object.create(PIXI.Text.prototype);

SlideText.prototype.constructor = SlideText;

SlideText.prototype.hide = function(app){
    this.position.x = -app.renderer.width;
    this.visible = false;
};

SlideText.prototype.show = function(app){
    this.position.x = app.renderer.width / 2;
    this.visible = true;
};
