Picker
======

A simple, easy to use, versatile and customisable Javascript colour picker.


Demo: http://lonely-pixel.com/projects/picker


Using Picker is as simple as this: 

```javascript
var parent = document.getElementById('parent');

var picker = new Picker(parent);

parent.onclick = function() {

    picker.show();
};

picker.on_done = function(colour) {

    parent.style.background = colour.rgba().toString();
};
```

Explained: 

```javascript
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
    on_change and on_done.
    */

    picker.on_done = function(colour) {

        /*
        You can get the colour using the hsl(), hsla(), rgb(), rgba() and hex() functions.

        Each function returns an object containing each component (e.g r, g and b) and a
        toString() function, which returns the colour as a string to use with CSS or JS.
        E.g 'rgba(255, 0, 0, 0.4)'.
        */

        parent.style.background = colour.rgba().toString();
    };

    /* on_change is called every time the selection is changed without clicking 'ok' */

</script>
```

There are also a number of options you can choose. 

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


You can customise the CSS in the source file, or do it dynamically like so: 

```javascript
picker.wrapper.background = '#333';
```

Easy! 

Picker is in it's early stages, and although it's fully functional and usable, there could be a bug or two. Please let me know if you find a problem, have feedback or would like to contact me for any other reason via contact@lonely-pixel.com. 
