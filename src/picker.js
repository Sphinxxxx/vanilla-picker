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


/*
    https://github.com/Sphinxxxx/color-conversion

    ISC License
    Copyright (c) 2017 Joudee (https://github.com/Joudee), Andreas Borgen (https://github.com/Sphinxxxx)
*/
var _createClass=function(){function e(f,j){for(var m,k=0;k<j.length;k++)m=j[k],m.enumerable=m.enumerable||!1,m.configurable=!0,'value'in m&&(m.writable=!0),Object.defineProperty(f,m.key,m)}return function(f,j,k){return j&&e(f.prototype,j),k&&e(f,k),f}}();
var Color=function(){function e(f,j,k,m){function n(v){if(v.startsWith('#'))o.rgba=e._hexToRgb(v);else if(v.startsWith('hsl')){var _input$match$map=v.match(/([\-\d\.e]+)/g).map(Number),w=_input$match$map[0],y=_input$match$map[1],z=_input$match$map[2],A=_input$match$map[3];void 0===A&&(A=1),w/=360,y/=100,z/=100,o.hsla=[w,y,z,A]}else{var _input$match$map2=v.match(/([\-\d\.e]+)/g).map(Number),B=_input$match$map2[0],C=_input$match$map2[1],D=_input$match$map2[2],E=_input$match$map2[3];void 0===E&&(E=1),o.rgba=[B,C,D,E]}}
var o=this;if(void 0===f);else if(Array.isArray(f))this.rgba=f;else if(void 0===k){var u=f&&(''+f).trim();u&&n(u.toLowerCase())}else this.rgba=[f,j,k,void 0===m?1:m]}return e._hexToRgb=function _hexToRgb(f){var j=(f.startsWith('#')?f.slice(1):f).replace(/^(\w{3})$/,'$1F').replace(/^(\w)(\w)(\w)(\w)$/,'$1$1$2$2$3$3$4$4').replace(/^(\w{6})$/,'$1FF');if(!j.match(/^(\w{8})$/))throw new Error('Unknown hex color; '+f);var k=j.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1).map(function(m){return parseInt(m,16)});return k[3]/=255,k},
e._rgbToHsl=function _rgbToHsl(_ref){var f=_ref[0],j=_ref[1],k=_ref[2],m=_ref[3];f/=255,j/=255,k/=255;var u,v,n=Math.max(f,j,k),o=Math.min(f,j,k),w=(n+o)/2;if(n===o)u=v=0;else{var y=n-o;v=0.5<w?y/(2-n-o):y/(n+o),n===f?u=(j-k)/y+(j<k?6:0):n===j?u=(k-f)/y+2:n===k?u=(f-j)/y+4:void 0,u/=6}return[u,v,w,m]},e._hslToRgb=function _hslToRgb(_ref2){var f=_ref2[0],j=_ref2[1],k=_ref2[2],m=_ref2[3],n=void 0,o=void 0,u=void 0;if(0===j)n=o=u=k;else{var v=function(A,B,C){return 0>C&&(C+=1),1<C&&(C-=1),C<1/6?A+6*(B-A)*C:C<1/2?B:C<2/3?A+6*((B-A)*(2/3-C)):A},w=0.5>k?k*(1+j):k+j-k*j,y=2*k-w;n=v(y,w,f+1/3),o=v(y,w,f),u=v(y,w,f-1/3)}var z=[255*n,255*o,255*u].map(Math.round);return z[3]=m,z},
_createClass(e,[{key:'rgba',get:function get(){if(this._rgba)return this._rgba;if(!this._hsla)throw new Error('No color is set');return this._rgba=e._hslToRgb(this._hsla)},set:function set(f){3===f.length&&(f[3]=1),this._rgba=f,this._hsla=null}},{key:'rgbString',get:function get(){return'rgb('+this.rgba.slice(0,3)+')'}},{key:'rgbaString',get:function get(){return'rgba('+this.rgba+')'}},{key:'hsla',get:function get(){if(this._hsla)return this._hsla;if(!this._rgba)throw new Error('No color is set');return this._hsla=e._rgbToHsl(this._rgba)},
set:function set(f){3===f.length&&(f[3]=1),this._hsla=f,this._rgba=null}},{key:'hslString',get:function get(){var f=this.hsla;return'hsl('+360*f[0]+', '+100*f[1]+'%, '+100*f[2]+'%)'}},{key:'hslaString',get:function get(){var f=this.hsla;return'hsla('+360*f[0]+', '+100*f[1]+'%, '+100*f[2]+'%, '+f[3]+')'}},{key:'hex',get:function get(){var f=this.rgba,j=f.map(function(k,m){return 3>m?k.toString(16):(255*k).toString(16)});return'#'+j.map(function(k){return k.padStart(2,'0')}).join('')},set:function set(f){this.rgba=e._hexToRgb(f)}}]),e}();



/* Inlined Picker CSS */
document.documentElement.firstElementChild //<head>, or <body> if there is no <head>
    .appendChild(document.createElement('style')).textContent = `## PLACEHOLDER-CSS ##`;


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

        //this.colour = this.color = new Color();

        /* event functions */

        this.onDone = null;
        this.onChange = null;
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
        }
        else {
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

        }
        else {
            wrapper.style.top = `${parseInt(this.settings.y)}px`;
        }


        this.bind_events();
        
        //this.update_sample();
        if(!this.colour) { this.setColor('#ff0'); }
    }


    /***********************

    Handle slider movements.

    ***********************/
    bind_events() {
        
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
        dragTracker(createDragConfig(this._domH,  (x, y) => that.setHSLA(x)));

        //Select saturation/lightness
        dragTracker(createDragConfig(this._domSL, (x, y) => that.setHSLA(null, x, 1 - y)));

        //Select alpha
        dragTracker(createDragConfig(this._domA,  (x, y) => that.setHSLA(null, null, null, 1 - y)));


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
            
            that.done();
        };

    }


    /********************************************************

    Hides the window when, called when the button is clicked.
    The onDone function is called here.

    ********************************************************/
    done() {
        this.hide();

        if (this.onDone) {
            this.onDone(this.colour);
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


    /*************************

    Color picking lifetime.

    *************************/

    setColor(color) {
        this.colour = this.color = new Color(color);
        this.setHSLA();
    }

    setHSLA(h, s, l, a) {

        const arg = arguments;
        if(arg.length) {
            const hsla = this.colour.hsla;
            for (let i = 0; i < arg.length; i++) {
                const a = arg[i];
                if(a || (a === 0)) { hsla[i] = a; }
            }
            this.colour.hsla = hsla;
        }
        
        this.updateUI();

        if (this.onChange) {
            this.onChange(this.colour);
        }
    }

    updateUI() {
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

}



//babel-plugin-transform-es2015-modules-umd will make a UMD module later:
//
//  export default Picker;    //Wrong: window.default.Picker();
//  export { Picker };        //Wrong: window.Picker.Picker();
module.exports = Picker;    //Correct: window.Picker()
