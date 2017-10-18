var NavigatorController = function(){
    this.name = 'navigatorController';

    this.navigatorView = null;

    this.leftArrow = null;
    this.rightArrow = null;

    this.leftArrowShadow = null;
    this.rightArrowShadow = null;

    this.app = null;

    this.notifyHelper = null;
};

NavigatorController.prototype.init = function(app){
    this.app = app;

    this.createGUI();

    this.navigatorView = new NavigatorView();
    this.navigatorView.init(this.leftArrow, this.rightArrow, this.app);
};

NavigatorController.prototype.createGUI = function(){
    this.leftArrow = new Arrow('assets/images/leftArrow.png', this.app, 'left');
    this.rightArrow = new Arrow('assets/images/rightArrow.png', this.app, 'right');

    this.app.stage.addChild(this.leftArrow);
    this.app.stage.addChild(this.rightArrow);

    console.log('this.app', this.app);
};

NavigatorController.prototype.onClick = function(mssg){
    this.notifyHelper.sendClickEvent('slideShowController', mssg);
};



