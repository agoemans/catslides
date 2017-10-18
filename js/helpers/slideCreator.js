function SlideFactory(){
    this.create = function(index, data, app){
        function getPositionX(index, app) {
            if (index == 0){
                return app.renderer.width / 2;
            } else {
                return -app.renderer.width;
            }
        }

        function getPositionY (app) {
            return app.renderer.height * 0.4;
        }

        function getTextObj(text, app){
            return {
                x: app.renderer.width / 2,
                y: app.renderer.height * 0.85,
                txt: text,
                size: 35
            }
        }

        function getHighlightObj(data){
            var linkList = [];
            for (var i = 0; i < data.length; i++){
                linkList.push({
                    id: i,
                    x: data[i].position.x,
                    y: data[i].position.y,
                    text: data[i].text })
            }

            return linkList;
        }

        var containerX = getPositionX(index, app);
        var containerY = getPositionY(app);
        var textObj = getTextObj(data.text, app);
        var links = getHighlightObj(data.interactive.links);

        return new SlideView(index, containerX, containerY, data.imageName, data.imageUrl, textObj, links, data, app);
    }
}