var NavigatorView = function(){
    this.leftArrow = null;
    this.rightArrow = null;

    this.slideLabel = null;

    this.name = 'navigatorView';

    this.app = null;

    this.notifyHelper = null;
};

NavigatorView.prototype.init = function(leftArrow, rightArrow, slideLabel, app){
    this.app = app;

    this.leftArrow = leftArrow;
    this.rightArrow = rightArrow;

    this.slideLabel = slideLabel;

    this.leftArrow.setupClickListeners(this.onClick, this);
    this.rightArrow.setupClickListeners(this.onClick, this);
};

NavigatorView.prototype.onClick = function(dir){
    //notify nav controller via notifier/messenger
    this.notifyHelper.sendClickEvent('navigatorController', dir);
};

NavigatorView.prototype.onSlideComplete = function(mssg){
    this.slideLabel.setLabelText(mssg);
};