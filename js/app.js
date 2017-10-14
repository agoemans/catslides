var slideApp = (function () {
    var instance;
    var stage;
    var renderer;

    function init() {
        function load() {
            loaderHelper.load(onLoaded);
        }

        function onLoaded() {
            console.log('onLoaded');
            stage = new PIXI.Container();
            var mainContainer = document.getElementById('content');
            renderer = PIXI.autoDetectRenderer(800, 600, {
                view: mainContainer,
                backgroundColor: 0xd7fdde,
                antialias: true
            });

            document.body.appendChild(renderer.view);
            renderer.render(stage);

            var id = PIXI.loader.resources['assets/data/imageData.json'];

            var slideObj = new Slide();
            slideObj.create('thisis the text', stage);
            console.log('stage', stage);
            console.log('id', id);

            requestAnimationFrame(animate);
        }

        function animate() {
            // render the stage
            renderer.render(stage);
            requestAnimationFrame(animate);

        }

        return {
            start: function () {
                load();
            }
        }

    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }


})();