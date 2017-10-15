var NavigatorView = function(){
    this.leftArrow = null;
    this.rightArrow = null;

    this.name = 'navigatorView';

    this.app = null;

    this.notifyHelper = null;
};

NavigatorView.prototype.init = function(leftArrow, rightArrow, app){
    this.app = app;

    this.leftArrow = leftArrow;
    this.rightArrow = rightArrow;

    this.leftArrow.setupClickListeners(this.onClick, this);
    this.rightArrow.setupClickListeners(this.onClick, this);

};

NavigatorView.prototype.onClick = function(dir){
    console.log('NavigatorView Click');
    this.notifyHelper.sendClickEvent('navigatorController', dir);
};