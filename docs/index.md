# vanilla-picker

<div id="example-container">
    <div id="example-picker"></div>
    <script src="https://unpkg.com/vanilla-picker"></script>
    <script>
        new Picker({
            parent: document.querySelector('#example-picker'),
            popup: false,
            color: 'dodgerblue',
            onChange: function(color) { this.settings.parent.style.color = color.rgbaString; },
        });
    </script>
</div>

A simple, easy to use vanilla JS (no dependencies) color picker with alpha selection.

<a id="demo" class="abo-linkbtn" href="https://codepen.io/Sphinxxxx/pen/zRmKBX?editors=1010" >Try it yourself!</a>


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
    // Create a new Picker instance and set the parent element.
    // By default, the color picker is a popup which appears when you click the parent.
    var parent = document.querySelector('#parent');
    var picker = new Picker(parent);

    // You can do what you want with the chosen color using two callbacks: onChange and onDone.
    picker.onChange = function(color) {
        parent.style.background = color.rgbaString;
    };

    // onDone is similar to onChange, but only called when you click 'Ok'.
</script>
```


## Documentation

[API and advanced options](./gen/Picker.html)  
[Source](https://github.com/Sphinxxxx/vanilla-picker)
