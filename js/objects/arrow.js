var Arrow = function(x, imageUrl){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(imageUrl));

    this.position.x = x;
    this.position.y = 400;
    this.scale.set(0.5);

}

Arrow.prototype = Object.create(PIXI.Sprite.prototype);

Arrow.prototype.constructor = Arrow;