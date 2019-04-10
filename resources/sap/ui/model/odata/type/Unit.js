/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/format/NumberFormat","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/type/Unit"],function(t,e,i,n){"use strict";var s=new Map,o=/\.(\d+)$/;function r(t,e){return sap.ui.getCore().getLibraryResourceBundle().getText(t,e)}var u=n.extend("sap.ui.model.odata.type.Unit",{constructor:function(t,e,i){if(t&&t["customUnits"]){throw new Error("Format option customUnits is not supported")}if(e){throw new Error("Constraints not supported")}if(arguments.length>2){throw new Error("Only the parameter oFormatOptions is supported")}this.bParseAsString=!t||!("parseAsString"in t)||t.parseAsString;t=Object.assign({unitOptional:true},t,{parseAsString:true});n.call(this,t,e);this.bParseWithValues=true;this.setConstraints=function(){throw new Error("Constraints not supported")};this.setFormatOptions=function(){throw new Error("Format options are immutable")};this.mCustomUnits=undefined}});u.prototype.formatValue=function(e,i){var o=this;if(this.mCustomUnits===undefined&&e&&e[2]!==undefined){if(e[2]===null){this.mCustomUnits=null}else{this.mCustomUnits=s.get(e[2]);if(!this.mCustomUnits){this.mCustomUnits={};Object.keys(e[2]).forEach(function(i){o.mCustomUnits[i]={decimals:e[2][i].UnitSpecificScale,displayName:e[2][i].Text,"unitPattern-count-other":t.getDefaultUnitPattern(i)}});s.set(e[2],this.mCustomUnits)}n.prototype.setFormatOptions.call(this,Object.assign({customUnits:this.mCustomUnits},this.oFormatOptions))}}if(!e||e[0]===undefined||e[1]===undefined||this.mCustomUnits===undefined&&e[2]===undefined){return null}return n.prototype.formatValue.call(this,e.slice(0,2),i)};u.prototype.getInterface=function(){return this};u.prototype.getName=function(){return"sap.ui.model.odata.type.Unit"};u.prototype.parseValue=function(t,i,s){var u,a,m,p,l;if(this.mCustomUnits===undefined){throw new e("Cannot parse value without unit customizing")}l=n.prototype.parseValue.apply(this,arguments);p=l[1]||s[1];if(l[0].includes(".")){l[0]=l[0].replace(/0+$/,"").replace(/\.$/,"")}if(p&&this.mCustomUnits){m=o.exec(l[0]);a=m?m[1].length:0;u=this.mCustomUnits[p].decimals;if(a>u){throw new e(u?r("EnterNumberFraction",[u]):r("EnterInt"))}}if(!this.bParseAsString){l[0]=Number(l[0])}return l};u.prototype.validateValue=function(t){if(this.mCustomUnits===undefined){throw new i("Cannot validate value without unit customizing")}};return u});