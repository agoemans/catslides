var InteractiveBoxHelper = function(){
    function create(boxArray, parent){
        var boxList = [];
        for (var i = 0; i < boxArray.length; i++){
            boxList.push(new RoundedBox(boxArray[i], parent, 0xFFDAFF));
        }

        return boxList;
    }

    function updateBox(offsetX, boxArray, parent, isVisible){
        console.log('++++++++++++++++++++')
        console.log('updateBoxPosition')
        for (var i = 0; i < boxArray.length; i++){
            var box = boxArray[i];
            box.updateBoxPosition(offsetX, parent);
            box.toggleVisiblity(isVisible);
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
        update: function(offsetX, boxArray, parent, isVisible){
            updateBox(offsetX, boxArray, parent, isVisible);
        }
    }
};
