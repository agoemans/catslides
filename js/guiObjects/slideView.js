var SlideView = function (index, containerX, containerY, name, imageUrl, textObj, links, data, app) {
    this.id = index;

    this.slideImageContainer = new SlideImageContainer(containerX, containerY);

    this.slideText = new SlideText(textObj);
    this.slideImage = new SlideImage(name, imageUrl);
    this.imageFrame = new ImageFrame();

    this.slideImageContainer.addChild(this.imageFrame);

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

    this.setupNotifier();
};

SlideView.prototype.setupNotifier = function(){
    //set up notifier (communicates between highlight and pop up)
    this.notifier = new NotifyHelper();
    this.notifier.register(this.popUpBox);

    for (var i = 0; i < this.interactiveBoxes.length; i++){
        this.notifier.register(this.interactiveBoxes[i]);
    }
};

SlideView.prototype.toggleVisibility = function (value) {
    this.slideText.visible = value;
    this.slideImage.alpha = 1;

    for (var i = 0; i < this.interactiveBoxes.length; i++) {
        this.interactiveBoxes[i].visible = value;
    }
};

SlideView.prototype.hide = function(offsetX){
    this.slideText.hide(offsetX);

    this.slideImageContainer.hide(offsetX);
};

SlideView.prototype.show = function(x){
    this.slideText.show(x);

    this.slideImageContainer.show(x);
};

SlideView.prototype.slideOut = function(offsetX, app){
    this.slideText.hide(app);

    this.slideImageContainer.slideOut(offsetX);

};

SlideView.prototype.slideIn = function(x, app){
    this.slideText.show(app);

    this.slideImageContainer.slideIn(x);
};

SlideView.prototype.updatePosition = function(x){
    this.slideImageContainer.updatePosition(x);
};