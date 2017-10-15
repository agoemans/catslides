var SlideShowModel = function(){
    this.app = null;

    this.slideHelper = new BackendSlideHelper();

    this.slideShowList = [];
    this.previousSlide = null;
    this.currentSlide = null;
    this.nextSlide = null;

    this.slideData = null;
};

SlideShowModel.prototype.init = function(app){
    this.app = app;

    this.slideData = PIXI.loader.resources['assets/data/imageData.json'].data;
    // this.slideHelper.setSlides(this.slideData.slides, this.app);
    // this.setNavigatorPositions(0);
};

SlideShowModel.prototype.getData = function(){
    return this.slideData;
};

SlideShowModel.prototype.setNavigatorPositions = function(index){
    //todo refactor, when reachig end or at start, reset
    this.currentSlide = this.slideHelper.getCurrent(index);

    this.previousSlide = this.slideHelper.getPrevious(index);

    this.nextSlide = this.slideHelper.getNext(index);
};

SlideShowModel.prototype.getCenterPositionX = function(){
    return this.app.renderer.width;

};

SlideShowModel.prototype.getOffsetPositionX = function(data){
    if(data == 'left'){
        return -this.app.renderer.width;
    } else {
        return this.app.renderer.width;
    }
};

SlideShowModel.prototype.getCurrentIndex = function(data){
    if(data == 'left'){
        return this.currentSlide.id - 1;
    } else {
        return this.currentSlide.id + 1;
    }
};

SlideShowModel.prototype.getCurrentSlide = function(){
    return this.currentSlide;
};

SlideShowModel.prototype.getPreviousSlide = function(){
    return this.previousSlide;
};

SlideShowModel.prototype.getNextSlide = function(){
    return this.nextSlide;
};