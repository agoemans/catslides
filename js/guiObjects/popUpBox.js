var PopupBox = function(text){
    this.name = 'popUpBox';

    this.popUpImage = new PopUpImage();

    this.popUpText = new PopUpText();

    this.notifyHelper = null;

    this.visible = false;
};

PopupBox.prototype.toggleVisibility = function(value){
    this.popUpImage.visible = value;
    this.popUpText.visible = value;
};

PopupBox.prototype.onClick = function(parent){
    this.visible = !this.visible;

    if(this.visible){
        this.show(parent);
    } else {
        this.hide();
    }
}

PopupBox.prototype.show = function(parent){
    this.toggleVisibility(true);

    this.popUpImage.updateImage(parent);
    this.popUpText.updateTextInfo(parent.text, this.popUpImage);
};

PopupBox.prototype.hide = function(){
    this.toggleVisibility(false);
};
