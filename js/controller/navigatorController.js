var NavigatorController = function(){
    this.navigatorView = null;

    this.name = 'navigatorController';

    this.app = null;

    this.notifyHelper = null;
};

NavigatorController.prototype.init = function(app){
    this.app = app;

    this.navigatorView = new NavigatorView();
    this.navigatorView.init(this.app);
};

NavigatorController.prototype.onClick = function(){
    console.log('NavigatorController Click');
    this.notifyHelper.sendClickEvent('slideShowController');
};



