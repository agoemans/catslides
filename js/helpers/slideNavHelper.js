var SlideNavHelper = function(){
    function getIndex(dir, currentIndex, lastIndex){
        var nextIndex;
        if(dir === 'right'){
            nextIndex = currentIndex + 1;
        } else {
            nextIndex = currentIndex - 1;
        }

        if(nextIndex > lastIndex){
            nextIndex = 0;
        }

        if(nextIndex < 0){
            nextIndex = lastIndex;
        }

        return nextIndex;
    }

    return {
        getCurrent: function(dir, currentIndex, lastIndex){
            return getIndex(dir, currentIndex, lastIndex);
        }
    }
};
