var Arrow = function(imageUrl, app, isLeft){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(imageUrl));

    if(isLeft){
        this.position.x = app.renderer.width * 0.2;
    } else {
        this.position.x = app.renderer.width * 0.8;
    }

    this.position.y = app.renderer.height - 100;

    this.anchor.set(0.5, 0.5);
    this.scale.set(0.3);

}

Arrow.prototype = Object.create(PIXI.Sprite.prototype);

Arrow.prototype.constructor = Arrow;