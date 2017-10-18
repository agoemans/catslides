var SlideImageContainer = function(x, y){
    PIXI.Container.call(this);

    this.position.x = x;
    this.position.y = y;
    //
    // this.anchor.set(0.5, 0.5);

    this.alpha = 1;

};

SlideImageContainer.prototype = Object.create(PIXI.Container.prototype);

SlideImageContainer.prototype.constructor = SlideImageContainer;

SlideImageContainer.prototype.centerChildren = function(){
    this.pivot.x = this.renderer.width / 2;
    this.pivot.y = this.renderer.height / 2;
};

SlideImageContainer.prototype.hide = function(offsetX){
    this.position.x = offsetX;
    // this.visible = false;
    this.alpha = 0;
};

SlideImageContainer.prototype.show = function(x){
    this.position.x = x;
    // this.visible = true;
    this.alpha = 1;
};

SlideImageContainer.prototype.slideOut = function(offsetX){
    console.log('>>>>>>>>>>>>>>>>>>>before slide out, that', this);
    var that = this;
    TweenMax.to(this, 0.15, {
        x: offsetX, alpha: 0, ease: Quad.easeOut, onComplete: function(){
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>after slide out, that', that);
        }
    })
};

SlideImageContainer.prototype.slideIn = function(x){
    console.log('>>>>>>>>>>>>>>>>>>>before slide in, that', this);
    var that = this;
    TweenMax.to(this, 0.15, {
        x: x, alpha: 1, visible: true, ease: Quad.easeIn, onComplete: function(){
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>after slide in, that', that);
    }
    })
};

SlideImageContainer.prototype.updatePosition = function(x){
    this.position.x = x;
};