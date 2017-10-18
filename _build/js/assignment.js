function SlideFactory() {
    this.create = function(index, data, app) {
        var containerX = function(index, app) {
            return 0 == index ? app.renderer.width / 2 : -app.renderer.width;
        }(index, app), containerY = function(app) {
            return .4 * app.renderer.height;
        }(app), textObj = function(text, app) {
            return {
                x: app.renderer.width / 2,
                y: .85 * app.renderer.height,
                txt: text,
                size: 35
            };
        }(data.text, app), links = function(data) {
            for (var linkList = [], i = 0; i < data.length; i++) linkList.push({
                id: i,
                x: data[i].position.x,
                y: data[i].position.y,
                text: data[i].text
            });
            return linkList;
        }(data.interactive.links);
        return new SlideView(index, containerX, containerY, data.imageName, data.imageUrl, textObj, links, data, app);
    };
}

var LoaderHelper = function() {
    function loadFonts() {
        window.WebFontConfig = {
            google: {
                families: [ "Snippet", "Space Mono", "Droid Serif" ]
            },
            active: function() {
                loadAssets();
            }
        };
    }
    function loadAssets() {
        PIXI.loader.add("assets/data/imageData.json").add("assets/images/arrow.png").add("assets/images/leftArrow.png").add("assets/images/rightArrow.png").add("assets/images/cat1.jpg").add("assets/images/cat2.jpg").add("assets/images/cat3.jpg").add("assets/images/cat4.jpg").add("assets/images/box.png").add("assets/images/circle.png").add("assets/images/popUpBox.png").load(loadCB);
    }
    function setLoadCallback(onLoadCallback) {
        loadCB = onLoadCallback;
    }
    var loadCB;
    return {
        load: function(onLoadCallback) {
            setLoadCallback(onLoadCallback), loadFonts();
        }
    };
}(), slideApp = function() {
    function init() {
        function load() {
            LoaderHelper.load(onLoaded);
        }
        function onLoaded() {
            app = new PIXI.Application({
                width: 800,
                height: 600,
                resolution: 1,
                antialias: !0,
                forceCanvas: !0,
                backgroundColor: 16777215
            }), document.body.appendChild(app.view), app.view.style.position = "absolute", app.view.style.top = 0, 
            app.view.style.bottom = 0, app.view.style.left = 0, app.view.style.right = 0, app.view.style.margin = "auto", 
            createControllers(), setupNotifier(), createSlideShow(), requestAnimationFrame(animate);
        }
        function createControllers() {
            (slideShowController = new SlideShowController()).init(app), (navigatorController = new NavigatorController()).init(app);
        }
        function setupNotifier() {
            (notifier = new NotifyHelper()).register(slideShowController), notifier.register(slideShowController.slideShowView), 
            notifier.register(navigatorController), notifier.register(navigatorController.navigatorView);
        }
        function createSlideShow() {
            slideShowController.createSlideShow();
        }
        function animate() {
            app.renderer.render(app.stage), requestAnimationFrame(animate);
        }
        return {
            start: function() {
                load();
            }
        };
    }
    var instance, app, slideShowController, navigatorController, notifier;
    return {
        getInstance: function() {
            return instance || (instance = init()), instance;
        }
    };
}(), SlideImageContainer = function(x, y) {
    PIXI.Container.call(this), this.position.x = x, this.position.y = y, this.alpha = 1;
};

SlideImageContainer.prototype = Object.create(PIXI.Container.prototype), SlideImageContainer.prototype.constructor = SlideImageContainer, 
SlideImageContainer.prototype.hide = function(offsetX) {
    this.position.x = offsetX, this.alpha = 0;
}, SlideImageContainer.prototype.show = function(x) {
    this.position.x = x, this.alpha = 1;
}, SlideImageContainer.prototype.slideOut = function(offsetX) {
    TweenMax.to(this, .15, {
        x: offsetX,
        alpha: 0,
        ease: Circ.easeOut
    });
}, SlideImageContainer.prototype.slideIn = function(x) {
    TweenMax.to(this, .15, {
        x: x,
        alpha: 1,
        visible: !0,
        ease: Circ.easeOut
    });
}, SlideImageContainer.prototype.updatePosition = function(x) {
    this.position.x = x;
};

var NotifyHelper = function() {
    var handlers = {};
    return {
        register: function(handler) {
            handlers[handler.name] = handler, handler.notifyHelper = this;
        },
        onSlideEvent: function(receiver, mssg) {
            for (key in handlers) handlers[key].name === receiver && handlers[key].onSlideComplete(mssg);
        },
        sendClickEvent: function(receiver, mssg) {
            for (key in handlers) handlers[key].name === receiver && handlers[key].onClick(mssg);
        }
    };
}, InteractiveBoxHelper = function() {
    function create(boxArray, parent) {
        for (var boxList = [], i = 0; i < boxArray.length; i++) boxList.push(new RoundedBox(boxArray[i], parent, 16767743));
        return boxList;
    }
    function updateBox(offsetX, boxArray, parent, isVisible) {
        for (var i = 0; i < boxArray.length; i++) {
            var box = boxArray[i];
            box.updateBoxPosition(offsetX, parent), box.toggleVisiblity(isVisible);
        }
    }
    function startScaleTween(boxArray) {
        for (var i = 0; i < boxArray.length; i++) boxArray[i].startTween();
    }
    function stopScaleTween(boxArray) {
        for (var i = 0; i < boxArray.length; i++) boxArray[i].stopTween();
    }
    return {
        getBoxes: function(boxArray, parent) {
            return boxArray && 0 != boxArray.length ? create(boxArray, parent) : null;
        },
        update: function(offsetX, boxArray, parent, isVisible) {
            updateBox(offsetX, boxArray, parent, isVisible);
        },
        startTween: function(boxArray) {
            startScaleTween(boxArray);
        },
        stopTween: function(boxArray) {
            stopScaleTween(boxArray);
        }
    };
}, SlideShowController = function() {
    this.name = "slideShowController", this.app = null, this.slideModel = null, this.slideShowView = null, 
    this.currentSlide = null, this.slides = [], this.notifyHelper = null, this.slideNavHelper = new SlideNavHelper(), 
    this.slideFactory = new SlideFactory();
};

SlideShowController.prototype.init = function(app) {
    this.app = app, this.slideModel = new SlideShowModel(), this.slideModel.init(app), 
    this.slideShowView = new SlideShowView(), this.slideShowView.init(app);
}, SlideShowController.prototype.createSlideShow = function() {
    for (var data = this.slideModel.getData(), i = 0; i < data.slides.length; i++) {
        var slide = this.slideFactory.create(i, data.slides[i], this.app);
        this.slides.push(slide);
    }
    this.setCurrentSlide(0), this.show();
}, SlideShowController.prototype.setCurrentSlide = function(index) {
    this.currentSlide = this.slides[index], this.slideShowView.setCurrentSlide(this.currentSlide);
}, SlideShowController.prototype.show = function() {
    this.slideShowView.show();
}, SlideShowController.prototype.onClick = function(data) {
    var lastId = this.slides.length - 1, nextSlideIndex = this.slideNavHelper.getCurrent(data, this.currentSlide.id, lastId), previousSlide = this.currentSlide, nextSlide = this.slides[nextSlideIndex];
    this.setCurrentSlide(nextSlideIndex);
    var offsetX = "right" == data ? -this.app.renderer.width : this.app.renderer.width, startPositionX = "right" == data ? this.app.renderer.width : -this.app.renderer.width, targetPositionX = this.app.renderer.width / 2;
    this.slideShowView.setCurrentSlide(nextSlide), this.slideShowView.updatePosition(startPositionX), 
    this.slideShowView.setPreviousSlide(previousSlide), this.slideShowView.update(targetPositionX, offsetX), 
    this.notifyHelper.onSlideEvent("navigatorController", this.currentSlide.id);
};

var NavigatorController = function() {
    this.name = "navigatorController", this.navigatorView = null, this.leftArrow = null, 
    this.rightArrow = null, this.slideLabel = null, this.app = null, this.notifyHelper = null;
};

NavigatorController.prototype.init = function(app) {
    this.app = app, this.createGUI(), this.navigatorView = new NavigatorView(), this.navigatorView.init(this.leftArrow, this.rightArrow, this.slideLabel, this.app);
}, NavigatorController.prototype.createGUI = function() {
    this.leftArrow = new Arrow("assets/images/leftArrow.png", this.app, "left"), this.rightArrow = new Arrow("assets/images/rightArrow.png", this.app, "right"), 
    this.slideLabel = new SlideLabelText(this.app), this.app.stage.addChild(this.leftArrow), 
    this.app.stage.addChild(this.rightArrow), this.app.stage.addChild(this.slideLabel), 
    console.log(this.slideLabel), console.log(this.app.stage);
}, NavigatorController.prototype.onClick = function(mssg) {
    this.notifyHelper.sendClickEvent("slideShowController", mssg);
}, NavigatorController.prototype.onSlideComplete = function(mssg) {
    this.navigatorView.onSlideComplete(mssg);
};

var SlideNavHelper = function() {
    function getIndex(dir, currentIndex, lastIndex) {
        var nextIndex;
        return (nextIndex = "right" === dir ? currentIndex + 1 : currentIndex - 1) > lastIndex && (nextIndex = 0), 
        nextIndex < 0 && (nextIndex = lastIndex), nextIndex;
    }
    return {
        getCurrent: function(dir, currentIndex, lastIndex) {
            return getIndex(dir, currentIndex, lastIndex);
        }
    };
}, SlideShowModel = function() {
    this.app = null, this.slideData = null;
};

SlideShowModel.prototype.init = function(app) {
    this.app = app, this.slideData = PIXI.loader.resources["assets/data/imageData.json"].data;
}, SlideShowModel.prototype.getData = function() {
    return this.slideData;
};

var SlideShowView = function(app) {
    this.app = app, this.slides = [], this.name = "slideShowView", this.notifyHelper = null, 
    this.slide = null, this.currentSlide = null, this.previousSlide = null;
};

SlideShowView.prototype.init = function(app) {
    this.app = app;
}, SlideShowView.prototype.setCurrentSlide = function(slide) {
    this.currentSlide = slide;
}, SlideShowView.prototype.setPreviousSlide = function(slide) {
    this.previousSlide = slide;
}, SlideShowView.prototype.show = function() {
    this.currentSlide.toggleVisibility(!0);
}, SlideShowView.prototype.toggleVisibility = function(index, value) {
    this.slides[index].toggleVisibility(value);
}, SlideShowView.prototype.updatePosition = function(x) {
    this.currentSlide.updatePosition(x);
}, SlideShowView.prototype.update = function(x, offsetX) {
    this.previousSlide.slideOut(offsetX, this.app), this.currentSlide.slideIn(x, this.app);
};

var NavigatorView = function() {
    this.leftArrow = null, this.rightArrow = null, this.slideLabel = null, this.name = "navigatorView", 
    this.app = null, this.notifyHelper = null;
};

NavigatorView.prototype.init = function(leftArrow, rightArrow, slideLabel, app) {
    this.app = app, this.leftArrow = leftArrow, this.rightArrow = rightArrow, this.slideLabel = slideLabel, 
    this.leftArrow.setupClickListeners(this.onClick, this), this.rightArrow.setupClickListeners(this.onClick, this);
}, NavigatorView.prototype.onClick = function(dir) {
    this.notifyHelper.sendClickEvent("navigatorController", dir);
}, NavigatorView.prototype.onSlideComplete = function(mssg) {
    this.slideLabel.setLabelText(mssg);
};

var PopupBox = function() {
    this.name = "popUpBox", this.popUpImage = new PopUpImage(), this.popUpText = new PopUpText(), 
    this.notifyHelper = null, this.visible = !1;
};

PopupBox.prototype.onClick = function(parent) {
    this.visible = !this.visible, this.visible ? this.show(parent) : this.hide(parent);
}, PopupBox.prototype.show = function(parent) {
    this.popUpImage.updateImage(parent, 1), this.popUpText.show(parent.text, this.popUpImage);
}, PopupBox.prototype.hide = function() {
    this.popUpImage.hide(), this.popUpText.hide();
};

var ImageFrame = function() {
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(7, 3901062, .8), graphics.drawRect(20, 15, 280, 280), PIXI.Sprite.call(this, graphics.generateTexture(!1)), 
    this.anchor.set(.5);
};

ImageFrame.prototype = Object.create(PIXI.Sprite.prototype), ImageFrame.prototype.constructor = ImageFrame;

var PopUpText = function() {
    PIXI.Text.call(this, "This is filler text", {
        fontFamily: "Space Mono",
        fontSize: 15,
        fill: "black",
        align: "center"
    }), this.x = 10, this.y = 10, this.anchor.set(.5, .5), this.alpha = 0;
};

PopUpText.prototype = Object.create(PIXI.Text.prototype), PopUpText.prototype.constructor = PopUpText, 
PopUpText.prototype.show = function(txt, parent) {
    this.x = parent.x, this.y = parent.y, this.text = txt, TweenMax.to(this, .25, {
        alpha: 1,
        ease: Quad.easeOut
    });
}, PopUpText.prototype.hide = function() {
    this.alpha = 0;
};

var PopUpImage = function() {
    PIXI.Sprite.call(this, PIXI.Texture.fromImage("assets/images/popUpBox.png")), this.position.x = 10, 
    this.position.y = 10, this.alpha = 0, this.anchor.set(.5), this.scale.set(0);
};

PopUpImage.prototype = Object.create(PIXI.Sprite.prototype), PopUpImage.prototype.constructor = PopUpImage, 
PopUpImage.prototype.updateImage = function(parent, value) {
    this.position.x = parent.x + 3.5 * parent.width, this.position.y = parent.y - .2 * parent.height, 
    TweenMax.to(this.scale, .2, {
        x: 1.2 * value,
        y: value,
        ease: Sine.easeOut
    }), TweenMax.to(this, .05, {
        alpha: .7,
        ease: Sine.easeOut
    });
}, PopUpImage.prototype.hide = function() {
    this.scale.set(0), this.alpha = 0;
};

var RoundedBox = function(obj, parent) {
    PIXI.Sprite.call(this, PIXI.Texture.fromImage("assets/images/box.png")), this.position.x = parent.x - .5 * parent.width + obj.x, 
    this.position.y = parent.y - .5 * parent.height + obj.y, this.originalX = obj.x, 
    this.name = "roundedBox", this.text = obj.text, this.notifyHelper = null, this.anchor.set(.5), 
    this.alpha = .9, this.setupClickListeners();
};

RoundedBox.prototype = Object.create(PIXI.Sprite.prototype), RoundedBox.prototype.constructor = RoundedBox, 
RoundedBox.prototype.setupClickListeners = function() {
    this.buttonMode = !0, this.interactive = !0;
    var that = this;
    this.on("pointerdown", function() {
        that.notifyHelper.sendClickEvent("popUpBox", that);
    }).on("pointerover", function() {
        TweenMax.to(this.scale, .05, {
            x: 1.5,
            y: 1.5,
            ease: Quad.easeIn
        });
    }).on("pointerout", function() {
        TweenMax.to(this.scale, .05, {
            x: 1,
            y: 1,
            ease: Quad.easeIn
        });
    });
}, RoundedBox.prototype.updateBoxPosition = function(offsetX, parent) {
    var newOffsetX = parent.x - parent.width * parent.anchor.x + this.originalX;
    this.position.x = newOffsetX;
}, RoundedBox.prototype.toggleVisiblity = function(value) {
    this.visible = value;
};

var SlideImage = function(name, imageUrl) {
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(imageUrl)), this.slideImageName = name, 
    this.position.x = 0, this.position.y = 0, this.anchor.set(.5, .5), this.alpha = 1;
};

SlideImage.prototype = Object.create(PIXI.Sprite.prototype), SlideImage.prototype.constructor = SlideImage, 
SlideImage.prototype.hide = function(offsetX) {
    this.position.x = offsetX, this.alpha = 0;
}, SlideImage.prototype.show = function(x) {
    this.position.x = x, this.alpha = 1;
}, SlideImage.prototype.updatePosition = function(x) {
    this.position.x = x;
};

var SlideLabelText = function(app) {
    PIXI.Text.call(this, "Slide # 1", {
        fontFamily: "Droid Serif",
        fontSize: 15,
        fill: "black",
        align: "center"
    }), this.x = .63 * app.renderer.width, this.y = .13 * app.renderer.height, this.anchor.set(.5, .5);
};

SlideLabelText.prototype = Object.create(PIXI.Text.prototype), SlideLabelText.prototype.constructor = SlideLabelText, 
SlideLabelText.prototype.setLabelText = function(id) {
    this.text = "Slide #" + (id + 1);
};

var SlideText = function(txtObj) {
    PIXI.Text.call(this, txtObj.txt, {
        fontFamily: "Droid Serif",
        fontSize: txtObj.size,
        fill: "black",
        align: "center"
    }), this.x = txtObj.x, this.y = txtObj.y, this.anchor.set(.5, .5), this.visible = !1;
};

SlideText.prototype = Object.create(PIXI.Text.prototype), SlideText.prototype.constructor = SlideText, 
SlideText.prototype.hide = function(app) {
    this.position.x = -app.renderer.width, this.visible = !1;
}, SlideText.prototype.show = function(app) {
    this.position.x = app.renderer.width / 2, this.visible = !0;
};

var Arrow = function(imageUrl, app, dir) {
    PIXI.Sprite.call(this, PIXI.Texture.fromImage(imageUrl)), this.dir = dir, "left" === this.dir ? this.position.x = .2 * app.renderer.width : this.position.x = .8 * app.renderer.width, 
    this.position.y = .85 * app.renderer.height, this.anchor.set(.5, .5);
};

Arrow.prototype = Object.create(PIXI.Sprite.prototype), Arrow.prototype.constructor = Arrow, 
Arrow.prototype.setupClickListeners = function(onClickCallback, onClickContext) {
    this.buttonMode = !0, this.interactive = !0;
    var that = this;
    this.on("pointerdown", function() {
        onClickCallback.call(onClickContext, that.dir);
    }).on("pointerover", function() {
        TweenMax.to(this.scale, .2, {
            x: 1.3,
            y: 1.3,
            ease: Sine.easeOut
        });
    }).on("pointerout", function() {
        TweenMax.to(this.scale, .2, {
            x: 1,
            y: 1,
            ease: Sine.easeOut
        });
    });
};

var SlideView = function(index, containerX, containerY, name, imageUrl, textObj, links, data, app) {
    this.id = index, this.slideImageContainer = new SlideImageContainer(containerX, containerY), 
    this.slideText = new SlideText(textObj), this.slideImage = new SlideImage(name, imageUrl), 
    this.imageFrame = new ImageFrame(), this.slideImageContainer.addChild(this.imageFrame), 
    this.interactiveBoxHelper = new InteractiveBoxHelper(), this.interactiveBoxes = this.interactiveBoxHelper.getBoxes(links, this.slideImage), 
    this.popUpBox = new PopupBox(), app.stage.addChild(this.slideImageContainer), app.stage.addChild(this.slideText), 
    this.slideImageContainer.addChild(this.slideImage), this.slideImageContainer.addChild(this.popUpBox.popUpImage), 
    this.slideImageContainer.addChild(this.popUpBox.popUpText);
    for (var i = 0; i < this.interactiveBoxes.length; i++) this.slideImageContainer.addChild(this.interactiveBoxes[i]);
    this.setupNotifier();
};

SlideView.prototype.setupNotifier = function() {
    this.notifier = new NotifyHelper(), this.notifier.register(this.popUpBox);
    for (var i = 0; i < this.interactiveBoxes.length; i++) this.notifier.register(this.interactiveBoxes[i]);
}, SlideView.prototype.toggleVisibility = function(value) {
    this.slideText.visible = value, this.slideImage.alpha = 1;
    for (var i = 0; i < this.interactiveBoxes.length; i++) this.interactiveBoxes[i].visible = value;
}, SlideView.prototype.hide = function(offsetX) {
    this.slideText.hide(offsetX), this.slideImageContainer.hide(offsetX);
}, SlideView.prototype.show = function(x) {
    this.slideText.show(x), this.slideImageContainer.show(x);
}, SlideView.prototype.slideOut = function(offsetX, app) {
    this.slideText.hide(app), this.slideImageContainer.slideOut(offsetX);
}, SlideView.prototype.slideIn = function(x, app) {
    this.slideText.show(app), this.slideImageContainer.slideIn(x);
}, SlideView.prototype.updatePosition = function(x) {
    this.slideImageContainer.updatePosition(x);
};