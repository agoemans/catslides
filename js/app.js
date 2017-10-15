var slideApp = (function () {
    var instance;
    var app;
    var slideShowController;
    var navigatorController;
    var notifier;

    function init() {
        function load() {
            LoaderHelper.load(onLoaded);
        }

        function onLoaded() {
            console.log('onLoaded');
            app = new PIXI.Application({
                width: 800,
                height: 600,
                resolution: 1,
                antialias: true,
                forceCanvas: true,
                backgroundColor:0x6dd46f
            });

            document.body.appendChild(app.view);

            console.log('app', app);

            createControllers();
            setupNotifier();
            createSlideShow();
            requestAnimationFrame(animate);
        }

        function createControllers(){
            slideShowController = new SlideShowController();
            slideShowController.init(app);

            navigatorController = new NavigatorController();
            navigatorController.init(app);
        }

        function setupNotifier(){
            notifier = new NotifyHelper();
            notifier.register(slideShowController);
            notifier.register(slideShowController.slideView);
            notifier.register(navigatorController);
            notifier.register(navigatorController.navigatorView);
        }

        function createSlideShow(){
            slideShowController.createSlideShow();
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