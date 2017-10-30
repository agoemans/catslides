var SlideShowView = function(app){
    this.app = app;

    this.slides = [];

    this.name = 'slideShowView';

    this.notifyHelper = null;

    this.slide = null;

    this.currentSlide = null;
    this.previousSlide = null;
};

SlideShowView.prototype.init = function(app){
    this.app = app;
};

SlideShowView.prototype.setCurrentSlide = function(slide){
    this.currentSlide = slide;
};

SlideShowView.prototype.setPreviousSlide = function(slide){
    this.previousSlide = slide;
};

SlideShowView.prototype.show = function(){
    this.currentSlide.toggleVisibility(true);
};


SlideShowView.prototype.toggleVisibility = function(index, value){
    this.slides[index].toggleVisibility(value);
};

SlideShowView.prototype.updatePosition = function(x){
    this.currentSlide.updatePosition(x)
};

SlideShowView.prototype.update = function(x, offsetX){
    this.previousSlide.hidePopUp();
    this.previousSlide.slideOut(offsetX, this.app);
    this.currentSlide.slideIn(x, this.app);
};
