var SlideText = function(text, stage){
    PIXI.Text.call(this, text, {
        fontFamily: 'Snippet',
        fontSize: 35,
        fill: 'black',
        align: 'center'
    });

    this.x = stage.width / 2;
    this.y = stage.height - 50;

    this.visible = false;

}

SlideText.prototype = Object.create(PIXI.Text.prototype);

SlideText.prototype.constructor = SlideText;