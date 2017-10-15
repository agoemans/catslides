var SlideShowView = function(app){
    this.app = app;

    this.slides = [];

    this.name = 'slideShowView';

    this.notifyHelper = null;

    this.slide = null;

    this.currentSlide = null;
};

SlideShowView.prototype.init = function(app){
    this.app = app;
};

SlideShowView.prototype.setCurrentSlide = function(slide){
    this.currentSlide = slide;
};

SlideShowView.prototype.show = function(){
    this.currentSlide.toggleVisibility(true);
};


SlideShowView.prototype.toggleVisibility = function(index, value){
    this.slides[index].toggleVisibility(value);
};

SlideShowView.prototype.update = function(offsetX, currentX, currentSlide){
    TweenLite.to(this.currentSlide.slideImage, 0.35, { x: -400});
    //todo animated this
    // var previousSlide = this.currentSlide;
    // previousSlide.hide(offsetX);
    //
    // //todo change this next, slides[currentslide.id] or something
    //
    // this.currentSlide = currentSlide;
    // this.currentSlide.show(currentX);
};
