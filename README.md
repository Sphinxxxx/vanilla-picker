# vanilla-picker

A simple, easy to use vanilla JS (no dependencies) color picker with alpha selection.

#### Demo

https://rawgit.com/Sphinxxxx/vanilla-picker/master/demo/index.html  
https://codepen.io/Sphinxxxx/pen/zRmKBX


## Getting Started

#### Installing

* For the pros:

  + ```npm install vanilla-picker --save```
  + ```import Picker from 'vanilla-picker';```

* For the rest of us:

```
<script src="https://unpkg.com/vanilla-picker@2"></script>
```

#### Usage

```html
<div id="parent">Click me</div>

<script>

    /*
        Create a new Picker instance and set the parent element.
        By default, the color picker is a popup which appears when you click the parent.
    */
    var parent = document.querySelector('#parent');
    var picker = new Picker(parent);

    /*
        You can do what you want with the chosen color using two callbacks: onChange and onDone.
    */
    picker.onChange = function(color) {

        /*
            You can get the color components from
                color.rgba
                color.hsla  (all values between 0 and 1, inclusive)
    
            ..or ready-to-use CSS values from
                color.rgbString
                color.rgbaString
                color.hslString
                color.hslaString
                color.hex   (8 digit #RRGGBBAA, not supported in all browsers)
        */

        parent.style.background = color.rgbaString;
    };

    /* onDone is similar to onChange, but only called when you click 'Ok' */

</script>
```


## Options

```javascript
var picker = new Picker({

    parent:               /* Which element the picker should be attached to */
    
    /* If the picker is used as a popup, where to place it relative to the parent */
    popup:     'right'    //Default
               'left'
               'top'
               'bottom'
                false     //No popup, just add the picker as a normal child element of the parent
    
    template:             /* Custom HTML string from which to build the picker. See src/picker.pug for required elements and class names */
    
    layout:    'default'  /* Suffix of a custom "layout_..." CSS class to handle the overall arrangement of the picker elements */
    
    alpha:      true      /* Whether to enable adjusting the alpha channel */
    
    editor:     true      /* Whether to show a text field for color value editing */
    
    color:                /* Initial color for the picker        (or call picker.setColor()) */
    
    onChange:             /* Callback whenever the color changes (or set  picker.onChange) */
    
    onDone:               /* Callback when the user clicks "Ok"  (or set  picker.onDone) */

});
```


## Credits

* Based on https://github.com/dissimulate/Picker by **Adam Brooks**
* Built with https://github.com/Joudee/color-conversion by **Joudee**
* Built with https://gist.github.com/mjackson/5311256 by **Michael Jackson**


## License

The ISC license - see the [LICENSE.md](LICENSE.md) file for details.
