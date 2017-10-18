var SlideLabelText = function(app){
    PIXI.Text.call(this, 'Slide # 1', {
        fontFamily: 'Droid Serif',
        fontSize: 15,
        fill: 'black',
        align: 'center'
    });

    this.x = app.renderer.width * 0.63;
    this.y = app.renderer.height * 0.13;

    this.anchor.set(0.5, 0.5);

};

SlideLabelText.prototype = Object.create(PIXI.Text.prototype);

SlideLabelText.prototype.constructor = SlideLabelText;

SlideLabelText.prototype.setLabelText = function(id){
    this.text = 'Slide #' + (id + 1);
};
