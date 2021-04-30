/*
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/MockServer","sap/ui/thirdparty/jquery","sap/base/util/isEmptyObject","jquery.sap.sjax"],function(t,a,e){"use strict";return{_oDraftMetadata:{},_oConstants:{COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT:"com.sap.vocabularies.Common.v1.DraftRoot",COM_SAP_VOCABULARIES_COMMON_V1_DRAFTNODE:"com.sap.vocabularies.Common.v1.DraftNode",COM_SAP_VOCABULARIES_COMMON_V1_SEMANTICKEY:"com.sap.vocabularies.Common.v1.SemanticKey",EMPTY_GUID:"00000000-0000-0000-0000-000000000000",SIBLINGENTITY_NAVIGATION:"SiblingEntity",DRAFT_ADMINISTRATIVE_DATA:"DraftAdministrativeData",DRAFT_ADMINISTRATIVE_DATA_UUID:"DraftAdministrativeDataUUID",ACTIVATION_ACTION:"ActivationAction",EDIT_ACTION:"EditAction",VALIDATE_ACTION:"ValidationFunction",PREPARE_ACTION:"PreparationAction"},handleDraft:function(e,r){var o=function(t){var a=t.getParameter("oEntity");a.IsActiveEntity=false;a.HasActiveEntity=false;a.HasDraftEntity=false};var i=function(t){var e=t.getParameter("oXhr");var r=a.sap.sjax({url:e.url,dataType:"json"}).data.d;for(var o=0;o<this._oDraftMetadata.draftNodes.length;o++){for(var i in this._mEntitySets[this._oDraftMetadata.draftRootName].navprops){if(this._mEntitySets[this._oDraftMetadata.draftRootName].navprops[i].to.entitySet===this._oDraftMetadata.draftNodes[o]){var s=a.sap.sjax({url:r[i].__deferred.uri,dataType:"json"});if(s.data&&s.data.d&&s.data.d.results){var n;for(var f=0;f<s.data.d.results.length;f++){n=s.data.d.results[f];a.sap.sjax({url:n.__metadata.uri,type:"DELETE"})}}}}}};if(e&&e.EntityContainer){var s=e.EntityContainer[Object.keys(e.EntityContainer)[0]];for(var n in s){var f=s[n];if(f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT]){this._oDraftMetadata.draftRootName=n;this._oDraftMetadata.annotations=e;this._oDraftMetadata.mockServerRootUri=r.getRootUri();if(f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.ACTIVATION_ACTION]){this._oDraftMetadata.draftRootActivationName=f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.ACTIVATION_ACTION].String}if(this._oDraftMetadata.draftRootActivationName){this._oDraftMetadata.draftRootActivationName=this._oDraftMetadata.draftRootActivationName.substring(this._oDraftMetadata.draftRootActivationName.lastIndexOf("/")+1)}this._oDraftMetadata.draftRootEditName=f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.EDIT_ACTION];this._oDraftMetadata.draftRootEditName=this._oDraftMetadata.draftRootEditName?this._oDraftMetadata.draftRootEditName.String:undefined;if(this._oDraftMetadata.draftRootEditName){this._oDraftMetadata.draftRootEditName=this._oDraftMetadata.draftRootEditName.substring(this._oDraftMetadata.draftRootEditName.lastIndexOf("/")+1)}this._oDraftMetadata.draftRootValidationName=f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.VALIDATE_ACTION];this._oDraftMetadata.draftRootValidationName=this._oDraftMetadata.draftRootValidationName?this._oDraftMetadata.draftRootValidationName.String:undefined;if(this._oDraftMetadata.draftRootValidationName){this._oDraftMetadata.draftRootValidationName=this._oDraftMetadata.draftRootValidationName.substring(this._oDraftMetadata.draftRootValidationName.lastIndexOf("/")+1)}this._oDraftMetadata.draftRootPreparationtionName=f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.PREPARE_ACTION];this._oDraftMetadata.draftRootPreparationtionName=this._oDraftMetadata.draftRootPreparationtionName?this._oDraftMetadata.draftRootPreparationtionName.String:undefined;if(this._oDraftMetadata.draftRootPreparationtionName){this._oDraftMetadata.draftRootPreparationtionName=this._oDraftMetadata.draftRootPreparationtionName.substring(this._oDraftMetadata.draftRootPreparationtionName.lastIndexOf("/")+1)}a.extend(r,this);r.attachAfter(t.HTTPMETHOD.POST,o,this._oDraftMetadata.draftRootName);r.attachBefore(t.HTTPMETHOD.DELETE,i,this._oDraftMetadata.draftRootName);r.attachAfter(t.HTTPMETHOD.GET,this._fnDraftAdministrativeData,this._oDraftMetadata.draftRootName)}}}},_calcSemanticKeys:function(t,a){var e=[];for(var r in this._oDraftMetadata.annotations){if(r.lastIndexOf(a[t].type)>-1){e=this._oDraftMetadata.annotations[r][this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_SEMANTICKEY]||[];break}}var o=[];var i;for(var s=0;s<e.length;s++){i=e[s];for(var n in i){o.push(i[n])}}return o},_prepareDraftMetadata:function(a){var e=this;this._oDraftMetadata.draftNodes=[];this._oDraftMetadata.draftRootKey=a[this._oDraftMetadata.draftRootName].keys.filter(function(t){return e._calcSemanticKeys(e._oDraftMetadata.draftRootName,a).indexOf(t)<0})[0];var r=e._oDraftMetadata.annotations;var o=r.EntityContainer[Object.keys(r.EntityContainer)[0]];for(var i in o){var s=o[i];if(s[e._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTNODE]){this._oDraftMetadata.draftNodes.push(i)}}for(var n=0;n<this._oDraftMetadata.draftNodes.length;n++){this.attachAfter(t.HTTPMETHOD.GET,this._fnDraftAdministrativeData,this._oDraftMetadata.draftNodes[n])}},_fnDraftAdministrativeData:function(t){var a={};var r=t.getParameter("oFilteredData");if(!r){a=t.getParameter("oEntry");if(a.IsActiveEntity&&!a.HasDraftEntity){a[this._oConstants.DRAFT_ADMINISTRATIVE_DATA]=null}}else{if(r.results){r=r.results}else{if(e(r)){r=null;return}}for(var o=0;o<r.length;o++){a=r[o];if(a.IsActiveEntity&&!a.HasDraftEntity){a[this._oConstants.DRAFT_ADMINISTRATIVE_DATA]=null}}}},_handleDraftArtifacts:function(t){var e=this;var r=this._oMockdata;var o=r[this._oDraftMetadata.draftRootName];var i=function(t,a){return t.filter(function(t){return a.indexOf(t)<0})[0]};if(o.length===100){for(var s=0;s<o.length;s++){var n=o[s];if(s<25){n.IsActiveEntity=true;n.HasActiveEntity=false;n.HasDraftEntity=false;n[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;if(n[this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]){n[this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]=null}var f=[];var d=[];for(var _=0;_<this._oDraftMetadata.draftNodes.length;_++){d=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[_],t);f=r[this._oDraftMetadata.draftNodes[_]];var D=t[this._oDraftMetadata.draftRootName];for(var h in D.navprops){var M=D.navprops[h];if(M.to.entitySet===this._oDraftMetadata.draftNodes[_]){var v=M.from.propRef.length;for(var A=0;A<v;A++){f[s][M.to.propRef[A]]=n[M.from.propRef[A]]}}}f[s].IsActiveEntity=true;f[s].HasActiveEntity=false;f[s].HasDraftEntity=false;f[s][this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;if(f[s][this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]){f[s][this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]=null}var p=i(t[this._oDraftMetadata.draftNodes[_]].keys,d);f[s][p]=this._oConstants.EMPTY_GUID}}else if(s<50){n.IsActiveEntity=false;n.HasActiveEntity=false;n.HasDraftEntity=false;f=[];d=[];for(var _=0;_<this._oDraftMetadata.draftNodes.length;_++){d=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[_],t);f=r[this._oDraftMetadata.draftNodes[_]];var D=t[this._oDraftMetadata.draftRootName];for(var h in D.navprops){var M=D.navprops[h];if(M.to.entitySet===this._oDraftMetadata.draftNodes[_]){var v=M.from.propRef.length;for(var A=0;A<v;A++){f[s][M.to.propRef[A]]=n[M.from.propRef[A]]}}}f[s].IsActiveEntity=false;f[s].HasActiveEntity=false;f[s].HasDraftEntity=false;p=i(t[this._oDraftMetadata.draftNodes[_]].keys,d)}}else if(s<75){var E=a.extend(true,{},n);n.IsActiveEntity=true;n.HasActiveEntity=false;n.HasDraftEntity=true;n[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;f=[];d=[];for(var _=0;_<this._oDraftMetadata.draftNodes.length;_++){d=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[_],t);f=r[this._oDraftMetadata.draftNodes[_]];var D=t[this._oDraftMetadata.draftRootName];for(var h in D.navprops){var M=D.navprops[h];if(M.to.entitySet===this._oDraftMetadata.draftNodes[_]){var v=M.from.propRef.length;for(var A=0;A<v;A++){f[s][M.to.propRef[A]]=n[M.from.propRef[A]]}}}f[s].IsActiveEntity=true;f[s].HasActiveEntity=false;f[s].HasDraftEntity=true;p=i(t[this._oDraftMetadata.draftNodes[_]].keys,d);f[s][p]=this._oConstants.EMPTY_GUID}E.IsActiveEntity=false;E.HasActiveEntity=true;E.HasDraftEntity=false;o[s+25]=E}}}var u=this._getRootUri();a.each(t,function(t,o){a.each(r[t],function(r,i){i.__metadata=i.__metadata||{};i.__metadata.uri=u+t+"("+e._createKeysString(o,i)+")";i.__metadata.type=o.schema+"."+o.type;a.each(o.navprops,function(a){i[a]={__deferred:{uri:u+t+"("+e._createKeysString(o,i)+")/"+a}}})})})},_activate:function(t){var e;var r=function(t,a){return t.filter(function(t){return a.indexOf(t)<0})[0]};for(var o=0;o<this._oDraftMetadata.draftNodes.length;o++){for(var i in this._mEntitySets[this._oDraftMetadata.draftRootName].navprops){if(this._mEntitySets[this._oDraftMetadata.draftRootName].navprops[i].to.entitySet===this._oDraftMetadata.draftNodes[o]){e=a.sap.sjax({url:t[i].__deferred.uri,dataType:"json"});if(e.success&&e.data&&e.data.d&&e.data.d.results){var s;for(var n=0;n<e.data.d.results.length;n++){s=e.data.d.results[n];s.IsActiveEntity=true;s.HasActiveEntity=false;s.HasDraftEntity=false;s[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;var f=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[o],this._mEntitySets);var d=r(this._mEntitySets[this._oDraftMetadata.draftNodes[o]].keys,f);s[d]=this._oConstants.EMPTY_GUID;a.sap.sjax({url:s.__metadata.uri,type:"PATCH",data:JSON.stringify(s)})}}}}}t.IsActiveEntity=true;t.HasActiveEntity=false;t.HasDraftEntity=false;t[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;a.sap.sjax({url:t.__metadata.uri,type:"PATCH",data:JSON.stringify(t)});return t},setRequests:function(r){var o=this;r.push({method:"POST",path:new RegExp(o._oDraftMetadata.draftRootActivationName),response:function(t){var e=JSON.parse(t.requestBody);var r=[];for(var i in e){r.push(i+" eq "+e[i])}var s=a.sap.sjax({url:o._oDraftMetadata.mockServerRootUri+o._oDraftMetadata.draftRootName+"?$filter="+r.join(" and "),dataType:"json"});if(!s.success||!s.data.d.results[0]){t.respond(404)}var n=s.data.d.results[0];if(n.IsActiveEntity){t.respond(400)}if(n.HasActiveEntity){var f=n.SiblingEntity.__deferred.uri;s=a.sap.sjax({url:f,dataType:"json"});if(s.success&&s.data&&s.data.d.__metadata){var d=s.data.d;s=a.sap.sjax({url:d.__metadata.uri,type:"DELETE"})}}n=o._activate(n);t.respondJSON(200,{},JSON.stringify({d:n}));return true}});if(o._oDraftMetadata.draftRootEditName){r.push({method:"POST",path:new RegExp(o._oDraftMetadata.draftRootEditName+"(\\?(.*))?"),response:function(t,r){var i=[];var s=JSON.parse(t.requestBody);if(s&&!e(s)){for(var n in s){i.push(n+" eq "+s[n])}}else{var f=decodeURIComponent(r).replace("?","&").split("&");for(var d in f){var _=f[d];var D=new RegExp("(.*)=(.*)");var h;if(_){h=D.exec(_);i.push(h[1]+" eq "+h[2])}}}var M=a.sap.sjax({url:o._oDraftMetadata.mockServerRootUri+o._oDraftMetadata.draftRootName+"?$filter="+i.join(" and "),dataType:"json"});if(!M.success||!M.data.d.results[0]){t.respond(404)}var v=M.data.d.results[0];if(!v.IsActiveEntity||v.HasDraftEntity){t.respond(400)}var A=a.extend(true,{},v);A.IsActiveEntity=false;A.HasActiveEntity=true;A.HasDraftEntity=false;A[o._oDraftMetadata.draftRootKey]=o._generatePropertyValue(o._oDraftMetadata.draftRootKey,"Guid");var p=o._getRootUri();var E=o._mEntitySets[o._oDraftMetadata.draftRootName];A.__metadata=A.__metadata||{};A.__metadata.uri=p+o._oDraftMetadata.draftRootName+"("+o._createKeysString(E,A)+")";A.__metadata.type=E.schema+"."+E.type;a.each(E.navprops,function(t){A[t]={__deferred:{uri:p+o._oDraftMetadata.draftRootName+"("+o._createKeysString(E,A)+")/"+t}}});o._oMockdata[o._oDraftMetadata.draftRootName].push(A);M=a.sap.sjax({url:v.__metadata.uri,type:"PATCH",data:JSON.stringify({HasDraftEntity:true})});t.respondJSON(200,{},JSON.stringify({d:A}));return true}})}if(o._oDraftMetadata.draftRootValidationName){r.push({method:"GET",path:new RegExp(o._oDraftMetadata.draftRootValidationName+"(\\?(.*))?"),response:function(a,e){var r=o._oDraftMetadata.draftRootValidationName;o.fireEvent(t.HTTPMETHOD.GET+r+":before",{oXhr:a,sUrlParams:e});o.fireEvent(t.HTTPMETHOD.GET+":before",{oXhr:a,sUrlParams:e});var i={d:{}};i.d[r]={__metadata:{type:"ValidationResult"},IsValid:true};o.fireEvent(t.HTTPMETHOD.GET+r+":after",{oXhr:a,oResult:i});o.fireEvent(t.HTTPMETHOD.GET+":after",{oXhr:a,oResult:i});a.respondJSON(200,{},JSON.stringify(i));return true}})}if(o._oDraftMetadata.draftRootPreparationtionName){r.push({method:"POST",path:new RegExp(o._oDraftMetadata.draftRootPreparationtionName),response:function(e){o.fireEvent(t.HTTPMETHOD.POST+o._oDraftMetadata.draftRootPreparationtionName+":before",{oXhr:e});o.fireEvent(t.HTTPMETHOD.POST+":before",{oXhr:e});var r=JSON.parse(e.requestBody);var i=[];for(var s in r){i.push(s+" eq "+r[s])}var n=a.sap.sjax({url:o._oDraftMetadata.mockServerRootUri+o._oDraftMetadata.draftRootName+"?$filter="+i.join(" and "),dataType:"json"});if(!n.success||!n.data.d.results[0]){e.respond(404)}var f=n.data.d.results[0];o.fireEvent(t.HTTPMETHOD.POST+o._oDraftMetadata.draftRootPreparationtionName+":after",{oXhr:e,oEntry:f});o.fireEvent(t.HTTPMETHOD.POST+":after",{oXhr:e,oEntry:f});e.respondJSON(200,{},JSON.stringify({d:f}));return true}})}t.prototype.setRequests.apply(this,[r])},_generateMockdata:function(a,e){t.prototype._generateMockdata.apply(this,[a,e]);this._handleDraftArtifacts(a)},_loadMockdata:function(a,e){t.prototype._loadMockdata.apply(this,[a,e]);this._handleDraftArtifacts(a)},_resolveNavigation:function(a,e,r,o){var i=t.prototype._resolveNavigation.apply(this,[a,e,r,o]);if(r===this._oConstants.SIBLINGENTITY_NAVIGATION){if(o&&o.IsActiveEntity){i.splice(0,1)}else{i.length>1?i.splice(1,1):i.splice(0,1)}}else if(r===this._oConstants.DRAFT_ADMINISTRATIVE_DATA){if(o){if(o.IsActiveEntity&&!o.HasDraftEntity){i[0]=null}}else{i[0]=null}}return i},_findEntitySets:function(a){var e=t.prototype._findEntitySets.apply(this,[a]);this._prepareDraftMetadata(e);return e},getEntitySetData:function(a){var e=t.prototype.getEntitySetData.apply(this,[a]);var r=function(){return e};if(a===this._oDraftMetadata.draftRootName){this._fnDraftAdministrativeData({getParameter:r});return e}for(var o=0;o<this._oDraftMetadata.draftNodes.length;o++){if(a===this._oDraftMetadata.draftNodes[o]){this._fnDraftAdministrativeData({getParameter:r});return e}}return e}}},true);