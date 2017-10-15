var SlideText = function(text, stage){
    PIXI.Text.call(this, text, {
        fontFamily: 'Snippet',
        fontSize: 35,
        fill: 'black',
        align: 'center'
    });

    this.x = 400;
    this.y = 600;

    this.visible = false;

}

SlideText.prototype = Object.create(PIXI.Text.prototype);

SlideText.prototype.constructor = SlideText;