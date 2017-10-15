var SlideShowView = function(stage){
    this.stage = stage;

    this.slides = [];

    this.name = 'slideShowView';

    this.notifyHelper = null;

    this.slide = null;

    this.currentSlide = null;
};

SlideShowView.prototype.createSlideShow = function(slideArray){
    this.setSlides(slideArray);
};

SlideShowView.prototype.setSlides = function(slideArray){
    for(var i = 0; i < slideArray.length; i++){
        var slide  = this.createSlide(slideArray[i]);
        this.slides.push(slide);
    }

    console.log('view createSlideShow', this.slides);
};

SlideShowView.prototype.createSlide = function(slideObj){
    this.slide = new Slide(slideObj, this.stage);

    this.stage.addChild(this.slide.slideText);
    this.stage.addChild(this.slide.slideImage);

    return this.slide;
};

SlideShowView.prototype.toggleVisibility = function(index, value){
    this.slides[index].toggleVisibility(value);
};

SlideShowView.prototype.setCurrentSlide = function(slide){
    this.currentSlide = this.slides[slide.id];
};
