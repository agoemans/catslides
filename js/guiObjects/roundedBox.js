var RoundedBox = function(obj, parent, tint){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage('assets/images/box.png'));

    this.position.x = parent.x - (parent.width * 0.5) + obj.x;
    this.position.y = parent.y - (parent.height * 0.5) + obj.y;

    this.originalX = obj.x;
    this.name = 'roundedBox';

    this.text = obj.text;

    this.notifyHelper = null;

    this.alpha = 0.6;

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
    var newOffsetX = parent.x - (parent.width * parent.anchor.x) + this.originalX;
    this.position.x = newOffsetX;
};

RoundedBox.prototype.toggleVisiblity = function(value){
    this.visible = value;
};
