/*
 * oninput-polyfill 0.1.0
 * IE9- oninput polyfill
 * Copyright 2018, Jack Bai
 * Released under the MIT license.
*/

!function(r){var i,t=(i=!("onblur"in document.documentElement),function(t,e){var n;return!!t&&(e&&"string"!=typeof e||(e=document.createElement(e||"div")),!(n=(t="on"+t)in e)&&i&&(e.setAttribute||(e=createElement("div")),e.setAttribute(t,""),n="function"==typeof e[t],void 0!==e[t]&&(e[t]=void 0),e.removeAttribute(t)),n)});var e,n,s=(e=navigator.appName,n=navigator.appVersion.split(";")[1].replace(/[ ]/g,""),("Microsoft Internet Explorer"!=e||"MSIE9.0"!=n)&&t("input","input"));function o(t){var e=t.selector||"",n=t.time||150;if(this.$element=r(e),this.element=this.$element[0],this.element&&!s&&!s){this.options=r.extend({time:n},t);var i=r.proxy(this._listen,this),o=r.proxy(this._unlisten,this);r("body").on("focus",e,i),r("body").on("blur",e,o)}}o.prototype={_listen:function(){return this.value=this.element.value,this._interval=window.setInterval(r.proxy(this._check,this),this.options.time),!0},_unlisten:function(){return window.clearInterval(this._interval),!0},_run:function(){this.value=this.element.value,this.$element.trigger("input",{isCustom:!0})},_check:function(){console.log(this.element.value,this.value),this.element.value!=this.value&&this._run()}},r.extend({onInputPolyfill:function(t){new o(t)},onInputSupport:s})}(window.jQuery);