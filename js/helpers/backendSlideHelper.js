var BackendSlideHelper = function(){
    var slides = [];
    var lastIndex = 0;
    // function create(slideArray, app){
    //     var slideList = [];
    //     for (var i = 0; i < slideArray.length; i++){
    //         slideList.push(new BackEndSlide(slideArray[i], i, app));
    //     }
    //
    //     return slideList;
    // }

    function getCurrentSlide(index){
        lastIndex = slides.length - 1;
        if(index < 0) {
            return slides[lastIndex];
        } else if(index === 0){
            return slides[0];
        } else if(index > lastIndex){
            return slides[0];
        } else {
            return slides[index];
        }
    }

    function getPreviousSlide(index){
        lastIndex = slides.length - 1;
        var currentIndex = index - 1;
        if(currentIndex < 0) {
            return slides[lastIndex - 1];
        } else {
            return slides[currentIndex];
        }
    }

    function getNextSlide(index){
        lastIndex = slides.length - 1;
        var currentIndex = index + 1;
        if(currentIndex >= lastIndex) {
            console.log('getNextSlide, >', currentIndex, lastIndex, index);
            return slides[0];
        } else if(currentIndex < 0){
            return slides[lastIndex - 2];
        } else {
            console.log('getNextSlide');
            return slides[currentIndex];
        }
    }

    return {
/*        setSlides: function(slideArray, app){
            slides = create(slideArray, app);
        },
        getSlides: function(){
            return slides;
        },*/
        //move all the get slides positions stuff to the controller instead
        getCurrent: function(index){
            console.log('currentSlide', index, getCurrentSlide(index).id);
            return getCurrentSlide(index);
        },
        getPrevious: function(index){
            console.log('getPreviousSlide', index, getPreviousSlide(index).id);
            return getPreviousSlide(index);
        },
        getNext: function(index){
            console.log('getNext', index, getNextSlide(index).id);
            return getNextSlide(index);
        }
    }
};
