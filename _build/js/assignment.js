function SlideFactory(){this.create=function(index,data,app){var containerX=function(index,app){return 0==index?app.renderer.width/2:-app.renderer.width}(index,app),containerY=function(app){return.4*app.renderer.height}(app),textObj=function(x,text,app){return{x:app.renderer.width/2,y:.85*app.renderer.height,txt:text,size:35}}(0,data.text,app),links=function(data){for(var linkList=[],i=0;i<data.length;i++)linkList.push({id:i,x:data[i].position.x,y:data[i].position.y,text:data[i].text});return linkList}(data.interactive.links);return new SlideView(index,containerX,containerY,data.imageName,data.imageUrl,textObj,links,data,app)}}var LoaderHelper=function(){function loadFonts(){window.WebFontConfig={google:{families:["Snippet","Arvo:700italic","Podkova:700"]},active:function(){loadAssets()}}}function loadAssets(){PIXI.loader.add("assets/data/imageData.json").add("assets/images/arrow.png").add("assets/images/leftArrow.png").add("assets/images/rightArrow.png").add("assets/images/cat1.jpg").add("assets/images/cat2.jpg").add("assets/images/cat3.jpg").add("assets/images/cat4.jpg").add("assets/images/box.png").add("assets/images/circle.png").add("assets/images/popUpBox.png").load(loadCB)}function setLoadCallback(onLoadCallback){loadCB=onLoadCallback}var loadCB;return{load:function(onLoadCallback){setLoadCallback(onLoadCallback),loadFonts()}}}(),slideApp=function(){function init(){function load(){LoaderHelper.load(onLoaded)}function onLoaded(){console.log("onLoaded"),app=new PIXI.Application({width:800,height:600,resolution:1,antialias:!0,forceCanvas:!0,backgroundColor:4960767}),document.body.appendChild(app.view),console.log("app",app),createControllers(),setupNotifier(),createSlideShow(),requestAnimationFrame(animate)}function createControllers(){(slideShowController=new SlideShowController).init(app),(navigatorController=new NavigatorController).init(app)}function setupNotifier(){(notifier=new NotifyHelper).register(slideShowController),notifier.register(slideShowController.slideShowView),notifier.register(navigatorController),notifier.register(navigatorController.navigatorView)}function createSlideShow(){slideShowController.createSlideShow()}function animate(){app.renderer.render(app.stage),requestAnimationFrame(animate)}return{start:function(){load()}}}var instance,app,slideShowController,navigatorController,notifier;return{getInstance:function(){return instance||(instance=init()),instance}}}(),SlideImageContainer=function(x,y){PIXI.Container.call(this),this.position.x=x,this.position.y=y,this.alpha=1};SlideImageContainer.prototype=Object.create(PIXI.Container.prototype),SlideImageContainer.prototype.constructor=SlideImageContainer,SlideImageContainer.prototype.centerChildren=function(){this.pivot.x=this.renderer.width/2,this.pivot.y=this.renderer.height/2},SlideImageContainer.prototype.hide=function(offsetX){this.position.x=offsetX,this.alpha=0},SlideImageContainer.prototype.show=function(x){this.position.x=x,this.alpha=1},SlideImageContainer.prototype.slideOut=function(offsetX){console.log(">>>>>>>>>>>>>>>>>>>before slide out, offset",offsetX);var that=this;TweenMax.to(this,.15,{x:offsetX,alpha:0,ease:Quad.easeOut,onComplete:function(){console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>after slide out, that",that)}})},SlideImageContainer.prototype.slideIn=function(x){console.log(">>>>>>>>>>>>>>>>>>>before slide in, X",x);var that=this;TweenMax.to(this,.15,{x:x,alpha:1,visible:!0,ease:Quad.easeIn,onComplete:function(){console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>after slide in, that",that)}})},SlideImageContainer.prototype.updatePosition=function(x){this.position.x=x};var NotifyHelper=function(){var handlers={};return{register:function(handler){handlers[handler.name]=handler,handler.notifyHelper=this},notify:function(receiver){handlers[receiver];receiver.onClick()},sendClickEvent:function(receiver,mssg){console.log("navigator helper send click events");for(key in handlers)handlers[key].name===receiver&&handlers[key].onClick(mssg)}}},InteractiveBoxHelper=function(){function create(boxArray,parent){for(var boxList=[],i=0;i<boxArray.length;i++)boxList.push(new RoundedBox(boxArray[i],parent,16767743));return boxList}function updateBox(offsetX,boxArray,parent,isVisible){console.log("++++++++++++++++++++"),console.log("updateBoxPosition");for(var i=0;i<boxArray.length;i++){var box=boxArray[i];box.updateBoxPosition(offsetX,parent),box.toggleVisiblity(isVisible)}}return{getBoxes:function(boxArray,parent){return boxArray&&0!=boxArray.length?create(boxArray,parent):null},update:function(offsetX,boxArray,parent,isVisible){updateBox(offsetX,boxArray,parent,isVisible)}}},SlideShowController=function(){this.name="slideShowController",this.app=null,this.slideModel=null,this.slideShowView=null,this.currentSlide=null,this.slides=[],this.notifyHelper=null,this.slideNavHelper=new SlideNavHelper,this.slideFactory=new SlideFactory};SlideShowController.prototype.init=function(app){this.app=app,this.slideModel=new SlideShowModel,this.slideModel.init(app),this.slideShowView=new SlideShowView,this.slideShowView.init(app)},SlideShowController.prototype.createSlideShow=function(){for(var data=this.slideModel.getData(),i=0;i<data.slides.length;i++){var slide=this.slideFactory.create(i,data.slides[i],this.app);this.slides.push(slide)}console.log(this.slides),this.setCurrentSlide(0),this.show()},SlideShowController.prototype.getCurrentSlide=function(){return this.currentSlide},SlideShowController.prototype.setCurrentSlide=function(index){this.currentSlide=this.slides[index],this.slideShowView.setCurrentSlide(this.currentSlide)},SlideShowController.prototype.show=function(){this.slideShowView.show()},SlideShowController.prototype.onClick=function(data){console.log("Slide show Click",data),console.log("==========================");var lastId=this.slides.length-1,nextSlideIndex=this.slideNavHelper.getCurrent(data,this.currentSlide.id,lastId),previousSlide=this.currentSlide,nextSlide=this.slides[nextSlideIndex];this.setCurrentSlide(nextSlideIndex);var offsetX="left"==data?-this.app.renderer.width:this.app.renderer.width,startPositionX="left"==data?this.app.renderer.width:-this.app.renderer.width,targetPositionX=this.app.renderer.width/2;console.log("=============================================================="),console.log("offsetX: "+offsetX,"previousSlide.id: "+previousSlide.id),console.log("nextSlide.id: "+nextSlide.id,"lastId: "+lastId,"nextSlideIndex: "+nextSlideIndex),this.slideShowView.setCurrentSlide(nextSlide),this.slideShowView.updatePosition(startPositionX),this.slideShowView.setPreviousSlide(previousSlide),this.slideShowView.update(targetPositionX,offsetX)},SlideShowController.prototype.update=function(data){};var NavigatorController=function(){this.name="navigatorController",this.navigatorView=null,this.leftArrow=null,this.rightArrow=null,this.app=null,this.notifyHelper=null};NavigatorController.prototype.init=function(app){this.app=app,this.createGUI(),this.navigatorView=new NavigatorView,this.navigatorView.init(this.leftArrow,this.rightArrow,this.app)},NavigatorController.prototype.createGUI=function(){this.leftArrow=new Arrow("assets/images/leftArrow.png",this.app,"left"),this.rightArrow=new Arrow("assets/images/rightArrow.png",this.app,"right"),this.app.stage.addChild(this.leftArrow),this.app.stage.addChild(this.rightArrow)},NavigatorController.prototype.onClick=function(mssg){this.notifyHelper.sendClickEvent("slideShowController",mssg)};var SlideNavHelper=function(){function getIndex(dir,currentIndex,lastIndex){var nextIndex;return(nextIndex="left"===dir?currentIndex+1:currentIndex-1)>=lastIndex&&(nextIndex=0),nextIndex<0&&(nextIndex=lastIndex),nextIndex}return{getCurrent:function(dir,currentIndex,lastIndex){return getIndex(dir,currentIndex,lastIndex)}}},SlideShowModel=function(){this.app=null,this.slideData=null};SlideShowModel.prototype.init=function(app){this.app=app,this.slideData=PIXI.loader.resources["assets/data/imageData.json"].data},SlideShowModel.prototype.getData=function(){return this.slideData};var SlideShowView=function(app){this.app=app,this.slides=[],this.name="slideShowView",this.notifyHelper=null,this.slide=null,this.currentSlide=null,this.previousSlide=null};SlideShowView.prototype.init=function(app){this.app=app},SlideShowView.prototype.setCurrentSlide=function(slide){this.currentSlide=slide},SlideShowView.prototype.setPreviousSlide=function(slide){this.previousSlide=slide},SlideShowView.prototype.show=function(){this.currentSlide.toggleVisibility(!0)},SlideShowView.prototype.toggleVisibility=function(index,value){this.slides[index].toggleVisibility(value)},SlideShowView.prototype.updatePosition=function(x){this.currentSlide.updatePosition(x)},SlideShowView.prototype.update=function(x,offsetX){this.previousSlide.slideOut(offsetX,this.app),this.currentSlide.slideIn(x,this.app)};var NavigatorView=function(){this.leftArrow=null,this.rightArrow=null,this.name="navigatorView",this.app=null,this.notifyHelper=null};NavigatorView.prototype.init=function(leftArrow,rightArrow,app){this.app=app,this.leftArrow=leftArrow,this.rightArrow=rightArrow,this.leftArrow.setupClickListeners(this.onClick,this),this.rightArrow.setupClickListeners(this.onClick,this)},NavigatorView.prototype.onClick=function(dir){this.notifyHelper.sendClickEvent("navigatorController",dir)};var PopupBox=function(text){this.name="popUpBox",this.popUpImage=new PopUpImage,this.popUpText=new PopUpText,this.notifyHelper=null,this.visible=!1};PopupBox.prototype.toggleVisibility=function(value){this.popUpImage.visible=value,this.popUpText.visible=value},PopupBox.prototype.onClick=function(parent){this.visible=!this.visible,this.visible?this.show(parent):this.hide()},PopupBox.prototype.show=function(parent){this.toggleVisibility(!0),this.popUpImage.updateImage(parent),this.popUpText.updateTextInfo(parent.text,this.popUpImage)},PopupBox.prototype.hide=function(){this.toggleVisibility(!1)};var PopUpText=function(){PIXI.Text.call(this,"This is filler text",{fontFamily:"Snippet",fontSize:15,fill:"black",align:"center"}),this.x=10,this.y=10,this.anchor.set(.5,.5),this.visible=!1};PopUpText.prototype=Object.create(PIXI.Text.prototype),PopUpText.prototype.constructor=PopUpText,PopUpText.prototype.updateTextInfo=function(txt,parent){this.x=parent.x,this.y=parent.y,this.text=txt,console.log("text",this,parent)};var PopUpImage=function(){PIXI.Sprite.call(this,PIXI.Texture.fromImage("assets/images/popUpBox.png")),this.position.x=10,this.position.y=10,this.alpha=.8,this.anchor.set(.5),this.visible=!1};PopUpImage.prototype=Object.create(PIXI.Sprite.prototype),PopUpImage.prototype.constructor=PopUpImage,PopUpImage.prototype.updateImage=function(parent){this.position.x=parent.x+1.5*parent.width,this.position.y=parent.y-1.5*parent.height};var RoundedBox=function(obj,parent,tint){PIXI.Sprite.call(this,PIXI.Texture.fromImage("assets/images/box.png")),this.position.x=parent.x-.5*parent.width+obj.x,this.position.y=parent.y-.5*parent.height+obj.y,console.log("++++++++++++++++++++++++++++"),console.log("x,y",this.x,this.y,this),this.name="roundedBox",this.text=obj.text,this.notifyHelper=null,this.objX=obj.x,this.setupClickListeners()};RoundedBox.prototype=Object.create(PIXI.Sprite.prototype),RoundedBox.prototype.constructor=RoundedBox,RoundedBox.prototype.setupClickListeners=function(){this.buttonMode=!0,this.interactive=!0;var that=this;this.on("pointerdown",function(){that.notifyHelper.sendClickEvent("popUpBox",that)}).on("pointerout",function(){console.log("out")})},RoundedBox.prototype.updateBoxPosition=function(offsetX,parent){var newOffsetX=parent.x-parent.width*parent.anchor.x+this.objX;console.log("origin x position ====",this.position.x),console.log("updateBoxPosition ====",offsetX,newOffsetX,parent.x),console.log("newOffsetX",newOffsetX),console.log("parent.width",parent.width),this.position.x=newOffsetX},RoundedBox.prototype.toggleVisiblity=function(value){this.visible=value};var SlideImage=function(name,imageUrl){PIXI.Sprite.call(this,PIXI.Texture.fromImage(imageUrl)),this.slideImageName=name,this.position.x=0,this.position.y=0,this.anchor.set(.5,.5),this.alpha=1};SlideImage.prototype=Object.create(PIXI.Sprite.prototype),SlideImage.prototype.constructor=SlideImage,SlideImage.prototype.hide=function(offsetX){this.position.x=offsetX,this.alpha=0},SlideImage.prototype.show=function(x){this.position.x=x,this.alpha=1},SlideImage.prototype.slideOut=function(offsetX){TweenMax.to(this,.15,{x:offsetX,alpha:0,ease:Quad.easeOut})},SlideImage.prototype.slideIn=function(x){TweenMax.to(this,.15,{x:x,alpha:1,visible:!0,ease:Quad.easeIn})},SlideImage.prototype.updatePosition=function(x){this.position.x=x};var SlideText=function(txtObj){PIXI.Text.call(this,txtObj.txt,{fontFamily:"Snippet",fontSize:txtObj.size,fill:"black",align:"center"}),this.x=txtObj.x,this.y=txtObj.y,this.anchor.set(.5,.5),this.visible=!1};SlideText.prototype=Object.create(PIXI.Text.prototype),SlideText.prototype.constructor=SlideText,SlideText.prototype.hide=function(app){this.position.x=-app.renderer.width,this.visible=!1},SlideText.prototype.show=function(app){this.position.x=app.renderer.width/2,this.visible=!0},SlideText.prototype.updatePositionX=function(x){this.position.x=x};var Arrow=function(imageUrl,app,dir){PIXI.Sprite.call(this,PIXI.Texture.fromImage(imageUrl)),this.dir=dir,"left"===this.dir?this.position.x=.2*app.renderer.width:this.position.x=.8*app.renderer.width,this.position.y=.85*app.renderer.height,this.anchor.set(.5,.5),this.scale.set(.3)};Arrow.prototype=Object.create(PIXI.Sprite.prototype),Arrow.prototype.constructor=Arrow,Arrow.prototype.setupClickListeners=function(onClickCallback,onClickContext){this.buttonMode=!0,this.interactive=!0;var that=this;this.on("pointerdown",function(){onClickCallback.call(onClickContext,that.dir)}).on("pointerover",function(){TweenLite.to(this,.4,{x:this.x-10,ease:Elastic.easeOut.config(1,.3)})}).on("pointerout",function(){TweenLite.to(this,.4,{x:this.x+10,ease:Elastic.easeOut.config(1,.3)}),console.log("out")})};var SlideView=function(index,containerX,containerY,name,imageUrl,textObj,links,data,app){this.id=index,this.slideText=new SlideText(textObj),this.slideImageContainer=new SlideImageContainer(containerX,containerY),this.slideImage=new SlideImage(name,imageUrl),this.interactiveBoxHelper=new InteractiveBoxHelper,this.interactiveBoxes=this.interactiveBoxHelper.getBoxes(links,this.slideImage),this.popUpBox=new PopupBox,app.stage.addChild(this.slideImageContainer),app.stage.addChild(this.slideText),this.slideImageContainer.addChild(this.slideImage),this.slideImageContainer.addChild(this.popUpBox.popUpImage),this.slideImageContainer.addChild(this.popUpBox.popUpText);for(var i=0;i<this.interactiveBoxes.length;i++)this.slideImageContainer.addChild(this.interactiveBoxes[i]);this.setupNotifier()};SlideView.prototype.setupNotifier=function(){this.notifier=new NotifyHelper,this.notifier.register(this.popUpBox);for(var i=0;i<this.interactiveBoxes.length;i++)this.notifier.register(this.interactiveBoxes[i])},SlideView.prototype.toggleVisibility=function(value){this.slideText.visible=value,this.slideImage.alpha=1;for(var i=0;i<this.interactiveBoxes.length;i++)this.interactiveBoxes[i].visible=value},SlideView.prototype.hide=function(offsetX){this.slideText.hide(offsetX),this.slideImageContainer.hide(offsetX)},SlideView.prototype.show=function(x){this.slideText.show(x),this.slideImageContainer.show(x)},SlideView.prototype.slideOut=function(offsetX,app){this.slideText.hide(app),this.slideImageContainer.slideOut(offsetX)},SlideView.prototype.slideIn=function(x,app){this.slideText.show(app),this.slideImageContainer.slideIn(x)},SlideView.prototype.updatePosition=function(x){this.slideImageContainer.updatePosition(x)};