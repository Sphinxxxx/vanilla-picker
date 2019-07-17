String.prototype.startsWith = (String.prototype.startsWith || function(needle)   { return (this.indexOf(needle) === 0); });
String.prototype.padStart   = (String.prototype.padStart   || function(len, pad) { let str = this; while(str.length < len) { str = pad + str; } return str; });

const colorNames = { aliceblue:'#f0f8ff', antiquewhite:'#faebd7', aqua:'#00ffff', aquamarine:'#7fffd4', azure:'#f0ffff', beige:'#f5f5dc', bisque:'#ffe4c4', black:'#000000', blanchedalmond:'#ffebcd', blue:'#0000ff', blueviolet:'#8a2be2', brown:'#a52a2a', burlywood:'#deb887', cadetblue:'#5f9ea0', chartreuse:'#7fff00', chocolate:'#d2691e', coral:'#ff7f50', cornflowerblue:'#6495ed', cornsilk:'#fff8dc', crimson:'#dc143c', cyan:'#00ffff', darkblue:'#00008b', darkcyan:'#008b8b', darkgoldenrod:'#b8860b', darkgray:'#a9a9a9', darkgreen:'#006400', darkgrey:'#a9a9a9', darkkhaki:'#bdb76b', darkmagenta:'#8b008b', darkolivegreen:'#556b2f', darkorange:'#ff8c00', darkorchid:'#9932cc', darkred:'#8b0000', darksalmon:'#e9967a', darkseagreen:'#8fbc8f', darkslateblue:'#483d8b', darkslategray:'#2f4f4f', darkslategrey:'#2f4f4f', darkturquoise:'#00ced1', darkviolet:'#9400d3', deeppink:'#ff1493', deepskyblue:'#00bfff', dimgray:'#696969', dimgrey:'#696969', dodgerblue:'#1e90ff', firebrick:'#b22222', floralwhite:'#fffaf0', forestgreen:'#228b22', fuchsia:'#ff00ff', gainsboro:'#dcdcdc', ghostwhite:'#f8f8ff', gold:'#ffd700', goldenrod:'#daa520', gray:'#808080', green:'#008000', greenyellow:'#adff2f', grey:'#808080', honeydew:'#f0fff0', hotpink:'#ff69b4', indianred:'#cd5c5c', indigo:'#4b0082', ivory:'#fffff0', khaki:'#f0e68c', lavender:'#e6e6fa', lavenderblush:'#fff0f5', lawngreen:'#7cfc00', lemonchiffon:'#fffacd', lightblue:'#add8e6', lightcoral:'#f08080', lightcyan:'#e0ffff', lightgoldenrodyellow:'#fafad2', lightgray:'#d3d3d3', lightgreen:'#90ee90', lightgrey:'#d3d3d3', lightpink:'#ffb6c1', lightsalmon:'#ffa07a', lightseagreen:'#20b2aa', lightskyblue:'#87cefa', lightslategray:'#778899', lightslategrey:'#778899', lightsteelblue:'#b0c4de', lightyellow:'#ffffe0', lime:'#00ff00', limegreen:'#32cd32', linen:'#faf0e6', magenta:'#ff00ff', maroon:'#800000', mediumaquamarine:'#66cdaa', mediumblue:'#0000cd', mediumorchid:'#ba55d3', mediumpurple:'#9370db', mediumseagreen:'#3cb371', mediumslateblue:'#7b68ee', mediumspringgreen:'#00fa9a', mediumturquoise:'#48d1cc', mediumvioletred:'#c71585', midnightblue:'#191970', mintcream:'#f5fffa', mistyrose:'#ffe4e1', moccasin:'#ffe4b5', navajowhite:'#ffdead', navy:'#000080', oldlace:'#fdf5e6', olive:'#808000', olivedrab:'#6b8e23', orange:'#ffa500', orangered:'#ff4500', orchid:'#da70d6', palegoldenrod:'#eee8aa', palegreen:'#98fb98', paleturquoise:'#afeeee', palevioletred:'#db7093', papayawhip:'#ffefd5', peachpuff:'#ffdab9', peru:'#cd853f', pink:'#ffc0cb', plum:'#dda0dd', powderblue:'#b0e0e6', purple:'#800080', rebeccapurple:'#663399', red:'#ff0000', rosybrown:'#bc8f8f', royalblue:'#4169e1', saddlebrown:'#8b4513', salmon:'#fa8072', sandybrown:'#f4a460', seagreen:'#2e8b57', seashell:'#fff5ee', sienna:'#a0522d', silver:'#c0c0c0', skyblue:'#87ceeb', slateblue:'#6a5acd', slategray:'#708090', slategrey:'#708090', snow:'#fffafa', springgreen:'#00ff7f', steelblue:'#4682b4', tan:'#d2b48c', teal:'#008080', thistle:'#d8bfd8', tomato:'#ff6347', turquoise:'#40e0d0', violet:'#ee82ee', wheat:'#f5deb3', white:'#ffffff', whitesmoke:'#f5f5f5', yellow:'#ffff00', yellowgreen:'#9acd32' };

function printNum(num, decs = 1) {
	const str = (decs > 0) ? num.toFixed(decs).replace(/0+$/, '').replace(/\.$/, '')
	                       : num.toString();
	return str || '0';
}

class Color {

	constructor(r, g, b, a) {

        const that = this;
		function parseString(input) {

			if( input.startsWith('hsl') ) {
				let [h, s, l, a] = input.match(/([\-\d\.e]+)/g).map(Number);
				if(a === undefined) { a = 1; }

				h /= 360;
				s /= 100;
				l /= 100;
				that.hsla = [h, s, l, a];
			}

			else if( input.startsWith('rgb') ) {
				let [r, g, b, a] = input.match(/([\-\d\.e]+)/g).map(Number);
				if(a === undefined) { a = 1; }

				that.rgba = [r, g, b, a];
			}

			else {
				if( input.startsWith('#') ) {
					that.rgba = Color.hexToRgb(input);
				}
				else {
					that.rgba = Color.nameToRgb(input) || Color.hexToRgb(input);
				}
			}
		}

		if( r === undefined ) ;

		else if( Array.isArray(r) ) {
			this.rgba = r;
		}

		else if( b === undefined ) {
			const color = r && ('' + r);
			if(color) {
				parseString(color.toLowerCase());
			}
		}

		else {
			this.rgba = [r, g, b, (a === undefined) ? 1 : a];
		}
	}

	get rgba() {
		if(this._rgba) { return this._rgba; }
		if(!this._hsla) { throw new Error('No color is set'); }

		return (this._rgba = Color.hslToRgb(this._hsla));
	}
	set rgba(rgb) {
		if(rgb.length === 3) { rgb[3] = 1; }

		this._rgba = rgb;
		this._hsla = null;
	}

	printRGB(alpha) {
		const rgb = alpha ? this.rgba : this.rgba.slice(0, 3),
			  vals = rgb.map((x, i) => printNum(x, (i === 3) ? 3 : 0));

		return alpha ? `rgba(${ vals })` : `rgb(${ vals })`;
	}
	get rgbString()  { return this.printRGB(); }
	get rgbaString() { return this.printRGB(true); }

	get hsla() {
		if(this._hsla) { return this._hsla; }
		if(!this._rgba) { throw new Error('No color is set'); }

		return (this._hsla = Color.rgbToHsl(this._rgba));
	}
	set hsla(hsl) {
		if(hsl.length === 3) { hsl[3] = 1; }

		this._hsla = hsl;
		this._rgba = null;
	}

	printHSL(alpha) {
		const mults = [360, 100, 100, 1],
			  suff =  ['', '%', '%', ''];

		const hsl = alpha ? this.hsla : this.hsla.slice(0, 3),

			  vals = hsl.map((x, i) => printNum(x * mults[i], (i === 3) ? 3 : 1) + suff[i]);

		return alpha ? `hsla(${ vals })` : `hsl(${ vals })`;
	}
	get hslString()  { return this.printHSL(); }
	get hslaString() { return this.printHSL(true); }

	get hex() {
		const rgb = this.rgba,
			  hex = rgb.map((x, i) => (i < 3) ? x.toString(16)
											  : Math.round(x * 255).toString(16));

		return '#' + hex.map(x => x.padStart(2, '0')).join('');
	}
	set hex(hex) {
		this.rgba = Color.hexToRgb(hex);
	}

	printHex(alpha) {
		const hex = this.hex;
		return alpha ? hex : hex.substring(0, 7);
	}

    static hexToRgb(input) {

		const hex = (input.startsWith('#') ? input.slice(1) : input)
			.replace(/^(\w{3})$/,          '$1F')
			.replace(/^(\w)(\w)(\w)(\w)$/, '$1$1$2$2$3$3$4$4')
			.replace(/^(\w{6})$/,          '$1FF');

		if(!hex.match(/^([0-9a-fA-F]{8})$/)) { throw new Error('Unknown hex color; ' + input); }

		const rgba = hex
			.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1)
			.map(x => parseInt(x, 16));

		rgba[3] = rgba[3]/255;
		return rgba;
    }

	static nameToRgb(input) {

		const hex = colorNames[input];
		if(hex) {
			return Color.hexToRgb(hex);
		}
	}

    static rgbToHsl([r, g, b, a]) {

        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b),
        	  min = Math.min(r, g, b);
        let h,
        	s,
        	l = (max + min) / 2;

        if(max === min){
	        h = s = 0;
	    }
	    else {
	        const d = max - min;
	        s = (l > 0.5) ? d / (2 - max - min)
	        			  : d / (max + min);
	        switch(max) {
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }

	        h /= 6;
	    }

        return [h, s, l, a];
    }

    static hslToRgb([h, s, l, a]) {

		let r, g, b;

		if (s === 0) {
			r = g = b = l;
		}
		else {
			const hue2rgb = function(p, q, t) {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			};

			const q = (l < 0.5) ? l * (1 + s)
								: l + s - (l * s),
				  p = (2 * l) - q;

			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}

		const rgba = [r * 255, g * 255, b * 255].map(Math.round);
		rgba[3] = a;

		return rgba;
    }

}

function parseHTML(htmlString) {

    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.firstElementChild;
}

function dragTrack(area, callback) {
    var dragging = false;

    function addEvent(target, type, handler) {
        target.addEventListener(type, handler, false);
    }
    function clamp(val, min, max) {
        return Math.max(min, Math.min(val, max));
    }

    function onMove(e, info, starting) {
        if (starting) { dragging = true; }
        if (!dragging) { return; }

        e.preventDefault();

        var bounds = area.getBoundingClientRect(),
            w = bounds.width,
            h = bounds.height,
            x = info.clientX,
            y = info.clientY;

        var relX = clamp(x - bounds.left, 0, w),
            relY = clamp(y - bounds.top, 0, h);

        callback(relX / w, relY / h);
    }

    function onMouse(e, starting) {
        var button = (e.buttons === undefined) ? e.which : e.buttons;
        if (button === 1) {
            onMove(e, e, starting);
        }

        else {
            dragging = false;
        }
    }

    function onTouch(e, starting) {
        if (e.touches.length === 1) {
            onMove(e, e.touches[0], starting);
        }

        else {
            dragging = false;
        }
    }

    addEvent(area,   'mousedown',   function(e) { onMouse(e, true); });
    addEvent(area,   'touchstart',  function(e) { onTouch(e, true); });
    addEvent(window, 'mousemove',   onMouse);
    addEvent(area,   'touchmove',   onTouch);
    addEvent(window, 'mouseup',     function(e) { dragging = false; });
    addEvent(area,   'touchend',    function(e) { dragging = false; });
    addEvent(area,   'touchcancel', function(e) { dragging = false; });
}

const BG_TRANSP = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E")`;
const HUES = 360;

const EVENT_KEY = 'keydown',
      EVENT_CLICK_OUTSIDE = 'mousedown',
      EVENT_TAB_MOVE = 'focusin';

function $(selector, context) {
    return (context || document).querySelector(selector);
}

function addEvent(target, type, handler) {
    target.addEventListener(type, handler, false);
}
function stopEvent(e) {

    e.preventDefault();
    e.stopPropagation();
}
function onKey(target, keys, handler, stop) {
    addEvent(target, EVENT_KEY, function(e) {
        if(keys.indexOf(e.key) >= 0) {
            if(stop) { stopEvent(e); }
            handler(e);
        }
    });
}

const _style = document.createElement('style');
_style.textContent = `.picker_wrapper.no_alpha .picker_alpha{display:none}.picker_wrapper.no_editor .picker_editor{position:absolute;z-index:-1;opacity:0}.picker_wrapper.no_cancel .picker_cancel{display:none}.layout_default.picker_wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;font-size:10px;width:25em;padding:.5em}.layout_default.picker_wrapper input,.layout_default.picker_wrapper button{font-size:1rem}.layout_default.picker_wrapper>*{margin:.5em}.layout_default.picker_wrapper::before{content:'';display:block;width:100%;height:0;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.layout_default .picker_slider,.layout_default .picker_selector{padding:1em}.layout_default .picker_hue{width:100%}.layout_default .picker_sl{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}.layout_default .picker_sl::before{content:'';display:block;padding-bottom:100%}.layout_default .picker_editor{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;width:6.5rem}.layout_default .picker_editor input{width:100%;height:100%}.layout_default .picker_sample{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}.layout_default .picker_done,.layout_default .picker_cancel{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.picker_wrapper{-webkit-box-sizing:border-box;box-sizing:border-box;background:#f2f2f2;-webkit-box-shadow:0 0 0 1px silver;box-shadow:0 0 0 1px silver;cursor:default;font-family:sans-serif;color:#444;pointer-events:auto}.picker_wrapper:focus{outline:none}.picker_wrapper button,.picker_wrapper input{-webkit-box-sizing:border-box;box-sizing:border-box;border:none;-webkit-box-shadow:0 0 0 1px silver;box-shadow:0 0 0 1px silver;outline:none}.picker_wrapper button:focus,.picker_wrapper button:active,.picker_wrapper input:focus,.picker_wrapper input:active{-webkit-box-shadow:0 0 2px 1px dodgerblue;box-shadow:0 0 2px 1px dodgerblue}.picker_wrapper button{padding:.4em .6em;cursor:pointer;background-color:whitesmoke;background-image:-webkit-gradient(linear, left bottom, left top, from(gainsboro), to(transparent));background-image:linear-gradient(0deg, gainsboro, transparent)}.picker_wrapper button:active{background-image:-webkit-gradient(linear, left bottom, left top, from(transparent), to(gainsboro));background-image:linear-gradient(0deg, transparent, gainsboro)}.picker_wrapper button:hover{background-color:white}.picker_selector{position:absolute;z-index:1;display:block;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);border:2px solid white;border-radius:100%;-webkit-box-shadow:0 0 3px 1px #67b9ff;box-shadow:0 0 3px 1px #67b9ff;background:currentColor;cursor:pointer}.picker_slider .picker_selector{border-radius:2px}.picker_hue{position:relative;background-image:-webkit-gradient(linear, left top, right top, from(red), color-stop(yellow), color-stop(lime), color-stop(cyan), color-stop(blue), color-stop(magenta), to(red));background-image:linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red);-webkit-box-shadow:0 0 0 1px silver;box-shadow:0 0 0 1px silver}.picker_sl{position:relative;-webkit-box-shadow:0 0 0 1px silver;box-shadow:0 0 0 1px silver;background-image:-webkit-gradient(linear, left top, left bottom, from(white), color-stop(50%, rgba(255,255,255,0))),-webkit-gradient(linear, left bottom, left top, from(black), color-stop(50%, rgba(0,0,0,0))),-webkit-gradient(linear, left top, right top, from(gray), to(rgba(128,128,128,0)));background-image:linear-gradient(180deg, white, rgba(255,255,255,0) 50%),linear-gradient(0deg, black, rgba(0,0,0,0) 50%),linear-gradient(90deg, gray, rgba(128,128,128,0))}.picker_alpha,.picker_sample{position:relative;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E") left top/contain white;-webkit-box-shadow:0 0 0 1px silver;box-shadow:0 0 0 1px silver}.picker_alpha .picker_selector,.picker_sample .picker_selector{background:none}.picker_editor input{font-family:monospace;padding:.2em .4em}.picker_sample::before{content:'';position:absolute;display:block;width:100%;height:100%;background:currentColor}.picker_arrow{position:absolute;z-index:-1}.picker_wrapper.popup{position:absolute;z-index:2;margin:1.5em}.picker_wrapper.popup,.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{background:#f2f2f2;-webkit-box-shadow:0 0 10px 1px rgba(0,0,0,0.4);box-shadow:0 0 10px 1px rgba(0,0,0,0.4)}.picker_wrapper.popup .picker_arrow{width:3em;height:3em;margin:0}.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{content:"";display:block;position:absolute;top:0;left:0;z-index:-99}.picker_wrapper.popup .picker_arrow::before{width:100%;height:100%;-webkit-transform:skew(45deg);transform:skew(45deg);-webkit-transform-origin:0 100%;transform-origin:0 100%}.picker_wrapper.popup .picker_arrow::after{width:150%;height:150%;-webkit-box-shadow:none;box-shadow:none}.popup.popup_top{bottom:100%;left:0}.popup.popup_top .picker_arrow{bottom:0;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.popup.popup_bottom{top:100%;left:0}.popup.popup_bottom .picker_arrow{top:0;left:0;-webkit-transform:rotate(90deg) scale(1, -1);transform:rotate(90deg) scale(1, -1)}.popup.popup_left{top:0;right:100%}.popup.popup_left .picker_arrow{top:0;right:0;-webkit-transform:scale(-1, 1);transform:scale(-1, 1)}.popup.popup_right{top:0;left:100%}.popup.popup_right .picker_arrow{top:0;left:0}`;
document.documentElement.firstElementChild
    .appendChild(_style);

class Picker {

    constructor(options) {

        this.settings = {

            popup: 'right',
            layout: 'default',
            alpha:  true,
            editor: true,
            editorFormat: 'hex',
            cancelButton: false,
        };

        this._openProxy  = (e) => this.openHandler(e);

        this.onChange = null;

        this.onDone = null;

        this.onOpen = null;

        this.onClose = null;

        this.setOptions(options);
    }

    setOptions(options) {
        if(!options) { return; }
        const settings = this.settings;

        function transfer(source, target, skipKeys) {
            for (const key in source) {
                if(skipKeys && (skipKeys.indexOf(key) >= 0)) { continue; }

                target[key] = source[key];
            }
        }

        if(options instanceof HTMLElement) {
            settings.parent = options;
        }
        else {

            if(settings.parent && options.parent && (settings.parent !== options.parent)) {
                settings.parent.removeEventListener('click', this._openProxy, false);
                this._popupInited = false;
            }

            transfer(options, settings);

            if(options.onChange) { this.onChange = options.onChange; }
            if(options.onDone)   { this.onDone   = options.onDone; }
            if(options.onOpen)   { this.onOpen   = options.onOpen; }
            if(options.onClose)  { this.onClose  = options.onClose; }

            const col = options.color || options.colour;
            if(col) { this._setColor(col); }
        }

        const parent = settings.parent;
        if(parent && settings.popup && !this._popupInited) {

            addEvent(parent, 'click', this._openProxy);

            onKey(parent, [' ', 'Spacebar', 'Enter'], this._openProxy);

            this._popupInited = true;
        }
        else if(options.parent && !settings.popup) {
            this.show();
        }
    }

    openHandler(e) {
        if(this.show()) {

            e && e.preventDefault();

            this.settings.parent.style.pointerEvents = 'none';

            const toFocus = (e && (e.type === EVENT_KEY)) ? this._domEdit : this.domElement;
            setTimeout(() => toFocus.focus(), 100);

            if(this.onOpen) { this.onOpen(this.colour); }
        }
    }

    closeHandler(e) {
        const event = e && e.type;
        let doHide = false;

        if(!e) {
            doHide = true;
        }

        else if((event === EVENT_CLICK_OUTSIDE) || (event === EVENT_TAB_MOVE)) {

            const knownTime = (this.__containedEvent || 0) + 100;
            if(e.timeStamp > knownTime) {
                doHide = true;
            }
        }

        else {

            stopEvent(e);

            doHide = true;
        }

        if(doHide && this.hide()) {
            this.settings.parent.style.pointerEvents = '';

            if(event !== EVENT_CLICK_OUTSIDE) {
                this.settings.parent.focus();
            }

            if(this.onClose) { this.onClose(this.colour); }
        }
    }

    movePopup(options, open) {

        this.closeHandler();

        this.setOptions(options);
        if(open) {
            this.openHandler();
        }
    }

    setColor(color, silent) {
        this._setColor(color, { silent: silent });
    }
    _setColor(color, flags) {
        if(typeof color === 'string') { color = color.trim(); }
        if (!color) { return; }

        flags = flags || {};
        let c;
        try {

            c = new Color(color);
        }
        catch (ex) {
            if(flags.failSilently) { return; }
            throw ex;
        }

        if(!this.settings.alpha) {
            const hsla = c.hsla;
            hsla[3] = 1;
            c.hsla = hsla;
        }
        this.colour = this.color = c;
        this._setHSLA(null, null, null, null, flags);
    }

    setColour(colour, silent) {
        this.setColor(colour, silent);
    }

    show() {
        const parent = this.settings.parent;
        if(!parent) { return false; }

        if(this.domElement) {
            const toggled = this._toggleDOM(true);

            this._setPosition();

            return toggled;
        }

        const html = this.settings.template || `<div class="picker_wrapper" tabindex="-1"><div class="picker_arrow"></div><div class="picker_hue picker_slider"><div class="picker_selector"></div></div><div class="picker_sl"><div class="picker_selector"></div></div><div class="picker_alpha picker_slider"><div class="picker_selector"></div></div><div class="picker_editor"><input aria-label="Type a color name or hex value"/></div><div class="picker_sample"></div><div class="picker_done"><button>Ok</button></div><div class="picker_cancel"><button>Cancel</button></div></div>`;
        const wrapper = parseHTML(html);

        this.domElement = wrapper;
        this._domH      = $('.picker_hue', wrapper);
        this._domSL     = $('.picker_sl', wrapper);
        this._domA      = $('.picker_alpha', wrapper);
        this._domEdit   = $('.picker_editor input', wrapper);
        this._domSample = $('.picker_sample', wrapper);
        this._domOkay   = $('.picker_done button', wrapper);
        this._domCancel = $('.picker_cancel button', wrapper);

        wrapper.classList.add('layout_' + this.settings.layout);
        if(!this.settings.alpha) { wrapper.classList.add('no_alpha'); }
        if(!this.settings.editor) { wrapper.classList.add('no_editor'); }
        if(!this.settings.cancelButton) { wrapper.classList.add('no_cancel'); }
        this._ifPopup(() => wrapper.classList.add('popup'));

        this._setPosition();

        if(this.colour) {
            this._updateUI();
        }
        else {
            this._setColor('#0cf');
        }
        this._bindEvents();

        return true;
    }

    hide() {
        return this._toggleDOM(false);
    }

    _bindEvents() {
        const that = this,
              dom = this.domElement;

        addEvent(dom, 'click', e => e.preventDefault());

        dragTrack(this._domH,  (x, y) => that._setHSLA(x));

        dragTrack(this._domSL, (x, y) => that._setHSLA(null, x, 1 - y));

        if(this.settings.alpha) {
            dragTrack(this._domA,  (x, y) => that._setHSLA(null, null, null, 1 - y));
        }

        const editInput = this._domEdit;
         {
            addEvent(editInput, 'input', function(e) {
                that._setColor(this.value, { fromEditor: true, failSilently: true });
            });

            addEvent(editInput, 'focus', function(e) {
                const input = this;

                if(input.selectionStart === input.selectionEnd) {
                    input.select();
                }
            });
        }

        this._ifPopup(() => {

            const popupCloseProxy = (e) => this.closeHandler(e);

            addEvent(window, EVENT_CLICK_OUTSIDE, popupCloseProxy);
            addEvent(window, EVENT_TAB_MOVE,      popupCloseProxy);
            onKey(   dom,    ['Esc', 'Escape'],   popupCloseProxy);

            const timeKeeper = (e) => {
                this.__containedEvent = e.timeStamp;
            };
            addEvent(dom, EVENT_CLICK_OUTSIDE, timeKeeper);

            addEvent(dom, EVENT_TAB_MOVE,      timeKeeper);

            addEvent(this._domCancel, 'click', popupCloseProxy);
        });

        const onDoneProxy = (e) => {
            this._ifPopup(() => this.closeHandler(e));
            if(this.onDone) { this.onDone(this.colour); }
        };
        addEvent(this._domOkay, 'click',   onDoneProxy);
        onKey(   dom,           ['Enter'], onDoneProxy);
    }

    _setPosition() {
        const parent = this.settings.parent,
              elm = this.domElement;

        if(parent !== elm.parentNode) { parent.appendChild(elm); }

        this._ifPopup((popup) => {

            if(getComputedStyle(parent).position === 'static') {
                parent.style.position = 'relative';
            }

            const cssClass = (popup === true) ? 'popup_right' : 'popup_' + popup;

            ['popup_top', 'popup_bottom', 'popup_left', 'popup_right'].forEach(c => {

                if(c === cssClass) {
                    elm.classList.add(c);
                }
                else {
                    elm.classList.remove(c);
                }
            });

            elm.classList.add(cssClass);
        });
    }

    _setHSLA(h, s, l, a,  flags) {
        flags = flags || {};

        const col = this.colour,
              hsla = col.hsla;

        [h, s, l, a].forEach((x, i) => {
            if(x || (x === 0)) { hsla[i] = x; }
        });
        col.hsla = hsla;

        this._updateUI(flags);

        if(this.onChange && !flags.silent) { this.onChange(col); }
    }

    _updateUI(flags) {
        if(!this.domElement) { return; }
        flags = flags || {};

        const col = this.colour,
              hsl = col.hsla,
              cssHue  = `hsl(${hsl[0] * HUES}, 100%, 50%)`,
              cssHSL  = col.hslString,
              cssHSLA = col.hslaString;

        const uiH  = this._domH,
              uiSL = this._domSL,
              uiA  = this._domA,
              thumbH  = $('.picker_selector', uiH),
              thumbSL = $('.picker_selector', uiSL),
              thumbA  = $('.picker_selector', uiA);

        function posX(parent, child, relX) {
            child.style.left = (relX * 100) + '%';
        }
        function posY(parent, child, relY) {
            child.style.top  = (relY * 100) + '%';
        }

        posX(uiH, thumbH, hsl[0]);

        this._domSL.style.backgroundColor = this._domH.style.color = cssHue;

        posX(uiSL, thumbSL, hsl[1]);
        posY(uiSL, thumbSL, 1 - hsl[2]);

        uiSL.style.color = cssHSL;

        posY(uiA,  thumbA,  1 - hsl[3]);

        const opaque = cssHSL,
              transp = opaque.replace('hsl', 'hsla').replace(')', ', 0)'),
              bg = `linear-gradient(${[opaque, transp]})`;

        this._domA.style.backgroundImage = bg + ', ' + BG_TRANSP;

        if(!flags.fromEditor) {
            const format = this.settings.editorFormat,
                  alpha = this.settings.alpha;

            let value;
            switch (format) {
                case 'rgb': value = col.printRGB(alpha); break;
                case 'hsl': value = col.printHSL(alpha); break;
                default:    value = col.printHex(alpha);
            }
            this._domEdit.value = value;
        }

        this._domSample.style.color = cssHSLA;
    }

    _ifPopup(actionIf, actionElse) {
        if(this.settings.parent && this.settings.popup) {
            actionIf && actionIf(this.settings.popup);
        }
        else {
            actionElse && actionElse();
        }
    }

    _toggleDOM(toVisible) {
        const dom = this.domElement;
        if(!dom) { return false; }

        const displayStyle = toVisible ? '' : 'none',
              toggle = (dom.style.display !== displayStyle);

        if(toggle) { dom.style.display = displayStyle; }
        return toggle;
    }

    static get StyleElement() {
        return _style;
    }
}

export default Picker;
