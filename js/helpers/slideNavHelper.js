var SlideNavHelper = function(){
    function getIndex(dir, currentIndex, lastIndex){
        var nextIndex;
        if(dir === 'left'){
            nextIndex = currentIndex + 1;
        } else {
            nextIndex = currentIndex - 1;
        }

        if(nextIndex === lastIndex || nextIndex < 0){
            nextIndex = 0;
        }

        return nextIndex;
    }

    return {
        getCurrent: function(dir, currentIndex, lastIndex){
            return getIndex(dir, currentIndex, lastIndex);
        }
    }
};
