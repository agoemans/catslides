var PopupBox = function(){
    this.name = 'popUpBox';

    this.popUpImage = new PopUpImage();

    this.popUpText = new PopUpText();

    this.notifyHelper = null;

    this.visible = false;

    this.boxId = null;
};

PopupBox.prototype.onClick = function(parent){
    if(parent.id != this.boxId && this.visible){
        this.hide();
        this.show(parent);
    } else {
        if (!this.visible) {
            this.show(parent);
        } else {
            this.hide();
        }
    }

};

PopupBox.prototype.show = function(parent){
    this.popUpImage.updateImage(parent, 1);
    this.popUpText.show(parent.text, this.popUpImage);
    this.boxId = parent.id;
    this.visible = true;
};

PopupBox.prototype.hide = function(){
    this.popUpImage.hide();
    this.popUpText.hide();
    this.boxId = null;
    this.visible = false;
};
