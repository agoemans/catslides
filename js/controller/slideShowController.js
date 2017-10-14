var SlideShowController = function(){
    this.slideModel = null;
    this.slideView = null;

    this.stage = null;
};

SlideShowController.prototype.init = function(stage){
    this.stage = stage;

    this.slideModel = new SlideShowModel();
    this.slideModel.init();

    this.slideView = new SlideShowView(this.stage);

    console.log('ctonroller SlideShowController');
};

SlideShowController.prototype.createSlideShow = function(){
    this.slideView.createSlideShow(this.slideModel.getSlideList());
};


