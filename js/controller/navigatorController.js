var NavigatorController = function(){
    this.navigatorView = null;

    this.name = 'navigatorController';

    this.stage = null;

    this.notifyHelper = null;
};

NavigatorController.prototype.init = function(stage){
    this.stage = stage;

    this.navigatorView = new NavigatorView();
    this.navigatorView.init(this.stage);
};

NavigatorController.prototype.onClick = function(){
    console.log('NavigatorController Click');
    this.notifyHelper.sendClickEvent('slideShowController');
};



