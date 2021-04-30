/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/library","./library","./ListItemBase","./ColumnListItemRenderer","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Selectors"],function(e,t,o,i,n,s){"use strict";var r=o.ListType;var a=t.VerticalAlign;var p=i.extend("sap.m.ColumnListItem",{metadata:{library:"sap.m",properties:{vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:a.Inherit}},defaultAggregation:"cells",aggregations:{cells:{type:"sap.ui.core.Control",multiple:true,singularName:"cell",bindable:"bindable"}}}});var l=e.extend("sap.m.TablePopin",{ontap:function(e){if(e.isMarked()||i.detectTextSelection(this.getDomRef())){return e.stopImmediatePropagation(true)}if(e.srcControl===this||!s(e.target).is(":sapFocusable")){this.getParent().focus()}},_onMouseEnter:function(){var e=s(this),t=e.prev();if(!t.length||!t.hasClass("sapMLIBHoverable")||t.hasClass("sapMPopinHovered")){return}t.addClass("sapMPopinHovered")},_onMouseLeave:function(){var e=s(this),t=e.prev();if(!t.length||!t.hasClass("sapMLIBHoverable")||!t.hasClass("sapMPopinHovered")){return}t.removeClass("sapMPopinHovered")}});p.prototype.TagName="tr";p.prototype._bAnnounceNotSelected=true;p.prototype.init=function(){i.prototype.init.call(this);this._bNeedsTypeColumn=false;this._aClonedHeaders=[]};p.prototype.onAfterRendering=function(){i.prototype.onAfterRendering.call(this);this._checkTypeColumn();var e=this.hasPopin();if(e){this.$Popin().on("mouseenter",e._onMouseEnter).on("mouseleave",e._onMouseLeave)}};p.prototype.exit=function(){i.prototype.exit.call(this);this._checkTypeColumn(false);this._destroyClonedHeaders();if(this._oPopin){this._oPopin.destroy(true);this._oPopin=null}};p.prototype.setVisible=function(e){i.prototype.setVisible.call(this,e);if(!e&&this.hasPopin()){this.removePopin()}return this};p.prototype.getTable=function(){var e=this.getParent();if(e&&e.isA("sap.m.Table")){return e}};p.prototype.getPopin=function(){if(!this._oPopin){this._oPopin=new l({id:this.getId()+"-sub"}).addDelegate({ontouchstart:this.ontouchstart,ontouchmove:this.ontouchmove,ontap:this.ontap,ontouchend:this.ontouchend,ontouchcancel:this.ontouchcancel,onsaptabnext:this.onsaptabnext,onsaptabprevious:this.onsaptabprevious,onsapup:this.onsapup,onsapdown:this.onsapdown,oncontextmenu:this.oncontextmenu},this).setParent(this,null,true)}return this._oPopin};p.prototype.$Popin=function(){return this.$("sub")};p.prototype.hasPopin=function(){return this._oPopin};p.prototype.removePopin=function(){this._oPopin&&this.$Popin().remove()};p.prototype.getTabbables=function(){return this.$().add(this.$Popin()).find(":sapTabbable")};p.prototype.getAccessibilityType=function(e){return e.getText("ACC_CTR_TYPE_ROW")};p.prototype.getContentAnnouncement=function(e){var t=this.getTable();if(!t){return}var o=[],n=this.getCells(),s=t.getColumns(true);s.forEach(function(e){var t=n[e.getInitialOrder()];if(!t||!e.getVisible()||e.isHidden()&&!e.isPopin()){return}var s=e.getHeader();if(s&&s.getVisible()){o.push(i.getAccessibilityText(s)+" "+i.getAccessibilityText(t,true))}else{o.push(i.getAccessibilityText(t,true))}});return o.join(" . ").trim()};p.prototype.updateSelectedDOM=function(e,t){i.prototype.updateSelectedDOM.apply(this,arguments);if(this.hasPopin()){this.$Popin().attr("aria-selected",e)}};p.prototype.onfocusin=function(e){if(e.isMarked()){return}if(e.srcControl===this){this.$().children(".sapMListTblCellDup").find(":sapTabbable").attr("tabindex",-1)}i.prototype.onfocusin.apply(this,arguments)};p.prototype._checkTypeColumn=function(e){if(e==undefined){e=this._needsTypeColumn()}if(this._bNeedsTypeColumn!=e){this._bNeedsTypeColumn=e;this.informList("TypeColumnChange",e)}};p.prototype._needsTypeColumn=function(){var e=this.getType();return this.getVisible()&&(e==r.Detail||e==r.Navigation||e==r.DetailAndActive)};p.prototype._addClonedHeader=function(e){return this._aClonedHeaders.push(e)};p.prototype._destroyClonedHeaders=function(){if(this._aClonedHeaders.length){this._aClonedHeaders.forEach(function(e){e.destroy("KeepDom")});this._aClonedHeaders=[]}};p.prototype._activeHandlingInheritor=function(){this._toggleActiveClass(true)};p.prototype._inactiveHandlingInheritor=function(){this._toggleActiveClass(false)};p.prototype._toggleActiveClass=function(e){if(this.hasPopin()){this.$Popin().toggleClass("sapMLIBActive",e)}};return p});