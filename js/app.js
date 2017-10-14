var slideShow = (function () {
    var instance;
    var stage;
    var renderer;
    var mainContainer;

    function init() {
        function loadAssets() {
            PIXI.loader
                .add('assets/images/arrow.png')
                .add('assets/images/cat1.jpg')
                .add('assets/images/cat2.jpg')
                .load(onLoaded);
        }

        function onLoaded() {
            stage = new PIXI.Container();
            mainContainer = document.getElementById('maincontainer');
            renderer = PIXI.autoDetectRenderer(800, 600, {
                view: mainContainer,
                backgroundColor: 0xd7fdde,
                antialias: true
            });

            document.body.appendChild(renderer.view);

            renderer.render(stage);

            console.log('in slideShow init');
        }

        return {
            start: function () {
                loadAssets();
            }
        }

    }

    return {
        getInstance: function(){
            if(!instance){
                instance = init();
            }
            return instance;
        }
    }


})();