var SlideView = function (index, x, y, name, imageUrl, textObj, links, data, app) {
    this.id = index;
    this.slideText = new SlideText(textObj);

    this.slideImageContainer = new PIXI.Container();
    //todo add image and popupbox to Pixi.Container, fixes the position calc
    this.slideImage = new SlideImage(x, y, imageUrl);

    this.interactiveBoxHelper = new InteractiveBoxHelper();
    this.interactiveBoxes = this.interactiveBoxHelper.getBoxes(links, this.slideImage);

    this.popUpBox = new PopupBox();

    app.stage.addChild(this.slideImageContainer);
    app.stage.addChild(this.slideText);

    this.slideImageContainer.addChild(this.slideImage);

    this.slideImageContainer.addChild(this.popUpBox.popUpImage);
    this.slideImageContainer.addChild(this.popUpBox.popUpText);

    for (var i = 0; i < this.interactiveBoxes.length; i++) {
        this.slideImageContainer.addChild(this.interactiveBoxes[i]);
    };

    this.slideImageContainer.x = app.renderer.width / 2;
    this.slideImageContainer.y = app.renderer.height * 0.35;

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
    this.slideImage.slideOut(offsetX, dir, defaultX);
    this.slideText.hide(offsetX);

    this.interactiveBoxHelper.update(offsetX, this.interactiveBoxes, this.slideImage, false);
};

SlideView.prototype.slideIn = function(x, app){
    this.slideImage.slideIn(x);
    this.slideText.show(app);

    this.interactiveBoxHelper.update(x, this.interactiveBoxes, this.slideImage, true);

};

SlideView.prototype.updatePosition = function(x){
    this.slideImage.updatePosition(x);
    this.slideText.updatePositionX(x);
};