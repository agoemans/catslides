var slideApp = (function () {
    var instance;
    var stage;
    var renderer;
    var mainContainer;
    var slideObj;

    function init() {
        function loadAssets() {
            PIXI.loader
                .add('assets/images/arrow.png')
                .add('assets/images/leftArrow.png')
                .add('assets/images/rightArrow.png')
                .add('assets/images/cat1.jpg')
                .add('assets/images/cat2.jpg')
                .load(onLoaded);
        }

        function loadWebFonts(){
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

        function onLoaded() {
            console.log('onLoaded');
            stage = new PIXI.Container();
            mainContainer = document.getElementById('content');
            renderer = PIXI.autoDetectRenderer(800, 600, {
                view: mainContainer,
                backgroundColor: 0xd7fdde,
                antialias: true
            });

            document.body.appendChild(renderer.view);
            renderer.render(stage);

            // create some white text using the Snippet webfont
            /*var textSample = new PIXI.Text('Pixi.js can has\n multiline text!', {
                fontFamily: 'Snippet',
                fontSize: 35,
                fill: 'white',
                align: 'left'
            });
            textSample.position.set(20);

            stage.addChild(textSample);*/

            slideObj = new Slide();
            slideObj.create('thisis the text', stage);
            console.log('stage', stage);

            requestAnimationFrame(animate);
        }

        function animate(){
            // render the stage
            renderer.render(stage);
            requestAnimationFrame(animate);

        }

        return {
            start: function () {
                loadWebFonts();
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