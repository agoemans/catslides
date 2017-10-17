var SlideShowModel = function(){
    this.app = null;

    this.slideData = null;
};

SlideShowModel.prototype.init = function(app){
    this.app = app;

    this.slideData = PIXI.loader.resources['assets/data/imageData.json'].data;
};

SlideShowModel.prototype.getData = function(){
    return this.slideData;
};
