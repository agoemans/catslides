var Slide = function(){
  this.slideText = null;
  this.slideImage = null;
  this.leftArrow = null;
  this.rigthArrow = null;
};

Slide.prototype.create = function(textValue, stage){
    this.slideText = new SlideText('this is a text');

    this.slideImage = new SlideImage('assets/images/cat1.jpg');

    this.leftArrow = new Arrow(200, 'assets/images/leftArrow.png');
    this.rightArrow = new Arrow(400, 'assets/images/rightArrow.png');

    stage.addChild(this.slideText);
    stage.addChild(this.slideImage);

    stage.addChild(this.leftArrow);
    stage.addChild(this.rightArrow);

}