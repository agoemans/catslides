var loaderHelper=function(){function loadFonts(){window.WebFontConfig={google:{families:["Snippet","Arvo:700italic","Podkova:700"]},active:function(){loadAssets()}}}function loadAssets(){PIXI.loader.add("assets/data/imageData.json").add("assets/images/arrow.png").add("assets/images/leftArrow.png").add("assets/images/rightArrow.png").add("assets/images/cat1.jpg").add("assets/images/cat2.jpg").load(loadCB)}function setLoadCallback(onLoadCallback){loadCB=onLoadCallback}var loadCB;return{load:function(onLoadCallback){setLoadCallback(onLoadCallback),loadFonts()}}}(),slideApp=function(){function init(){function load(){loaderHelper.load(onLoaded)}function onLoaded(){console.log("onLoaded"),app=new PIXI.Application({width:800,height:600,resolution:1,antialias:!0,forceCanvas:!0,backgroundColor:16777215}),document.body.appendChild(app.view),createControllers()}function createControllers(){(slideShowController=new SlideShowController).init(app.stage),(navigatorController=new NavigatorController).init(app.stage),createSlideShow()}function createSlideShow(){slideShowController.createSlideShow(),requestAnimationFrame(animate)}function animate(){app.renderer.render(app.stage),requestAnimationFrame(animate)}return{start:function(){load()}}}var instance,app,slideShowController,navigatorController;return{getInstance:function(){return instance||(instance=init()),instance}}}(),NavigatorHelper=function(){return{notify:function(receiver,data){}}},SlideShowController=function(){this.slideModel=null,this.slideView=null,this.stage=null};SlideShowController.prototype.init=function(stage){this.stage=stage,this.slideModel=new SlideShowModel,this.slideModel.init(),this.slideView=new SlideShowView(this.stage),console.log("ctonroller SlideShowController")},SlideShowController.prototype.createSlideShow=function(){this.slideView.createSlideShow(this.slideModel.getSlideList())};var NavigatorController=function(){this.navigatorView=null,this.stage=null};NavigatorController.prototype.init=function(stage){this.stage=stage,this.navigatorView=new NavigatorView,this.navigatorView.init(this.stage)};var SlideShowModel=function(){this.slideShowList=[],this.previousSlide=null,this.currentSlide=null,this.nextSlide=null,this.slideData=PIXI.loader.resources["assets/data/imageData.json"].data};SlideShowModel.prototype.init=function(){this.setSlideList(),this.setSlidePositions(0)},SlideShowModel.prototype.setSlideList=function(){for(var i=0;i<this.slideData.slides.length;i++){var slide=this.createSlide(this.slideData.slides[i]);this.slideShowList.push(slide)}},SlideShowModel.prototype.getSlideList=function(){return this.slideShowList},SlideShowModel.prototype.createSlide=function(obj,index){return{id:index,name:obj.imageName,url:obj.imageUrl,x:obj.position.x,y:obj.position.y,w:obj.size.w,h:obj.size.h,txt:obj.text,lNum:obj.numOfLinks,links:this.getLinks(obj),visible:!1}},SlideShowModel.prototype.getLinks=function(obj){return obj.interactive.clickable?null:this.createLinks(obj.interactive.links)},SlideShowModel.prototype.createLinks=function(linkArray){for(var linkList=[],i=0;i<linkArray.length;i++)linkList.push({id:linkArray[i].id,x:linkArray[i].position.x,y:linkArray[i].position.y,txt:linkArray[i].text});return linkList},SlideShowModel.prototype.setSlidePositions=function(currentIndex){var lastIndex=this.slideShowList.length-1;this.currentSlide=this.slideShowList[currentIndex],this.previousSlide=0===currentIndex?this.slideShowList[lastIndex]:this.slideShowList[currentIndex-1],currentIndex===lastIndex?this.nextSlide=this.slideShowList[0]:this.previousSlide=this.slideShowList[currentIndex+1]};var SlideShowView=function(stage){this.stage=stage,this.slides=[],this.slide=null};SlideShowView.prototype.createSlideShow=function(slideArray){this.setSlides(slideArray),this.toggleVisibility(0,!0)},SlideShowView.prototype.setSlides=function(slideArray){for(var i=0;i<slideArray.length;i++){var slide=this.createSlide(slideArray[i]);this.slides.push(slide)}console.log("view createSlideShow",this.slides)},SlideShowView.prototype.createSlide=function(slideObj){return this.slide=new Slide(slideObj,this.stage),this.stage.addChild(this.slide.slideText),this.stage.addChild(this.slide.slideImage),this.slide},SlideShowView.prototype.toggleVisibility=function(index,value){this.slides[index].toggleVisibility(value)};var NavigatorView=function(){this.leftArrow=null,this.rightArrow=null,this.stage=null};NavigatorView.prototype.init=function(stage){this.stage=stage,this.leftArrow=new Arrow(200,"assets/images/leftArrow.png"),this.rightArrow=new Arrow(400,"assets/images/rightArrow.png"),this.stage.addChild(this.leftArrow),this.stage.addChild(this.rightArrow)};var SlideImage=function(obj){PIXI.Sprite.call(this,PIXI.Texture.fromImage(obj.url)),this.position.x=obj.x,this.anchor.set(.5,0),this.scale.set(.7),this.visible=obj.visible};SlideImage.prototype=Object.create(PIXI.Sprite.prototype),SlideImage.prototype.constructor=SlideImage;var SlideText=function(text,stage){PIXI.Text.call(this,text,{fontFamily:"Snippet",fontSize:35,fill:"black",align:"center"}),this.x=stage.width/2,this.y=stage.height-50,this.visible=!1};SlideText.prototype=Object.create(PIXI.Text.prototype),SlideText.prototype.constructor=SlideText;var Arrow=function(x,imageUrl){PIXI.Sprite.call(this,PIXI.Texture.fromImage(imageUrl)),this.position.x=x,this.position.y=400,this.scale.set(.5)};Arrow.prototype=Object.create(PIXI.Sprite.prototype),Arrow.prototype.constructor=Arrow;var Slide=function(obj,stage){this.slideText=new SlideText(obj.text,stage),this.slideImage=new SlideImage(obj)};Slide.prototype.toggleVisibility=function(value){this.slideText.visible=value,this.slideImage.visible=value},Slide.prototype.adjustPosition=function(){};