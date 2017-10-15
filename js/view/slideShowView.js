var SlideShowView = function(app){
    this.app = app;

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

    console.log('view createSlideShow', this.slides, this.app);
};

SlideShowView.prototype.createSlide = function(slideObj){
    this.slide = new Slide(slideObj);

    this.app.stage.addChild(this.slide.slideText);
    this.app.stage.addChild(this.slide.slideImage);
    this.app.stage.addChild(this.slide.popUpBox.popUpImage);
    this.app.stage.addChild(this.slide.popUpBox.popUpText);

    for(var i = 0; i < this.slide.interactiveBoxes.length; i++){
        this.app.stage.addChild(this.slide.interactiveBoxes[i]);
    };

    return this.slide;
};

SlideShowView.prototype.toggleVisibility = function(index, value){
    this.slides[index].toggleVisibility(value);
};

SlideShowView.prototype.setCurrentSlide = function(slide){
    this.currentSlide = this.slides[slide.id];
};
