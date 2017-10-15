var NavigatorView = function(){
    this.leftArrow = null;
    this.rightArrow = null;

    this.name = 'navigatorView';

    this.stage = null;

    this.notifyHelper = null;
};

NavigatorView.prototype.init = function(stage){
    this.stage = stage;

    this.leftArrow = new Arrow(200, 'assets/images/leftArrow.png');
    this.rightArrow = new Arrow(400, 'assets/images/rightArrow.png');

    this.stage.addChild(this.leftArrow);
    this.stage.addChild(this.rightArrow);

    this.setupListeners();
};

NavigatorView.prototype.setupListeners = function(){
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