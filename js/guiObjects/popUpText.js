var PopUpText = function(){
    PIXI.Text.call(this, 'This is filler text', {
        fontFamily: 'Snippet',
        fontSize: 15,
        fill: 'black',
        align: 'center'
    });

    this.x = 10;
    this.y = 10;

    this.anchor.set(0.5, 0.5);

    this.visible = false;

};

PopUpText.prototype = Object.create(PIXI.Text.prototype);

PopUpText.prototype.constructor = PopUpText;

PopUpText.prototype.updateTextInfo = function(txt, parent){
    this.x = parent.x;
    this.y = parent.y;

    this.text = txt;

    console.log('text', this, parent)
};
