var SlideShowController = function(){
    this.name = 'slideShowController';
    this.app = null;

    this.slideModel = null;
    this.slideShowView = null;

    this.slides = [];

    this.notifyHelper = null;

    this.slideFactory = new SlideFactory();
};

SlideShowController.prototype.init = function(app){
    this.app = app;

    this.slideModel = new SlideShowModel();
    this.slideModel.init(app);

    this.slideShowView = new SlideShowView();
    this.slideShowView.init(app);
};

SlideShowController.prototype.createSlideShow = function(){
    var data = this.slideModel.getData();

    for (var i = 0; i < data.slides.length; i++){
        var slide = this.slideFactory.create(i, data.slides[i], this.app);
        this.slides.push(slide);
    }

    //todo delete
    console.log(this.slides);

    this.setCurrentSlide(0);
    this.show();
};

SlideShowController.prototype.getCurrentSlide = function(){
    return this.currentSlide;
};

SlideShowController.prototype.setCurrentSlide = function(index){
    this.currentSlide = this.slides[index];
    this.slideShowView.setCurrentSlide(this.currentSlide);
};

SlideShowController.prototype.show = function(){
    this.slideShowView.show();
};

SlideShowController.prototype.onClick = function(data){
    console.log('Slide show Click');
    console.log('==========================');
   this.slideShowView.update();

    // this.slideShowView.setCurrentSlide(this.slideModel.getCurrentSlide());

    // var currentIndex = this.slideModel.getCurrentIndex(data);
    // this.slideModel.setNavigatorPositions(currentIndex);
    //
    // var offsetX = this.slideModel.getOffsetPositionX(data);
    // var currentPositionX = this.slideModel.getCenterPositionX(data);
    //
    // this.slideShowView.update(offsetX, currentPositionX, this.slideModel.getCurrentSlide());

    console.log(this.slideModel.getCurrentSlide());
    console.log(this.slideModel.getPreviousSlide());
    console.log(this.slideModel.getNextSlide());
};

