var SlideText = function(text){
    PIXI.Text.call(this, text, {
        fontFamily: 'Snippet',
        fontSize: 35,
        fill: 'black',
        align: 'left'
    });

    this.position.set(20);

}

SlideText.prototype = Object.create(PIXI.Text.prototype);

SlideText.prototype.constructor = SlideText;