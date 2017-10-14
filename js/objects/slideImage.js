var SlideImage = function(obj){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(obj.url));

    this.position.x = obj.x;

    this.anchor.set(0.5, 0);

    this.scale.set(0.7);

    this.visible = obj.visible;

}

SlideImage.prototype = Object.create(PIXI.Sprite.prototype);

SlideImage.prototype.constructor = SlideImage;