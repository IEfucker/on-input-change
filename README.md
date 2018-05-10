## fork from https://github.com/bbarakaci/on-input-change

## Features added

[ ] "oninput" event polyfill triggered by jQuery in IE8-(IE9 need fix), native event in modern browser

[ ] delegation

[ ] "oninput" feature detection


## sample code

```
// use feature check if you need
$.onInputSupport

// init, add input event polyfill to element needed
$.onInputChange({
    selector: "#textInput"
})

// add input event handler
$("#textInput").on("input", function (e) {
    var value = $(e.target).val()
    console.log(value)
})

```


====================

#On Input Change

oninput event is not supported by ie lt 9 and is buggy on ie9.

This jQuery plugin will use the native oninput event, will fallback to setInterval method on Internet Explorer.

There is a simple [demo/development](http://bbarakaci.github.com/on-input-change/) page to see it in action.

##Download

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/bbarakaci/on-input-change/master/dist/fixto.min.js
[max]: https://raw.github.com/bbarakaci/on-input-change/master/dist/fixto.js

##Usage
    $('input').onInputChange(function(value, element){
        console.log(value);
        console.log(element);
    });
    
##Options

###time

Set time in milliseconds for the setInterval method. Default is 150.

    $('input').onInputChange(anyfunction, {time:200});