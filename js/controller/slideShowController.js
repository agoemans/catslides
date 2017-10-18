var SlideShowController = function(){
    this.name = 'slideShowController';
    this.app = null;

    this.slideModel = null;
    this.slideShowView = null;

    this.currentSlide = null;

    this.slides = [];

    this.notifyHelper = null;

    this.slideNavHelper = new SlideNavHelper();

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
    console.log('Slide show Click', data);
    console.log('==========================');

    var lastId = this.slides.length - 1;
    var nextSlideIndex = this.slideNavHelper.getCurrent(data, this.currentSlide.id, lastId);

    var previousSlide = this.currentSlide;
    var nextSlide = this.slides[nextSlideIndex];
    this.setCurrentSlide(nextSlideIndex);

    var offsetX = (data == 'left' ? -200 : 200);
    var startPositionX = (data == 'left' ? 200 : -200);

    var targetPositionX = 0;

    console.log('==============================================================');
    console.log('offsetX: ' +  offsetX, 'previousSlide.id: ' + previousSlide.id);
    console.log('nextSlide.id: ' + nextSlide.id, 'lastId: '+ lastId, 'nextSlideIndex: ' + nextSlideIndex);
    this.slideShowView.setCurrentSlide(nextSlide);
    this.slideShowView.updatePosition(startPositionX);
    this.slideShowView.setPreviousSlide(previousSlide);

    this.slideShowView.update(targetPositionX, offsetX);

};

SlideShowController.prototype.update = function(data){

}
