var InteractiveBoxHelper = function(){
    function create(boxArray, parent){
        var boxList = [];
        for (var i = 0; i < boxArray.length; i++){
            boxList.push(new RoundedBox(boxArray[i], parent, 0xFFDAFF));
        }

        return boxList;
    }
    return {
        getBoxes: function(obj, parent){
            if(obj.links === null){
                return null;
            } else {
                return create(obj.links, parent)
            }
        }
    }
};
