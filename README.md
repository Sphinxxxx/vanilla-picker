# vanilla-picker

A simple, easy to use, versatile and customizable vanilla JS color picker.

Using it is as simple as this: 

```javascript
var parent = document.querySelector('#parent');
var picker = new Picker(parent);

parent.onclick = function() {
    picker.show();
};
picker.onDone = function(color) {
    parent.style.background = color.rgbaString;
};
```

#### Demo

https://rawgit.com/Sphinxxxx/vanilla-picker/master/demo/index.html

https://codepen.io/Sphinxxxx/pen/zRmKBX


## Explained

```html
<script src="picker.min.js"></script>

<div id="parent">click me</div>

<script>

    /*
        STEP 1
        Create a new Picker object and set the parent element.
    */
    var parent = document.querySelector('#parent');
    var picker = new Picker(parent);

    /*
        STEP 2
        Set the color picker to open when you want, when the parent is clicked for example.
    */
    parent.onclick = function() {
        picker.show();
    };

    /*
        STEP 3
        You can do what you want with the chosen color using two callbacks: onChange and onDone.
    */
    picker.onDone = function(color) {

        /*
            You can get the color components from
                color.rgba
                color.hsla  (all values between 0 and 1, inclusive)
    
            ..or ready to use CSS values from
                color.rgbString
                color.rgbaString
                color.hslString
                color.hslaString
                color.hex   (eight digit #RRGGBBAA, not supported in all browsers)
        */

        parent.style.background = color.rgbaString;
    };

    /* onChange is called every time the selection is changed without clicking 'Ok' */

</script>
```


## Options

```javascript
var picker = new Picker({

    parent:        /* Which element the picker should be attached to */
    
    /* If the picker is used as a popup, where to place it relative to the parent */
    popup: 'right' (default)
           'left'
           'top'
           'bottom'
           false   /* No popup, just add the picker as a normal element on the page */

    alpha: true    /* Whether to enable adjusting the alpha channel */
    
    color:         /* Initial color for the picker        (or call picker.setColor()) */
    
    onChange:      /* Callback whenever the color changes (or set  picker.onChange) */
    
    onDone:        /* Callback when the user clicks "Ok"  (or set  picker.onDone) */

});
```


## Credits

* Based on https://github.com/dissimulate/Picker by **Adam Brooks**
* Built with https://github.com/Joudee/color-conversion by **Joudee**
* Built with https://gist.github.com/mjackson/5311256 by **Michael Jackson**


## License

The ISC license - see the [LICENSE.md](LICENSE.md) file for details.
