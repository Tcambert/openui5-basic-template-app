/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/Device","sap/ui/core/ResizeHandler","sap/ui/core/library","./CarouselRenderer","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/events/F6Navigation","sap/ui/thirdparty/jquery","sap/ui/thirdparty/mobify-carousel","sap/ui/core/IconPool"],function(e,t,i,o,s,r,a,n,p,u){"use strict";var h=s.BusyIndicatorSize;var l=e.ImageHelper;var f=e.CarouselArrowsPlacement;var g=e.PlacementType;var c=t.extend("sap.m.Carousel",{metadata:{library:"sap.m",designtime:"sap/m/designtime/Carousel.designtime",properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},loop:{type:"boolean",group:"Misc",defaultValue:false},showPageIndicator:{type:"boolean",group:"Appearance",defaultValue:true},pageIndicatorPlacement:{type:"sap.m.PlacementType",group:"Appearance",defaultValue:g.Bottom},showBusyIndicator:{type:"boolean",group:"Appearance",defaultValue:true,deprecated:true},arrowsPlacement:{type:"sap.m.CarouselArrowsPlacement",group:"Appearance",defaultValue:f.Content}},defaultAggregation:"pages",aggregations:{pages:{type:"sap.ui.core.Control",multiple:true,singularName:"page"}},associations:{activePage:{type:"sap.ui.core.Control",multiple:false}},events:{loadPage:{deprecated:true,parameters:{pageId:{type:"string"}}},unloadPage:{deprecated:true,parameters:{pageId:{type:"string"}}},pageChanged:{parameters:{oldActivePageId:{type:"string"},newActivePageId:{type:"string"}}}}}});c._INNER_SELECTOR=".sapMCrslInner";c._PAGE_INDICATOR_SELECTOR=".sapMCrslBulleted";c._PAGE_INDICATOR_ARROWS_SELECTOR=".sapMCrslIndicatorArrow";c._CONTROLS=".sapMCrslControls";c._ITEM_SELECTOR=".sapMCrslItem";c._LEFTMOST_CLASS="sapMCrslLeftmost";c._RIGHTMOST_CLASS="sapMCrslRightmost";c._LATERAL_CLASSES="sapMCrslLeftmost sapMCrslRightmost";c._MODIFIERNUMBERFORKEYBOARDHANDLING=10;c._BULLETS_TO_NUMBERS_THRESHOLD=9;c._PREVIOUS_CLASS_ARROW="sapMCrslPrev";c._NEXT_CLASS_ARROW="sapMCrslNext";c.prototype.init=function(){this._aScrollContainers=[];this._fnAdjustAfterResize=u.proxy(function(){var e=this.$().find(c._INNER_SELECTOR);this._oMobifyCarousel.resize(e)},this);this.data("sap-ui-fastnavgroup","true",true)};c.prototype.exit=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.destroy();delete this._oMobifyCarousel}if(this._oArrowLeft){this._oArrowLeft.destroy();delete this._oArrowLeft}if(this._oArrowRight){this._oArrowRight.destroy();delete this._oArrowRight}if(this._sResizeListenerId){o.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this.$().off("afterSlide");this._cleanUpScrollContainer();this._fnAdjustAfterResize=null;this._aScrollContainers=null;this._$InnerDiv=null};c.prototype._cleanUpScrollContainer=function(){var e;while(this._aScrollContainers&&this._aScrollContainers.length>0){e=this._aScrollContainers.pop();e.destroyContent();if(e&&typeof e.destroy==="function"){e.destroy()}}};c.prototype.ontouchstart=function(e){if(this._oMobifyCarousel){this._oMobifyCarousel.touchstart(e)}};c.prototype.ontouchmove=function(e){if(this._oMobifyCarousel){this._oMobifyCarousel.touchmove(e)}};c.prototype.ontouchend=function(e){if(this._oMobifyCarousel){this._oMobifyCarousel.touchend(e)}};c.prototype.onBeforeRendering=function(){var e=this.getActivePage();if(!e&&this.getPages().length>0){this.setAssociation("activePage",this.getPages()[0].getId(),true)}if(this._sResizeListenerId){o.deregister(this._sResizeListenerId);this._sResizeListenerId=null}return this};c.prototype.onAfterRendering=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.unbind()}this.$().carousel();this._oMobifyCarousel=this.getDomRef()._carousel;this._oMobifyCarousel.setLoop(this.getLoop());this._oMobifyCarousel.setRTL(sap.ui.getCore().getConfiguration().getRTL());var e=this.getActivePage();if(e){var t=this._getPageNumber(e);if(isNaN(t)||t==0){if(this.getPages().length>0){this.setAssociation("activePage",this.getPages()[0].getId(),true);this._adjustHUDVisibility(1)}}else{var i=sap.ui.getCore();if(i.isThemeApplied()){this._moveToPage(t+1)}else{i.attachThemeChanged(this._handleThemeLoad,this)}if(sap.zen&&sap.zen.commons&&this.getParent()instanceof sap.zen.commons.layout.PositionContainer){if(this._isCarouselUsedWithCommonsLayout===undefined){setTimeout(this["invalidate"].bind(this),0);this._isCarouselUsedWithCommonsLayout=true}}}}this.$().on("afterSlide",u.proxy(function(e,t,i){if(e.target!==this.getDomRef()){return}if(i>0){this._changePage(i)}},this));this._$InnerDiv=this.$().find(c._INNER_SELECTOR)[0];this._sResizeListenerId=o.register(this._$InnerDiv,this._fnAdjustAfterResize);this.$().find(".sapMCrslItemTableCell").focus(function(e){e.preventDefault();u(e.target).parents(".sapMCrsl").focus();return false});var s="sap.m.IconTabBar";var r=this.getParent();while(r){if(r.getMetadata().getName()==s){var a=this;r.attachExpand(function(e){var i=e.getParameter("expand");if(i&&t>0){a._moveToPage(t+1)}});break}r=r.getParent()}};c.prototype._handleThemeLoad=function(){var e,t=this.getActivePage();if(t){var i=this._getPageNumber(t);if(i>0){this._moveToPage(i+1)}}e=sap.ui.getCore();e.detachThemeChanged(this._handleThemeLoad,this)};c.prototype._moveToPage=function(e){this._oMobifyCarousel.changeAnimation("sapMCrslNoTransition");this._oMobifyCarousel.move(e);this._changePage(e)};c.prototype._changePage=function(e){this._adjustHUDVisibility(e);var t=this.getActivePage();var o=this.getPages()[e-1].getId();this.setAssociation("activePage",o,true);var s=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("CAROUSEL_PAGE_INDICATOR_TEXT",[e,this.getPages().length]);n.debug("sap.m.Carousel: firing pageChanged event: old page: "+t+", new page: "+o);if(!i.system.desktop){u(document.activeElement).blur()}this.firePageChanged({oldActivePageId:t,newActivePageId:o});this.$("slide-number").text(s)};c.prototype._adjustHUDVisibility=function(e){if(i.system.desktop&&!this.getLoop()&&this.getPages().length>1){var t=this.$("hud");t.removeClass(c._LATERAL_CLASSES);if(e===1){t.addClass(c._LEFTMOST_CLASS);this._focusCarouselContainer(t,c._PREVIOUS_CLASS_ARROW)}else if(e===this.getPages().length){t.addClass(c._RIGHTMOST_CLASS);this._focusCarouselContainer(t,c._NEXT_CLASS_ARROW)}}};c.prototype._focusCarouselContainer=function(e,t){if(e.find("."+t)[0]===document.activeElement){this.focus()}};c.prototype.setActivePage=function(e){var i=null;if(typeof e=="string"){i=e}else if(e instanceof t){i=e.getId()}if(i){if(i===this.getActivePage()){return this}var o=this._getPageNumber(i);if(!isNaN(o)){if(this._oMobifyCarousel){this._oMobifyCarousel.move(o+1)}}}this.setAssociation("activePage",i,true);return this};c.prototype.setHeight=function(e){this.setProperty("height",e,true);this.$().css("height",e);return this};c.prototype.setWidth=function(e){this.setProperty("width",e,true);this.$().css("width",e);return this};c.prototype.setLoop=function(e){this.setProperty("loop",e,true);if(this._oMobifyCarousel){this._oMobifyCarousel.setLoop(e)}return this};c.prototype._getNavigationArrow=function(e){var t={src:"sap-icon://slim-arrow-"+e,useIconTooltip:false};if(e==="left"){if(!this._oArrowLeft){this._oArrowLeft=l.getImageControl(this.getId()+"-arrowScrollLeft",this._oArrowLeft,this,t)}return this._oArrowLeft}else if(e==="right"){if(!this._oArrowRight){this._oArrowRight=l.getImageControl(this.getId()+"-arrowScrollRight",this._oArrowRight,this,t)}return this._oArrowRight}};c.prototype._createScrollContainer=function(e){var t;var o=i.system.desktop&&this.getArrowsPlacement()===f.PageIndicator;if(o){t="sapMCrslImg"}else{t="sapMCrslImgNoArrows"}var s=e instanceof sap.m.Image?"sapMCrslItemTableCell "+t:"sapMCrslItemTableCell",r=new sap.ui.core.HTML({content:"<div class='sapMCrslItemTable'>"+"<div class='"+s+"'></div>"+"</div>",afterRendering:function(t){var i=sap.ui.getCore().createRenderManager();i.render(e,this.getDomRef().firstChild);i.destroy();e=null}});var a=new sap.m.ScrollContainer({horizontal:false,vertical:false,content:[r],width:"100%",height:"100%"});a.setParent(this,null,true);this._aScrollContainers.push(a);return a};c.prototype.previous=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.prev()}else{n.warning("Unable to execute sap.m.Carousel.previous: carousel must be rendered first.")}return this};c.prototype.next=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.next()}else{n.warning("Unable to execute sap.m.Carousel.next: carousel must be rendered first.")}return this};c.prototype._getPageNumber=function(e){var t,i;for(t=0;t<this.getPages().length;t++){if(this.getPages()[t].getId()==e){i=t;break}}return i};c.prototype.onsaptabprevious=function(e){this._bDirection=false;this._fnOnTabPress(e)};c.prototype.onsaptabnext=function(e){this._bDirection=true;this._fnOnTabPress(e)};c.prototype.onfocusin=function(e){this.saveLastFocusReference(e);this._bDirection=undefined};c.prototype.onsapskipforward=function(e){e.preventDefault();this._handleGroupNavigation(e,false)};c.prototype.onsapskipback=function(e){e.preventDefault();this._handleGroupNavigation(e,true)};c.prototype.onkeydown=function(e){if(e.keyCode==a.F7){this._handleF7Key(e);return}if(e.target!=this.getDomRef()){return}switch(e.keyCode){case 189:case a.NUMPAD_MINUS:this._fnSkipToIndex(e,-1);break;case a.PLUS:case a.NUMPAD_PLUS:this._fnSkipToIndex(e,1);break}};c.prototype.onsapescape=function(e){var t;if(e.target===this.$()[0]&&this._lastActivePageNumber){t=this._lastActivePageNumber+1;this._oMobifyCarousel.move(t);this._changePage(t)}};c.prototype.onsapright=function(e){this._fnSkipToIndex(e,1)};c.prototype.onsapup=function(e){this._fnSkipToIndex(e,-1)};c.prototype.onsapleft=function(e){this._fnSkipToIndex(e,-1)};c.prototype.onsapdown=function(e){this._fnSkipToIndex(e,1)};c.prototype.onsaphome=function(e){this._fnSkipToIndex(e,0)};c.prototype.onsapend=function(e){this._fnSkipToIndex(e,this.getPages().length)};c.prototype.onsaprightmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,c._MODIFIERNUMBERFORKEYBOARDHANDLING)}};c.prototype.onsapupmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,c._MODIFIERNUMBERFORKEYBOARDHANDLING)}};c.prototype.onsappageup=function(e){this._fnSkipToIndex(e,c._MODIFIERNUMBERFORKEYBOARDHANDLING)};c.prototype.onsapleftmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,-c._MODIFIERNUMBERFORKEYBOARDHANDLING)}};c.prototype.onsapdownmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,-c._MODIFIERNUMBERFORKEYBOARDHANDLING)}};c.prototype.onsappagedown=function(e){this._fnSkipToIndex(e,-c._MODIFIERNUMBERFORKEYBOARDHANDLING)};c.prototype._fnOnTabPress=function(e){if(e.target===this.$()[0]){this._lastActivePageNumber=this._getPageNumber(this.getActivePage())}};c.prototype._handleGroupNavigation=function(e,t){var i=u.Event("keydown");e.preventDefault();this.$().focus();i.target=e.target;i.keyCode=a.F6;i.shiftKey=t;p.handleF6GroupNavigation(i)};c.prototype.saveLastFocusReference=function(e){if(this._bDirection===undefined){return}if(this._lastFocusablePageElement===undefined){this._lastFocusablePageElement={}}this._lastFocusablePageElement[this.getActivePage()]=e.target};c.prototype._getActivePageLastFocusedElement=function(){if(this._lastFocusablePageElement){return this._lastFocusablePageElement[this.getActivePage()]}};c.prototype._fnSkipToIndex=function(e,t){var i=t;if(e.target!==this.getDomRef()){return}e.preventDefault();if(t!==0){i=this._getPageNumber(this.getActivePage())+1+t}this._oMobifyCarousel.move(i)};c.prototype._handleF7Key=function(e){var t;e.preventDefault();t=this._getActivePageLastFocusedElement();if(e.target===this.$()[0]&&t){t.focus()}else{this.$().focus()}};c.prototype.setShowBusyIndicator=function(){n.warning("sap.m.Carousel: Deprecated function 'setShowBusyIndicator' called. Does nothing.");return this};c.prototype.getShowBusyIndicator=function(){n.warning("sap.m.Carousel: Deprecated function 'getShowBusyIndicator' called. Does nothing.");return false};c.prototype.setBusyIndicatorSize=function(e){if(!(e in h)){e=h.Medium}return t.prototype.setBusyIndicatorSize.call(this,e)};return c});