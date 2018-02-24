import Color from '@sphinxxxx/color-conversion';
import dragTracker from 'drag-tracker';


/* Inlined Picker CSS */
document.documentElement.firstElementChild //<head>, or <body> if there is no <head>
    .appendChild(document.createElement('style')).textContent = '## PLACEHOLDER-CSS ##';


const BG_TRANSP = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E")`;
const HUES = 360;

class Picker {

    constructor(options) {

        /* default settings */

        this.settings = {
            parent: document.body,
            orientation: 'right',
            x: 'auto',
            y: 'auto',
            arrowSize: 20,
        };

        if (options instanceof HTMLElement) {
            this.settings.parent = options;
        }
        else {
            for (const name in options) {
                this.settings[name] = options[name];
            }
        }

        /* slider variables and settings */

        this.sliders = {
            'picker_hue': {
                down: false,
                vertical: true
            },
            'picker_sl': {
                down: false
            },
            'picker_alpha': {
                down: false,
                vertical: true
            },
        };

        /* event functions */

        this.onDone = null;
        this.onChange = null;
    }


    /********************************

    Color init.

    ********************************/
    setColor(color) {
        this.colour = this.color = new Color(color);
        this._setHSLA();
    }


    /********************************

    Show or create the picker HTML.

    ********************************/
    show() {
        const parent = this.settings.parent;
        
        //A trick to avoid re-opening the dialog if you click the parent element while the dialog is open:
        parent.style.pointerEvents = 'none';

        // unhide html if it exists
        if (this.domElement) {
            this.domElement.style.display = '';
            return;
        }


        const html =
`<div class="picker_wrapper">
   <div class="picker_hue picker_slider">
       <div class="picker_selector"></div>
   </div>
   <div class="picker_sl">
       <div class="picker_selector"></div>
   </div>
   <div class="picker_alpha picker_slider">
       <div class="picker_selector"></div>
   </div>
   <div class="picker_sample"></div>
   <div class="picker_done">ok</div>
</div>`;

        const wrapper = (function parse(htmlString) {
            //https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
            var div = document.createElement('div');
            div.innerHTML = htmlString;
            return div.firstElementChild;
        })(html);
        
        this.domElement = wrapper;
        this._domH  = wrapper.querySelector('.picker_hue');
        this._domSL = wrapper.querySelector('.picker_sl');
        this._domA  = wrapper.querySelector('.picker_alpha');
        this._domSample = wrapper.querySelector('.picker_sample');
        this._domOkay   = wrapper.querySelector('.picker_done');


        if(getComputedStyle(parent).position !== 'absolute') {
            parent.style.position = 'relative';
        }

        //parent.innerHTML += html;
        parent.appendChild(this.domElement);


        /* set positioning */

        //var wrapper = document.getElementById('picker_wrapper');
        //const arrow = document.getElementById('picker_arrow');

        const w = wrapper.offsetWidth,
              h = wrapper.offsetHeight,
              pw = parent.offsetWidth,
              ph = parent.offsetHeight,
              arrow = this.settings.arrowSize;

        let x = this.settings.x,
            y = this.settings.y;

        if (x === 'auto') {
            switch (this.settings.orientation) {
                case 'left':
                    x = -w - arrow - 4;
                    break;
    
                case 'top':
                case 'bottom':
                    x = pw / 2 - arrow;
                    break;
    
                case 'center':
                case 'centre':
                    x = -w / 2 + pw / 2;
                    break;
    
                default:
                    x = pw + arrow + 4;
                    break;
            }
        }

        if (y === 'auto') {
            switch (this.settings.orientation) {
                case 'top':
                    y = -h - arrow - 4;
                    break;
    
                case 'bottom':
                    y = ph + arrow + 4;
                    break;
    
                case 'center':
                case 'centre':
                    y = -ph / 2 + -h / 2;
                    break;
    
                default:
                    y = ph / 2 - arrow;
                    break;
            }
        }

        wrapper.style.left = x + 'px';
        wrapper.style.top  = y + 'px';


        this._bindEvents();

        if(this.colour) {
            this._updateUI();
        }
        else {
            this.setColor('#0cf');
        }
    }


    /*************************

    Hides the picker window.

    *************************/
    hide() {
        if (this.domElement) {
            this.domElement.style.display = 'none';
        }
        this.settings.parent.style.pointerEvents = '';
    }


    /***********************

    Handle slider movements.

    ***********************/
    _bindEvents() {
        
        /* Draggable color selection */

        const that = this;

        function createDragConfig(container, callbackRelative) {

            //Convert the px coordinates to relative coordinates (0-1) before invoking the callback:
            function relayDrag(_, pos) {
                const relX = pos[0]/container.clientWidth,
                      relY = pos[1]/container.clientHeight;
                callbackRelative(relX, relY);
            }

            const config = {
                container:     container,
                callback:      relayDrag,
                callbackClick: relayDrag,
                dragOutside:   false,
            };
            return config;
        }

        //Select hue
        dragTracker(createDragConfig(this._domH,  (x, y) => that._setHSLA(x)));

        //Select saturation/lightness
        dragTracker(createDragConfig(this._domSL, (x, y) => that._setHSLA(null, x, 1 - y)));

        //Select alpha
        dragTracker(createDragConfig(this._domA,  (x, y) => that._setHSLA(null, null, null, 1 - y)));


        /* Close the dialog */

        this.domElement.addEventListener('mousedown', e => {
            e.stopPropagation();
            e.preventDefault();
        });

        window.addEventListener('mousedown', e => {
            that.hide();
        });

        this._domOkay.onclick = (e) => {
            //Don't bubble the click up to the parent, because that would re-open the dialog:
            e.preventDefault();
            e.stopPropagation();
            
            that._done();
        };

    }


    /*************************

    Color picking lifetime.

    *************************/

    _setHSLA(h, s, l, a) {

        const arg = arguments;
        if(arg.length) {
            const hsla = this.colour.hsla;
            for (let i = 0; i < arg.length; i++) {
                const a = arg[i];
                if(a || (a === 0)) { hsla[i] = a; }
            }
            this.colour.hsla = hsla;
        }
        
        this._updateUI();

        if (this.onChange) {
            this.onChange(this.colour);
        }
    }

    _updateUI() {
        if(!this.domElement) { return; }
        
        const col = this.colour,
              hsl = col.hsla,
              cssHue  = `hsl(${hsl[0] * HUES}, 100%, 50%)`,
              cssHSL  = col.hslString,
              cssHSLA = col.hslaString;

        const uiH  = this._domH,
              uiSL = this._domSL,
              uiA  = this._domA;
        
        function posX(parent, child, relX) {
            child.style.left = (parent.clientWidth * relX) + 'px';
        }
        function posY(parent, child, relY) {
            child.style.top = (parent.clientHeight * relY) + 'px';
        }
        
        
        /* Hue */
        
        posX(uiH,  uiH.firstElementChild,  hsl[0]);
        
        //Use the fully saturated hue on the SL panel and Hue thumb:
        this._domSL.style.backgroundColor = this._domH.style.color = cssHue;


        /* S/L */
        
        posX(uiSL, uiSL.firstElementChild, hsl[1]);
        posY(uiSL, uiSL.firstElementChild, 1 - hsl[2]);
        
        //Use the opaque HSL on the SL thumb:
        uiSL.style.color = cssHSL;


        /* Alpha */
        
        posY(uiA,  uiA.firstElementChild,  1 - hsl[3]);

        const opaque = cssHSL, //this.colour.hsl().toString(),
              transp = opaque.replace('hsl', 'hsla').replace(')', ', 0)'),
              bg = `linear-gradient(${[opaque, transp]})`;

        //Let the Alpha slider fade from opaque to transparent:
        this._domA.style.backgroundImage = bg + ', ' + BG_TRANSP;


        /* Sample swatch */
        
        this._domSample.style.color = cssHSLA;
    }

    _done() {
        this.hide();

        if (this.onDone) {
            this.onDone(this.colour);
        }
    }

}


export default Picker;
