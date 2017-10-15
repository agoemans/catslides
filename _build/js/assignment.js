function BackEndLink(obj){this.id=obj.id,this.x=obj.position.x,this.y=obj.position.y,this.text=obj.text}function BackEndSlide(){}var LoaderHelper=function(){function loadFonts(){window.WebFontConfig={google:{families:["Snippet","Arvo:700italic","Podkova:700"]},active:function(){loadAssets()}}}function loadAssets(){PIXI.loader.add("assets/data/imageData.json").add("assets/images/arrow.png").add("assets/images/leftArrow.png").add("assets/images/rightArrow.png").add("assets/images/cat1.jpg").add("assets/images/cat2.jpg").add("assets/images/box.png").load(loadCB)}function setLoadCallback(onLoadCallback){loadCB=onLoadCallback}var loadCB;return{load:function(onLoadCallback){setLoadCallback(onLoadCallback),loadFonts()}}}(),slideApp=function(){function init(){function load(){LoaderHelper.load(onLoaded)}function onLoaded(){console.log("onLoaded"),app=new PIXI.Application({width:800,height:600,resolution:1,antialias:!0,forceCanvas:!0,backgroundColor:7197807}),document.body.appendChild(app.view),console.log("app",app),createControllers(),setupNotifier(),createSlideShow(),requestAnimationFrame(animate)}function createControllers(){(slideShowController=new SlideShowController).init(app),(navigatorController=new NavigatorController).init(app)}function setupNotifier(){(notifier=new NotifyHelper).register(slideShowController),notifier.register(slideShowController.slideView),notifier.register(navigatorController),notifier.register(navigatorController.navigatorView)}function createSlideShow(){slideShowController.createSlideShow()}function animate(){app.renderer.render(app.stage),requestAnimationFrame(animate)}return{start:function(){load()}}}var instance,app,slideShowController,navigatorController,notifier;return{getInstance:function(){return instance||(instance=init()),instance}}}(),NotifyHelper=function(){var handlers={};return{register:function(handler){handlers[handler.name]=handler,handler.notifyHelper=this},notify:function(receiver){handlers[receiver];receiver.onClick()},sendClickEvent:function(receiver){console.log("navigator helper send click events");for(key in handlers)handlers[key].name===receiver&&handlers[key].onClick()}}},InteractiveBoxHelper=function(){function create(boxArray,app){for(var boxList=[],i=0;i<boxArray.length;i++)boxList.push(new RoundedBox(boxArray[i],app));return boxList}return{getBoxes:function(obj,app){return null===obj.links?null:create(obj.links,app)}}},SlideShowController=function(){this.slideModel=null,this.slideView=null,this.name="slideShowController",this.app=null,this.notifyHelper=null,this.currentSlide=null};SlideShowController.prototype.init=function(app){this.app=app,this.slideModel=new SlideShowModel,this.slideModel.init(app),this.slideView=new SlideShowView(this.app),console.log("ctonroller SlideShowController")},SlideShowController.prototype.createSlideShow=function(){this.slideView.createSlideShow(this.slideModel.getSlideList()),this.slideView.toggleVisibility(0,!0),this.currentSlide=this.slideModel.getCurrentSlide()},SlideShowController.prototype.onClick=function(){console.log("Slide show Click"),this.slideView.setCurrentSlide(this.slideModel.getCurrentSlide())};var NavigatorController=function(){this.navigatorView=null,this.name="navigatorController",this.app=null,this.notifyHelper=null};NavigatorController.prototype.init=function(app){this.app=app,this.navigatorView=new NavigatorView,this.navigatorView.init(this.app)},NavigatorController.prototype.onClick=function(){console.log("NavigatorController Click"),this.notifyHelper.sendClickEvent("slideShowController")};var BackendLinkHelper=function(){function create(linkArray){for(var linkList=[],i=0;i<linkArray.length;i++)linkList.push(new BackEndLink(linkArray[i]));return linkList}return{getLinks:function(obj){return obj.interactive.clickable?create(obj.interactive.links):null}}},SlideShowModel=function(){this.app=null,this.slideShowList=[],this.previousSlide=null,this.currentSlide=null,this.nextSlide=null,this.backendLinkHelper=new BackendLinkHelper,this.slideData=PIXI.loader.resources["assets/data/imageData.json"].data};SlideShowModel.prototype.init=function(app){this.app=app,this.setSlideList(this.slideData),this.setSlidePositions(0)},SlideShowModel.prototype.setSlideList=function(slideArray){for(var i=0;i<slideArray.slides.length;i++){var slide=this.createSlide(slideArray.slides[i],i);this.slideShowList.push(slide)}},SlideShowModel.prototype.getSlideList=function(){return this.slideShowList},SlideShowModel.prototype.createSlide=function(obj,index){return{id:index,name:obj.imageName,url:obj.imageUrl,x:this.getPositionX(index),y:this.getPositionY(),w:obj.size.w,h:obj.size.h,txtObj:this.getTextObj(obj.text),lNum:obj.numOfLinks,links:this.backendLinkHelper.getLinks(obj),visible:!1}},SlideShowModel.prototype.getTextObj=function(text){return{x:this.getTxtPositionX(),y:this.getTxtPositionY(),txt:text}},SlideShowModel.prototype.getTxtPositionX=function(){return this.app.renderer.width/2},SlideShowModel.prototype.getTxtPositionY=function(){return.85*this.app.renderer.height},SlideShowModel.prototype.getPositionX=function(index){return 0==index?this.app.renderer.width/2:this.app.renderer.width},SlideShowModel.prototype.getPositionY=function(){return.35*this.app.renderer.height},SlideShowModel.prototype.setSlidePositions=function(currentIndex){var lastIndex=this.slideShowList.length-1;this.currentSlide=this.slideShowList[currentIndex],this.previousSlide=0===currentIndex?this.slideShowList[lastIndex]:this.slideShowList[currentIndex-1],currentIndex===lastIndex?this.nextSlide=this.slideShowList[0]:this.previousSlide=this.slideShowList[currentIndex+1]},SlideShowModel.prototype.updateSlidePosition=function(){},SlideShowModel.prototype.getCurrentSlide=function(){return this.currentSlide};var SlideShowView=function(app){this.app=app,this.slides=[],this.name="slideShowView",this.notifyHelper=null,this.slide=null,this.currentSlide=null};SlideShowView.prototype.createSlideShow=function(slideArray){this.setSlides(slideArray)},SlideShowView.prototype.setSlides=function(slideArray){for(var i=0;i<slideArray.length;i++){var slide=this.createSlide(slideArray[i]);this.slides.push(slide)}console.log("view createSlideShow",this.slides,this.app)},SlideShowView.prototype.createSlide=function(slideObj){this.slide=new Slide(slideObj),this.app.stage.addChild(this.slide.slideText),this.app.stage.addChild(this.slide.slideImage);for(var i=0;i<this.slide.interactiveBoxes.length;i++)this.app.stage.addChild(this.slide.interactiveBoxes[i]);return this.slide},SlideShowView.prototype.toggleVisibility=function(index,value){this.slides[index].toggleVisibility(value)},SlideShowView.prototype.setCurrentSlide=function(slide){this.currentSlide=this.slides[slide.id]};var NavigatorView=function(){this.leftArrow=null,this.rightArrow=null,this.name="navigatorView",this.app=null,this.notifyHelper=null};NavigatorView.prototype.init=function(app){this.app=app,this.leftArrow=new Arrow("assets/images/leftArrow.png",app,!0),this.rightArrow=new Arrow("assets/images/rightArrow.png",app,!1),this.app.stage.addChild(this.leftArrow),this.app.stage.addChild(this.rightArrow),this.setupListeners()},NavigatorView.prototype.setupListeners=function(){this.leftArrow.buttonMode=!0,this.leftArrow.interactive=!0,this.leftArrow.on("pointerdown",this.onClick,this).on("pointerout",function(){console.log("out")}),this.rightArrow.buttonMode=!0,this.rightArrow.interactive=!0,this.rightArrow.on("pointerdown",this.onClick,this).on("pointerout",function(){console.log("out")})},NavigatorView.prototype.onClick=function(){console.log("NavigatorView Click"),this.notifyHelper.sendClickEvent("navigatorController")};var RoundedBox=function(obj,app){PIXI.Sprite.call(this,PIXI.Texture.fromImage("assets/images/box.png")),this.position.x=obj.x,this.position.y=obj.y,this.anchor.set(.5,.5),this.tint=16767743,console.log("this round box",this)};RoundedBox.prototype=Object.create(PIXI.Sprite.prototype),RoundedBox.prototype.constructor=RoundedBox;var SlideImage=function(obj){PIXI.Sprite.call(this,PIXI.Texture.fromImage(obj.url)),this.position.x=obj.x,this.position.y=obj.y,console.log("this.position.y",this.position.y),this.anchor.set(.5,.5),this.scale.set(.7),this.visible=obj.visible};SlideImage.prototype=Object.create(PIXI.Sprite.prototype),SlideImage.prototype.constructor=SlideImage;var SlideText=function(txtObj){PIXI.Text.call(this,txtObj.txt,{fontFamily:"Snippet",fontSize:35,fill:"black",align:"center"}),this.x=txtObj.x,this.y=txtObj.y,this.anchor.set(.5,.5),this.visible=!1};SlideText.prototype=Object.create(PIXI.Text.prototype),SlideText.prototype.constructor=SlideText;var Arrow=function(imageUrl,app,isLeft){PIXI.Sprite.call(this,PIXI.Texture.fromImage(imageUrl)),this.position.x=isLeft?.2*app.renderer.width:.8*app.renderer.width,this.position.y=.85*app.renderer.height,this.anchor.set(.5,.5),this.scale.set(.3)};Arrow.prototype=Object.create(PIXI.Sprite.prototype),Arrow.prototype.constructor=Arrow;var Slide=function(obj){this.id=obj.id,this.slideText=new SlideText(obj.txtObj),this.slideImage=new SlideImage(obj),this.interactiveBoxHelper=new InteractiveBoxHelper,this.interactiveBoxes=this.interactiveBoxHelper.getBoxes(obj),console.log("this.interactiveBoxes",this.interactiveBoxes)};Slide.prototype.toggleVisibility=function(value){this.slideText.visible=value,this.slideImage.visible=value},Slide.prototype.updatePosition=function(x,y){},Slide.prototype.update=function(stage){};