var loaderHelper = (function(){
    var loadCB;

    function loadFonts() {
        // todo refactor onLoadCallback
        window.WebFontConfig = {
            google: {
                families: ['Snippet', 'Arvo:700italic', 'Podkova:700']
            },

            active: function() {
                // do something
                loadAssets();
            }
        };
    }

    function loadAssets() {
        PIXI.loader
            .add('assets/data/imageData.json')
            .add('assets/images/arrow.png')
            .add('assets/images/leftArrow.png')
            .add('assets/images/rightArrow.png')
            .add('assets/images/cat1.jpg')
            .add('assets/images/cat2.jpg')
            .load(loadCB);
    }

    function setLoadCallback(onLoadCallback){
        loadCB = onLoadCallback;
    }

    return {
        load: function(onLoadCallback){
            setLoadCallback(onLoadCallback);
            loadFonts();
        }
    }
})();