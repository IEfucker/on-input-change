
/*
	ie9 doesn't trigger oninput event when content is removed with BACKSPACE, ctrl+x etc...
	API:
	1.$.onInputSupport for feature check
	2.$.onInputPolyfill({
		selector,
		time
	}})
	*/
(function ($) {
	// code form modernizr.js, but not reliable in ie9+(but it seems to work fine)
	// https://github.com/Modernizr/Modernizr/issues/210
	// https://github.com/Modernizr/Modernizr/wiki/Undetectables
	var hasEvent = (function () {
		// Detect whether event support can be detected via `in`. Test on a DOM element
		// using the "blur" event b/c it should always exist. bit.ly/event-detection
		var needsFallback = !('onblur' in document.documentElement);

		function inner(eventName, element) {
			var isSupported;
			if (!eventName) { return false; }
			if (!element || typeof element === 'string') {
				element = document.createElement(element || 'div');
			}

			// Testing via the `in` operator is sufficient for modern browsers and IE.
			// When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
			// "resize", whereas `in` "catches" those.
			eventName = 'on' + eventName;
			isSupported = eventName in element;

			// Fallback technique for old Firefox - bit.ly/event-detection
			if (!isSupported && needsFallback) {
				if (!element.setAttribute) {
					// Switch to generic element if it lacks `setAttribute`.
					// It could be the `document`, `window`, or something else.
					element = createElement('div');
				}

				element.setAttribute(eventName, '');
				isSupported = typeof element[eventName] === 'function';

				if (element[eventName] !== undefined) {
					// If property was created, "remove it" by setting value to `undefined`.
					element[eventName] = undefined;
				}
				element.removeAttribute(eventName);
			}

			return isSupported;
		}
		return inner;
	})()

	function now() {
		return Date.now() || new Date().getTime()
	}

	function isIE9() {
		var browser = navigator.appName
		var b_version = navigator.appVersion
		var version = b_version.split(";")
		var trim_Version = version[1].replace(/[ ]/g, "")
		return (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0")
	}

	/* In IE9 oninput won't fire by backspace, delete, ctrl+z, cut(keyboard/mouse) and so on..
		so use interval instead
	*/
	var onInputSupport = isIE9() ? false : hasEvent("input", "input")

	/* 
	onInputPolyfill constructor
	opt:{
		selector,
		time
	}
	*/
	function OnInputPolyfill(opt) {
		var selector = opt.selector || "",
			time = opt.time || 150,
			self = this

		this.$element = $(selector)
		this.element = this.$element[0]
		// selector invalid 
		if (!this.element || onInputSupport) return

		// oninput support,use native event
		if (onInputSupport) return

		this.options = $.extend({
			time: time
		}, opt)

		var listen = $.proxy(this._listen, this),
			unlisten = $.proxy(this._unlisten, this)

		$("body").on("focus", selector, listen)
		$("body").on("blur", selector, unlisten)


	}

	OnInputPolyfill.prototype = {
		_listen: function () {
			// init this.value in delegate way
			this.value = this.element.value
			this._interval = window.setInterval($.proxy(this._check, this), this.options.time);
			return true;
		},

		_unlisten: function () {
			window.clearInterval(this._interval);
			return true;
		},

		_run: function () {
			this.value = this.element.value;
			this.$element.trigger("input", { isCustom: true })
		},

		_check: function () {
			console.log(this.element.value, this.value)
			if (this.element.value != this.value) {
				this._run();
			}
		}
	};

	$.extend({
		onInputPolyfill: function (opt) {
			new OnInputPolyfill(opt)
		},
		onInputSupport: onInputSupport
	})

})(window.jQuery)


