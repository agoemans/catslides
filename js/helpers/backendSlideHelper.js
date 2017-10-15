var BackendSlideHelper = function(){
    var slides = [];
    var lastIndex = 0;
    function create(slideArray, app){
        var slideList = [];
        for (var i = 0; i < slideArray.length; i++){
            slideList.push(new BackEndSlide(slideArray[i], i, app));
        }

        return slideList;
    }

    function getPreviousSlide(index){
        lastIndex = slides.length - 1;
        if(index === 0) {
            return slides[lastIndex];
        } else {
            return slides[index - 1];
        }
    }

    function getNextSlide(index){
        lastIndex = slides.length - 1;
        if(index === lastIndex) {
            return slides[0];
        } else {
            return slides[index + 1];
        }
    }

    return {
        setSlides: function(slideArray, app){
            slides = create(slideArray, app);
        },
        getSlides: function(){
            return slides;
        },
        getCurrent: function(index){
            return slides[index];
        },
        getPrevious: function(index){
            getPreviousSlide(index);
        },
        getNext: function(index){
            getNextSlide(index);
        }
    }
};
