var Slide = function(obj, stage){
  this.slideText = new SlideText(obj.txtObj, stage);
  this.slideImage = new SlideImage(obj);
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