/*global HTMLElement*/

import Color from '@sphinxxxx/color-conversion';
import dragTracker from 'drag-tracker';


function parseHTML(htmlString) {
    //https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.firstElementChild;
}


const BG_TRANSP = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E")`;
const HUES = 360;


/* Inlined Picker CSS */
document.documentElement.firstElementChild //<head>, or <body> if there is no <head>
    .appendChild(document.createElement('style')).textContent = '## PLACEHOLDER-CSS ##';


class Picker {

    /**
     * Create a color picker.
     * 
     * @param {Object} options - @see setOptions
     */
    constructor(options) {

        //Default settings
        this.settings = {
            parent: document.body,
            popup: 'right',
            alpha: true,
        };

        this.setOptions(options);
    }


    /**
     * Set the picker options.
     * 
     * @param {Object}            options
     * @param {HTMLElement}       options.parent       - Which element the picker should be attached to.
     * @param {(string|boolean)} [options.popup=right] - If the picker is used as a popup, where to place it relative to the parent ("top"/"bottom"/"left"/"right"). `false` to add the picker as a normal element on the page.
     * @param {boolean}          [options.alpha=true]  - Whether to enable adjusting the alpha channel.
     * @param {string}           [options.color]       - Initial color for the picker.
     * @param {function}         [options.onChange]    - Callback whenever the color changes.
     * @param {function}         [options.onDone]      - Callback when the user clicks "Ok".
     */
    setOptions(options) {
        if(!options) { return; }
        const settings = this.settings;

        function transfer(source, target, skipKeys) {
            for (const key in source) {
                if(skipKeys && (skipKeys.indexOf(key) >= 0)) { continue; }

                target[key] = source[key];
            }
        }

        if (options instanceof HTMLElement) {
            settings.parent = options;
        }
        else {
            const skipKeys = [];

            if(options.popup instanceof Object) {
                transfer(options.popup, settings.popup);
                skipKeys.push('popup');
            }

            transfer(options, settings, skipKeys);
        }
        
        //Event callbacks. Hook these up before setColor() below,
        //because we'll need to fire onChange() if there is a color in the options
        if(options.onChange) { this.onChange = options.onChange; }
        if(options.onDone)   { this.onDone   = options.onDone; }

        //Note: Look for color in 'options', as a color value in 'settings' may be an old one we don't want to revert to.
        const col = options.color || options.colour;
        if(col) { this.setColor(col); }
        
        if(!settings.popup) { this.show(); }
    }


    /**
     * Set/initialize the picker's color.
     * 
     * @param {string} color - RGBA/HSLA/HEX string, or RGBA array (*Not color name*).
     */
    setColor(color) {
        let c = new Color(color);
        if(!this.settings.alpha) {
            const hsla = c.hsla;
            hsla[3] = 1;
            c.hsla = hsla;
        }
        this.colour = this.color = c;
        this._setHSLA();
    }
    /**
     * @see setColor
     */
    setColour(colour) {
        this.setColor(colour);
    }


    /**
     * Show/open the picker.
     */
    show() {
        const parent = this.settings.parent;
        
        //A trick to avoid re-opening the dialog if you click the parent element while the dialog is open:
        parent.style.pointerEvents = 'none';

        // unhide html if it exists
        if (this.domElement) {
            this.domElement.style.display = '';

            //Things could have changed through setOptions():
            this._setPosition();

            return;
        }


        const html =
`<div class="picker_wrapper">
   <div class="picker_arrow"></div>
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
   <button class="picker_done">Ok</div>
</div>`;

        const wrapper = parseHTML(html);
        
        this.domElement = wrapper;
        this._domH  = wrapper.querySelector('.picker_hue');
        this._domSL = wrapper.querySelector('.picker_sl');
        this._domA  = wrapper.querySelector('.picker_alpha');
        this._domSample = wrapper.querySelector('.picker_sample');
        this._domOkay   = wrapper.querySelector('.picker_done');

        if(this.settings.popup) { wrapper.classList.add('popup'); }
        if(!this.settings.alpha) { wrapper.classList.add('no_alpha'); }
        
        this._setPosition();


        if(this.colour) {
            this._updateUI();
        }
        else {
            this.setColor('#0cf');
        }
        this._bindEvents();
    }


    /**
     * Hide the picker.
     */
    hide() {
        if (this.domElement) {
            this.domElement.style.display = 'none';
        }
        this.settings.parent.style.pointerEvents = '';
    }


    /**
     * Handle user input.
     * 
     * @private
     */
    _bindEvents() {
        
        const that = this;

        /* Draggable color selection */

        function createDragConfig(container, callbackRelative) {

            //Convert the px coordinates to relative coordinates (0-1) before invoking the callback:
            function relayDrag(_, pos) {
                const relX = pos[0]/container.clientWidth,
                      relY = pos[1]/container.clientHeight;
                callbackRelative(relX, relY);
            }

            const config = {
                container:     container,
                dragOutside:   false,
                callback:      relayDrag,
                callbackClick: relayDrag,
                //Respond at once (mousedown), don't wait for click or drag:
                callbackDragStart: relayDrag,
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

        if(this.settings.popup) {
            this.domElement.addEventListener('mousedown', e => {
                e.stopPropagation();
                e.preventDefault();
            });
    
            window.addEventListener('mousedown', e => {
                that.hide();
            });
        }

        this._domOkay.onclick = (e) => {
            if(this.settings.popup) {
                //Don't bubble the click up to the parent, because that's probably the trigger to re-open the popup:
                e.preventDefault();
                e.stopPropagation();

                this.hide();
            }
            
            if (this.onDone) { this.onDone(this.colour); }
        };

    }


    /**
     * Position the picker on screen.
     * 
     * @private
     */
    _setPosition() {

        const parent = this.settings.parent,
              elm = this.domElement;

        if(parent !== elm.parentNode) { parent.appendChild(elm); }

        let popup = this.settings.popup;
        if(popup) {
            //Allow for absolute positioning of the picker popup:
            if(getComputedStyle(parent).position === 'static') {
                parent.style.position = 'relative';
            }

            const cssClass = (popup === true) ? 'popup_right' : 'popup_' + popup;

            ['popup_top', 'popup_bottom', 'popup_left', 'popup_right'].forEach(c => {
                //Because IE doesn't support .classList.toggle()'s second argument...
                if(c === cssClass) {
                    elm.classList.add(c);
                }
                else {
                    elm.classList.remove(c);
                }
            });
            //Allow for custom placement via CSS:
            elm.classList.add(cssClass);
        }
    }


    /**
     * "Hub" for all color changes
     * 
     * @private
     */
    _setHSLA(h, s, l, a) {
        const arg = arguments,
              col = this.colour;

        if(arg.length) {
            const hsla = col.hsla;
            for (let i = 0; i < arg.length; i++) {
                const x = arg[i];
                if(x || (x === 0)) { hsla[i] = x; }
            }
            col.hsla = hsla;
        }
        
        this._updateUI();

        if (this.onChange) { this.onChange(col); }
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
            child.style.left = (relX * 100) + '%'; //(parent.clientWidth * relX) + 'px';
        }
        function posY(parent, child, relY) {
            child.style.top  = (relY * 100) + '%'; //(parent.clientHeight * relY) + 'px';
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

        const opaque = cssHSL,
              transp = opaque.replace('hsl', 'hsla').replace(')', ', 0)'),
              bg = `linear-gradient(${[opaque, transp]})`;

        //Let the Alpha slider fade from opaque to transparent:
        this._domA.style.backgroundImage = bg + ', ' + BG_TRANSP;


        /* Sample swatch */
        
        this._domSample.style.color = cssHSLA;
    }

}


export default Picker;
