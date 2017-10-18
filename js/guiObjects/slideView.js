var SlideView = function (index, containerX, containerY, name, imageUrl, textObj, links, data, app) {
    this.id = index;
    this.slideText = new SlideText(textObj);

    this.slideImageContainer = new SlideImageContainer(containerX, containerY);
    //todo add image and popupbox to Pixi.Container, fixes the position calc
    this.slideImage = new SlideImage(name, imageUrl);

    //todo refactor
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(7, 0x3b8686, 0.8);
    graphics.drawRect(20, 15, 280, 280);

    var sprite = new PIXI.Sprite(graphics.generateTexture(false));
    sprite.anchor.set(0.5);

    graphics.clear();
    graphics.lineStyle(5, 0x3b8686, 0.8);
    graphics.drawRect(20, 10, 260, 260);
    //
    // var sprite2 = new PIXI.Sprite(graphics.generateTexture(false));
    // sprite2.anchor.set(0.5);

    this.slideImageContainer.addChild(sprite);

    this.interactiveBoxHelper = new InteractiveBoxHelper();
    this.interactiveBoxes = this.interactiveBoxHelper.getBoxes(links, this.slideImage);

    this.popUpBox = new PopupBox();

    app.stage.addChild(this.slideImageContainer);
    app.stage.addChild(this.slideText);

    this.slideImageContainer.addChild(this.slideImage);

    this.slideImageContainer.addChild(this.popUpBox.popUpImage);
    this.slideImageContainer.addChild(this.popUpBox.popUpText);


    // this.slideImageContainer.addChild(sprite2);

    for (var i = 0; i < this.interactiveBoxes.length; i++) {
        this.slideImageContainer.addChild(this.interactiveBoxes[i]);
    };

    this.setupNotifier();
};

SlideView.prototype.setupNotifier = function(){
    this.notifier = new NotifyHelper();
    this.notifier.register(this.popUpBox);

    for (var i = 0; i < this.interactiveBoxes.length; i++){
        this.notifier.register(this.interactiveBoxes[i]);
    }
};

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
    this.slideText.hide(offsetX);

    this.slideImageContainer.hide(offsetX);
    // this.slideImage.hide(offsetX);
    // this.interactiveBoxHelper.update(offsetX, this.interactiveBoxes, this.slideImage);
};

SlideView.prototype.show = function(x){
    this.slideText.show(x);

    this.slideImageContainer.show(x);
    // this.slideImage.show(x);
    // this.interactiveBoxHelper.update(x, this.interactiveBoxes, this.slideImage);
};

SlideView.prototype.slideOut = function(offsetX, app){
    this.slideText.hide(app);

    this.slideImageContainer.slideOut(offsetX);
    // this.slideImage.slideOut(offsetX, dir, defaultX);
    // this.interactiveBoxHelper.update(offsetX, this.interactiveBoxes, this.slideImage, false);
};

SlideView.prototype.slideIn = function(x, app){
    this.slideText.show(app);

    this.slideImageContainer.slideIn(x);

    // this.slideImage.slideIn(x);
    // this.interactiveBoxHelper.update(x, this.interactiveBoxes, this.slideImage, true);
};

SlideView.prototype.updatePosition = function(x){
    // this.slideImage.updatePosition(x);
    // this.slideText.updatePositionX(x);

    this.slideImageContainer.updatePosition(x);
};