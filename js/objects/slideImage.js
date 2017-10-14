var SlideImage = function(imageUrl){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(imageUrl));

    this.position.x = 400;

}

SlideImage.prototype = Object.create(PIXI.Sprite.prototype);

SlideImage.prototype.constructor = SlideImage;