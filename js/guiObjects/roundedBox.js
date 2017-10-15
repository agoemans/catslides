var RoundedBox = function(obj, app){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage('assets/images/box.png'));

    this.position.x = obj.x;
    this.position.y = obj.y;

    this.anchor.set(0.5, 0.5);

    this.tint = 0xFFDAFF;

    console.log('this round box', this);

};

RoundedBox.prototype = Object.create(PIXI.Sprite.prototype);

RoundedBox.prototype.constructor = RoundedBox;