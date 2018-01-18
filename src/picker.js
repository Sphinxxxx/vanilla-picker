/*
Copyright (c) 2014 lonely-pixel.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


/*
    https://github.com/Sphinxxxx/drag-tracker    

    MIT License
    Copyright (c) 2017 Andreas Borgen
*/
function dragTracker(d){function k(a,b,d,e){var c=a.clientX;a=a.clientY;if(b){var f=b.getBoundingClientRect();c-=f.left;a-=f.top;d&&(c-=d[0],a-=d[1]);e&&(c=Math.max(0,Math.min(c,f.width)),a=Math.max(0,Math.min(a,f.height)));b!==g&&(null!==l?l:"circle"===b.nodeName||"ellipse"===b.nodeName)&&(c-=f.width/2,a-=f.height/2)}return u?[Math.round(c),Math.round(a)]:[c,a]}function v(a){if(e=n?a.target.closest(n):{})a.preventDefault(),a.stopPropagation(),m=n&&w?k(a,e):[0,0],c=k(a,g,m),u&&(c=c.map(Math.round)),
x&&x(e,c)}function y(a){e&&(a.preventDefault(),a.stopPropagation(),a=k(a,g,m,!z),B(e,a,c))}function h(a){if(e){if(p||q)a=k(a,g,m,!z),q&&c[0]===a[0]&&c[1]===a[1]&&q(e,c),p&&p(e,a,c);e=null}}function A(a){h(r(a))}function t(a){return void 0!==a.buttons?1===a.buttons:1===a.which}function r(a){var b=a.targetTouches[0];b||(b=a.changedTouches[0]);b.preventDefault=a.preventDefault.bind(a);b.stopPropagation=a.stopPropagation.bind(a);return b}var f=Element.prototype;f.matches||(f.matches=f.msMatchesSelector||
f.webkitMatchesSelector);f.closest||(f.closest=function(a){var b=this;do{if(b.matches(a))return b;b="svg"===b.tagName?b.parentNode:b.parentElement}while(b);return null});d=d||{};var g=d.container||document.documentElement,n=d.selector,B=d.callback||console.log,x=d.callbackDragStart,p=d.callbackDragEnd,q=d.callbackClick,u=!1!==d.roundCoords,z=!1!==d.dragOutside,w=d.handleOffset||!1!==d.handleOffset,l=null;switch(w){case "center":l=!0;break;case "topleft":case "top-left":l=!1}var e,m,c;g.addEventListener("mousedown",
function(a){t(a)&&v(a)});g.addEventListener("touchstart",function(a){1!==a.touches.length?h(a):v(r(a))});window.addEventListener("mousemove",function(a){e&&(t(a)?y(a):h(a))});window.addEventListener("touchmove",function(a){1!==a.touches.length?h(a):y(r(a))});window.addEventListener("mouseup",function(a){e&&!t(a)&&h(a)});g.addEventListener("touchend",A);g.addEventListener("touchcancel",A)}


/* Inlined Picker CSS */
window.addEventListener('load', () => document.body.appendChild(document.createElement('style')).textContent = `## PLACEHOLDER-CSS ##`);


const BG_TRANSP = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E")`;

class Picker {

    constructor(options) {

        /* default settings */

        this.settings = {
            parent: document.body,
            orientation: 'right',
            x: 'auto',
            y: 'auto',
            arrow_size: 20
        };

        if (options instanceof HTMLElement) {

            this.settings.parent = options;
        } else {
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

        /* colour storage and conversion */

        this.colour = this.color = {

            hue: 0,
            saturation: 1,
            value: 1,
            alpha: 1,

            /* convert to HSL */

            hsl() {
                const h = this.hue,
                      sat = this.saturation,
                      val = this.value;

                let l = (2 - sat) * val;
                let s;
                if((sat === 0) || (val === 0)) {
                    //Gray or black - avoid divide-by-zero when white or black:
                    s = 0;
                }
                else {
                    s = sat * val;
                    s /= (l <= 1) ? l
                                  : 2 - l;
                }
                l /= 2;

                s *= 100;
                l *= 100;
                return {
                    h,
                    s,
                    l,
                    toString() {
                        return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
                    }
                };
            },

            /* convert to HSLA */

            hsla() {
                const hsl = this.hsl();
                hsl.a = this.alpha;

                hsl.toString = function () {
                    return `hsla(${this.h}, ${this.s}%, ${this.l}%, ${this.a})`;
                };

                return hsl;
            },

            /* convert to RGB */

            rgb() {
                let r;
                let g;
                let b;

                let h = this.hue;
                const s = this.saturation;
                const v = this.value;

                h /= 60;

                const i = Math.floor(h);
                const f = h - i;
                const p = v * (1 - s);
                const q = v * (1 - s * f);
                const t = v * (1 - s * (1 - f));

                r = [v, q, p, p, t, v][i];
                g = [t, v, v, q, p, p][i];
                b = [p, p, t, v, v, q][i];

                return {
                    r: Math.floor(r * 255),
                    g: Math.floor(g * 255),
                    b: Math.floor(b * 255),
                    toString() {
                        return `rgb(${this.r}, ${this.g}, ${this.b})`;
                    }
                };
            },

            /* convert to RGBA */

            rgba() {
                const rgb = this.rgb();
                rgb.a = this.alpha;

                rgb.toString = function () {
                    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
                };

                return rgb;
            },

            /* convert to hex */

            hex() {
                const rgb = this.rgb();

                function to_hex(c) {
                    const hex = c.toString(16);
                    return hex.length == 1 ? `0${hex}` : hex;
                }

                return {
                    r: to_hex(rgb.r),
                    g: to_hex(rgb.g),
                    b: to_hex(rgb.b),
                    toString() {
                        return `#${this.r}${this.g}${this.b}`;
                    }
                };
            }
        };

        /* event functions */

        this.on_done = null;
        this.on_change = null;
    }

    /******************************************************

    Apply the CSS to Picker's elements.

    You need to call this if you customise the CSS after
    you call show().

    ******************************************************/
/*
    apply_style() {

        for (var name in this.css) {

            const element = this.css[name];

            const tags = document.querySelectorAll(element.selector);

            if (!tags.length) continue;

            let i = tags.length;

            while (i--) {

                const tag = tags[i];

                for (var name in element) {

                    if (name == 'selector') continue;

                    const property = element[name];

                    tag.style[name] = property;
                }
            }
        }
    }
//*/

    /********************************

    Show or create the picker HTML.

    ********************************/

    show() {

        const parent = this.settings.parent;
        
        //A trick to avoid re-opening the dialog if you click the parent element while the dialog is open:
        parent.style.pointerEvents = 'none';


        /* unhide html if it exists */

        if (this.domElement) {
            this.domElement.style.display = '';
            return;
        }


        /* append new html */

/*
        let html = '';
        html += '<div id="picker_wrapper">';
        html += '   <div id="picker_arrow"></div>';
        html += '   <div id="picker_selector">';
        html += '       <div id="picker_saturation"></div>';
        html += '       <div id="picker_value"></div>';
        html += '       <div class="picker_selector"></div>';
        html += '   </div>';
        html += '   <div id="picker_hue" class="picker_slider">';
        html += '       <div class="picker_slider_bar"></div>';
        html += '   </div>';
        html += '   <div id="picker_opacity" class="picker_slider">';
        html += '       <div id="picker_opacity_fade"></div>';
        html += '       <div class="picker_slider_bar"></div>';
        html += '   </div>';
        html += '   <br>';
        html += '   <div id="picker_sample">';
        html += '   <div id="picker_sample_colour"></div>';
        html += '   </div>';
        html += '   <div id="picker_done">ok</div>';
        html += '</div>';
*/
        const html = `
<div class="picker_wrapper">
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
            return div.firstChild ;
        })(html.trim());
        
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

        /* apply css */

        //this.apply_style();

        /* set positioning */

        //var wrapper = document.getElementById('picker_wrapper');
        //const arrow = document.getElementById('picker_arrow');

        if (this.settings.x === 'auto') {

            switch (this.settings.orientation) {
                case 'left':
                    wrapper.style.left = `${-wrapper.offsetWidth - this.settings.arrow_size - 4}px`;
                    break;
    
                case 'top':
                case 'bottom':
                    wrapper.style.left = `${parent.offsetWidth / 2 - this.settings.arrow_size}px`;
                    break;
    
                case 'center':
                case 'centre':
                    wrapper.style.left = `${-wrapper.offsetWidth / 2 + parent.offsetWidth / 2}px`;
                    break;
    
                default:
                    wrapper.style.left = `${parent.offsetWidth + this.settings.arrow_size + 4}px`;
                    break;
            }

        } else {
            wrapper.style.left = `${parseInt(this.settings.x)}px`;
        }

        if (this.settings.y === 'auto') {

            switch (this.settings.orientation) {
                case 'top':
                    wrapper.style.top = `${-wrapper.offsetHeight - this.settings.arrow_size - 4}px`;
                    break;
    
                case 'bottom':
                    wrapper.style.top = `${parent.offsetHeight + this.settings.arrow_size + 4}px`;
                    break;
    
                case 'center':
                case 'centre':
                    wrapper.style.top = `${-parent.offsetHeight / 2 + -wrapper.offsetHeight / 2}px`;
                    break;
    
                default:
                    wrapper.style.top = `${parent.offsetHeight / 2 - this.settings.arrow_size}px`;
                    break;
            }

        } else {

            wrapper.style.top = `${parseInt(this.settings.y)}px`;
        }

        /* set arrow position */
/*
        switch (this.settings.orientation) {

        case 'left':
            arrow.style.borderLeft = `${this.settings.arrow_size}px solid${this.css.wrapper.background}`;
            arrow.style.borderRight = 'none';
            arrow.style.borderTop = `${this.settings.arrow_size}px solid transparent`;
            arrow.style.borderBottom = `${this.settings.arrow_size}px solid transparent`;

            arrow.style.top = '0';
            arrow.style.right = `${-this.settings.arrow_size}px`;
            arrow.style.left = '';
            break;

        case 'top':
            arrow.style.borderLeft = `${this.settings.arrow_size}px solid transparent`;
            arrow.style.borderRight = `${this.settings.arrow_size}px solid transparent`;
            arrow.style.borderTop = `${this.settings.arrow_size}px solid${this.css.wrapper.background}`;
            arrow.style.borderBottom = 'none';

            arrow.style.bottom = `${-this.settings.arrow_size}px`;
            arrow.style.top = '';
            arrow.style.left = '0';
            break;

        case 'bottom':
            arrow.style.borderLeft = `${this.settings.arrow_size}px solid transparent`;
            arrow.style.borderRight = `${this.settings.arrow_size}px solid transparent`;
            arrow.style.borderTop = 'none';
            arrow.style.borderBottom = `${this.settings.arrow_size}px solid${this.css.wrapper.background}`;

            arrow.style.top = `${-this.settings.arrow_size}px`;
            arrow.style.left = '0';
            break;

        case 'center':
        case 'centre':
            arrow.style.borderLeft = 'none';
            arrow.style.borderRight = 'none';
            arrow.style.borderTop = 'none';
            arrow.style.borderBottom = 'none';
            break;

        default:
            arrow.style.borderLeft = 'none';
            arrow.style.borderRight = `${this.settings.arrow_size}px solid${this.css.wrapper.background}`;
            arrow.style.borderTop = `${this.settings.arrow_size}px solid transparent`;
            arrow.style.borderBottom = `${this.settings.arrow_size}px solid transparent`;

            arrow.style.top = '0';
            arrow.style.left = `${-this.settings.arrow_size}px`;
            break;
        }
//*/

        this.bind_events();
        this.update_sample();
    }


    /***********************

    Update the hue variable.

    ***********************/
    update_picker_hue(relX, relY) {

        //this.colour.hue = (1 - y / (offsetHeight - 2)) * 360;
        this.colour.hue = relX * 360;

        this.update_sl_hue();
        this.update_sample();
        this.update_hue_slider();
    }

    /*****************************************

    Update the saturation and value variables.

    *****************************************/
    update_picker_sl(relX, relY) {

        this.colour.saturation = relX; //x/(offsetWidth - 2);
        this.colour.value = 1 - relY;  //1 - y/(offsetHeight - 2);

        this.update_alpha_slider();
        this.update_sample();
        this.update_sl_slider();
    }

    /*************************

    Update the alpha variable.

    *************************/
    update_picker_alpha(relX, relY) {

        this.colour.alpha = 1 - relY; //1 - y/(offsetHeight - 2);

        this.update_sample();
        this.update_alpha_slider();
    }

    /*************************************

    Update the selected colour sample
    The on_change function is called here.

    *************************************/
    update_sample() {

        //const sample = document.getElementById('picker_sample_colour');
        //sample.style.background = this.colour.hsla().toString();
        this._domSample.style.color = this.colour.hsla().toString();

        this.update_alpha_hue();
        if (this.on_change) {
            this.on_change(this.colour);
        }
        
        //console.log('sample', this.colour.hsla().toString());
    }


    /******************************

    Update the colour picker's hue.

    ******************************/
    update_sl_hue() {

        //const picker = document.getElementById('picker_selector');
        this._domSL.style.backgroundColor = `hsl(${this.colour.hue}, 100%, 50%)`;

        this.update_sl_slider();
        this.update_alpha_slider();
    }

    /************************

    Update the opaciy slider.

    ************************/
    update_alpha_hue() {
        const color = this.colour.hsl().toString(),
              transp = color.replace('hsl', 'hsla').replace(')', ', 0)'),
              bg = `linear-gradient(${[color, transp]})`;

        const combo = [bg, BG_TRANSP].join(', ');
        this._domA.style.backgroundImage = combo;
    }


    /*************************

    Update the hue slider bar.

    *************************/
    update_hue_slider() {

        //const slider = document.querySelector('#picker_hue .picker_slider_bar');
        //slider.style.background = `hsl(${this.colour.hue}, 100%, 50%)`;
        this._domH.style.color = `hsl(${this.colour.hue}, 100%, 50%)`;
    }

    /*******************************

    Update the colour picker slider.

    *******************************/
    update_sl_slider() {

        //const slider = document.querySelector('#picker_selector .picker_selector');
        ///slider.style.background = this.colour.hsl().toString();
        this._domSL.style.color = this.colour.hsl().toString();
    }

    /*****************************

    Update the opacity slider bar.

    *****************************/
    update_alpha_slider() {

        const slider = document.querySelector('#picker_alpha .picker_selector');

        //This will put a semi-transparent color on top of the same semi-transparent color (on #picker_alpha),
        //giving the impression of a more opaque color than what is actually picked.
        //
        //  slider.style.background = this.colour.hsla().toString();
        
        //var color = this.colour.hsla().toString();
        //slider.style.backgroundImage = 'linear-gradient(' + [color, color] + '), linear-gradient(white, white)';
    }


    /***********************

    Handle slider movements.

    ***********************/
    //mouse_move({clientX, clientY}, element, _this, override) {
    bind_events() {
/*
        const rect = element.getBoundingClientRect();
        let x = clientX - rect.left;
        let y = clientY - rect.top;

        if (override || (_this.sliders[element.id] && _this.sliders[element.id].down)) {

            const slider_info = _this.sliders[element.id];

            const slider = element.querySelectorAll('.picker_selector')[0] || element.querySelectorAll('.picker_slider_bar')[0];

            if (!slider) return;

            if (!slider_info.vertical) {

                x = Math.min(Math.max(x - slider.offsetWidth / 2, -(slider.offsetWidth / 2)), element.offsetWidth - slider.offsetWidth / 2 - 2);

                slider.style.left = `${x}px`;
            }

            y = Math.min(Math.max(y - slider.offsetHeight / 2, -(slider.offsetHeight / 2)), element.offsetHeight - slider.offsetHeight / 2 - 2);

            slider.style.top = `${y}px`;

            if (_this[`update_${element.id}`]) {

                _this[`update_${element.id}`](element, x + slider.offsetWidth / 2, y + slider.offsetHeight / 2);
            }
        }
*/

        const that = this;
        
        function relate(container, pos, handler) {
            handler.call(that, pos[0]/container.clientWidth, pos[1]/container.clientHeight);
        }


        //Select hue
        
        function setHue(_, pos) {
            const container = that._domH;
            
            container.firstElementChild.style.left = pos[0] + 'px';
            relate(container, pos, that.update_picker_hue);
        }
        dragTracker({
            container: this._domH,
            dragOutside: false,
            callback: setHue,
            callbackClick: setHue,
        });


        //Select saturation/lightness
        
        function setSL(_, pos) {
            const container = that._domSL;
            
            container.firstElementChild.style.left = pos[0] + 'px';
            container.firstElementChild.style.top  = pos[1] + 'px';
            relate(container, pos, that.update_picker_sl);
        }
        dragTracker({
            container: this._domSL,
            dragOutside: false,
            callback: setSL,
            callbackClick: setSL,
        });


        //Select alpha
        
        function setAlpha(_, pos) {
            const container = that._domA;
            
            container.firstElementChild.style.top = pos[1] + 'px';
            relate(container, pos, that.update_picker_alpha);
        }
        dragTracker({
            container: this._domA,
            dragOutside: false,
            callback: setAlpha,
            callbackClick: setAlpha,
        });


        //Close the dialog

        this.domElement.addEventListener('mousedown', e => {
            e.stopPropagation();
            e.preventDefault();
        });

        window.addEventListener('mousedown', e => {
            that.hide();
        });

        this._domOkay.onclick = e => {
            //Don't bubble the click up to the parent, because that would re-open the dialog:
            e.preventDefault();
            e.stopPropagation();
            
            that.done();
        };

    }


    /*****************

    Bind mouse events.

    *****************

    bind_events() {

        const wrapper = this.domElement;

        const done = document.getElementById('picker_done');

        const colour_select = document.getElementById('picker_selector');
        const hue_select = document.getElementById('picker_hue');
        const opacity_select = document.getElementById('picker_opacity');

        const picker_slider = document.querySelector('#picker_selector .picker_selector');
        const hue_slider = document.querySelector('#picker_hue .picker_slider_bar');
        const opacity_slider = document.querySelector('#picker_opacity .picker_slider_bar');

        const _this = this;

        colour_select.onmousemove = hue_select.onmousemove = opacity_select.onmousemove = function (e) {

            _this.mouse_move(e, this, _this);

            e.preventDefault();
        };

        colour_select.onmousedown = hue_select.onmousedown = opacity_select.onmousedown = function (e) {

            _this.sliders[this.id].down = true;

            _this.mouse_move(e, this, _this, true);

            e.preventDefault();
        };

        picker_slider.onmousedown = hue_slider.onmousedown = opacity_slider.onmousedown = function () {

            _this.sliders[this.parentNode.id].down = true;
        };

        wrapper.onclick = wrapper.onmousedown = e => {

            e.stopPropagation();
            e.preventDefault();
            return false;
        };

        document.getElementsByTagName('html')[0].onmouseup = () => {

            for (const name in _this.sliders) {

                _this.sliders[name].down = false;
            }
        };

        document.getElementsByTagName('html')[0].onclick = ({target}) => {

            if (target && target != _this.settings.parent) {

                _this.hide();
            }
        };

        done.onclick = () => {

            _this.done();
        };
    }
*/

    /********************************************************

    Hides the window when, called when the button is clicked.
    The on_done function is called here.

    ********************************************************/
    done() {
        this.hide();

        if (this.on_done) {
            this.on_done(this.colour);
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

}


/******************************************************

CSS applied to Picker's elements.

You can customise it here or dynamically via Javascript.
e.g your_picker_object.css.wrapper.padding = '20px'

******************************************************

Picker.prototype.css = {

    wrapper: {
        selector: '#picker_wrapper',
        background: '#f2f2f2',
        position: 'absolute',
        whiteSpace: 'nowrap',
        padding: '10px',
        cursor: 'default',
        fontFamily: 'sans-serif',
        fontWeight: '100',
        display: 'inline-block',
        boxShadow: '0 0 10px 1px rgba(0,0,0,0.4)',
        overflow: 'visible',
        textAlign: 'left',
        fontSize: '16px'
    },

    arrow: {
        selector: '#picker_arrow',
        height: '0',
        width: '0',
        borderLeft: '20px solid transparent',
        borderRight: '20px solid transparent',
        borderBottom: '20px solid #f2f2f2',
        position: 'absolute',
        top: '-20px',
        left: '0'
    },

    colour_picker: {
        selector: '#picker_selector',
        width: '180px',
        height: '180px',
        position: 'relative',
        background: 'hsl(0, 100%, 50%)',
        display: 'inline-block',
        border: '1px solid #ccc'
    },

    saturation_overlay: {

        selector: '#picker_saturation',
        width: '180px',
        height: '180px',
        position: 'absolute',
        //https://css-tricks.com/thing-know-gradients-transparent-black/
        //backgroundImage: 'linear-gradient(90deg, white, rgba(255,255,255, 0))',
    },

    value_overlay: {

        selector: '#picker_value',
        width: '180px',
        height: '180px',
        position: 'absolute',
        //backgroundImage: 'linear-gradient(0deg, black, rgba(0,0,0, 0))',
        backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0) 90%), linear-gradient(0deg, black, rgba(0,0,0, 0)), linear-gradient(90deg, white, rgba(255,255,255, 0))',
    },

    hue_slider: {

        selector: '#picker_hue',
        width: '16px',
        height: '150px',
        position: 'relative',
        display: 'inline-block',
        marginLeft: '10px',
        backgroundImage: 'linear-gradient(red, magenta, blue, cyan, lime, yellow, red)',
        border: '1px solid #ccc'
    },

    alpha_slider: {

        selector: '#picker_opacity',
        width: '16px',
        height: '150px',
        position: 'relative',
        display: 'inline-block',
        marginLeft: '10px',
        background: Picker.BG_TRANSP + ' top/contain white',
        border: '1px solid #ccc',
    },

    alpha_slider_overlay: {

        selector: '#picker_opacity_fade',
        width: '16px',
        height: '150px',
        display: 'inline-block',
        position: 'absolute',
    },

    colour_selector: {

        selector: '.picker_selector',
        width: '10px',
        height: '10px',
        position: 'absolute',
        display: 'inline-block',
        borderRadius: '20px',
        cursor: 'pointer',
        border: '2px solid #fff',
        boxShadow: '0 0 3px 1px #67b9ff',
        background: '#f00',
        left: '173px',
        top: '-7px'
    },

    slider_bar: {

        selector: '.picker_slider_bar',
        width: '100%',
        height: '10px',
        position: 'absolute',
        top: '-7px',
        borderRadius: '2px',
        cursor: 'pointer',
        border: '2px solid #fff',
        boxShadow: '0 0 3px 1px #67b9ff',
        marginLeft: '-2px',
        background: '#f00',
        fontSize: '16px'
    },
    slider_bar_op: {
        
        selector: '#picker_opacity .picker_slider_bar',
        background: 'none',
    },

    sample: {

        selector: '#picker_sample',
        width: '180px',
        height: '24px',
        background: Picker.BG_TRANSP + ' left top/16px white',
        display: 'inline-block',
        position: 'relative',
        marginTop: '10px',
        border: '1px solid #aaa',
    },

    sample_colour: {

        selector: '#picker_sample_colour',
        width: '100%',
        height: '100%',
        background: 'rgba(255,0,0,0.4)',
        position: 'absolute',

    },

    done_button: {

        selector: '#picker_done',
        width: '54px',
        height: '22px',
        lineHeight: '22px',
        background: '#e2e2e2',
        display: 'inline-block',
        border: '1px solid #ccc',
        marginLeft: '10px',
        textAlign: 'center',
        color: '#aaa',
        position: 'absolute',
        right: '12px',
        bottom: '15px',
        cursor: 'pointer',
        boxShadow: '0 0 3px 1px #eee'
    }
};

*/


//babel-plugin-transform-es2015-modules-umd will make a UMD module later:
//
//  export default Picker;    //Wrong: window.default.Picker();
//  export { Picker };        //Wrong: window.Picker.Picker();
module.exports = Picker;    //Correct: window.Picker()
