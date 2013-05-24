(function(e){"use strict";function t(e){return RegExp("(^|\\s+)"+e+"(\\s+|$)")}function n(e,t){var n=r(e,t)?s:i;n(e,t)}var r,i,s;"classList"in document.documentElement?(r=function(e,t){return e.classList.contains(t)},i=function(e,t){e.classList.add(t)},s=function(e,t){e.classList.remove(t)}):(r=function(e,n){return t(n).test(e.className)},i=function(e,t){r(e,t)||(e.className=e.className+" "+t)},s=function(e,n){e.className=e.className.replace(t(n)," ")}),e.classie={hasClass:r,addClass:i,removeClass:s,toggleClass:n,has:r,add:i,remove:s,toggle:n}})(window),function(e){"use strict";function t(){}function n(e,t){if(i)return t.indexOf(e);for(var n=t.length;n--;)if(t[n]===e)return n;return-1}var r=t.prototype,i=Array.prototype.indexOf?!0:!1;r._getEvents=function(){return this._events||(this._events={})},r.getListeners=function(e){var t=this._getEvents();return t[e]||(t[e]=[])},r.addListener=function(e,t){var r=this.getListeners(e);return-1===n(t,r)&&r.push(t),this},r.on=r.addListener,r.removeListener=function(e,t){var r=this.getListeners(e),i=n(t,r);return-1!==i&&(r.splice(i,1),0===r.length&&this.removeEvent(e)),this},r.off=r.removeListener,r.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},r.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},r.manipulateListeners=function(e,t,n){var r,i,s=e?this.removeListener:this.addListener,o=e?this.removeListeners:this.addListeners;if("object"==typeof t)for(r in t)t.hasOwnProperty(r)&&(i=t[r])&&("function"==typeof i?s.call(this,r,i):o.call(this,r,i));else for(r=n.length;r--;)s.call(this,t,n[r]);return this},r.removeEvent=function(e){return e?delete this._getEvents()[e]:delete this._events,this},r.emitEvent=function(e,t){for(var n,r=this.getListeners(e),i=r.length;i--;)n=t?r[i].apply(null,t):r[i](),n===!0&&this.removeListener(e,r[i]);return this},r.trigger=r.emitEvent,r.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},"function"==typeof define&&define.amd?define(function(){return t}):e.EventEmitter=t}(this),function(e){"use strict";var t=document.documentElement,n=function(){};t.addEventListener?n=function(e,t,n){e.addEventListener(t,n,!1)}:t.attachEvent&&(n=function(t,n,r){t[n+r]=r.handleEvent?function(){var t=e.event;t.target=t.target||t.srcElement,r.handleEvent.call(r,t)}:function(){var n=e.event;n.target=n.target||n.srcElement,r.call(t,n)},t.attachEvent("on"+n,t[n+r])});var r=function(){};t.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:t.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]),delete e[t+n]});var i={bind:n,unbind:r};"function"==typeof define&&define.amd?define(i):e.eventie=i}(this),function(e){"use strict";function t(e){t.isReady?e():t.on("ready",e)}function n(e){var n="readystatechange"===e.type&&"complete"!==s.readyState;t.isReady||n||(t.isReady=!0,t.emit("ready",e))}var r=e.EventEmitter,i=e.eventie,s=e.document;t.isReady=!1;for(var o in r.prototype)t[o]=r.prototype[o];i.bind(s,"DOMContentLoaded",n),i.bind(s,"readystatechange",n),i.bind(e,"load",n),e.docReady=t}(this),function(e){"use strict";function t(e){if(e){if("string"==typeof r[e])return e;e=e.charAt(0).toUpperCase()+e.slice(1);for(var t,s=0,o=n.length;o>s;s++)if(t=n[s]+e,"string"==typeof r[t])return t}}var n="Webkit Moz ms Ms O".split(" "),r=document.documentElement.style;"function"==typeof define&&define.amd?define(function(){return t}):e.getStyleProperty=t}(window),function(e){"use strict";function t(e){var t=parseFloat(e),n=-1===e.indexOf("%")&&!isNaN(t);return n&&t}function n(){for(var e={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},t=0,n=o.length;n>t;t++){var r=o[t];e[r]=0}return e}function r(e){function r(e){if("object"==typeof e&&e.nodeType){var r=s(e);if("none"===r.display)return n();var f={};f.width=e.offsetWidth,f.height=e.offsetHeight;for(var l=f.isBorderBox=!!u&&!!r[u]&&"border-box"===r[u],c=0,h=o.length;h>c;c++){var p=o[c],d=r[p],v=parseFloat(d);f[p]=isNaN(v)?0:v}var m=f.paddingLeft+f.paddingRight,g=f.paddingTop+f.paddingBottom,y=f.marginLeft+f.marginRight,b=f.marginTop+f.marginBottom,w=f.borderLeftWidth+f.borderRightWidth,E=f.borderTopWidth+f.borderBottomWidth,S=l&&i,x=t(r.width);x!==!1&&(f.width=x+(S?0:m+w));var T=t(r.height);return T!==!1&&(f.height=T+(S?0:g+E)),f.innerWidth=f.width-(m+w),f.innerHeight=f.height-(g+E),f.outerWidth=f.width+y,f.outerHeight=f.height+b,f}}var i,u=e("boxSizing");return function(){if(u){var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style[u]="border-box";var n=document.body||document.documentElement;n.appendChild(e);var r=s(e);i=200===t(r.width),n.removeChild(e)}}(),r}var i=document.defaultView,s=i&&i.getComputedStyle?function(e){return i.getComputedStyle(e,null)}:function(e){return e.currentStyle},o=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define(["get-style-property"],r):e.getSize=r(e.getStyleProperty)}(window),function(e,t){"use strict";function n(){}function r(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function i(e,n){t.fn[e]=function(r){if("string"==typeof r){for(var i=s.call(arguments,1),u=0,a=this.length;a>u;u++){var f=this[u],l=t.data(f,e);if(l)if(t.isFunction(l[r])&&"_"!==r.charAt(0)){var c=l[r].apply(l,i);if(void 0!==c)return c}else o("no such method '"+r+"' for "+e+" instance");else o("cannot call methods on "+e+" prior to initialization; "+"attempted to call '"+r+"'")}return this}return this.each(function(){var i=t.data(this,e);i?(i.option(r),i._init()):(i=new n(this,r),t.data(this,e,i))})}}if(t){var s=Array.prototype.slice,o="undefined"==typeof console?n:function(e){console.error(e)};t.bridget=function(e,t){r(t),i(e,t)}}}(window,window.jQuery),function(e,t){"use strict";function n(e,t){return e[u](t)}function r(e){var t=document.createDocumentFragment();t.appendChild(e)}function i(e,t){e.parentNode||r(e);for(var n=e.parentNode.querySelectorAll(t),i=0,s=n.length;s>i;i++)if(n[i]===e)return!0;return!1}function s(e,t){return e.parentNode||r(e),n(e,t)}var o,u=function(){for(var e=["matchesSelector","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"],n=0,r=e.length;r>n;n++){var i=e[n];if(t[i])return i}}();if(u){var a=document.createElement("div"),f=n(a,"div");o=f?n:s}else o=i;"function"==typeof define&&define.amd?define(function(){return o}):window.matchesSelector=o}(this,Element.prototype),function(e){"use strict";function t(e){for(var n in t.defaults)this[n]=t.defaults[n];for(n in e)this[n]=e[n]}var n=e.Packery=function(){};n.Rect=t,t.defaults={x:0,y:0,width:0,height:0},t.prototype.contains=function(e){var t=e.width||0,n=e.height||0;return this.x<=e.x&&this.y<=e.y&&this.x+this.width>=e.x+t&&this.y+this.height>=e.y+n},t.prototype.overlaps=function(e){var t=this.x+this.width,n=this.y+this.height,r=e.x+e.width,i=e.y+e.height;return r>this.x&&t>e.x&&i>this.y&&n>e.y},t.prototype.getMaximalFreeRects=function(e){if(!this.overlaps(e))return!1;var n,r=[],i=this.x+this.width,s=this.y+this.height,o=e.x+e.width,u=e.y+e.height;return this.y<e.y&&(n=new t({x:this.x,y:this.y,width:this.width,height:e.y-this.y}),r.push(n)),i>o&&(n=new t({x:o,y:this.y,width:i-o,height:this.height}),r.push(n)),s>u&&(n=new t({x:this.x,y:u,width:this.width,height:s-u}),r.push(n)),this.x<e.x&&(n=new t({x:this.x,y:this.y,width:e.x-this.x,height:this.height}),r.push(n)),r},t.prototype.canFit=function(e){return this.width>=e.width&&this.height>=e.height}}(window),function(e){"use strict";function t(e,t){this.width=e||0,this.height=t||0,this.reset()}var n=e.Packery,r=n.Rect;t.prototype.reset=function(){this.spaces=[],this.newSpaces=[];var e=new r({x:0,y:0,width:this.width,height:this.height});this.spaces.push(e)},t.prototype.pack=function(e){for(var t=0,n=this.spaces.length;n>t;t++){var r=this.spaces[t];if(r.canFit(e)){this.placeInSpace(e,r);break}}},t.prototype.placeInSpace=function(e,t){e.x=t.x,e.y=t.y,this.placed(e)},t.prototype.placed=function(e){for(var n=[],r=0,i=this.spaces.length;i>r;r++){var s=this.spaces[r],o=s.getMaximalFreeRects(e);o?n.push.apply(n,o):n.push(s)}this.spaces=n,t.mergeRects(this.spaces),this.spaces.sort(t.spaceSorterTopLeft)},t.mergeRects=function(e){for(var t=0,n=e.length;n>t;t++){var r=e[t];if(r){var i=e.slice(0);i.splice(t,1);for(var s=0,o=0,u=i.length;u>o;o++){var a=i[o],f=t>o?0:1;r.contains(a)&&(e.splice(o+f-s,1),s++)}}}return e},t.spaceSorterTopLeft=function(e,t){return e.y-t.y||e.x-t.x},t.spaceSorterLeftTop=function(e,t){return e.x-t.x||e.y-t.y},n.Packer=t}(window),function(e){"use strict";function t(e,t){for(var n in t)e[n]=t[n];return e}function n(e,t){this.element=e,this.packery=t,this.position={x:0,y:0},this.rect=new i,this.placeRect=new i,this.element.style.position="absolute"}var r=e.Packery,i=r.Rect,s=e.getSize,o=e.getStyleProperty,u=e.EventEmitter,a=document.defaultView,f=a&&a.getComputedStyle?function(e){return a.getComputedStyle(e,null)}:function(e){return e.currentStyle},l=o("transition"),c=o("transform"),h=l&&c,p=!!o("perspective"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[l],v={WebkitTransform:"-webkit-transform",MozTransform:"-moz-transform",OTransform:"-o-transform",transform:"transform"}[c];t(n.prototype,u.prototype),n.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},n.prototype.getSize=function(){this.size=s(this.element)},n.prototype.css=function(e){var t=this.element.style;for(var n in e)t[n]=e[n]},n.prototype.getPosition=function(){var e=f(this.element),t=parseInt(e.left,10),n=parseInt(e.top,10);t=isNaN(t)?0:t,n=isNaN(n)?0:n;var r=this.packery.elementSize;t-=r.paddingLeft,n-=r.paddingTop,this.position.x=t,this.position.y=n};var m=p?function(e,t){return"translate3d( "+e+"px, "+t+"px, 0)"}:function(e,t){return"translate( "+e+"px, "+t+"px)"};n.prototype._transitionTo=function(e,t){this.getPosition();var n=this.position.x,r=this.position.y,i=parseInt(e,10),s=parseInt(t,10),o=i===this.position.x&&s===this.position.y;if(this.setPosition(e,t),o&&!this.isTransitioning)return this.layoutPosition(),void 0;var u=e-n,a=t-r,f={};f[v]=m(u,a),this.transition(f,this.layoutPosition)},n.prototype.goTo=function(e,t){this.setPosition(e,t),this.layoutPosition()},n.prototype.moveTo=h?n.prototype._transitionTo:n.prototype.goTo,n.prototype.setPosition=function(e,t){this.position.x=parseInt(e,10),this.position.y=parseInt(t,10)},n.prototype.layoutPosition=function(){var e=this.packery.elementSize;this.css({left:this.position.x+e.paddingLeft+"px",top:this.position.y+e.paddingTop+"px"}),this.emitEvent("layout",[this])},n.prototype._nonTransition=function(e,t){this.css(e),t&&t.call(this)},n.prototype._transition=function(e,t){this.transitionStyle=e;var n=[];for(var r in e)n.push(r);var i={};i[l+"Property"]=n.join(","),i[l+"Duration"]=this.packery.options.transitionDuration,this.element.addEventListener(d,this,!1),t&&this.on("transitionEnd",function(e){return t.call(e),!0}),this.css(i),this.css(e),this.isTransitioning=!0},n.prototype.transition=n.prototype[l?"_transition":"_nonTransition"],n.prototype.onwebkitTransitionEnd=function(e){this.ontransitionend(e)},n.prototype.onotransitionend=function(e){this.ontransitionend(e)},n.prototype.ontransitionend=function(e){if(e.target===this.element){this.onTransitionEnd&&(this.onTransitionEnd(),delete this.onTransitionEnd),this.removeTransitionStyles();var t={};for(var n in this.transitionStyle)t[n]="";this.css(t),this.element.removeEventListener(d,this,!1),delete this.transitionStyle,this.isTransitioning=!1,this.emitEvent("transitionEnd",[this])}},n.prototype.removeTransitionStyles=function(){var e={};e[l+"Property"]="",e[l+"Duration"]="",this.css(e)},n.prototype.remove=function(){var e={opacity:0};e[v]="scale(0.001)",this.transition(e,this.removeElem)},n.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},n.prototype.reveal=l?function(){var e={opacity:0};e[v]="scale(0.001)",this.css(e);var t=this.element.offsetHeight,n={opacity:1};n[v]="scale(1)",this.transition(n),t=null}:function(){},n.prototype.destroy=function(){this.css({position:"",left:"",top:""})},n.prototype.dragStart=function(){this.getPosition(),this.removeTransitionStyles(),this.isTransitioning&&c&&(this.element.style[c]="none"),this.getSize(),this.isPlacing=!0,this.needsPositioning=!1,this.positionPlaceRect(this.position.x,this.position.y),this.isTransitioning=!1,this.didDrag=!1},n.prototype.dragMove=function(e,t){this.didDrag=!0;var n=this.packery.elementSize;e-=n.paddingLeft,t-=n.paddingTop,this.positionPlaceRect(e,t)},n.prototype.dragStop=function(){this.getPosition();var e=this.position.x!==this.placeRect.x,t=this.position.y!==this.placeRect.y;this.needsPositioning=e||t,this.didDrag=!1},n.prototype.positionPlaceRect=function(e,t,n){this.placeRect.x=this.getPlaceRectCoord(e,!0),this.placeRect.y=this.getPlaceRectCoord(t,!1,n)},n.prototype.getPlaceRectCoord=function(e,t,n){var r=t?"Width":"Height",i=this.size["outer"+r],s=this.packery[t?"columnWidth":"rowHeight"],o=this.packery.elementSize["inner"+r];t||(o=Math.max(o,this.packery.maxY),this.packery.rowHeight||(o-=this.packery.gutter));var u;if(s){s+=this.packery.gutter,o+=t?this.packery.gutter:0,e=Math.round(e/s);var a=Math[t?"floor":"ceil"](o/s);a-=Math.ceil(i/s),u=a}else u=o-i;return e=n?e:Math.min(e,u),e*=s||1,Math.max(0,e)},n.prototype.copyPlaceRectPosition=function(){this.rect.x=this.placeRect.x,this.rect.y=this.placeRect.y},r.Item=n}(window),function(e){"use strict";function t(e,t){for(var n in t)e[n]=t[n];return e}function n(e){var t=[];if("number"==typeof e.length)for(var n=0,r=e.length;r>n;n++)t.push(e[n]);else t.push(e);return t}function r(e,n){if(!e||!g(e))return v&&v.error("bad Packery element: "+e),void 0;this.element=e,this.options=t({},this.options),t(this.options,n);var r=++b;this.element.packeryGUID=r,w[r]=this,this._create(),this.options.isInitLayout&&this.layout()}var i=e.Packery,s=i.Rect,o=i.Packer,u=i.Item,a=e.classie,f=e.docReady,l=e.EventEmitter,c=e.eventie,h=e.getSize,p=e.matchesSelector,d=e.document,v=e.console,m=e.jQuery,g="object"==typeof HTMLElement?function(e){return e instanceof HTMLElement}:function(e){return e&&"object"==typeof e&&1===e.nodeType&&"string"==typeof e.nodeName},y=Array.prototype.indexOf?function(e,t){return e.indexOf(t)}:function(e,t){for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1},b=0,w={};t(r.prototype,l.prototype),r.prototype.options={containerStyle:{position:"relative"},isInitLayout:!0,isResizeBound:!0,transitionDuration:"0.4s"},r.prototype._create=function(){this.packer=new o,this.reloadItems(),this.stampedElements=[],this.stamp(this.options.stamped);var e=this.options.containerStyle;t(this.element.style,e),this.options.isResizeBound&&this.bindResize();var n=this;this.handleDraggabilly={dragStart:function(e){n.itemDragStart(e.element)},dragMove:function(e){n.itemDragMove(e.element,e.position.x,e.position.y)},dragEnd:function(e){n.itemDragEnd(e.element)}},this.handleUIDraggable={start:function(e){n.itemDragStart(e.currentTarget)},drag:function(e,t){n.itemDragMove(e.currentTarget,t.position.left,t.position.top)},stop:function(e){n.itemDragEnd(e.currentTarget)}}},r.prototype.reloadItems=function(){this.items=this._getItems(this.element.children)},r.prototype._getItems=function(e){for(var t=this._filterFindItemElements(e),n=[],r=0,i=t.length;i>r;r++){var s=t[r],o=new u(s,this);n.push(o)}return n},r.prototype._filterFindItemElements=function(e){e=n(e);var t=this.options.itemSelector;if(!t)return e;for(var r=[],i=0,s=e.length;s>i;i++){var o=e[i];p(o,t)&&r.push(o);for(var u=o.querySelectorAll(t),a=0,f=u.length;f>a;a++)r.push(u[a])}return r},r.prototype.getItemElements=function(){for(var e=[],t=0,n=this.items.length;n>t;t++)e.push(this.items[t].element);return e},r.prototype.layout=function(){this._prelayout();var e=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},r.prototype._init=r.prototype.layout,r.prototype._prelayout=function(){this.elementSize=h(this.element),this._getMeasurements(),this.packer.width=this.elementSize.innerWidth+this.gutter,this.packer.height=Number.POSITIVE_INFINITY,this.packer.reset(),this.maxY=0,this.placeStampedElements()},r.prototype._getMeasurements=function(){this._getMeasurement("columnWidth","width"),this._getMeasurement("rowHeight","height"),this._getMeasurement("gutter","width")},r.prototype._getMeasurement=function(e,t){var n,r=this.options[e];r?("string"==typeof r?n=this.element.querySelector(r):g(r)&&(n=r),this[e]=n?h(n)[t]:r):this[e]=0},r.prototype.layoutItems=function(e,t){var n=this._getLayoutItems(e);this._itemsOn(n,"layout",function(){this.emitEvent("layoutComplete",[this,n])});for(var r=0,i=n.length;i>r;r++){var s=n[r];this._packItem(s),this._layoutItem(s,t)}var o=this.elementSize,u=this.maxY-this.gutter;o.isBorderBox&&(u+=o.paddingBottom+o.paddingTop+o.borderTopWidth+o.borderBottomWidth),this.element.style.height=u+"px"},r.prototype._getLayoutItems=function(e){for(var t=[],n=0,r=e.length;r>n;n++){var i=e[n];i.isIgnored||t.push(i)}return t},r.prototype._packItem=function(e){this._setRectSize(e.element,e.rect),this.packer.pack(e.rect),this._setMaxY(e.rect)},r.prototype._setMaxY=function(e){this.maxY=Math.max(e.y+e.height,this.maxY)},r.prototype._setRectSize=function(e,t){var n=h(e),r=n.outerWidth,i=n.outerHeight,s=this.columnWidth+this.gutter,o=this.rowHeight+this.gutter;r=this.columnWidth?Math.ceil(r/s)*s:r+this.gutter,i=this.rowHeight?Math.ceil(i/o)*o:i+this.gutter,t.width=Math.min(r,this.packer.width),t.height=i},r.prototype._layoutItem=function(e,t){var n=e.rect;t?e.goTo(n.x,n.y):e.moveTo(n.x,n.y)},r.prototype._itemsOn=function(e,t,n){function r(){return i++,i===s&&n.call(o),!0}for(var i=0,s=e.length,o=this,u=0,a=e.length;a>u;u++){var f=e[u];f.on(t,r)}},r.prototype.stamp=function(e){if(e){"string"==typeof e&&(e=this.element.querySelectorAll(e)),e=n(e),this.stampedElements.push.apply(this.stampedElements,e);for(var t=0,r=e.length;r>t;t++){var i=e[t];this.ignore(i)}}},r.prototype.unstamp=function(e){if(e){e=n(e);for(var t=0,r=e.length;r>t;t++){var i=e[t],s=y(this.stampedElements,i);-1!==s&&this.stampedElements.splice(s,1),this.unignore(i)}}},r.prototype.placeStampedElements=function(){if(this.stampedElements&&this.stampedElements.length){this._getBounds();for(var e=0,t=this.stampedElements.length;t>e;e++){var n=this.stampedElements[e];this.placeStamp(n)}}},r.prototype._getBounds=function(){var e=this.element.getBoundingClientRect();this._boundingLeft=e.left+this.elementSize.paddingLeft,this._boundingTop=e.top+this.elementSize.paddingTop},r.prototype.placeStamp=function(e){var t,n=this.getItem(e);t=n&&n.isPlacing?n.placeRect:this._getElementOffsetRect(e),this._setRectSize(e,t),this.packer.placed(t),this._setMaxY(t)},r.prototype._getElementOffsetRect=function(e){var t=e.getBoundingClientRect(),n=new s({x:t.left-this._boundingLeft,y:t.top-this._boundingTop});return n.x-=this.elementSize.borderLeftWidth,n.y-=this.elementSize.borderTopWidth,n},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.bindResize=function(){this.isResizeBound||(c.bind(e,"resize",this),this.isResizeBound=!0)},r.prototype.unbindResize=function(){c.unbind(e,"resize",this),this.isResizeBound=!1},r.prototype.onresize=function(){function e(){t.resize()}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var t=this;this.resizeTimeout=setTimeout(e,100)},r.prototype.resize=function(){var e=h(this.element);e.innerWidth!==this.elementSize.innerWidth&&(this.layout(),delete this.resizeTimeout)},r.prototype.addItems=function(e){var t=this._getItems(e);if(t.length)return this.items.push.apply(this.items,t),t},r.prototype.appended=function(e){var t=this.addItems(e);t.length&&(this.layoutItems(t,!0),this.reveal(t))},r.prototype.prepended=function(e){var t=this._getItems(e);if(t.length){var n=this.items.slice(0);this.items=t.concat(n),this._prelayout(),this.layoutItems(t,!0),this.reveal(t),this.layoutItems(n)}},r.prototype.reveal=function(e){if(e&&e.length)for(var t=0,n=e.length;n>t;t++){var r=e[t];r.reveal()}},r.prototype.getItem=function(e){for(var t=0,n=this.items.length;n>t;t++){var r=this.items[t];if(r.element===e)return r}},r.prototype.getItems=function(e){if(e&&e.length){for(var t=[],n=0,r=e.length;r>n;n++){var i=e[n],s=this.getItem(i);s&&t.push(s)}return t}},r.prototype.remove=function(e){e=n(e);var t=this.getItems(e);this._itemsOn(t,"remove",function(){this.emitEvent("removeComplete",[this,t])});for(var r=0,i=t.length;i>r;r++){var s=t[r];s.remove();var o=y(this.items,s);this.items.splice(o,1)}},r.prototype.ignore=function(e){var t=this.getItem(e);t&&(t.isIgnored=!0)},r.prototype.unignore=function(e){var t=this.getItem(e);t&&delete t.isIgnored},r.prototype.sortItemsByPosition=function(){this.items.sort(function(e,t){return e.position.y-t.position.y||e.position.x-t.position.x})},r.prototype.fit=function(e,t,n){function r(){o++,2===o&&s.emitEvent("fitComplete",[s,i])}var i=this.getItem(e);if(i){this._getMeasurements(),this.stamp(i.element),i.getSize(),i.isPlacing=!0,t=void 0===t?i.rect.x:t,n=void 0===n?i.rect.y:n,i.positionPlaceRect(t,n,!0);var s=this,o=0;i.on("layout",function(){return r(),!0}),this.on("layoutComplete",function(){return r(),!0}),i.moveTo(i.placeRect.x,i.placeRect.y),this.layout(),this.unstamp(i.element),this.sortItemsByPosition(),i.isPlacing=!1,i.copyPlaceRectPosition()}},r.prototype.itemDragStart=function(e){this.stamp(e);var t=this.getItem(e);t&&t.dragStart()},r.prototype.itemDragMove=function(e,t,n){function r(){s.layout(),delete s.dragTimeout}var i=this.getItem(e);i&&i.dragMove(t,n);var s=this;this.clearDragTimeout(),this.dragTimeout=setTimeout(r,40)},r.prototype.clearDragTimeout=function(){this.dragTimeout&&clearTimeout(this.dragTimeout)},r.prototype.itemDragEnd=function(e){function t(){return o++,o!==s?!0:(r&&(a.remove(r.element,"is-positioning-post-drag"),r.isPlacing=!1,r.copyPlaceRectPosition()),u.unstamp(e),u.sortItemsByPosition(),r&&i&&u.emitEvent("dragItemPositioned",[u,r]),!0)}var n,r=this.getItem(e);if(r&&(n=r.didDrag,r.dragStop()),!r||!n&&!r.needsPositioning)return this.unstamp(e),void 0;a.add(r.element,"is-positioning-post-drag");var i=r.needsPositioning,s=i?2:1,o=0,u=this;i?(r.on("layout",t),r.moveTo(r.placeRect.x,r.placeRect.y)):r&&r.copyPlaceRectPosition(),this.clearDragTimeout(),this.on("layoutComplete",t),this.layout()},r.prototype.bindDraggabillyEvents=function(e){e.on("dragStart",this.handleDraggabilly.dragStart),e.on("dragMove",this.handleDraggabilly.dragMove),e.on("dragEnd",this.handleDraggabilly.dragEnd)},r.prototype.bindUIDraggableEvents=function(e){e.on("dragstart",this.handleUIDraggable.start).on("drag",this.handleUIDraggable.drag).on("dragstop",this.handleUIDraggable.stop)},r.prototype.destroy=function(){this.element.style.position="",this.element.style.height="",delete this.element.packeryGUID;for(var e=0,t=this.items.length;t>e;e++){var n=this.items[e];n.destroy()}this.unbindResize()},r.data=function(e){var t=e.packeryGUID;return t&&w[t]},f(function(){for(var e=d.querySelectorAll(".js-packery"),t=0,n=e.length;n>t;t++){var i,s=e[t],o=s.getAttribute("data-packery-options");try{i=o&&JSON.parse(o)}catch(u){v&&v.error("Error parsing data-packery-options on "+s.nodeName.toLowerCase()+(s.id?"#"+s.id:"")+": "+u);continue}var a=new r(s,i);m&&m.data(s,"packery",a)}}),m&&m.bridget&&m.bridget("packery",r),r.Rect=s,r.Packer=o,r.Item=u,e.Packery=r}(window);(function(e,t){var n={"private":{enableEditing:function(t,n){t.find("a[data-inline-command=options-tile]").not(".event-bound").on("click",function(){var t=e(this).closest("div.ccm-aggregator-item").attr("data-aggregator-item-id"),r=CCM_TOOLS_PATH+"/aggregator/edit_template?agiID="+t;jQuery.fn.dialog.open({modal:!0,href:r,width:"400",height:"150",title:n.titleEditTemplate})}).addClass("event-bound");var r=e(t.packery("getItemElements")).not(".event-bound");r.draggable({handle:"a[data-inline-command=move-tile]",start:function(){e.fn.ccmmenu.disable();e(".ccm-area-block-dropzone").addClass("ccm-area-block-dropzone-active")},stop:function(){e.fn.ccmmenu.enable();e(".ccm-area-block-dropzone").removeClass("ccm-area-block-dropzone-active");t.packery("layout")}});t.packery("on","dragItemPositioned",function(t,r){var s=[{name:"task",value:"update_display_order"},{name:"agID",value:n.agID},{name:"editToken",value:n.editToken}],o=[],u=t.getItemElements();for(i=0;i<u.length;i++){var a=e(u[i]);s.push({name:"agiID["+a.attr("data-aggregator-item-batch-timestamp")+"][]",value:a.attr("data-aggregator-item-id")})}e.ajax({type:"post",url:CCM_TOOLS_PATH+"/aggregator/update",data:s})});t.packery("bindUIDraggableEvents",r);r.resizable({handles:"se",grid:[n.columnWidth,n.rowHeight],resize:function(r,i){var s=i.element,o=parseInt(s.css("width")),u=parseInt(s.css("height")),a=Math.floor(o/n.columnWidth),f=Math.floor(u/n.rowHeight);t.packery("layout");e.ajax({type:"post",url:CCM_TOOLS_PATH+"/aggregator/update",data:{task:"resize",agID:n.agID,agiID:s.attr("data-aggregator-item-id"),agiSlotWidth:a,agiSlotHeight:f,editToken:n.editToken}})}});r.not(".event-bound").addClass("event-bound")}},setupTemplateForm:function(t){return this.each(function(){var n=e(this);n.on("submit",function(){jQuery.fn.dialog.showLoader();e.ajax({type:"POST",data:{agtID:n.find("select[name=agtID]").val(),agiID:t.agiID,token:t.updateToken},url:CCM_TOOLS_PATH+"/aggregator/edit_template",success:function(n){jQuery.fn.dialog.hideLoader();e("[data-aggregator-item-id="+t.agiID+"]").find("div.ccm-aggregator-item-inner-render").html(n);jQuery.fn.dialog.closeTop()}});return!1})})},deleteItem:function(t){jQuery.fn.dialog.showLoader();e.ajax({type:"POST",data:{task:"delete_item",agiID:t.agiID,token:t.deleteToken},url:CCM_TOOLS_PATH+"/aggregator/edit_template",success:function(n){jQuery.fn.dialog.hideLoader();var r=e("[data-aggregator-item-id="+t.agiID+"]"),i=r.parent();r.remove();i.packery("layout");jQuery.fn.dialog.closeTop()}})},init:function(t){var t=e.extend({totalPages:0,columnWidth:120,itemsPerPage:24,rowHeight:120,showTileComamnds:0},t);return this.each(function(){var r=e(this);e(this).data("options",t);var i=r.parent().find("button[data-aggregator-button=aggregator-load-more-items]");t.totalPages==1&&i.hide();r.packery({columnWidth:t.columnWidth,rowHeight:t.rowHeight});r.css("opacity",1);i.on("click",function(){page=parseInt(r.attr("data-aggregator-current-page")),newPage=page+1;i.prop("disabled",!0);e.ajax({type:"post",url:CCM_TOOLS_PATH+"/aggregator/load_more",data:{task:"get_aggregator_items",agID:t.agID,page:newPage,itemsPerPage:t.itemsPerPage,loadToken:t.loadToken,editToken:t.editToken,showTileCommands:t.showTileCommands},success:function(s){var o=e("<div />").append(s).find(">div");e.each(o,function(e,t){r.append(t)});r.packery("appended",o);if(newPage==t.totalPages)i.hide();else{i.prop("disabled",!1);r.attr("data-aggregator-current-page",newPage)}t.showTileCommands&&n.private.enableEditing(r,t)}})});t.showTileCommands&&n.private.enableEditing(r,t)})}};e.fn.ccmaggregator=function(t){if(n[t])return n[t].apply(this,Array.prototype.slice.call(arguments,1));if(typeof t=="object"||!t)return n.init.apply(this,arguments);e.error("Method "+t+" does not exist on jQuery.ccmaggregator")}})(jQuery,window);