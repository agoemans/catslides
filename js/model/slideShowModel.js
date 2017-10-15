var SlideShowModel = function(){
    this.app = null;

    this.slideShowList = [];
    this.previousSlide = null;
    this.currentSlide = null;
    this.nextSlide = null;

    this.slideData =  PIXI.loader.resources['assets/data/imageData.json'].data;
};

SlideShowModel.prototype.init = function(app){
    this.app = app;
    this.setSlideList(this.slideData);
    this.setSlidePositions(0);
};

SlideShowModel.prototype.setSlideList = function(slideArray){
    for (var i = 0; i < slideArray.slides.length; i++){
        var slide = this.createSlide(slideArray.slides[i], i);
        this.slideShowList.push(slide);
    }
};

SlideShowModel.prototype.getSlideList = function(){
    return this.slideShowList;
};

SlideShowModel.prototype.createSlide = function(obj, index){
    return {
        id: index,
        name: obj.imageName,
        url: obj.imageUrl,
        x: this.getPositionX(index),
        y: this.getPositionY(),
        w: obj.size.w,
        h: obj.size.h,
        txtObj: this.getTextObj(obj.text),
        lNum: obj.numOfLinks,
        links: this.getLinks(obj),
        visible: false
    }
};

SlideShowModel.prototype.getTextObj = function(text){
    //todo move this to a backend text obj
    return {
        x: this.getTxtPositionX(),
        y: this.getTxtPositionY(),
        txt: text,
    }
};

SlideShowModel.prototype.getTxtPositionX = function(){
    //todo for text
    return this.app.renderer.width / 2;
};

SlideShowModel.prototype.getTxtPositionY = function(){
    //todo for text
    return this.app.renderer.height * 0.85;
};

SlideShowModel.prototype.getPositionX = function(index){
    //todo for slides
    if (index == 0){
        return this.app.renderer.width / 2;
    } else {
        return this.app.renderer.width;
    }
};

SlideShowModel.prototype.getPositionY = function(){
    //todo for slides
    return this.app.renderer.height * 0.35;
};

SlideShowModel.prototype.getLinks = function(obj){
    if(obj.interactive.clickable){
        return null;
    } else {
        return this.createLinks(obj.interactive.links)
    }
};

SlideShowModel.prototype.createLinks = function(linkArray){
    var linkList = [];
    for (var i = 0; i < linkArray.length; i++){
        linkList.push({
            id : linkArray[i].id,
            x: linkArray[i].position.x,
            y: linkArray[i].position.y,
            txt: linkArray[i].text,
        });
    }

    return linkList;
};

SlideShowModel.prototype.setSlidePositions = function(currentIndex){
    //todo refactor, when reachig end or at start, reset
    var lastIndex = this.slideShowList.length - 1;

    this.currentSlide = this.slideShowList[currentIndex];

    if(currentIndex === 0) {
        this.previousSlide = this.slideShowList[lastIndex];
    } else {
        this.previousSlide = this.slideShowList[currentIndex - 1];
    }

    if(currentIndex === lastIndex) {
        this.nextSlide = this.slideShowList[0];
    } else {
        this.previousSlide = this.slideShowList[currentIndex + 1];
    }
};

SlideShowModel.prototype.updateSlidePosition = function(){

};

SlideShowModel.prototype.getCurrentSlide = function(){
    return this.currentSlide;
};

