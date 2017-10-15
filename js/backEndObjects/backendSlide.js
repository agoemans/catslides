function BackEndSlide(obj, index, app) {
    this.backendLinkHelper = new BackendLinkHelper();

    this.id = index;
    this.name = obj.imageName;
    this.url = obj.imageUrl;

    this.getPositionX = function(index, app) {
        if (index == 0){
            return app.renderer.width / 2;
        } else {
            return app.renderer.width;
        }
    };

    this.getPositionY = function(app) {
        return app.renderer.height * 0.35;
    };

    this.getTextObj = function(text, app){
        return {
            x: app.renderer.width / 2,
            y: app.renderer.height * 0.85,
            txt: text,
            size: 35
        }
    };

    this.x = this.getPositionX(index, app);
    this.y = this.getPositionY(app);
    this.w = obj.size.w;
    this.h = obj.size.h;
    this.txtObj = this.getTextObj(obj.text, app);
    this.lNum = obj.interactive.numOfLinks;
    this.links = this.backendLinkHelper.getLinks(obj);
    this.visible = false;
}