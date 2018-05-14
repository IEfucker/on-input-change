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
