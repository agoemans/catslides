var PopUpImage = function(){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage('assets/images/popUpBox.png'));

    this.position.x = 10;
    this.position.y = 10;

    this.alpha = 0;
    this.anchor.set(0.5);

    this.scale.set(0);

};

PopUpImage.prototype = Object.create(PIXI.Sprite.prototype);

PopUpImage.prototype.constructor = PopUpImage;

PopUpImage.prototype.updateImage = function(parent, value){
    this.position.x = parent.x + (parent.width * 1.5);
    this.position.y = parent.y - (parent.height * 2);

    TweenMax.to(this.scale, 0.2, {
        x: value, y: value,
        ease: Sine.easeOut
    });

    TweenMax.to(this, 0.05, {
        alpha: 0.8,
        ease: Sine.easeOut
    })
};

PopUpImage.prototype.hide = function(){
    this.scale.set(0);
    this.alpha = 0;
};
