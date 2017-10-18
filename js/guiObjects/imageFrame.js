var ImageFrame = function(){
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(7, 0x3b8686, 0.8);
    graphics.drawRect(20, 15, 280, 280);

    PIXI.Sprite.call(this, graphics.generateTexture(false));

    this.anchor.set(0.5);

};

ImageFrame.prototype = Object.create(PIXI.Sprite.prototype);

ImageFrame.prototype.constructor = ImageFrame;
