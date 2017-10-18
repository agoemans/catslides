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
            // creates PIXI app once all assets are loaded
            app = new PIXI.Application({
                width: 800,
                height: 600,
                resolution: 1,
                antialias: true,
                forceCanvas: true,
                backgroundColor:0xffffff
            });

            document.body.appendChild(app.view);

            // in PIXI, manipulate the canvas element via app.view
            app.view.style.position = 'absolute';
            app.view.style.top = 0;
            app.view.style.bottom = 0;
            app.view.style.left = 0;
            app.view.style.right = 0;
            app.view.style.margin = 'auto';

            createControllers();
            setupNotifier();
            createSlideShow();
            requestAnimationFrame(animate);
        }

        function createControllers(){
            // initialize the slideshow and nav controllers
            slideShowController = new SlideShowController();
            slideShowController.init(app);

            navigatorController = new NavigatorController();
            navigatorController.init(app);
        }

        function setupNotifier(){
            // create notifier, assign controllers/nav that will use it
            notifier = new NotifyHelper();
            notifier.register(slideShowController);
            notifier.register(slideShowController.slideShowView);
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