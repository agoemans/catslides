var Arrow = function(imageUrl, app, dir){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(imageUrl));

    this.dir = dir;
    if(this.dir === 'left'){
        this.position.x = app.renderer.width * 0.2;
    } else {
        this.position.x = app.renderer.width * 0.8;
    }

    this.position.y = app.renderer.height * 0.85;

    this.anchor.set(0.5, 0.5);
    this.scale.set(0.3);

}

Arrow.prototype = Object.create(PIXI.Sprite.prototype);

Arrow.prototype.constructor = Arrow;

Arrow.prototype.setupClickListeners = function(onClickCallback, onClickContext){
    this.buttonMode = true;
    this.interactive = true;

    var that = this;
    this.on('pointerdown', function(){
        onClickCallback.call(onClickContext, that.dir);
    })
    // .on('pointerup', onButtonUp)
    // .on('pointerupoutside', onButtonUp)
    // .on('pointerover', onButtonOver)
        .on('pointerout', function(){
            console.log('out');
        });
};