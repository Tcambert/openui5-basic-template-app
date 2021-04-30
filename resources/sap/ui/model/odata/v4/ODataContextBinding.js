/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Context","./ODataParentBinding","./lib/_Cache","./lib/_GroupLock","./lib/_Helper","sap/ui/base/SyncPromise","sap/ui/model/Binding","sap/ui/model/ChangeReason","sap/ui/model/ContextBinding"],function(e,t,n,o,r,i,s,a,h){"use strict";var u="sap.ui.model.odata.v4.ODataContextBinding",d={AggregatedDataStateChange:true,change:true,dataReceived:true,dataRequested:true,DataStateChange:true,patchCompleted:true,patchSent:true};function c(e,t){var n=e.slice(0,e.lastIndexOf("/")),o=n.indexOf("(");return(o<0?n:e.slice(0,o))+t}var l=h.extend("sap.ui.model.odata.v4.ODataContextBinding",{constructor:function(n,o,i,s){var a=o.indexOf("(...)");h.call(this,n,o);t.call(this);if(o.endsWith("/")){throw new Error("Invalid path: "+o)}this.oOperation=undefined;this.oParameterContext=null;this.oReturnValueContext=null;if(a>=0){if(a!==this.sPath.length-5){throw new Error("The path must not continue after a deferred operation: "+this.sPath)}this.oOperation={bAction:undefined,mChangeListeners:{},mParameters:{},sResourcePath:undefined};if(!this.bRelative){this.oParameterContext=e.create(this.oModel,this,this.sPath+"/$Parameter")}}s=r.clone(s)||{};this.checkBindingParameters(s,["$$canonicalPath","$$groupId","$$inheritExpandSelect","$$ownRequest","$$patchWithoutSideEffects","$$updateGroupId"]);this.sGroupId=s.$$groupId;this.bInheritExpandSelect=s.$$inheritExpandSelect;this.sUpdateGroupId=s.$$updateGroupId;this.applyParameters(s);this.oElementContext=this.bRelative?null:e.create(this.oModel,this,o);if(!this.oOperation&&(!this.bRelative||i&&!i.fetchValue)){this.createReadGroupLock(this.getGroupId(),true)}this.setContext(i);n.bindingCreated(this)},metadata:{publicMethods:[]}});t(l.prototype);l.prototype._delete=function(e,t){var n=this._findEmptyPathParentContext(this.oElementContext),o=n.getBinding();if(!o.execute){return this.fetchValue("",undefined,true).then(function(t){return n._delete(e,t)})}return this.deleteFromCache(e,t,"",undefined,function(){o._destroyContextAfterDelete()})};l.prototype._destroyContextAfterDelete=function(){this.oElementContext.destroy();this.oElementContext=null;if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=null}this._fireChange({reason:a.Remove})};l.prototype._execute=function(t,n){var o=this.oModel.getMetaModel(),i,s,h=this.getResolvedPath(),d=this;function l(){d._fireChange({reason:a.Change});return d.refreshDependentBindings("",t.getGroupId(),true)}s=o.fetchObject(o.getMetaPath(h)+"/@$ui5.overload").then(function(e){var o,r,s;if(!e){throw new Error("Unknown operation: "+h)}if(e.length!==1){throw new Error("Expected a single overload, but found "+e.length+" for "+h)}if(d.bRelative&&d.oContext.getBinding){r=d.sPath.lastIndexOf("/");s=r>=0?d.sPath.slice(0,r):"";o=d.oContext.getValue.bind(d.oContext,s)}i=e[0];return d.createCacheAndRequest(t,h,i,n,o)}).then(function(t){var n,o,s;return l().then(function(){if(d.isReturnValueLikeBindingParameter(i)){o=d.oContext.getValue();n=o&&r.getPrivateAnnotation(o,"predicate");s=r.getPrivateAnnotation(t,"predicate");if(n===s){d.oContext.patch(t)}}if(d.hasReturnValueContext(i)){if(d.oReturnValueContext){d.oReturnValueContext.destroy()}d.oReturnValueContext=e.createReturnValueContext(d.oModel,d,c(h,s));d.oCache.setResourcePath(d.oReturnValueContext.getPath().slice(1));return d.oReturnValueContext}})},function(e){function t(e){var t,n;function o(){return i.$Parameter.some(function(e){return t===e.$Name})}if(e.target){n=e.target.split("/");t=n.shift();if(t==="$Parameter"){e.target=n.join("/");t=n.shift()}if(i.$IsBound&&t===i.$Parameter[0].$Name){e.target=r.buildPath(d.oContext.getPath(),n.join("/"));return}else if(o()){e.target=d.oParameterContext.getPath()+"/"+e.target;return}}delete e.target}if(i){if(e.error){t(e.error);if(e.error.details){e.error.details.forEach(t)}}}return l().then(function(){throw e})}).catch(function(e){t.unlock(true);if(d.oReturnValueContext){d.oReturnValueContext.destroy();d.oReturnValueContext=null}d.oModel.reportError("Failed to execute "+h,u,e);throw e});return Promise.resolve(s)};l.prototype.adjustPredicate=function(e,t){if(this.oElementContext){this.oElementContext.adjustPredicate(e,t)}};l.prototype.applyParameters=function(e,t){this.mQueryOptions=this.oModel.buildQueryOptions(e,true);this.mParameters=e;if(this.isRootBindingSuspended()){this.sResumeChangeReason=a.Change}else if(!this.oOperation){this.fetchCache(this.oContext);if(t){this.refreshInternal("",undefined,true).catch(function(){})}}else if(this.oOperation.bAction===false){this.execute()}};l.prototype.attachEvent=function(e){if(!(e in d)){throw new Error("Unsupported event '"+e+"': v4.ODataContextBinding#attachEvent")}return h.prototype.attachEvent.apply(this,arguments)};l.prototype.computeOperationQueryOptions=function(){return Object.assign({},this.oModel.mUriParameters,this.getQueryOptionsFromParameters())};l.prototype.checkKeepAlive=function(){throw new Error("Unsupported "+this)};l.prototype.createCacheAndRequest=function(e,t,o,s,a){var h=o.$kind==="Action",u,d=a,l=this.oModel,f=l.getMetaModel().getMetaPath(t)+"/@$ui5.overload/0/$ReturnType",p=t.slice(1),C=l.oRequestor,g=this;function m(e){if(g.hasReturnValueContext(o)){return c(p,r.getPrivateAnnotation(e,"predicate"))}if(g.isReturnValueLikeBindingParameter(o)&&r.getPrivateAnnotation(d,"predicate")===r.getPrivateAnnotation(e,"predicate")){return p.slice(0,p.lastIndexOf("/"))}return p}if(!h&&o.$kind!=="Function"){throw new Error("Not an operation: "+t)}if(this.bInheritExpandSelect&&!this.isReturnValueLikeBindingParameter(o)){throw new Error("Must not set parameter $$inheritExpandSelect on this binding")}this.oOperation.bAction=h;if(h&&a){d=a()}this.oOperation.mRefreshParameters=s;s=Object.assign({},s);this.mCacheQueryOptions=this.computeOperationQueryOptions();t=C.getPathAndAddQueryOptions(t,o,s,this.mCacheQueryOptions,d);if(o.$ReturnType&&!o.$ReturnType.$Type.startsWith("Edm.")){f+="/$Type"}u=n.createSingle(C,t,this.mCacheQueryOptions,l.bAutoExpandSelect,l.bSharedRequests,m,h,f);this.oCache=u;this.oCachePromise=i.resolve(u);return h?u.post(e,s,d):u.fetchValue(e)};l.prototype.destroy=function(){if(this.oElementContext){this.oElementContext.destroy();this.oElementContext=undefined}if(this.oParameterContext){this.oParameterContext.destroy();this.oParameterContext=undefined}if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=undefined}this.oModel.bindingDestroyed(this);this.mCacheByResourcePath=undefined;this.oOperation=undefined;this.mParameters=undefined;this.mQueryOptions=undefined;t.prototype.destroy.call(this);h.prototype.destroy.call(this)};l.prototype.doCreateCache=function(e,t,o,r){return n.createSingle(this.oModel.oRequestor,e,t,this.oModel.bAutoExpandSelect,this.oModel.bSharedRequests,function(){return r})};l.prototype.doDeregisterChangeListener=function(e,n){if(this.oOperation&&(e==="$Parameter"||e.startsWith("$Parameter/"))){r.removeByPath(this.oOperation.mChangeListeners,e.slice(11),n);return}t.prototype.doDeregisterChangeListener.apply(this,arguments)};l.prototype.doFetchQueryOptions=function(e){return this.fetchResolvedQueryOptions(e)};l.prototype.doSetProperty=function(e,t,o){if(this.oOperation&&(e==="$Parameter"||e.startsWith("$Parameter/"))){r.updateAll(this.oOperation.mChangeListeners,"",this.oOperation.mParameters,n.makeUpdateData(e.split("/").slice(1),t));this.oOperation.bAction=undefined;if(o){o.unlock()}return i.resolve()}};l.prototype.execute=function(e){var t=this.oModel.resolve(this.sPath,this.oContext);this.checkSuspended();this.oModel.checkGroupId(e);if(!this.oOperation){throw new Error("The binding must be deferred: "+this.sPath)}if(this.bRelative){if(!t){throw new Error("Unresolved binding: "+this.sPath)}if(this.oContext.isTransient&&this.oContext.isTransient()){throw new Error("Execute for transient context not allowed: "+t)}if(this.oContext.getPath().indexOf("(...)")>=0){throw new Error("Nested deferred operation bindings not supported: "+t)}}return this._execute(this.lockGroup(e,true),r.clone(this.oOperation.mParameters))};l.prototype.fetchValue=function(e,t,n){var s=n&&this.oCache!==undefined?i.resolve(this.oCache):this.oCachePromise,a,h=this.getRootBinding(),d=this;if(h&&h.isSuspended()){a=new Error("Suspended binding provides no value");a.canceled="noDebugLog";throw a}return s.then(function(i){var s=false,a,h=i||d.oOperation?d.getRelativePath(e):undefined,c,l;if(d.oOperation){if(h===undefined){return d.oContext.fetchValue(e,t,n)}c=h.split("/");if(c[0]==="$Parameter"){if(c.length===1){return undefined}r.addByPath(d.oOperation.mChangeListeners,h.slice(11),t);l=r.drillDown(d.oOperation.mParameters,c.slice(1));return l===undefined?null:l}}if(i&&h!==undefined){if(n){a=o.$cached}else{a=d.oReadGroupLock||d.lockGroup();d.oReadGroupLock=undefined}return d.resolveRefreshPromise(i.fetchValue(a,h,function(){s=true;d.fireDataRequested()},t)).then(function(e){d.assertSameCache(i);return e}).then(function(e){if(s){d.fireDataReceived({data:{}})}return e},function(e){a.unlock(true);if(s){d.oModel.reportError("Failed to read path "+d.sPath,u,e);d.fireDataReceived(e.canceled?{data:{}}:{error:e})}throw e})}if(!d.oOperation&&d.oContext){return d.oContext.fetchValue(e,t,n)}})};l.prototype.getDependentBindings=function(){return this.oModel.getDependentBindings(this)};l.prototype.getParameterContext=function(){if(!this.oOperation){throw new Error("Not a deferred operation binding: "+this)}return this.oParameterContext};l.prototype.getQueryOptionsFromParameters=function(){var e,t;if(!this.bInheritExpandSelect){return this.mQueryOptions}e=this.oContext.getBinding().getCacheQueryOptions();t=Object.assign({},this.mQueryOptions);if("$select"in e){t.$select=e.$select}if("$expand"in e){t.$expand=e.$expand}return t};l.prototype.getResolvedPath=function(){var e="",t=this.oModel.resolve(this.sPath,this.oContext),n,o=this;if(t&&t.includes("($uid=")){n=t.slice(1).split("/");t="";n.forEach(function(n){var i,s,a;e+="/"+n;a=n.indexOf("($uid=");if(a>=0){i=o.oContext.getValue(e);s=i&&r.getPrivateAnnotation(i,"predicate");if(!s){throw new Error("No key predicate known at "+e)}t+="/"+n.slice(0,a)+s}else{t+="/"+n}})}return t};l.prototype.hasReturnValueContext=function(e){var t=this.oModel.getMetaModel(),n;if(!this.isReturnValueLikeBindingParameter(e)){return false}n=t.getMetaPath(this.oModel.resolve(this.sPath,this.oContext)).split("/");return n.length===3&&t.getObject("/"+n[1]).$kind==="EntitySet"};l.prototype.initialize=function(){if(this.isResolved()){if(this.getRootBinding().isSuspended()){this.sResumeChangeReason=a.Change}else{this._fireChange({reason:a.Change})}}};l.prototype.isReturnValueLikeBindingParameter=function(e){if(!(this.bRelative&&this.oContext&&this.oContext.getBinding)){return false}return e.$IsBound&&e.$ReturnType&&!e.$ReturnType.$isCollection&&e.$EntitySetPath&&e.$EntitySetPath.indexOf("/")<0};l.prototype.refreshInternal=function(t,n,o,r){var s=this;if(this.oOperation&&this.oOperation.bAction!==false){return i.resolve()}if(this.isRootBindingSuspended()){this.refreshSuspended(n);return this.refreshDependentBindings(t,n,o,r)}this.createReadGroupLock(n,this.isRoot());return this.oCachePromise.then(function(h){var u=s.oRefreshPromise,d=s.oReadGroupLock;if(!s.oElementContext){s.oElementContext=e.create(s.oModel,s,s.oModel.resolve(s.sPath,s.oContext));if(!h){s._fireChange({reason:a.Refresh})}}if(s.oOperation){s.oReadGroupLock=undefined;return s._execute(d,s.oOperation.mRefreshParameters)}if(h&&!u){s.removeCachesAndMessages(t);s.fetchCache(s.oContext);u=s.createRefreshPromise();if(r){u=u.catch(function(e){return s.fetchResourcePath(s.oContext).then(function(e){if(!s.bRelative||h.$resourcePath===e){s.oCache=h;s.oCachePromise=i.resolve(h);h.setActive(true);return s.checkUpdateInternal()}}).then(function(){throw e})})}if(!o){s.fetchValue("").catch(function(){})}}return i.all([u,s.refreshDependentBindings(t,n,o,r)])})};l.prototype.refreshReturnValueContext=function(e,t){var o,r=this.oModel;if(this.oReturnValueContext!==e){return null}this.mCacheQueryOptions=this.computeOperationQueryOptions();o=n.createSingle(r.oRequestor,this.oReturnValueContext.getPath().slice(1),this.mCacheQueryOptions,true,r.bSharedRequests);this.oCache=o;this.oCachePromise=i.resolve(o);this.createReadGroupLock(t,true);return this.refreshDependentBindings("",t,true)};l.prototype.requestSideEffects=function(e,t,n){var o=this.oModel,r={},s=[],a=this;function h(e){return e.catch(function(e){o.reportError("Failed to request side effects",u,e);throw e})}if(t.indexOf("")<0){try{s.push(this.oCache.requestSideEffects(this.lockGroup(e),t,r,n&&n.getPath().slice(1)));this.visitSideEffects(e,t,n,r,s);return i.all(s.map(h)).then(function(){return a.refreshDependentListBindingsWithoutCache()})}catch(e){if(!e.message.startsWith("Unsupported collection-valued navigation property ")){throw e}}}return n&&this.refreshReturnValueContext(n,e)||this.refreshInternal("",e,true,true)};l.prototype.requestObject=function(e){return this.oElementContext?this.oElementContext.requestObject(e):Promise.resolve()};l.prototype.resumeInternal=function(e,t){var n=this.sResumeChangeReason;this.sResumeChangeReason=undefined;if(!this.oOperation){if(t||n){this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.removeCachesAndMessages("");this.fetchCache(this.oContext)}this.getDependentBindings().forEach(function(t){t.resumeInternal(e,!!n)});if(n){this._fireChange({reason:n})}}};l.prototype.setContext=function(t){if(this.oContext!==t){if(this.bRelative&&(this.oContext||t)){this.checkSuspended();if(this.oElementContext){this.oElementContext.destroy();this.oElementContext=null}if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=null}if(this.oParameterContext){this.oParameterContext.destroy();this.oParameterContext=null}this.fetchCache(t);if(t){this.oElementContext=e.create(this.oModel,this,this.oModel.resolve(this.sPath,t));if(this.oOperation){this.oParameterContext=e.create(this.oModel,this,this.oModel.resolve(this.sPath+"/$Parameter",t))}}s.prototype.setContext.call(this,t)}else{this.oContext=t}}};l.prototype.setParameter=function(e,t){var n;if(!this.oOperation){throw new Error("The binding must be deferred: "+this.sPath)}if(!e){throw new Error("Missing parameter name")}if(t===undefined){throw new Error("Missing value for parameter: "+e)}n=this.oOperation.mParameters[e];this.oOperation.mParameters[e]=t;r.informAll(this.oOperation.mChangeListeners,e,n,t);this.oOperation.bAction=undefined;return this};return l});