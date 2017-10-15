var BackendSlideHelper = function(){
    function create(slideArray, app){
        var slideList = [];
        for (var i = 0; i < slideArray.length; i++){
            slideList.push(new BackEndSlide(slideArray[i], i, app));
        }

        return slideList;
    }

    function updateSlidePosition(){

    }

    return {
        getSlides: function(slideArray, app){
            return create(slideArray, app);
        },
        setPosition: function(index){
            updateSlidePosition(index)
        }
    }
};
