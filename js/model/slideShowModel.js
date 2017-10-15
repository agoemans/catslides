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
    this.slideHelper.setSlides(this.slideData.slides, this.app);
    this.setNavigatorPositions(0);
};

SlideShowModel.prototype.getSlideList = function(){
    return this.slideHelper.getSlides();
};

SlideShowModel.prototype.setNavigatorPositions = function(index){
    //todo refactor, when reachig end or at start, reset
    this.currentSlide = this.slideHelper.getCurrentSlide(index);

    this.previousSlide = this.slideHelper.getPrevious(index);

    this.nextSlide = this.slideHelper.getNext(index);
};

SlideShowModel.prototype.updateSlides = function(){

};

SlideShowModel.prototype.getCurrentSlide = function(){
    return this.currentSlide;
};

