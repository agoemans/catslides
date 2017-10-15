var NavigatorView = function(){
    this.leftArrow = null;
    this.rightArrow = null;

    this.name = 'navigatorView';

    this.app = null;

    this.notifyHelper = null;
};

NavigatorView.prototype.init = function(app){
    this.app = app;

    this.leftArrow = new Arrow('assets/images/leftArrow.png', app, true);
    this.rightArrow = new Arrow('assets/images/rightArrow.png', app, false);

    this.app.stage.addChild(this.leftArrow);
    this.app.stage.addChild(this.rightArrow);

    this.setupListeners();
};

NavigatorView.prototype.setupListeners = function(){
    //todo move listners to Arrow
    this.leftArrow.buttonMode = true;
    this.leftArrow.interactive = true;

    this.leftArrow
        .on('pointerdown', this.onClick, this)
        // .on('pointerup', onButtonUp)
        // .on('pointerupoutside', onButtonUp)
        // .on('pointerover', onButtonOver)
        .on('pointerout', function(){
            console.log('out');
        });

    this.rightArrow.buttonMode = true;
    this.rightArrow.interactive = true;

    this.rightArrow
        .on('pointerdown', this.onClick, this)
        // .on('pointerup', onButtonUp)
        // .on('pointerupoutside', onButtonUp)
        // .on('pointerover', onButtonOver)
        .on('pointerout', function(){
            console.log('out');
        });
};

NavigatorView.prototype.onClick = function(){
    console.log('NavigatorView Click');
    this.notifyHelper.sendClickEvent('navigatorController');
};