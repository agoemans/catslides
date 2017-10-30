var InteractiveBoxHelper = function(){
    function create(boxArray, parent){
        var boxList = [];
        for (var i = 0; i < boxArray.length; i++){
            boxList.push(new RoundedBox(boxArray[i], i, parent));
        }

        return boxList;
    }

    function updateBox(offsetX, boxArray, parent, isVisible){
        for (var i = 0; i < boxArray.length; i++){
            var box = boxArray[i];
            box.updateBoxPosition(offsetX, parent);
            box.toggleVisiblity(isVisible);
        }
    }

    function startScaleTween(boxArray){
        for (var i = 0; i < boxArray.length; i++){
            var box = boxArray[i];
            box.startTween();
        }
    }

    function stopScaleTween(boxArray){
        for (var i = 0; i < boxArray.length; i++){
            var box = boxArray[i];
            box.stopTween();
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
        },
        startTween: function(boxArray){
            startScaleTween(boxArray);
        },
        stopTween: function(boxArray){
            stopScaleTween(boxArray);
        }
    }
};
