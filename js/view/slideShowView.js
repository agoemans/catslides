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

SlideShowView.prototype.update = function(offsetX, dir, defaultX){
    this.previousSlide.slideOut(offsetX, dir, defaultX);
    this.currentSlide.slideIn();

    // TweenMax.fromTo(this.currentSlide.slideImage, 0.25, { x: 200 }, { x: offsetX, ease: SlowMo.ease.config(0.1, 0.4, false)});
    // TweenLite.to(this.currentSlide.slideImage, 0.1, { alpha: 0, ease: Expo.easeOut});
    //todo animated this
    // var previousSlide = this.currentSlide;
    // previousSlide.hide(offsetX);
    //
    // //todo change this next, slides[currentslide.id] or something
    //
    // this.currentSlide = currentSlide;
    // this.currentSlide.show(currentX);
};
