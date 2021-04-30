/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/ValueStateSupport","sap/ui/core/library","sap/ui/Device"],function(e,t,a,r){"use strict";var i=a.ValueState;var n={apiVersion:2};n.render=function(e,t){this.addWOuterDivStyles(e,t);this.addInnerDivStyles(e,t);this.renderSvg(e,t);this.renderInput(e,t);this.closeDiv(e);e.renderControl(t._oLabel);this.renderTooltip(e,t);this.closeDiv(e)};n.addWOuterDivStyles=function(e,t){var a=t.getId(),r=t.getEnabled(),n=!t.getProperty("editableParent"),s=!t.getEditable()||n,l=t.getValueState();e.openStart("div",t).class("sapMRb");if(t.getUseEntireWidth()){e.style("width",t.getWidth())}var o=this.getTooltipText(t);if(o){e.attr("title",o)}e.accessibilityState(t,{role:"radio",readonly:null,selected:null,checked:t.getSelected(),disabled:s?true:undefined,invalid:l===i.Error?true:null,labelledby:{value:a+"-label",append:true},describedby:{value:o?a+"-Descr":undefined,append:true}});if(t.getSelected()){e.class("sapMRbSel")}if(!r){e.class("sapMRbDis")}if(s){e.class("sapMRbRo")}if(l===i.Error){e.class("sapMRbErr")}if(l===i.Warning){e.class("sapMRbWarn")}if(l===i.Success){e.class("sapMRbSucc")}if(l===i.Information){e.class("sapMRbInfo")}if(r){e.attr("tabindex",t.hasOwnProperty("_iTabIndex")?t._iTabIndex:0)}e.openEnd()};n.addInnerDivStyles=function(e,t){e.openStart("div").class("sapMRbB");if(!this.isButtonReadOnly(t)&&r.system.desktop){e.class("sapMRbHoverable")}e.openEnd()};n.renderSvg=function(e,t){e.openStart("svg").attr("xmlns","http://www.w3.org/2000/svg").attr("version","1.0").accessibilityState({role:"presentation"}).class("sapMRbSvg").openEnd();e.openStart("circle",t.getId()+"-Button").attr("stroke","black").attr("r","50%").attr("stroke-width","2").attr("fill","none").class("sapMRbBOut").openEnd().close("circle");e.openStart("circle").attr("r","22%").attr("stroke-width","10").class("sapMRbBInn").openEnd().close("circle");e.close("svg")};n.renderInput=function(e,t){e.voidStart("input",t.getId()+"-RB").attr("type","radio").attr("tabindex","-1").attr("name",t.getGroupName());if(t.getSelected()){e.attr("checked","checked")}if(this.isButtonReadOnly(t)){e.attr("readonly","readonly");e.attr("disabled","disabled")}e.voidEnd()};n.renderTooltip=function(t,a){var r=this.getTooltipText(a);if(r&&e.getConfiguration().getAccessibility()){t.openStart("span",a.getId()+"-Descr").style("display","none").openEnd().text(r).close("span")}};n.isButtonReadOnly=function(e){var t=e.getEnabled(),a=!e.getProperty("editableParent"),r=!e.getEditable()||a;return!t||r};n.closeDiv=function(e){e.close("div")};n.getTooltipText=function(e){var a=e.getProperty("valueStateText"),r=e.getTooltip_AsString();if(a){return(r?r+" - ":"")+a}else{return t.enrichTooltip(e,r)}};return n},true);