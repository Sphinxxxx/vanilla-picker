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
        parent.style.background = color.rgbaString;
    };

    /* onDone is similar to onChange, but only called when you click 'Ok' */

</script>
```


## API and advanced options

https://rawgit.com/Sphinxxxx/vanilla-picker/master/docs/gen/Picker.html


## Credits

* Based on https://github.com/dissimulate/Picker by **Adam Brooks**
* Built with https://github.com/Joudee/color-conversion by **Joudee**
* Built with https://gist.github.com/mjackson/5311256 by **Michael Jackson**


## License

The ISC license - see the [LICENSE.md](LICENSE.md) file for details.
