var SlideShowModel = function(){
    this.slideShowList = [];
    this.previousSlide = null;
    this.currentSlide = null;
    this.nextSlide = null;

    this.slideData =  PIXI.loader.resources['assets/data/imageData.json'].data;
};

SlideShowModel.prototype.init = function(){
    this.setSlideList();
    this.setSlidePositions(0);
};

SlideShowModel.prototype.setSlideList = function(){
    // this.slideData = PIXI.loader.resources['assets/data/imageData.json'];
    for (var i = 0; i < this.slideData.slides.length; i++){
        var slide = this.createSlide(this.slideData.slides[i]);
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
        x: obj.position.x,
        y: obj.position.y,
        w: obj.size.w,
        h: obj.size.h,
        txt: obj.text,
        lNum: obj.numOfLinks,
        links: this.getLinks(obj),
        visible: false
    }
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
