/*
 * oninput-polyfill 0.1.0
 * IE9- oninput polyfill
 * Copyright 2018, Jack Bai
 * Released under the MIT license.
*/

!function(l){var i;var a=(i=!("onblur"in document.documentElement),function(t,e){var n;return!!t&&(e&&"string"!=typeof e||(e=document.createElement(e||"div")),!(n=(t="on"+t)in e)&&i&&(e.setAttribute||(e=createElement("div")),e.setAttribute(t,""),n="function"==typeof e[t],void 0!==e[t]&&(e[t]=void 0),e.removeAttribute(t)),n)})("input","input");function e(t){var e=t.selector||"",n=t.time||150,i=this;if(this.$element=l(e),this.element=this.$element[0],this.element&&!a){this.options=l.extend({time:n},t);var o,r,u=l.proxy(this._listen,this),s=l.proxy(this._unlisten,this);l("body").on("focus",e,u),l("body").on("blur",e,s),o=navigator.appName,r=navigator.appVersion.split(";")[1].replace(/[ ]/g,""),"Microsoft Internet Explorer"==o&&"MSIE9.0"==r&&(l("body").on("onkeydown",e,function(){var t=window.event.keyCode;8!=t&&46!=t||i.$element.trigger("input",{isCustom:!0})}),l("body").on("oncut",e,function(){i.$element.trigger("input",{isCustom:!0})}))}}e.prototype={_listen:function(){return this.value=this.element.value,this._interval=window.setInterval(l.proxy(this._check,this),this.options.time),!0},_unlisten:function(){return window.clearInterval(this._interval),!0},_run:function(){this.value=this.element.value,this.$element.trigger("input",{isCustom:!0})},_check:function(){this.element.value!=this.value&&this._run()}},l.extend({onInputPolyfill:function(t){new e(t)},onInputSupport:a})}(window.jQuery);