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
    this.slideShowList = this.slideHelper.getSlides(this.slideData.slides, this.app);
    this.setSlidePositions(0);
};

SlideShowModel.prototype.getSlideList = function(){
    return this.slideShowList;
};

SlideShowModel.prototype.setSlidePositions = function(currentIndex){
    //todo refactor, when reachig end or at start, reset
    var lastIndex = this.slideShowList.length - 1;

    this.currentSlide = this.slideShowList[currentIndex];

    if(currentIndex === 0) {
        this.previousSlide = this.slideShowList[lastIndex];
    } else {
        this.previousSlide = this.slideShowList[currentIndex - 1];
    }

    if(currentIndex === lastIndex) {
        this.nextSlide = this.slideShowList[0];
    } else {
        this.previousSlide = this.slideShowList[currentIndex + 1];
    }
};

SlideShowModel.prototype.updateSlidePosition = function(){

};

SlideShowModel.prototype.getCurrentSlide = function(){
    return this.currentSlide;
};

