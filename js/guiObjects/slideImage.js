var SlideImage = function(x, y, imageUrl){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(imageUrl));

    this.position.x = x;
    this.position.y = y;

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
    TweenMax.to(this, 0.15, {
        x: offsetX, alpha: 0, ease: Quad.easeOut
    })
};

SlideImage.prototype.slideIn = function(x){
    TweenMax.to(this, 0.15, {
        x: x, alpha: 1, visible: true, ease: Quad.easeIn
    })
};

SlideImage.prototype.updatePosition = function(x){
    this.position.x = x;
};