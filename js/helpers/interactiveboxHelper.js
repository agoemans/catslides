var InteractiveBoxHelper = function(){
    function create(boxArray, parent){
        var boxList = [];
        for (var i = 0; i < boxArray.length; i++){
            boxList.push(new RoundedBox(boxArray[i], parent, 0xFFDAFF));
        }

        return boxList;
    }

    function updateBoxPosition(offsetX, boxArray, parent){
        for (var i = 0; i < boxArray.length; i++){
            var box = boxArray[i];
            box.updateBoxPosition(offsetX, parent);
        }
    }

    return {
        getBoxes: function(boxArray, parent){
            if(!boxArray || boxArray.length == 0){
                return null;
            } else {
                return create(boxArray, parent)
            }
        },
        update: function(offsetX, boxArray, parent){
            updateBoxPosition(offsetX, boxArray, parent);
        }
    }
};
