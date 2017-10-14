var loaderHelper = (function(){
    function loadFonts(onLoadCallback) {
        window.WebFontConfig = {
            google: {
                families: ['Snippet', 'Arvo:700italic', 'Podkova:700']
            },

            active: function() {
                // do something
                loadAssets(onLoadCallback);
            }
        };
    }

    function loadAssets(onLoadCallback) {
        PIXI.loader
            .add('assets/images/arrow.png')
            .add('assets/images/leftArrow.png')
            .add('assets/images/rightArrow.png')
            .add('assets/images/cat1.jpg')
            .add('assets/images/cat2.jpg')
            .load(onLoadCallback);
    }

    return {
        load: function(onLoadCallback){
            loadFonts(onLoadCallback);
        }
    }
})();