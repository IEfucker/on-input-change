## fork from https://github.com/bbarakaci/on-input-change

## Features added

[ ] "oninput" event polyfill triggered by jQuery in IE8-(IE9 need fix), native event in modern browser

[ ] delegation

[ ] "oninput" feature detection

## options

### selector
DOM element's seletor, which would be added an 'input' event polyfill

### time
Set time in milliseconds for the setInterval method. Default is 150

## sample code

```js
// use feature check if you need
$.onInputSupport

// init, add input event polyfill to element needed
$.onInputPolyfill({
    selector: "#textInput"
})

// add input event handler
$("#textInput").on("input", function (e) {
    var value = $(e.target).val()
    console.log(value)
})

```

## tips

Event "input" fires like native behavior, you may need a debounce for performance, when using a long-time computation or firing a network request.

So implement debounce yourself, like this:

```js
/* get debounce fn code from http://underscorejs.org/docs/underscore.html#section-83,
or use a third lib like underscore directly
*/

// original "input" event handler
function callback(e){

}

// debounce callback
function dCallback(e){
	_.debounce(callback,t)(e)
}

// handler
$("#textInput").on("input", dCallback)

```