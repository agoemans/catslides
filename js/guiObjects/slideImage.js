var SlideImage = function(x, y, imageUrl){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(imageUrl));

    this.position.x = x;
    this.position.y = y;

    console.log('this.position.y', this.position.y);

    this.anchor.set(0.5, 0.5);

    this.scale.set(0.7);

    this.visible = false;

}

SlideImage.prototype = Object.create(PIXI.Sprite.prototype);

SlideImage.prototype.constructor = SlideImage;

SlideImage.prototype.hide = function(offsetX){
    this.position.x = offsetX;
    this.visible = false;
};

SlideImage.prototype.show = function(x){
    this.position.x = x;
    this.visible = true;
};
