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
    this.alpha = 0;
};

SlideImage.prototype.show = function(x){
    this.position.x = x;
    this.alpha = 1;
};

SlideImage.prototype.updatePosition = function(x){
    this.position.x = x;
};