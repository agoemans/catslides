var SlideImageContainer = function(x, y){
    PIXI.Container.call(this);

    this.position.x = x;
    this.position.y = y;

    this.alpha = 1;

};

SlideImageContainer.prototype = Object.create(PIXI.Container.prototype);

SlideImageContainer.prototype.constructor = SlideImageContainer;

SlideImageContainer.prototype.hide = function(offsetX){
    this.position.x = offsetX;
    this.alpha = 0;
};

SlideImageContainer.prototype.show = function(x){
    this.position.x = x;
    this.alpha = 1;
};

SlideImageContainer.prototype.slideOut = function(offsetX){
    TweenMax.to(this, 0.15, { x: offsetX, alpha: 0, ease: Circ.easeOut })
};

SlideImageContainer.prototype.slideIn = function(x){
    TweenMax.to(this, 0.15, { x: x, alpha: 1, visible: true, ease: Circ.easeOut })
};

SlideImageContainer.prototype.updatePosition = function(x){
    this.position.x = x;
};