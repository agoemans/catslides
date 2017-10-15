var Slide = function(obj){
  this.id = obj.id;
  this.slideText = new SlideText(obj.txtObj);
  this.slideImage = new SlideImage(obj);

  this.interactiveBoxHelper = new InteractiveBoxHelper();
  this.interactiveBoxes = this.interactiveBoxHelper.getBoxes(obj);

  console.log('this.interactiveBoxes', this.interactiveBoxes);
};

Slide.prototype.toggleVisibility = function(value){
  this.slideText.visible = value;
  this.slideImage.visible = value;
};

Slide.prototype.updatePosition = function(x, y){

};

Slide.prototype.update = function(stage){
  // this.slideImage.updatePosition(400, 400);
  // this.slideText.updatePosition(400, 600);
};