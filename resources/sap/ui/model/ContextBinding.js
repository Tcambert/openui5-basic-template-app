/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Binding"],function(t){"use strict";var e=t.extend("sap.ui.model.ContextBinding",{constructor:function(e,a,i,n,s){t.call(this,e,a,i,n,s);this.oElementContext=null;this.bInitial=true},metadata:{publicMethods:["getElementContext"]}});e.prototype.checkUpdate=function(t){};e.prototype.getBoundContext=function(){return this.oElementContext};e.prototype.checkDataState=function(t){var e=this.getDataState(),a=this.oModel?this.oModel.resolve(this.sPath,this.oContext):null,i=this;function n(){i.fireEvent("AggregatedDataStateChange",{dataState:e});e.changed(false);i._sDataStateTimout=null}if(!t||a&&a in t){if(a){e.setModelMessages(this.oModel.getMessagesByPath(a))}if(e&&e.changed()){if(this.mEventRegistry["DataStateChange"]){this.fireEvent("DataStateChange",{dataState:e})}if(this.bIsBeingDestroyed){n()}else if(this.mEventRegistry["AggregatedDataStateChange"]){if(!this._sDataStateTimout){this._sDataStateTimout=setTimeout(n,0)}}}}};return e});