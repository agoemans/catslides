var RoundedBox = function(obj, parent, tint){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage('assets/images/box.png'));

    // this.offsetX = parent.x - (parent.width * parent.anchor.x) + obj.x;
    // this.offsetY = parent.y - (parent.height * parent.anchor.y) + obj.y;

    this.position.x = parent.x - (parent.width * 0.5) + obj.x;
    this.position.y = parent.y - (parent.height * 0.5) + obj.y;

    console.log('++++++++++++++++++++++++++++')
    console.log('x,y', this.x, this.y, this)

    this.name = 'roundedBox';

    this.tint = tint;

    this.scale.set(0.5);

    this.text = obj.text;

    this.notifyHelper = null;
    this.objX = obj.x;

    // this.visible = false;

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
    var newOffsetX = parent.x - (parent.width * parent.anchor.x) + this.objX;

    console.log('origin x position ====', this.position.x);
    console.log('updateBoxPosition ====', offsetX, newOffsetX, parent.x);
    console.log('newOffsetX', newOffsetX);
    console.log('parent.width', parent.width);
    this.position.x = newOffsetX;
};

RoundedBox.prototype.toggleVisiblity = function(value){
    this.visible = value;
};
