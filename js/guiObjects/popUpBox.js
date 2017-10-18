var PopupBox = function(text){
    this.name = 'popUpBox';

    this.popUpImage = new PopUpImage();

    this.popUpText = new PopUpText();

    this.notifyHelper = null;

    this.visible = false;
};

PopupBox.prototype.onClick = function(parent){
    this.visible = !this.visible;

    if(this.visible){
        this.show(parent);
    } else {
        this.hide(parent);
    }
};

PopupBox.prototype.show = function(parent){
    this.popUpImage.updateImage(parent, 1);
    this.popUpText.show(parent.text, this.popUpImage);
};

PopupBox.prototype.hide = function(){
    this.popUpImage.hide();
    this.popUpText.hide();
};
