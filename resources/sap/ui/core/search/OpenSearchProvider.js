/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","./SearchProvider","sap/base/Log","sap/base/security/encodeURL","sap/ui/thirdparty/jquery"],function(e,r,s,t,a){"use strict";var u=r.extend("sap.ui.core.search.OpenSearchProvider",{metadata:{library:"sap.ui.core",properties:{suggestUrl:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},suggestType:{type:"string",group:"Misc",defaultValue:"json"}}}});u.prototype.suggest=function(e,r){var u=this.getSuggestUrl();if(!u){return}u=u.replace("{searchTerms}",t(e));var i=this.getSuggestType();var o;if(i&&i.toLowerCase()==="xml"){i="xml";o=function(s){var t=a(s);var u=t.find("Text");var i=[];u.each(function(){i.push(a(this).text())});r(e,i)}}else{i="json";o=function(s){r(e,s[1])}}a.ajax({url:u,dataType:i,success:o,error:function(e,r,t){s.fatal("The following problem occurred: "+r,e.responseText+","+e.status)}})};return u});