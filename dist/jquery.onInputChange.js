/*
 * on-input-change 0.1.0
 * IE9- input event polyfill
 * Copyright 2018, Jack Bai
 * Released under the MIT license.
*/

!function(i){function o(t){return"function"!=typeof document.createElement?document.createElement(t):t?document.createElementNS.call(document,"http://www.w3.org/2000/svg",t):document.createElement.apply(document,arguments)}var u;var l=(u=!("onblur"in document.documentElement),function(t,e){var n;return!!t&&(e&&"string"!=typeof e||(e=o(e||"div")),!(n=(t="on"+t)in e)&&u&&(e.setAttribute||(e=o("div")),e.setAttribute(t,""),n="function"==typeof e[t],void 0!==e[t]&&(e[t]=void 0),e.removeAttribute(t)),n)})("input");function e(t){var e=t.selector||"",n=t.time||150;this.$element=i(e),this.element=this.$element[0],this.element&&!l&&(this.options=i.extend({time:n},t),i("body").on("focus",e,i.proxy(this._listen,this)),i("body").on("blur",e,i.proxy(this._unlisten,this)))}e.prototype={_listen:function(){return console.log("listen"),this.value=this.element.value,this._interval=window.setInterval(i.proxy(this._check,this),this.options.time),!0},_unlisten:function(){return console.log("unlisten"),window.clearInterval(this._interval),!0},_run:function(){this.value=this.element.value,this.$element.trigger("input")},_check:function(){this.element.value!=this.value&&this._run()}},i.extend({onInputChange:function(t){new e(t)},onInputSupport:l})}(window.jQuery);