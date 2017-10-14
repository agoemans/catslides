var Slide = function(obj, stage){
  this.slideText = new SlideText(obj.text, stage);
  this.slideImage = new SlideImage(obj);
};

Slide.prototype.toggleVisibility = function(value){
  this.slideText.visible = value;
  this.slideImage.visible = value;
};

Slide.prototype.adjustPosition = function(){

};