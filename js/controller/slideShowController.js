var SlideShowController = function(){
    this.slideModel = null;
    this.slideView = null;

    this.name = 'slideShowController';

    this.app = null;

    this.notifyHelper = null;

    this.currentSlide = null;
};

SlideShowController.prototype.init = function(app){
    this.app = app;

    this.slideModel = new SlideShowModel();
    this.slideModel.init(app);

    this.slideView = new SlideShowView(this.app);

    console.log('ctonroller SlideShowController');
};

SlideShowController.prototype.createSlideShow = function(){
    this.slideView.createSlideShow(this.slideModel.getSlideList());

    this.slideView.toggleVisibility(0, true);

    this.currentSlide = this.slideModel.getCurrentSlide();
};

SlideShowController.prototype.onClick = function(){
    console.log('Slide show Click');
    this.slideView.setCurrentSlide(this.slideModel.getCurrentSlide());
};

