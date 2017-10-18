var RoundedBox = function(obj, parent){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage('assets/images/box.png'));

    this.position.x = parent.x - (parent.width * 0.5) + obj.x;
    this.position.y = parent.y - (parent.height * 0.5) + obj.y;

    this.originalX = obj.x;
    this.name = 'roundedBox';

    this.text = obj.text;

    this.notifyHelper = null;

    this.anchor.set(0.5);
    this.alpha = 0.9;

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
    })
        .on('pointerover', function(){
            TweenMax.to(this.scale, 0.05, {
                x: 1.5, y: 1.5, ease: Quad.easeIn
            });
        })
        .on('pointerout', function(){
            TweenMax.to(this.scale, 0.05, {
                x: 1, y: 1, ease: Quad.easeIn
            });
        });
};

RoundedBox.prototype.updateBoxPosition = function(offsetX, parent){
    var newOffsetX = parent.x - (parent.width * parent.anchor.x) + this.originalX;
    this.position.x = newOffsetX;
};

RoundedBox.prototype.toggleVisiblity = function(value){
    this.visible = value;
};
