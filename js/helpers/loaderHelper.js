var LoaderHelper = (function(){
    var loadCB;

    function loadFonts() {
        window.WebFontConfig = {
            google: {
                families: ['Snippet', 'Space Mono', 'Droid Serif']
            },

            active: function() {
                loadAssets();
            }
        };
    }

    function loadAssets() {
        // add all assets here
        PIXI.loader
            .add('assets/data/imageData.json')
            .add('assets/images/leftArrow.png')
            .add('assets/images/rightArrow.png')
            .add('assets/images/cat1.jpg')
            .add('assets/images/cat2.jpg')
            .add('assets/images/cat3.jpg')
            .add('assets/images/cat4.jpg')
            .add('assets/images/box.png')
            .add('assets/images/circle.png')
            .add('assets/images/popUpBox.png')
            .load(loadCB);
    }

    function setLoadCallback(onLoadCallback){
        //would prefer onComplete or Signal. Used for Pixi.loader's load
        loadCB = onLoadCallback;
    }

    return {
        load: function(onLoadCallback){
            setLoadCallback(onLoadCallback);
            loadFonts();
        }
    }
})();