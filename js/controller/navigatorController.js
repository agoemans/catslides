var NavigatorController = function(){
    this.name = 'navigatorController';

    this.navigatorView = null;

    this.leftArrow = null;
    this.rightArrow = null;

    this.slideLabel = null;

    this.app = null;

    this.notifyHelper = null;
};

NavigatorController.prototype.init = function(app){
    this.app = app;

    this.createGUI();

    this.navigatorView = new NavigatorView();
    this.navigatorView.init(this.leftArrow, this.rightArrow, this.slideLabel, this.app);
};

NavigatorController.prototype.createGUI = function(){
    //creates and adds nav assets to stage
    this.leftArrow = new Arrow('assets/images/leftArrow.png', this.app, 'left');
    this.rightArrow = new Arrow('assets/images/rightArrow.png', this.app, 'right');

    this.slideLabel = new SlideLabelText(this.app);

    this.app.stage.addChild(this.leftArrow);
    this.app.stage.addChild(this.rightArrow);

    this.app.stage.addChild(this.slideLabel);
};

NavigatorController.prototype.onClick = function(mssg){
    //notify slide controller of nav clicks via notifier/messenger
    this.notifyHelper.sendClickEvent('slideShowController', mssg);
};

NavigatorController.prototype.onSlideComplete = function(mssg){
    //get mssg via notifier/messenger after slide event
    this.navigatorView.onSlideComplete(mssg)
};


