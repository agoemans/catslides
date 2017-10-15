var RoundedBox = function(obj, parent, tint){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage('assets/images/box.png'));

    var offsetX = parent.x - (parent.width * parent.anchor.x) + obj.x;
    var offsetY = parent.y - (parent.height * parent.anchor.y) + obj.y;

    this.position.x = offsetX;
    this.position.y = offsetY;

    this.tint = tint;

    this.scale.set(0.5);

    this.text = obj.text;

    this.clicked = false;
    this.visible = false;

};

RoundedBox.prototype = Object.create(PIXI.Sprite.prototype);

RoundedBox.prototype.constructor = RoundedBox;

RoundedBox.prototype.setupClickListeners = function(onClickCallback, onClickContext){
    console.log('RoundedBox setupClick listners');
    this.buttonMode = true;
    this.interactive = true;

    this.on('pointerdown', function(){
        onClickCallback.call(onClickContext, this);
    })
        // .on('pointerup', onButtonUp)
        // .on('pointerupoutside', onButtonUp)
        // .on('pointerover', onButtonOver)
        .on('pointerout', function(){
            console.log('out');
        });
};