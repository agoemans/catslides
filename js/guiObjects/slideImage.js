var SlideImage = function(x, y, imageUrl){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(imageUrl));

    this.position.x = x;
    this.position.y = y;

    this.anchor.set(0.5, 0.5);

    this.scale.set(0.7);

    this.alpha = 0;

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
    console.log('image Slide Out', offsetX, this.position.x);

    TweenMax.to(this, 0.25, {
        x: offsetX, alpha: 0, ease: Quad.easeOut
    })
};

SlideImage.prototype.slideIn = function(x){
    console.log('image Slide In', this.position.x);
    TweenMax.to(this, 0.35, {
        x: x, alpha: 1, visible: true, ease: Quad.easeOut
    })
};

SlideImage.prototype.updatePosition = function(x){
    this.position.x = x;
};