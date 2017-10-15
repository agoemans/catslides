var SlideImage = function(obj){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(obj.url));

    this.position.x = obj.x;
    this.position.y = obj.y;

    console.log('this.position.y', this.position.y);

    this.anchor.set(0.5, 0.5);

    this.scale.set(0.7);

    this.visible = obj.visible;

}

SlideImage.prototype = Object.create(PIXI.Sprite.prototype);

SlideImage.prototype.constructor = SlideImage;
