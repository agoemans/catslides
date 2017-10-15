var Slide = function(obj){
  this.id = obj.id;
  this.slideText = new SlideText(obj.txtObj);
  this.slideImage = new SlideImage(obj);

  this.interactiveBoxHelper = new InteractiveBoxHelper();
  this.interactiveBoxes = this.interactiveBoxHelper.getBoxes(obj, this.slideImage);

  this.popUpBox = new PopupBox();

  this.setupClickListeners();

  console.log('obj', obj);
};

Slide.prototype.setupClickListeners = function(){
    for(var i = 0; i < this.interactiveBoxes.length; i++){
      var box = this.interactiveBoxes[i];
      box.setupClickListeners(this.onBoxClick, this);
    }
};

Slide.prototype.onBoxClick = function(parent){
    console.log('receive click', parent);
    this.popUpBox.visible = !this.popUpBox.visible;

    if(this.popUpBox.visible){
        this.popUpBox.show(parent);
    } else {
        this.popUpBox.hide();
    }

};

Slide.prototype.toggleVisibility = function(value){
  this.slideText.visible = value;
  this.slideImage.visible = value;

  for(var i = 0; i < this.interactiveBoxes.length; i++){
      this.interactiveBoxes[i].visible = value;
  }

};