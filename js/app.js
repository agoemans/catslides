var slideApp = (function () {
    var instance;
    var app;
    var slideShowController;
    var navigatorController;

    function init() {
        function load() {
            loaderHelper.load(onLoaded);
        }

        function onLoaded() {
            console.log('onLoaded');
            app = new PIXI.Application({
                width: 800,
                height: 600,
                resolution: 1,
                antialias: true,
                forceCanvas: true,
                backgroundColor:0xffffff
            });

            document.body.appendChild(app.view);

            createControllers();
        }

        function createControllers(){
            slideShowController = new SlideShowController();
            slideShowController.init(app.stage);

            navigatorController = new NavigatorController();
            navigatorController.init(app.stage);

            createSlideShow();
        }

        function createSlideShow(){
            slideShowController.createSlideShow();
            requestAnimationFrame(animate);
        }

        function animate() {
            // render the stage
            app.renderer.render(app.stage);
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