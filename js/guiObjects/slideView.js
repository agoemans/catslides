var SlideView = function (index, x, y, name, imageUrl, textObj, links, data, app) {
    this.id = index;
    this.slideText = new SlideText(textObj);
    this.slideImage = new SlideImage(x, y, imageUrl);

    this.interactiveBoxHelper = new InteractiveBoxHelper();
    this.interactiveBoxes = this.interactiveBoxHelper.getBoxes(links, this.slideImage);

    this.popUpBox = new PopupBox();

    app.stage.addChild(this.slideText);
    app.stage.addChild(this.slideImage);
    app.stage.addChild(this.popUpBox.popUpImage);
    app.stage.addChild(this.popUpBox.popUpText);

    for (var i = 0; i < this.interactiveBoxes.length; i++) {
        app.stage.addChild(this.interactiveBoxes[i]);
    };

    this.setupNotifier();
};

SlideView.prototype.setupNotifier = function(){
    this.notifier = new NotifyHelper();
    this.notifier.register(this.popUpBox);

    for (var i = 0; i < this.interactiveBoxes.length; i++){
        this.notifier.register(this.interactiveBoxes[i]);
    }
}

SlideView.prototype.toggleVisibility = function(value){
  this.slideText.visible = value;
  // this.slideImage.visible = value;
    this.slideImage.alpha = 1;

    //todo move to this.interactiveBoxHelper
  for(var i = 0; i < this.interactiveBoxes.length; i++){
      this.interactiveBoxes[i].visible = value;
  }
};

SlideView.prototype.hide = function(offsetX){
    this.slideImage.hide(offsetX);
    this.slideText.hide(offsetX);

    this.interactiveBoxHelper.update(offsetX, this.interactiveBoxes, this.slideImage);
};

SlideView.prototype.show = function(x){
    this.slideImage.show(x);
    this.slideText.show(x);

    this.interactiveBoxHelper.update(x, this.interactiveBoxes, this.slideImage);
};

SlideView.prototype.slideOut = function(offsetX, dir, defaultX){
    console.log('------------> slide out   ', this.id);
    this.slideImage.slideOut(offsetX, dir, defaultX);
};

SlideView.prototype.slideIn = function(){
    console.log('------------> slide id', this.id);
    this.slideImage.slideIn();
};

SlideView.prototype.updatePosition = function(x){
    this.slideImage.updatePosition(x);
};