var PopupBox = function(text){
    this.name = 'popUpBox';

    this.popUpImage = new PopUpImage();

    this.popUpText = new PopUpText();

    this.visible = false;
};

PopupBox.prototype.toggleVisibility = function(value){
    this.popUpImage.visible = value;
    this.popUpText.visible = value;
};

PopupBox.prototype.show = function(parent){
    this.toggleVisibility(true);

    this.popUpImage.updateImage(parent);
    this.popUpText.updateTextInfo(parent.text, this.popUpImage);
};

PopupBox.prototype.hide = function(){
    this.toggleVisibility(false);
};
