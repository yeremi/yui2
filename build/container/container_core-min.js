
YAHOO.util.Config=function(owner){if(owner){this.init(owner);}};YAHOO.util.Config.prototype={owner:null,configChangedEvent:null,queueInProgress:false,addProperty:function(key,propertyObject){},getConfig:function(){},getProperty:function(key){},resetProperty:function(key){},setProperty:function(key,value,silent){},queueProperty:function(key,value){},refireEvent:function(key){},applyConfig:function(userConfig,init){},refresh:function(){},fireQueue:function(){},subscribeToConfigEvent:function(key,handler,obj,override){},unsubscribeFromConfigEvent:function(key,handler,obj){},checkBoolean:function(val){if(typeof val=='boolean'){return true;}else{return false;}},checkNumber:function(val){if(isNaN(val)){return false;}else{return true;}}};YAHOO.util.Config.prototype.init=function(owner){this.owner=owner;this.configChangedEvent=new YAHOO.util.CustomEvent("configChanged");this.queueInProgress=false;var config={};var initialConfig={};var eventQueue=[];var fireEvent=function(key,value){key=key.toLowerCase();var property=config[key];if(typeof property!='undefined'&&property.event){property.event.fire(value);}};this.addProperty=function(key,propertyObject){key=key.toLowerCase();config[key]=propertyObject;propertyObject.event=new YAHOO.util.CustomEvent(key);propertyObject.key=key;if(propertyObject.handler){propertyObject.event.subscribe(propertyObject.handler,this.owner,true);}
this.setProperty(key,propertyObject.value,true);if(!propertyObject.suppressEvent){this.queueProperty(key,propertyObject.value);}};this.getConfig=function(){var cfg={};for(var prop in config){var property=config[prop];if(typeof property!='undefined'&&property.event){cfg[prop]=property.value;}}
return cfg;};this.getProperty=function(key){key=key.toLowerCase();var property=config[key];if(typeof property!='undefined'&&property.event){return property.value;}else{return undefined;}};this.resetProperty=function(key){key=key.toLowerCase();var property=config[key];if(typeof property!='undefined'&&property.event){this.setProperty(key,initialConfig[key].value);}else{return undefined;}};this.setProperty=function(key,value,silent){key=key.toLowerCase();if(this.queueInProgress&&!silent){this.queueProperty(key,value);return true;}else{var property=config[key];if(typeof property!='undefined'&&property.event){if(property.validator&&!property.validator(value)){return false;}else{property.value=value;if(!silent){fireEvent(key,value);this.configChangedEvent.fire([key,value]);}
return true;}}else{return false;}}};this.queueProperty=function(key,value){key=key.toLowerCase();var property=config[key];if(typeof property!='undefined'&&property.event){if(typeof value!='undefined'&&property.validator&&!property.validator(value)){return false;}else{if(typeof value!='undefined'){property.value=value;}else{value=property.value;}
var foundDuplicate=false;for(var i=0;i<eventQueue.length;i++){var queueItem=eventQueue[i];if(queueItem){var queueItemKey=queueItem[0];var queueItemValue=queueItem[1];if(queueItemKey.toLowerCase()==key){eventQueue[i]=null;eventQueue.push([key,(typeof value!='undefined'?value:queueItemValue)]);foundDuplicate=true;break;}}}
if(!foundDuplicate&&typeof value!='undefined'){eventQueue.push([key,value]);}}
if(property.supercedes){for(var s=0;s<property.supercedes.length;s++){var supercedesCheck=property.supercedes[s];for(var q=0;q<eventQueue.length;q++){var queueItemCheck=eventQueue[q];if(queueItemCheck){var queueItemCheckKey=queueItemCheck[0];var queueItemCheckValue=queueItemCheck[1];if(queueItemCheckKey.toLowerCase()==supercedesCheck.toLowerCase()){eventQueue.push([queueItemCheckKey,queueItemCheckValue]);eventQueue[q]=null;break;}}}}}
return true;}else{return false;}};this.refireEvent=function(key){key=key.toLowerCase();var property=config[key];if(typeof property!='undefined'&&property.event&&typeof property.value!='undefined'){if(this.queueInProgress){this.queueProperty(key);}else{fireEvent(key,property.value);}}};this.applyConfig=function(userConfig,init){if(init){initialConfig=userConfig;}
for(var prop in userConfig){this.queueProperty(prop,userConfig[prop]);}};this.refresh=function(){for(var prop in config){this.refireEvent(prop);}};this.fireQueue=function(){this.queueInProgress=true;for(var i=0;i<eventQueue.length;i++){var queueItem=eventQueue[i];if(queueItem){var key=queueItem[0];var value=queueItem[1];var property=config[key];property.value=value;fireEvent(key,value);}}
this.queueInProgress=false;eventQueue=[];};this.subscribeToConfigEvent=function(key,handler,obj,override){key=key.toLowerCase();var property=config[key];if(typeof property!='undefined'&&property.event){if(!YAHOO.util.Config.alreadySubscribed(property.event,handler,obj)){property.event.subscribe(handler,obj,override);}
return true;}else{return false;}};this.unsubscribeFromConfigEvent=function(key,handler,obj){key=key.toLowerCase();var property=config[key];if(typeof property!='undefined'&&property.event){return property.event.unsubscribe(handler,obj);}else{return false;}};this.toString=function(){var output="Config";if(this.owner){output+=" ["+this.owner.toString()+"]";}
return output;};this.outputEventQueue=function(){var output="";for(var q=0;q<eventQueue.length;q++){var queueItem=eventQueue[q];if(queueItem){output+=queueItem[0]+"="+queueItem[1]+", ";}}
return output;};};YAHOO.util.Config.alreadySubscribed=function(evt,fn,obj){for(var e=0;e<evt.subscribers.length;e++){var subsc=evt.subscribers[e];if(subsc&&subsc.obj==obj&&subsc.fn==fn){return true;}}
return false;};YAHOO.widget.Module=function(el,userConfig){if(el){this.init(el,userConfig);}};YAHOO.widget.Module.IMG_ROOT="http://us.i1.yimg.com/us.yimg.com/i/";YAHOO.widget.Module.IMG_ROOT_SSL="https://a248.e.akamai.net/sec.yimg.com/i/";YAHOO.widget.Module.CSS_MODULE="module";YAHOO.widget.Module.CSS_HEADER="hd";YAHOO.widget.Module.CSS_BODY="bd";YAHOO.widget.Module.CSS_FOOTER="ft";YAHOO.widget.Module.RESIZE_MONITOR_SECURE_URL="javascript:false";YAHOO.widget.Module.prototype={constructor:YAHOO.widget.Module,element:null,header:null,body:null,footer:null,id:null,childNodesInDOM:null,imageRoot:YAHOO.widget.Module.IMG_ROOT,beforeInitEvent:null,initEvent:null,appendEvent:null,beforeRenderEvent:null,renderEvent:null,changeHeaderEvent:null,changeBodyEvent:null,changeFooterEvent:null,changeContentEvent:null,destroyEvent:null,beforeShowEvent:null,showEvent:null,beforeHideEvent:null,hideEvent:null,initEvents:function(){this.beforeInitEvent=new YAHOO.util.CustomEvent("beforeInit");this.initEvent=new YAHOO.util.CustomEvent("init");this.appendEvent=new YAHOO.util.CustomEvent("append");this.beforeRenderEvent=new YAHOO.util.CustomEvent("beforeRender");this.renderEvent=new YAHOO.util.CustomEvent("render");this.changeHeaderEvent=new YAHOO.util.CustomEvent("changeHeader");this.changeBodyEvent=new YAHOO.util.CustomEvent("changeBody");this.changeFooterEvent=new YAHOO.util.CustomEvent("changeFooter");this.changeContentEvent=new YAHOO.util.CustomEvent("changeContent");this.destroyEvent=new YAHOO.util.CustomEvent("destroy");this.beforeShowEvent=new YAHOO.util.CustomEvent("beforeShow");this.showEvent=new YAHOO.util.CustomEvent("show");this.beforeHideEvent=new YAHOO.util.CustomEvent("beforeHide");this.hideEvent=new YAHOO.util.CustomEvent("hide");},platform:function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf("windows")!=-1||ua.indexOf("win32")!=-1){return"windows";}else if(ua.indexOf("macintosh")!=-1){return"mac";}else{return false;}}(),browser:function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf('opera')!=-1){return'opera';}else if(ua.indexOf('msie 7')!=-1){return'ie7';}else if(ua.indexOf('msie')!=-1){return'ie';}else if(ua.indexOf('safari')!=-1){return'safari';}else if(ua.indexOf('gecko')!=-1){return'gecko';}else{return false;}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){this.cfg.addProperty("visible",{value:true,handler:this.configVisible,validator:this.cfg.checkBoolean});this.cfg.addProperty("effect",{suppressEvent:true,supercedes:["visible"]});this.cfg.addProperty("monitorresize",{value:true,handler:this.configMonitorResize});},init:function(el,userConfig){this.initEvents();this.beforeInitEvent.fire(YAHOO.widget.Module);this.cfg=new YAHOO.util.Config(this);if(this.isSecure){this.imageRoot=YAHOO.widget.Module.IMG_ROOT_SSL;}
if(typeof el=="string"){var elId=el;el=document.getElementById(el);if(!el){el=document.createElement("DIV");el.id=elId;}}
this.element=el;if(el.id){this.id=el.id;}
var childNodes=this.element.childNodes;if(childNodes){for(var i=0;i<childNodes.length;i++){var child=childNodes[i];switch(child.className){case YAHOO.widget.Module.CSS_HEADER:this.header=child;break;case YAHOO.widget.Module.CSS_BODY:this.body=child;break;case YAHOO.widget.Module.CSS_FOOTER:this.footer=child;break;}}}
this.initDefaultConfig();YAHOO.util.Dom.addClass(this.element,YAHOO.widget.Module.CSS_MODULE);if(userConfig){this.cfg.applyConfig(userConfig,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}
this.initEvent.fire(YAHOO.widget.Module);},initResizeMonitor:function(){if(this.browser!="opera"){var resizeMonitor=document.getElementById("_yuiResizeMonitor");if(!resizeMonitor){resizeMonitor=document.createElement("iframe");var bIE=(this.browser.indexOf("ie")===0);if(this.isSecure&&YAHOO.widget.Module.RESIZE_MONITOR_SECURE_URL&&bIE){resizeMonitor.src=YAHOO.widget.Module.RESIZE_MONITOR_SECURE_URL;}
resizeMonitor.id="_yuiResizeMonitor";resizeMonitor.style.visibility="hidden";document.body.appendChild(resizeMonitor);resizeMonitor.style.width="10em";resizeMonitor.style.height="10em";resizeMonitor.style.position="absolute";var nLeft=-1*resizeMonitor.offsetWidth,nTop=-1*resizeMonitor.offsetHeight;resizeMonitor.style.top=nTop+"px";resizeMonitor.style.left=nLeft+"px";resizeMonitor.style.borderStyle="none";resizeMonitor.style.borderWidth="0";YAHOO.util.Dom.setStyle(resizeMonitor,"opacity","0");resizeMonitor.style.visibility="visible";if(!bIE){var doc=resizeMonitor.contentWindow.document;doc.open();doc.close();}}
if(resizeMonitor&&resizeMonitor.contentWindow){this.resizeMonitor=resizeMonitor;YAHOO.util.Event.addListener(this.resizeMonitor.contentWindow,"resize",this.onDomResize,this,true);}}},onDomResize:function(e,obj){var nLeft=-1*this.resizeMonitor.offsetWidth,nTop=-1*this.resizeMonitor.offsetHeight;this.resizeMonitor.style.top=nTop+"px";this.resizeMonitor.style.left=nLeft+"px";},setHeader:function(headerContent){if(!this.header){this.header=document.createElement("DIV");this.header.className=YAHOO.widget.Module.CSS_HEADER;}
if(typeof headerContent=="string"){this.header.innerHTML=headerContent;}else{this.header.innerHTML="";this.header.appendChild(headerContent);}
this.changeHeaderEvent.fire(headerContent);this.changeContentEvent.fire();},appendToHeader:function(element){if(!this.header){this.header=document.createElement("DIV");this.header.className=YAHOO.widget.Module.CSS_HEADER;}
this.header.appendChild(element);this.changeHeaderEvent.fire(element);this.changeContentEvent.fire();},setBody:function(bodyContent){if(!this.body){this.body=document.createElement("DIV");this.body.className=YAHOO.widget.Module.CSS_BODY;}
if(typeof bodyContent=="string")
{this.body.innerHTML=bodyContent;}else{this.body.innerHTML="";this.body.appendChild(bodyContent);}
this.changeBodyEvent.fire(bodyContent);this.changeContentEvent.fire();},appendToBody:function(element){if(!this.body){this.body=document.createElement("DIV");this.body.className=YAHOO.widget.Module.CSS_BODY;}
this.body.appendChild(element);this.changeBodyEvent.fire(element);this.changeContentEvent.fire();},setFooter:function(footerContent){if(!this.footer){this.footer=document.createElement("DIV");this.footer.className=YAHOO.widget.Module.CSS_FOOTER;}
if(typeof footerContent=="string"){this.footer.innerHTML=footerContent;}else{this.footer.innerHTML="";this.footer.appendChild(footerContent);}
this.changeFooterEvent.fire(footerContent);this.changeContentEvent.fire();},appendToFooter:function(element){if(!this.footer){this.footer=document.createElement("DIV");this.footer.className=YAHOO.widget.Module.CSS_FOOTER;}
this.footer.appendChild(element);this.changeFooterEvent.fire(element);this.changeContentEvent.fire();},render:function(appendToNode,moduleElement){this.beforeRenderEvent.fire();if(!moduleElement){moduleElement=this.element;}
var me=this;var appendTo=function(element){if(typeof element=="string"){element=document.getElementById(element);}
if(element){element.appendChild(me.element);me.appendEvent.fire();}};if(appendToNode){appendTo(appendToNode);}else{if(!YAHOO.util.Dom.inDocument(this.element)){return false;}}
if(this.header&&!YAHOO.util.Dom.inDocument(this.header)){var firstChild=moduleElement.firstChild;if(firstChild){moduleElement.insertBefore(this.header,firstChild);}else{moduleElement.appendChild(this.header);}}
if(this.body&&!YAHOO.util.Dom.inDocument(this.body)){if(this.footer&&YAHOO.util.Dom.isAncestor(this.moduleElement,this.footer)){moduleElement.insertBefore(this.body,this.footer);}else{moduleElement.appendChild(this.body);}}
if(this.footer&&!YAHOO.util.Dom.inDocument(this.footer)){moduleElement.appendChild(this.footer);}
this.renderEvent.fire();return true;},destroy:function(){if(this.element){var parent=this.element.parentNode;}
if(parent){parent.removeChild(this.element);}
this.element=null;this.header=null;this.body=null;this.footer=null;this.destroyEvent.fire();},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(type,args,obj){var visible=args[0];if(visible){this.beforeShowEvent.fire();YAHOO.util.Dom.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();YAHOO.util.Dom.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(type,args,obj){var monitor=args[0];if(monitor){this.initResizeMonitor();}else{YAHOO.util.Event.removeListener(this.resizeMonitor,"resize",this.onDomResize);this.resizeMonitor=null;}}};YAHOO.widget.Module.prototype.toString=function(){return"Module "+this.id;};YAHOO.widget.Overlay=function(el,userConfig){YAHOO.widget.Overlay.superclass.constructor.call(this,el,userConfig);};YAHOO.extend(YAHOO.widget.Overlay,YAHOO.widget.Module);YAHOO.widget.Overlay.IFRAME_SRC="promo/m/irs/blank.gif";YAHOO.widget.Overlay.TOP_LEFT="tl";YAHOO.widget.Overlay.TOP_RIGHT="tr";YAHOO.widget.Overlay.BOTTOM_LEFT="bl";YAHOO.widget.Overlay.BOTTOM_RIGHT="br";YAHOO.widget.Overlay.CSS_OVERLAY="overlay";YAHOO.widget.Overlay.prototype.beforeMoveEvent=null;YAHOO.widget.Overlay.prototype.moveEvent=null;YAHOO.widget.Overlay.prototype.init=function(el,userConfig){YAHOO.widget.Overlay.superclass.init.call(this,el);this.beforeInitEvent.fire(YAHOO.widget.Overlay);YAHOO.util.Dom.addClass(this.element,YAHOO.widget.Overlay.CSS_OVERLAY);if(userConfig){this.cfg.applyConfig(userConfig,true);}
if(this.platform=="mac"&&this.browser=="gecko"){if(!YAHOO.util.Config.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}
this.initEvent.fire(YAHOO.widget.Overlay);};YAHOO.widget.Overlay.prototype.initEvents=function(){YAHOO.widget.Overlay.superclass.initEvents.call(this);this.beforeMoveEvent=new YAHOO.util.CustomEvent("beforeMove",this);this.moveEvent=new YAHOO.util.CustomEvent("move",this);};YAHOO.widget.Overlay.prototype.initDefaultConfig=function(){YAHOO.widget.Overlay.superclass.initDefaultConfig.call(this);this.cfg.addProperty("x",{handler:this.configX,validator:this.cfg.checkNumber,suppressEvent:true,supercedes:["iframe"]});this.cfg.addProperty("y",{handler:this.configY,validator:this.cfg.checkNumber,suppressEvent:true,supercedes:["iframe"]});this.cfg.addProperty("xy",{handler:this.configXY,suppressEvent:true,supercedes:["iframe"]});this.cfg.addProperty("context",{handler:this.configContext,suppressEvent:true,supercedes:["iframe"]});this.cfg.addProperty("fixedcenter",{value:false,handler:this.configFixedCenter,validator:this.cfg.checkBoolean,supercedes:["iframe","visible"]});this.cfg.addProperty("width",{handler:this.configWidth,suppressEvent:true,supercedes:["iframe"]});this.cfg.addProperty("height",{handler:this.configHeight,suppressEvent:true,supercedes:["iframe"]});this.cfg.addProperty("zIndex",{value:null,handler:this.configzIndex});this.cfg.addProperty("constraintoviewport",{value:false,handler:this.configConstrainToViewport,validator:this.cfg.checkBoolean,supercedes:["iframe","x","y","xy"]});this.cfg.addProperty("iframe",{value:(this.browser=="ie"?true:false),handler:this.configIframe,validator:this.cfg.checkBoolean,supercedes:["zIndex"]});};YAHOO.widget.Overlay.prototype.moveTo=function(x,y){this.cfg.setProperty("xy",[x,y]);};YAHOO.widget.Overlay.prototype.hideMacGeckoScrollbars=function(){YAHOO.util.Dom.removeClass(this.element,"show-scrollbars");YAHOO.util.Dom.addClass(this.element,"hide-scrollbars");};YAHOO.widget.Overlay.prototype.showMacGeckoScrollbars=function(){YAHOO.util.Dom.removeClass(this.element,"hide-scrollbars");YAHOO.util.Dom.addClass(this.element,"show-scrollbars");};YAHOO.widget.Overlay.prototype.configVisible=function(type,args,obj){var visible=args[0];var currentVis=YAHOO.util.Dom.getStyle(this.element,"visibility");var effect=this.cfg.getProperty("effect");var effectInstances=[];if(effect){if(effect instanceof Array){for(var i=0;i<effect.length;i++){var eff=effect[i];effectInstances[effectInstances.length]=eff.effect(this,eff.duration);}}else{effectInstances[effectInstances.length]=effect.effect(this,effect.duration);}}
var isMacGecko=(this.platform=="mac"&&this.browser=="gecko");if(visible){if(isMacGecko){this.showMacGeckoScrollbars();}
if(effect){if(visible){if(currentVis!="visible"){this.beforeShowEvent.fire();for(var j=0;j<effectInstances.length;j++){var e=effectInstances[j];if(j===0&&!YAHOO.util.Config.alreadySubscribed(e.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){e.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}
e.animateIn();}}}}else{if(currentVis!="visible"){this.beforeShowEvent.fire();YAHOO.util.Dom.setStyle(this.element,"visibility","visible");this.cfg.refireEvent("iframe");this.showEvent.fire();}}}else{if(isMacGecko){this.hideMacGeckoScrollbars();}
if(effect){if(currentVis=="visible"){this.beforeHideEvent.fire();for(var k=0;k<effectInstances.length;k++){var h=effectInstances[k];if(k===0&&!YAHOO.util.Config.alreadySubscribed(h.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){h.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}
h.animateOut();}}}else{if(currentVis=="visible"){this.beforeHideEvent.fire();YAHOO.util.Dom.setStyle(this.element,"visibility","hidden");this.cfg.refireEvent("iframe");this.hideEvent.fire();}}}};YAHOO.widget.Overlay.prototype.doCenterOnDOMEvent=function(){if(this.cfg.getProperty("visible")){this.center();}};YAHOO.widget.Overlay.prototype.configFixedCenter=function(type,args,obj){var val=args[0];if(val){this.center();if(!YAHOO.util.Config.alreadySubscribed(this.beforeShowEvent,this.center,this)){this.beforeShowEvent.subscribe(this.center,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(YAHOO.widget.Overlay.windowResizeEvent,this.doCenterOnDOMEvent,this)){YAHOO.widget.Overlay.windowResizeEvent.subscribe(this.doCenterOnDOMEvent,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(YAHOO.widget.Overlay.windowScrollEvent,this.doCenterOnDOMEvent,this)){YAHOO.widget.Overlay.windowScrollEvent.subscribe(this.doCenterOnDOMEvent,this,true);}}else{YAHOO.widget.Overlay.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);YAHOO.widget.Overlay.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);}};YAHOO.widget.Overlay.prototype.configHeight=function(type,args,obj){var height=args[0];var el=this.element;YAHOO.util.Dom.setStyle(el,"height",height);this.cfg.refireEvent("iframe");};YAHOO.widget.Overlay.prototype.configWidth=function(type,args,obj){var width=args[0];var el=this.element;YAHOO.util.Dom.setStyle(el,"width",width);this.cfg.refireEvent("iframe");};YAHOO.widget.Overlay.prototype.configzIndex=function(type,args,obj){var zIndex=args[0];var el=this.element;if(!zIndex){zIndex=YAHOO.util.Dom.getStyle(el,"zIndex");if(!zIndex||isNaN(zIndex)){zIndex=0;}}
if(this.iframe){if(zIndex<=0){zIndex=1;}
YAHOO.util.Dom.setStyle(this.iframe,"zIndex",(zIndex-1));}
YAHOO.util.Dom.setStyle(el,"zIndex",zIndex);this.cfg.setProperty("zIndex",zIndex,true);};YAHOO.widget.Overlay.prototype.configXY=function(type,args,obj){var pos=args[0];var x=pos[0];var y=pos[1];this.cfg.setProperty("x",x);this.cfg.setProperty("y",y);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);};YAHOO.widget.Overlay.prototype.configX=function(type,args,obj){var x=args[0];var y=this.cfg.getProperty("y");this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");YAHOO.util.Dom.setX(this.element,x,true);this.cfg.setProperty("xy",[x,y],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);};YAHOO.widget.Overlay.prototype.configY=function(type,args,obj){var x=this.cfg.getProperty("x");var y=args[0];this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");YAHOO.util.Dom.setY(this.element,y,true);this.cfg.setProperty("xy",[x,y],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);};YAHOO.widget.Overlay.prototype.showIframe=function(){if(this.iframe){this.iframe.style.display="block";}}
YAHOO.widget.Overlay.prototype.hideIframe=function(){if(this.iframe){this.iframe.style.display="none";}}
YAHOO.widget.Overlay.prototype.configIframe=function(type,args,obj){var val=args[0];if(val){if(!YAHOO.util.Config.alreadySubscribed(this.showEvent,this.showIframe,this)){this.showEvent.subscribe(this.showIframe,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.hideEvent,this.hideIframe,this)){this.hideEvent.subscribe(this.hideIframe,this,true);}
var x=this.cfg.getProperty("x");var y=this.cfg.getProperty("y");if(!x||!y){this.syncPosition();x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");}
if(!isNaN(x)&&!isNaN(y)){if(!this.iframe){this.iframe=document.createElement("iframe");if(this.isSecure){this.iframe.src=this.imageRoot+YAHOO.widget.Overlay.IFRAME_SRC;}
var parent=this.element.parentNode;if(parent){parent.appendChild(this.iframe);}else{document.body.appendChild(this.iframe);}
YAHOO.util.Dom.setStyle(this.iframe,"position","absolute");YAHOO.util.Dom.setStyle(this.iframe,"border","none");YAHOO.util.Dom.setStyle(this.iframe,"margin","0");YAHOO.util.Dom.setStyle(this.iframe,"padding","0");YAHOO.util.Dom.setStyle(this.iframe,"opacity","0");if(this.cfg.getProperty("visible")){this.showIframe();}else{this.hideIframe();}}
var iframeDisplay=YAHOO.util.Dom.getStyle(this.iframe,"display");if(iframeDisplay=="none"){this.iframe.style.display="block";}
YAHOO.util.Dom.setXY(this.iframe,[x,y]);var width=this.element.clientWidth;var height=this.element.clientHeight;YAHOO.util.Dom.setStyle(this.iframe,"width",(width+2)+"px");YAHOO.util.Dom.setStyle(this.iframe,"height",(height+2)+"px");if(iframeDisplay=="none"){this.iframe.style.display="none";}}}else{if(this.iframe){this.iframe.style.display="none";}
this.showEvent.unsubscribe(this.showIframe,this);this.hideEvent.unsubscribe(this.hideIframe,this);}};YAHOO.widget.Overlay.prototype.configConstrainToViewport=function(type,args,obj){var val=args[0];if(val){if(!YAHOO.util.Config.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}}else{this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}};YAHOO.widget.Overlay.prototype.configContext=function(type,args,obj){var contextArgs=args[0];if(contextArgs){var contextEl=contextArgs[0];var elementMagnetCorner=contextArgs[1];var contextMagnetCorner=contextArgs[2];if(contextEl){if(typeof contextEl=="string"){this.cfg.setProperty("context",[document.getElementById(contextEl),elementMagnetCorner,contextMagnetCorner],true);}
if(elementMagnetCorner&&contextMagnetCorner){this.align(elementMagnetCorner,contextMagnetCorner);}}}};YAHOO.widget.Overlay.prototype.align=function(elementAlign,contextAlign){var contextArgs=this.cfg.getProperty("context");if(contextArgs){var context=contextArgs[0];var element=this.element;var me=this;if(!elementAlign){elementAlign=contextArgs[1];}
if(!contextAlign){contextAlign=contextArgs[2];}
if(element&&context){var elementRegion=YAHOO.util.Dom.getRegion(element);var contextRegion=YAHOO.util.Dom.getRegion(context);var doAlign=function(v,h){switch(elementAlign){case YAHOO.widget.Overlay.TOP_LEFT:me.moveTo(h,v);break;case YAHOO.widget.Overlay.TOP_RIGHT:me.moveTo(h-element.offsetWidth,v);break;case YAHOO.widget.Overlay.BOTTOM_LEFT:me.moveTo(h,v-element.offsetHeight);break;case YAHOO.widget.Overlay.BOTTOM_RIGHT:me.moveTo(h-element.offsetWidth,v-element.offsetHeight);break;}};switch(contextAlign){case YAHOO.widget.Overlay.TOP_LEFT:doAlign(contextRegion.top,contextRegion.left);break;case YAHOO.widget.Overlay.TOP_RIGHT:doAlign(contextRegion.top,contextRegion.right);break;case YAHOO.widget.Overlay.BOTTOM_LEFT:doAlign(contextRegion.bottom,contextRegion.left);break;case YAHOO.widget.Overlay.BOTTOM_RIGHT:doAlign(contextRegion.bottom,contextRegion.right);break;}}}};YAHOO.widget.Overlay.prototype.enforceConstraints=function(type,args,obj){var pos=args[0];var x=pos[0];var y=pos[1];var offsetHeight=this.element.offsetHeight;var offsetWidth=this.element.offsetWidth;var viewPortWidth=YAHOO.util.Dom.getViewportWidth();var viewPortHeight=YAHOO.util.Dom.getViewportHeight();var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;var topConstraint=scrollY+10;var leftConstraint=scrollX+10;var bottomConstraint=scrollY+viewPortHeight-offsetHeight-10;var rightConstraint=scrollX+viewPortWidth-offsetWidth-10;if(x<leftConstraint){x=leftConstraint;}else if(x>rightConstraint){x=rightConstraint;}
if(y<topConstraint){y=topConstraint;}else if(y>bottomConstraint){y=bottomConstraint;}
this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.cfg.setProperty("xy",[x,y],true);};YAHOO.widget.Overlay.prototype.center=function(){var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;var viewPortWidth=YAHOO.util.Dom.getClientWidth();var viewPortHeight=YAHOO.util.Dom.getClientHeight();var elementWidth=this.element.offsetWidth;var elementHeight=this.element.offsetHeight;var x=(viewPortWidth/2)-(elementWidth/2)+scrollX;var y=(viewPortHeight/2)-(elementHeight/2)+scrollY;this.element.style.left=parseInt(x,10)+"px";this.element.style.top=parseInt(y,10)+"px";this.syncPosition();this.cfg.refireEvent("iframe");};YAHOO.widget.Overlay.prototype.syncPosition=function(){var pos=YAHOO.util.Dom.getXY(this.element);this.cfg.setProperty("x",pos[0],true);this.cfg.setProperty("y",pos[1],true);this.cfg.setProperty("xy",pos,true);};YAHOO.widget.Overlay.prototype.onDomResize=function(e,obj){YAHOO.widget.Overlay.superclass.onDomResize.call(this,e,obj);this.cfg.refireEvent("iframe");};YAHOO.widget.Overlay.prototype.destroy=function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}
this.iframe=null;YAHOO.widget.Overlay.superclass.destroy.call(this);};YAHOO.widget.Overlay.prototype.toString=function(){return"Overlay "+this.id;};YAHOO.widget.Overlay.windowScrollEvent=new YAHOO.util.CustomEvent("windowScroll");YAHOO.widget.Overlay.windowResizeEvent=new YAHOO.util.CustomEvent("windowResize");YAHOO.widget.Overlay.windowScrollHandler=function(e){YAHOO.widget.Overlay.windowScrollEvent.fire();};YAHOO.widget.Overlay.windowResizeHandler=function(e){YAHOO.widget.Overlay.windowResizeEvent.fire();};YAHOO.widget.Overlay._initialized=null;if(YAHOO.widget.Overlay._initialized===null){YAHOO.util.Event.addListener(window,"scroll",YAHOO.widget.Overlay.windowScrollHandler);YAHOO.util.Event.addListener(window,"resize",YAHOO.widget.Overlay.windowResizeHandler);YAHOO.widget.Overlay._initialized=true;}
YAHOO.widget.OverlayManager=function(userConfig){this.init(userConfig);};YAHOO.widget.OverlayManager.CSS_FOCUSED="focused";YAHOO.widget.OverlayManager.prototype={constructor:YAHOO.widget.OverlayManager,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},getActive:function(){},focus:function(overlay){},remove:function(overlay){},blurAll:function(){},init:function(userConfig){this.cfg=new YAHOO.util.Config(this);this.initDefaultConfig();if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.cfg.fireQueue();var activeOverlay=null;this.getActive=function(){return activeOverlay;};this.focus=function(overlay){var o=this.find(overlay);if(o){this.blurAll();activeOverlay=o;YAHOO.util.Dom.addClass(activeOverlay.element,YAHOO.widget.OverlayManager.CSS_FOCUSED);this.overlays.sort(this.compareZIndexDesc);var topZIndex=YAHOO.util.Dom.getStyle(this.overlays[0].element,"zIndex");if(!isNaN(topZIndex)&&this.overlays[0]!=overlay){activeOverlay.cfg.setProperty("zIndex",(parseInt(topZIndex,10)+2));}
this.overlays.sort(this.compareZIndexDesc);}};this.remove=function(overlay){var o=this.find(overlay);if(o){var originalZ=YAHOO.util.Dom.getStyle(o.element,"zIndex");o.cfg.setProperty("zIndex",-1000,true);this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,this.overlays.length-1);o.cfg.setProperty("zIndex",originalZ,true);o.cfg.setProperty("manager",null);o.focusEvent=null;o.blurEvent=null;o.focus=null;o.blur=null;}};this.blurAll=function(){activeOverlay=null;for(var o=0;o<this.overlays.length;o++){YAHOO.util.Dom.removeClass(this.overlays[o].element,YAHOO.widget.OverlayManager.CSS_FOCUSED);}};var overlays=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}
if(overlays){this.register(overlays);this.overlays.sort(this.compareZIndexDesc);}},register:function(overlay){if(overlay instanceof YAHOO.widget.Overlay){overlay.cfg.addProperty("manager",{value:this});overlay.focusEvent=new YAHOO.util.CustomEvent("focus");overlay.blurEvent=new YAHOO.util.CustomEvent("blur");var mgr=this;overlay.focus=function(){mgr.focus(this);this.focusEvent.fire();};overlay.blur=function(){mgr.blurAll();this.blurEvent.fire();};var focusOnDomEvent=function(e,obj){overlay.focus();};var focusevent=this.cfg.getProperty("focusevent");YAHOO.util.Event.addListener(overlay.element,focusevent,focusOnDomEvent,this,true);var zIndex=YAHOO.util.Dom.getStyle(overlay.element,"zIndex");if(!isNaN(zIndex)){overlay.cfg.setProperty("zIndex",parseInt(zIndex,10));}else{overlay.cfg.setProperty("zIndex",0);}
this.overlays.push(overlay);return true;}else if(overlay instanceof Array){var regcount=0;for(var i=0;i<overlay.length;i++){if(this.register(overlay[i])){regcount++;}}
if(regcount>0){return true;}}else{return false;}},find:function(overlay){if(overlay instanceof YAHOO.widget.Overlay){for(var o=0;o<this.overlays.length;o++){if(this.overlays[o]==overlay){return this.overlays[o];}}}else if(typeof overlay=="string"){for(var p=0;p<this.overlays.length;p++){if(this.overlays[p].id==overlay){return this.overlays[p];}}}
return null;},compareZIndexDesc:function(o1,o2){var zIndex1=o1.cfg.getProperty("zIndex");var zIndex2=o2.cfg.getProperty("zIndex");if(zIndex1>zIndex2){return-1;}else if(zIndex1<zIndex2){return 1;}else{return 0;}},showAll:function(){for(var o=0;o<this.overlays.length;o++){this.overlays[o].show();}},hideAll:function(){for(var o=0;o<this.overlays.length;o++){this.overlays[o].hide();}},toString:function(){return"OverlayManager";}};YAHOO.util.KeyListener=function(attachTo,keyData,handler,event){if(!event){event=YAHOO.util.KeyListener.KEYDOWN;}
var keyEvent=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof attachTo=='string'){attachTo=document.getElementById(attachTo);}
if(typeof handler=='function'){keyEvent.subscribe(handler);}else{keyEvent.subscribe(handler.fn,handler.scope,handler.correctScope);}
function handleKeyPress(e,obj){var keyPressed=e.charCode||e.keyCode;if(!keyData.shift){keyData.shift=false;}
if(!keyData.alt){keyData.alt=false;}
if(!keyData.ctrl){keyData.ctrl=false;}
if(e.shiftKey==keyData.shift&&e.altKey==keyData.alt&&e.ctrlKey==keyData.ctrl){if(keyData.keys instanceof Array){for(var i=0;i<keyData.keys.length;i++){if(keyPressed==keyData.keys[i]){keyEvent.fire(keyPressed,e);break;}}}else{if(keyPressed==keyData.keys){keyEvent.fire(keyPressed,e);}}}}
this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(attachTo,event,handleKeyPress);this.enabledEvent.fire(keyData);}
this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(attachTo,event,handleKeyPress);this.disabledEvent.fire(keyData);}
this.enabled=false;};this.toString=function(){return"KeyListener ["+keyData.keys+"] "+attachTo.tagName+(attachTo.id?"["+attachTo.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.util.KeyListener.prototype.enabled=null;YAHOO.util.KeyListener.prototype.enable=function(){};YAHOO.util.KeyListener.prototype.disable=function(){};YAHOO.util.KeyListener.prototype.enabledEvent=null;YAHOO.util.KeyListener.prototype.disabledEvent=null;