Picker
======

A simple, easy to use, versatile and customisable Javascript colour picker.

Using Picker is as simple as this: 

```javascript
var parent = document.getElementById('parent');

var picker = new Picker(parent);

parent.onclick = function() {
    picker.show();
};

picker.onDone = function(colour) {
    parent.style.background = colour.rgbaString;
};
```

Demo: https://rawgit.com/Sphinxxxx/Picker/master/demo/index.html


Explained
---------

```html
<script src="picker.min.js"></script>

<div id="parent">click me</div>

<script>

    /* STEP 1 */

    /* Create a new picker object and set the parent element. */

    var parent = document.getElementById('parent'); /* or jQuery */ $('#parent');

    var picker = new Picker(parent);


    /* STEP 2 */

    /* Set Picker to open when you want, when the parent is clicked for example. */

    parent.onclick = function() {
        picker.show();
    };

    /* STEP 3 */

    /*
    You can do what you want with the chosen colour using two events,
    onChange and onDone.
    */

    picker.onDone = function(colour) {

        /*
        You can get the colour components from
            colour.rgba
            colour.hsla  (all values between 0 and 1, inclusive)

        ..or ready to use CSS values from
            colour.rgbString
            colour.rgbaString
            colour.hslString
            colour.hslaString
            colour.hex   (eight digit #RRGGBBAA, not supported in all browsers)
        */

        parent.style.background = colour.rgbaString;
    };

    /* onChange is called every time the selection is changed without clicking 'ok' */

</script>
```


TODO: Options
-------------

```javascript
var picker = new Picker({

    /* The colour picker's parent */
    parent: (parent element),

    /*
    Where the colour picker is relative to the parent.
    Defaults to 'right'.
    */
    orientation: ('left', 'right', 'top', 'bottom', 'centre', 'center'),

    /*
    The colour picker's x position relative to the parent.
    Defaults to 'auto'.
    */
    x: (number),

    /*
    The colour picker's y position relative to the parent.
    Defaults to 'auto'.
    */
    y: (number),

    /*
    The colour picker's arrow size.
    Defaults to 20.
    */
    arrow_size: (number)
});
```
