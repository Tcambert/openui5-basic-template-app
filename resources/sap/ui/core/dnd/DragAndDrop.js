/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","../UIArea","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(t,e,r){"use strict";var n={},i=null,o=null,a=null,f=[],g=[],u=null,s,l,d,c;function p(t,e){if(!t){return}if(t.addStyleClass){t.addStyleClass(e)}else{t.$().addClass(e)}}function D(t,e){if(!t){return}if(t.removeStyleClass){t.removeStyleClass(e)}else{t.$().removeClass(e)}}function h(t,e){var n=r(t.target).control(0,true);if(!n){return}var i=r.Event(null,t);i.type=e;n.getUIArea()._handleEvent(i)}function v(e,n){if(t.browser.msie||!e||!e.getDragGhost){return}var i=e.getDragGhost();if(!i){return}if(!l){l=r('<div class="sapUiDnDGhostContainer"></div>');r(document.body).append(l)}l.append(i);window.setTimeout(function(){l.empty()},0);var o=n.originalEvent;o.dataTransfer.setDragImage(i,o.offsetX,o.offsetY)}function m(e){var r={},n,o=e.originalEvent.dataTransfer,f=function(e,r){if(o&&e=="text"||t.browser!="msie"&&t.browser!="edge"){o.setData(e,r)}};return{setData:function(t,e){e=""+e;r[t]=e;f(t,e)},getData:function(t){return r[t]},setTextData:function(t){t=""+t;r["text/plain"]=t;r["text"]=t;f("text/plain",t);f("text",t)},getTextData:function(){return r["text/plain"]},setComplexData:function(t,e){r[t]=e},getComplexData:function(t){return r[t]},getIndicator:function(){return s&&s[0]},setIndicatorConfig:function(t){n=t},getIndicatorConfig:function(t){return n},getDragControl:function(){return i},getDropControl:function(){return a},setDropControl:function(t){a=t},getDropInfo:function(){return g[0]||null},getDropPosition:function(){return d}}}function w(t){E();D(i,"sapUiDnDDragging");i=o=a=u=null;d="";f=[];g=[]}function C(){if(s){return s}s=r("<div class='sapUiDnDIndicator'></div>");r(sap.ui.getCore().getStaticAreaRef()).append(s);return s}function E(){if(s){s.removeAttr("style").hide()}}function b(t,e,n,i){if(!e){return}var o=t.dragSession&&t.dragSession.getIndicatorConfig(),a=e.getBoundingClientRect(),f=window.pageYOffset,g=window.pageXOffset,u=C(),s,l={},d={top:a.top+f,bottom:a.bottom+f,left:a.left+g,right:a.right+g,width:a.width,height:a.height};if(!n||n=="On"){s="On";i=""}else if(i=="Horizontal"){var c=t.pageX-d.left;l.height=d.height;l.top=d.top;if(n=="Between"){l.width="";if(c<d.width*.5){s="Before";l.left=d.left}else{s="After";l.left=d.right}}else if(n=="OnOrBetween"){if(c<d.width*.25){s="Before";l.left=d.left;l.width=""}else if(c>d.width*.75){s="After";l.left=d.right;l.width=""}else{s="On"}}}else{var p=t.pageY-d.top;l.width=d.width;l.left=d.left;if(n=="Between"){l.height="";if(p<d.height*.5){s="Before";l.top=d.top}else{s="After";l.top=d.bottom}}else if(n=="OnOrBetween"){if(p<d.height*.25){s="Before";l.top=d.top;l.height=""}else if(p>d.height*.75){s="After";l.top=d.bottom;l.height=""}else{s="On"}}}if(o&&o.display=="none"){return s}if(s=="On"){l.top=d.top;l.left=d.left;l.width=d.width;l.height=d.height;n=s}else{n="Between"}u.attr("data-drop-layout",i);u.attr("data-drop-position",n);u.css(r.extend(l,o)).show();return s}function y(t){var e=t.getParent(),r=t.getDragDropConfig?t.getDragDropConfig():[],n=e&&e.getDragDropConfig?e.getDragDropConfig():[];return r.concat(n)}function x(t){var e=y(t);return e.filter(function(e){return e.isDraggable(t)})}function S(t,e,r){var n=y(t);e=e||[];return n.filter(function(t){return!t.isA("sap.ui.core.dnd.IDragInfo")}).concat(e).filter(function(n){if(!n.isDroppable(t,r)){return false}var i=n.getGroupName();if(!i){return true}return e.some(function(t){return t.getGroupName()==i})})}function O(t,e){t.preventDefault();var r=e.getDropEffect().toLowerCase();t.originalEvent.dataTransfer.dropEffect=r}function A(t,e,r){var n=e.getTargetAggregation();if(!n){return b(t,r.getDomRef())}var i;if(t.getMark("DragWithin")==n){i=r.getDomRefForSetting(n)}i=i||r.getDomRef();return b(t,i,e.getDropPosition(true),e.getDropLayout(true))}n.preprocessEvent=function(t){if(u&&t.type.indexOf("dr")==0){t.dragSession=u}var e="onbefore"+t.type;if(n[e]){n[e](t)}};n.postprocessEvent=function(t){var e="onafter"+t.type;if(n[e]){n[e](t)}};n.onbeforedragstart=function(e){if(!e.target.draggable){return}if(/^(input|textarea)$/i.test(document.activeElement.tagName)){return}i=r(e.target).control(0,true);if(!i){return}f=x(i);if(!f.length){return}if(t.browser.firefox&&e.originalEvent.dataTransfer.types.length===0){e.originalEvent.dataTransfer.setData("ui5/dummyDataForFirefox","data")}e.dragSession=u=m(e)};n.onafterdragstart=function(t){if(!f.length||t.isDefaultPrevented()){w();return}f=t.isMarked("NonDraggable")?[]:f.filter(function(e){return e.fireDragStart(t)});if(!f.length){t.preventDefault();w();return}v(i,t);p(i,"sapUiDnDDragging")};n.onbeforedragenter=function(t){var e=r(t.target).control(0,true);if(e&&o===e){t.setMark("DragWithin","SameControl")}else{c=Date.now();o=e}var n=[];a=e;for(var i=0;i<20&&a;i++,a=a.getParent()){n=S(a,f,t);if(n.length){break}}if(t.getMark("DragWithin")!="SameControl"){g=n;if(u){u.setIndicatorConfig(null)}}if(!g.length){a=null}else if(!u){t.dragSession=u=m(t)}};n.onafterdragenter=function(t){if(!a||t.isMarked("NonDroppable")){g=[]}else if(t.getMark("DragWithin")!="SameControl"){g=g.filter(function(e){return e.fireDragEnter(t)})}var e=g[0];if(!e||e.getDropEffect()=="None"){E();d=""}else{O(t,e);d=A(t,e,a)}};n.onbeforedragover=function(t){var e=Date.now();if(e-c>=1e3){h(t,"longdragover");c=e}};n.onafterdragover=function(t){var e=g[0];if(!e||e.getDropEffect()=="None"){return}g.forEach(function(e){e.fireDragOver(t)});O(t,e);if(e&&e.getDropPosition(true)=="On"){return}d=A(t,e,a)};n.onbeforedrop=function(t){if(g.length){t.preventDefault()}};n.onafterdrop=function(t){g.forEach(function(e){e.fireDrop(t)});this.iDragEndTimer=window.requestAnimationFrame(this.onafterdragend.bind(this,t))};n.onafterdragend=function(t){this.iDragEndTimer=window.cancelAnimationFrame(this.iDragEndTimer);f.forEach(function(e){e.fireDragEnd(t)});w()};e.addEventPreprocessor(n.preprocessEvent);e.addEventPostprocessor(n.postprocessEvent);return n},true);