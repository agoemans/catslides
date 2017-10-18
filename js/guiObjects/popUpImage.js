var PopUpImage = function(){
    PIXI.Sprite.call(this, PIXI.Texture.fromImage('assets/images/popUpBox.png'));

    this.position.x = 10;
    this.position.y = 10;
    //
    // this.width = 200;
    // this.height = 100;

    this.alpha = 0.8;
    this.anchor.set(0.5);

    this.visible = false;

};

PopUpImage.prototype = Object.create(PIXI.Sprite.prototype);

PopUpImage.prototype.constructor = PopUpImage;

PopUpImage.prototype.updateImage = function(parent){
    this.position.x = parent.x + (parent.width * 1.5);
    this.position.y = parent.y - (parent.height * 1.5);
};
