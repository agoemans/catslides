var PopUpText = function(){
    PIXI.Text.call(this, 'This is filler text', {
        fontFamily: 'Space Mono',
        fontSize: 15,
        fill: 'black',
        align: 'center'
    });

    this.x = 10;
    this.y = 10;

    this.anchor.set(0.5, 0.5);

    this.alpha = 0;

};

PopUpText.prototype = Object.create(PIXI.Text.prototype);

PopUpText.prototype.constructor = PopUpText;

PopUpText.prototype.show = function(txt, parent){
    this.x = parent.x;
    this.y = parent.y;
    this.text = txt;

    TweenMax.to(this, 0.25, {
        alpha: 1,
        ease: Quad.easeOut
    })
};

PopUpText.prototype.hide = function(){
    this.alpha = 0;
};
