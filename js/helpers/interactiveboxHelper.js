var InteractiveBoxHelper = function(){
    function create(boxArray, app){
        var boxList = [];
        for (var i = 0; i < boxArray.length; i++){
            boxList.push(new RoundedBox(boxArray[i], app));
        }

        return boxList;
    }
    return {
        getBoxes: function(obj, app){
            if(obj.links === null){
                return null;
            } else {
                return create(obj.links, app)
            }
        }
    }
};
