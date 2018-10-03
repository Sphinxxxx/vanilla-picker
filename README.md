# vanilla-picker

[![License](https://img.shields.io/npm/l/vanilla-picker.svg)](https://github.com/Sphinxxxx/vanilla-picker/blob/master/LICENSE.md)
[![Version](https://img.shields.io/npm/v/vanilla-picker.svg)](https://npmjs.com/vanilla-picker)
[![Size](https://badgen.net/badgesize/gzip/sphinxxxx/vanilla-picker/master/dist/vanilla-picker.min.js?label=min%2Bgzip)](https://unpkg.com/vanilla-picker)
[![Downloads](https://img.shields.io/npm/dm/vanilla-picker.svg)](https://npmjs.com/vanilla-picker)

A simple, easy to use vanilla JS (no dependencies) color picker with alpha selection.

#### Demo

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
        parent.style.background = color.rgbaString;
    };

    /* onDone is similar to onChange, but only called when you click 'Ok' */

</script>
```


## API and advanced options

https://vanilla-picker.js.org/gen/Picker.html


## Accessibility

The color picker is built to support basic keyboard navigation and use with screen readers.
I would be very interested in feedback on improvements that could be done here!


## Credits

* Based on https://github.com/dissimulate/Picker by **Adam Brooks**
* Built with https://github.com/Joudee/color-conversion by **Joudee**
* Built with https://gist.github.com/mjackson/5311256 by **Michael Jackson**


## License

The ISC license - see the [LICENSE.md](LICENSE.md) file for details.
