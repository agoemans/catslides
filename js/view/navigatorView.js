var NavigatorView = function(){
    this.leftArrow = null;
    this.rightArrow = null;

    this.stage = null;
};

NavigatorView.prototype.init = function(stage){
    this.stage = stage;

    this.leftArrow = new Arrow(200, 'assets/images/leftArrow.png');
    this.rightArrow = new Arrow(400, 'assets/images/rightArrow.png');

    this.stage.addChild(this.leftArrow);
    this.stage.addChild(this.rightArrow);
};
