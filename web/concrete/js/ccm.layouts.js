/** 
 * Free-Form Layouts
 */(function(e){jQuery.fn.ccmlayout=function(n){return this.each(function(){var r=e(this),i=r.data("ccmlayout");i||r.data("ccmlayout",i=new t(this,n))})};var t=function(t,n){this.options=e.extend({toolbar:"#ccm-layouts-toolbar",btnsave:"#ccm-layouts-save-button",btncancel:"#ccm-layouts-cancel-button",editing:!1,formview:"custom",supportsgrid:!1,gridrowtmpid:"ccm-theme-grid-temp"},n),this.$element=e(t),this.$toolbar=e(this.options.toolbar),this._setupDOM(),this.options.formview=="choosetype"?this._setupToolbarView(!0):this._setupToolbarView(),this._setupFormSaveAndCancel(),this._setupFormEvents();switch(this.options.formview){case"choosetype":this._updateChooseTypeForm(),this.usethemegrid?this._updateThemeGridView():this._updateCustomView();break;case"themegrid":this._updateThemeGridView();break;default:this._updateCustomView()}};t.prototype._setupDOM=function(){this.$formviews=this.$toolbar.find("li[data-grid-form-view]"),this.$formviewcustom=this.$toolbar.find("li[data-grid-form-view=custom]"),this.$formviewchoosetype=this.$toolbar.find("li[data-grid-form-view=choosetype]"),this.$formviewthemegrid=this.$toolbar.find("li[data-grid-form-view=themegrid]"),this.$usethemegrid=this.$toolbar.find("select[name=useThemeGrid]"),this.$selectcolumnscustom=this.$toolbar.find("select[name=columns]"),this.$customspacing=this.$toolbar.find("input[name=spacing]"),this.$customautomated=this.$toolbar.find("input[name=isautomated]"),this.$selectgridcolumns=this.$toolbar.find("select[name=themeGridColumns]"),this.$savebtn=this.$toolbar.find(this.options.btnsave),this.$cancelbtn=this.$toolbar.find(this.options.btncancel),this.$slider=!1},t.prototype._setupFormSaveAndCancel=function(){var t=this;this.$cancelbtn.on("click",function(){ccm_onInlineEditCancel()}),this.$savebtn.on("click",function(){e("#ccm-block-form").submit()})},t.prototype._setupToolbarView=function(t){var n=this;this.$formviews.each(function(r){e(this).attr("data-grid-form-view")!=n.options.formview&&(t?e(this).hide():e(this).remove())})},t.prototype._updateChooseTypeForm=function(){this.usethemegrid=parseInt(this.$usethemegrid.val()),this.options.formview=="choosetype"&&this.usethemegrid?(this.$formviewcustom.hide(),this.$formviewthemegrid.show()):(this.$formviewthemegrid.hide(),this.$formviewcustom.show())},t.prototype._setupFormEvents=function(){var e=this;this.$selectcolumnscustom.on("change",function(){e._updateCustomView()}),this.$customspacing.on("change",function(){e._updateCustomView()}),this.$customautomated.on("change",function(){e._updateCustomView()}),this.$selectgridcolumns.on("change",function(){e._updateThemeGridView()}),this.$usethemegrid.on("change",function(){e._updateChooseTypeForm(),e.usethemegrid?e._updateThemeGridView():e._updateCustomView()})},t.prototype.buildThemeGridGrid=function(){this.$element.html("");var t=this.options.rowstart;t+='<div id="ccm-theme-grid-edit-mode-row-wrapper">';var n=this._getThemeGridColumnSpan(this.columns);e.each(n,function(e,n){var r='<div id="ccm-edit-layout-column-'+e+'" class="'+n.cssClass+' ccm-theme-grid-column" data-offset="0" data-span="'+n.value+'"><div class="ccm-layout-column-highlight"><input type="hidden" id="ccm-edit-layout-column-offset-'+e+'" name="offset['+e+']" value="0" /><input type="hidden" id="ccm-edit-layout-column-span-'+e+'" name="span['+e+']" value="'+n.value+'" /></div></div>';t+=r}),t+="</div>",t+=this.options.rowend,this.$element.append(t)},t.prototype._updateThemeGridView=function(){this.columns=parseInt(this.$selectgridcolumns.val()),this.maxcolumns=parseInt(this.$selectgridcolumns.find(" option:last-child").val()),this.options.editing?this.$selectgridcolumns.prop("disabled",!0):this.buildThemeGridGrid(),this._resetSlider(),this.columns>1&&this._showThemeGridSlider()},t.prototype._updateCustomView=function(){this.columns=parseInt(this.$selectcolumnscustom.val()),this.customspacing=this.$customspacing.val(),this.automatedcustomlayout=this.$customautomated.is(":checked"),this.columnwidths=[],this.columns<2?(this.$customspacing.prop("disabled",!0),this.$customautomated.prop("disabled",!0)):(this.$customspacing.prop("disabled",!1),this.$customautomated.prop("disabled",!1)),this.options.editing&&this.$selectcolumnscustom.prop("disabled",!0),this.options.editing||this.$element.html("");for(i=0;i<this.columns;i++){if(this.options.editing&&e("#ccm-edit-layout-column-"+i).length>0)continue;var t=e("<div />").attr("class","ccm-layout-column");t.attr("id","ccm-edit-layout-column-"+i);var n=e("<div />").attr("class","ccm-layout-column-highlight");n.append(e("<input />",{name:"width["+i+"]",type:"hidden",id:"ccm-edit-layout-column-width-"+i})),t.append(n),this.$element.append(t)}var r=this.$element.find(".ccm-layout-column");if(this.columns<r.length)for(i=columns;i<r.length;i++)e("#ccm-edit-layout-column-"+i).remove();for(i=0;i<this.columns;i++){n=e("#ccm-edit-layout-column-"+i+" .ccm-layout-column-highlight"),i>0&&n.css("margin-left",this.customspacing/2+"px"),i+1<this.columns&&n.css("margin-right",this.customspacing/2+"px"),t=e("#ccm-edit-layout-column-"+i);if(t.attr("data-width")){var s=t.attr("data-width")+"px";this.columnwidths.push(parseInt(t.attr("data-width")))}else var s=100/this.columns+"%";t.css("width",s)}this._resetSlider(),!this.automatedcustomlayout&&this.columns>1&&this._showCustomSlider()},t.prototype._resetSlider=function(){this.$slider&&this.$slider.slider("destroy"),e("#ccm-area-layout-active-control-bar").hasClass("ccm-area-layout-control-bar-add")&&e("#ccm-area-layout-active-control-bar").css("height","0px")},t.prototype._getThemeGridColumnSpan=function(e){var t=Math.ceil(this.maxcolumns/e),n=[];for(i=0;i<e;i++)n[i]=t;var r=t*e;for(i=0;i<r-this.maxcolumns;i++){var s=n.length-i-1;n[s]--}var o=[];for(i=0;i<n.length;i++)o[i]={},o[i].cssClass=this.options.gridColumnClasses[n[i]-1],o[i].value=n[i];return o},t.prototype._getThemeGridNearestValue=function(e,t){var n=null,r=null;for(var i=0;i<t.length;i++)if(t[i]<=e||t[i]>=e){var s=Math.abs(e-t[i]);if(r==null||s<r)n=t[i],r=s}return n},t.prototype._showThemeGridSlider=function(){var t=this;t.$slider=e("#ccm-area-layout-active-control-bar"),t.$slider.css("height","12px");var n=[];for(i=0;i<t.columns;i++)h=e("#ccm-edit-layout-column-"+i),i==0?n.push(parseInt(h.width())):i+1==t.columns?n.push(parseInt(h.position().left)):(n.push(parseInt(h.position().left)),n.push(parseInt(h.width()+h.position().left)));var r=e("#ccm-area-layout-active-control-bar").width(),s=0,o=[],u=[],a=t.options.maxcolumns,f=t.options.gridColumnClasses[0];e("<div />",{id:t.options.gridrowtmpid}).appendTo(document.body);var l="";for(i=1;i<=a;i++)l+='<div class="'+f+'"></div>';e("#"+t.options.gridrowtmpid).append(e(t.options.rowstart+l+t.options.rowend));var c=0;for(i=0;i<a;i++){var h=e(e("#"+t.options.gridrowtmpid+" ."+f).get(i));if(i==0){var p=h.position().left;p<0&&(c=Math.abs(p))}o.push(parseInt(h.position().left+c)),u.push(parseInt(h.width()+h.position().left+c))}e("#"+t.options.gridrowtmpid).remove(),t.$slider.slider({min:0,max:r,step:1,values:n,slide:function(n,r){var i=e(r.handle).index(),s;i%2==0?s=u:s=o;var a=t.$slider.slider("values",i),f=t._getThemeGridNearestValue(r.value,s),l=!0;e.each(r.values,function(e,t){f>=t&&i<e?l=!1:f<=t&&i>e&&(l=!1)});if(l){t.$slider.slider("values",i,f);if(a!=f){if(i%2==0){var c=Math.floor(i/2);$innercolumn=e("#ccm-edit-layout-column-"+c);var h=parseInt($innercolumn.attr("data-span")),p=$innercolumn.nextAll(".ccm-theme-grid-column:first"),d=p.attr("data-offset");d?d=parseInt(d):d=0,f>a?(h++,d--):(h--,d++)}else{var c=Math.ceil(i/2);$innercolumn=e("#ccm-edit-layout-column-"+c);var h=parseInt($innercolumn.attr("data-span")),p=$innercolumn,d=p.attr("data-offset");d?d=parseInt(d):d=0,f<a?(h++,d--):(h--,d++)}p.attr("data-offset",d),$innercolumn.attr("data-span",h),t._redrawThemeGrid()}}return!1}})},t.prototype._redrawThemeGrid=function(){var t=this;t.$element.find(".ccm-theme-grid-offset-column").remove(),e.each(t.$element.find(".ccm-theme-grid-column"),function(n,r){var i=e(r);i.removeClass().addClass("ccm-theme-grid-column"),t.options.editing&&i.addClass("ccm-theme-grid-column-edit-mode");if(i.attr("data-span")){var s=parseInt(i.attr("data-span"))-1;i.addClass(t.options.gridColumnClasses[s]),e("#ccm-edit-layout-column-span-"+n).val(parseInt(i.attr("data-span")))}if(i.attr("data-offset")){var o=parseInt(i.attr("data-offset"))-1;e("<div />",{"data-offset-column":!0}).addClass("ccm-theme-grid-offset-column").addClass(t.options.gridColumnClasses[o]).insertBefore(i),e("#ccm-edit-layout-column-offset-"+n).val(parseInt(i.attr("data-offset")))}})},t.prototype._showCustomSlider=function(){this.$slider=e("#ccm-area-layout-active-control-bar"),this.$slider.css("height","12px");var t=[],n=0,r=this.$slider.width(),s=this.$element.find(".ccm-layout-column");if(this.columnwidths.length>0)for(i=0;i<this.columnwidths.length-1;i++)n+=this.columnwidths[i],t.push(n);else{var o=r/this.columns;for(i=1;i<this.columns;i++)n+=o,t.push(n)}this.$slider.slider({min:0,max:r,step:1,values:t,create:function(n,i){var o=0,u=[];e.each(s,function(n,i){var u=t[n];if(n+1==s.length)var a=r-o;else var a=u-o;var a=Math.floor(a);e(i).find("#ccm-edit-layout-column-width-"+n).val(a),o=u})},slide:function(t,n){var i=0,o=!0;e.each(n.values,function(e,t){t<i&&(o=!1),i=t});if(!o)return!1;i=0,e.each(s,function(t,o){if(t+1==s.length)var u=r-i;else var u=n.values[t]-i;var u=Math.floor(u);e(o).find("#ccm-edit-layout-column-width-"+t).val(u),e(o).css("width",u+"px"),i=n.values[t]})}})}})(jQuery);