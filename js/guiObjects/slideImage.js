var SlideImage = function(name, imageUrl){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(imageUrl));

    this.slideImageName = name;
    this.position.x = 0;
    this.position.y = 0;

    this.anchor.set(0.5, 0.5);

    this.alpha = 1;

};

SlideImage.prototype = Object.create(PIXI.Sprite.prototype);

SlideImage.prototype.constructor = SlideImage;

SlideImage.prototype.hide = function(offsetX){
    this.position.x = offsetX;
    // this.visible = false;
    this.alpha = 0;
};

SlideImage.prototype.show = function(x){
    this.position.x = x;
    // this.visible = true;
    this.alpha = 1;
};

SlideImage.prototype.slideOut = function(offsetX){
    TweenMax.to(this, 0.35, {
        x: offsetX, ease: Sine.easeOut
    });

    TweenMax.to(this, 0.2, {
        alpha: 0, ease: Sine.easeOut
    })
};

SlideImage.prototype.slideIn = function(x){
    TweenMax.to(this, 0.5, {
        x: x, ease: Quad.easeIn
    });

    TweenMax.to(this, 0.25, {
        alpha: 1, ease: Quad.easeIn
    })
};

SlideImage.prototype.updatePosition = function(x){
    this.position.x = x;
};