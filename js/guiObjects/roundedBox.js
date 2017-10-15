var RoundedBox = function(obj, parent, tint){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage('assets/images/box.png'));

    var offsetX = parent.x - (parent.width * parent.anchor.x) + obj.x;
    var offsetY = parent.y - (parent.height * parent.anchor.y) + obj.y;

    this.position.x = offsetX;
    this.position.y = offsetY;

    this.name = 'roundedBox';

    this.tint = tint;

    this.scale.set(0.5);

    this.text = obj.text;

    this.notifyHelper = null;

    this.visible = false;

    this.setupClickListeners();

};

RoundedBox.prototype = Object.create(PIXI.Sprite.prototype);

RoundedBox.prototype.constructor = RoundedBox;

RoundedBox.prototype.setupClickListeners = function(){
    this.buttonMode = true;
    this.interactive = true;

    var that = this;
    this.on('pointerdown', function(){
        that.notifyHelper.sendClickEvent('popUpBox', that);
        // onClickCallback.call(onClickContext, this);
    })
        // .on('pointerup', onButtonUp)
        // .on('pointerupoutside', onButtonUp)
        // .on('pointerover', onButtonOver)
        .on('pointerout', function(){
            console.log('out');
        });
};

RoundedBox.prototype.updateBoxPosition = function(offsetX, parent){
    var newOffsetX = parent.x - (parent.width * parent.anchor.x) + offsetX;

    this.position.x = newOffsetX;
};