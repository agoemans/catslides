var NavigatorController = function(){
    this.navigatorView = null;

    this.stage = null;
};

NavigatorController.prototype.init = function(stage){
    this.stage = stage;

    this.navigatorView = new NavigatorView();
    this.navigatorView.init(this.stage);
};


