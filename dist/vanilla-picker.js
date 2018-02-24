/*!
 * vanilla-picker v2.0.0-alpha.3
 * https://github.com/Sphinxxxx/Picker
 *
 * Copyright 2017-2018 Adam Brooks (https://github.com/dissimulate), Andreas Borgen (https://github.com/Sphinxxxx)
 * Released under the ISC license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Picker = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

String.prototype.startsWith = String.prototype.startsWith || function (needle) {
	return this.indexOf(needle) === 0;
};
String.prototype.padStart = String.prototype.padStart || function (len, pad) {
	var str = this;while (str.length < len) {
		str = pad + str;
	}return str;
};

var Color = function () {
	function Color(r, g, b, a) {
		classCallCheck(this, Color);


		var that = this;
		function parseString(input) {

			if (input.startsWith('#')) {
				that.rgba = Color.hexToRgb(input);
			}

			else if (input.startsWith('hsl')) {
					var _input$match$map = input.match(/([\-\d\.e]+)/g).map(Number),
					    _input$match$map2 = slicedToArray(_input$match$map, 4),
					    h = _input$match$map2[0],
					    s = _input$match$map2[1],
					    l = _input$match$map2[2],
					    _a = _input$match$map2[3];

					if (_a === undefined) {
						_a = 1;
					}

					h /= 360;
					s /= 100;
					l /= 100;
					that.hsla = [h, s, l, _a];
				}

				else {
						var _input$match$map3 = input.match(/([\-\d\.e]+)/g).map(Number),
						    _input$match$map4 = slicedToArray(_input$match$map3, 4),
						    _r = _input$match$map4[0],
						    _g = _input$match$map4[1],
						    _b = _input$match$map4[2],
						    _a2 = _input$match$map4[3];

						if (_a2 === undefined) {
							_a2 = 1;
						}

						that.rgba = [_r, _g, _b, _a2];
					}
		}

		if (r === undefined) {}


		else if (Array.isArray(r)) {
				this.rgba = r;
			}

			else if (b === undefined) {
					var color = r && ('' + r).trim();
					if (color) {
						parseString(color.toLowerCase());
					}
				} else {
					this.rgba = [r, g, b, a === undefined ? 1 : a];
				}
	}


	createClass(Color, [{
		key: 'rgba',
		get: function get$$1() {
			if (this._rgba) {
				return this._rgba;
			}
			if (!this._hsla) {
				throw new Error('No color is set');
			}

			return this._rgba = Color.hslToRgb(this._hsla);
		},
		set: function set$$1(rgb) {
			if (rgb.length === 3) {
				rgb[3] = 1;
			}

			this._rgba = rgb;
			this._hsla = null;
		}


	}, {
		key: 'rgbString',
		get: function get$$1() {
			return 'rgb(' + this.rgba.slice(0, 3) + ')';
		}
	}, {
		key: 'rgbaString',
		get: function get$$1() {
			return 'rgba(' + this.rgba + ')';
		}
	}, {
		key: 'hsla',
		get: function get$$1() {
			if (this._hsla) {
				return this._hsla;
			}
			if (!this._rgba) {
				throw new Error('No color is set');
			}

			return this._hsla = Color.rgbToHsl(this._rgba);
		},
		set: function set$$1(hsl) {
			if (hsl.length === 3) {
				hsl[3] = 1;
			}

			this._hsla = hsl;
			this._rgba = null;
		}


	}, {
		key: 'hslString',
		get: function get$$1() {
			var c = this.hsla;
			return 'hsl(' + c[0] * 360 + ',' + c[1] * 100 + '%,' + c[2] * 100 + '%)';
		}
	}, {
		key: 'hslaString',
		get: function get$$1() {
			var c = this.hsla;
			return 'hsla(' + c[0] * 360 + ',' + c[1] * 100 + '%,' + c[2] * 100 + '%,' + c[3] + ')';
		}
	}, {
		key: 'hex',
		get: function get$$1() {
			var rgb = this.rgba,
			    hex = rgb.map(function (x, i) {
				return i < 3 ? x.toString(16) : (x * 255).toString(16);
			});

			return '#' + hex.map(function (x) {
				return x.padStart(2, '0');
			}).join('');
		},
		set: function set$$1(hex) {
			this.rgba = Color.hexToRgb(hex);
		}



	}], [{
		key: 'hexToRgb',
		value: function hexToRgb(input) {
			var hex = (input.startsWith('#') ? input.slice(1) : input).replace(/^(\w{3})$/, '$1F') 
			.replace(/^(\w)(\w)(\w)(\w)$/, '$1$1$2$2$3$3$4$4') 
			.replace(/^(\w{6})$/, '$1FF'); 

			if (!hex.match(/^(\w{8})$/)) {
				throw new Error('Unknown hex color; ' + input);
			}

			var rgba = hex.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1) 
			.map(function (x) {
				return parseInt(x, 16);
			}); 

			rgba[3] = rgba[3] / 255;
			return rgba;
		}


	}, {
		key: 'rgbToHsl',
		value: function rgbToHsl(_ref) {
			var _ref2 = slicedToArray(_ref, 4),
			    r = _ref2[0],
			    g = _ref2[1],
			    b = _ref2[2],
			    a = _ref2[3];

			r /= 255;
			g /= 255;
			b /= 255;

			var max = Math.max(r, g, b),
			    min = Math.min(r, g, b);
			var h = void 0,
			    s = void 0,
			    l = (max + min) / 2;

			if (max === min) {
				h = s = 0; 
			} else {
				var d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch (max) {
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);break;
					case g:
						h = (b - r) / d + 2;break;
					case b:
						h = (r - g) / d + 4;break;
				}

				h /= 6;
			}

			return [h, s, l, a];
		}


	}, {
		key: 'hslToRgb',
		value: function hslToRgb(_ref3) {
			var _ref4 = slicedToArray(_ref3, 4),
			    h = _ref4[0],
			    s = _ref4[1],
			    l = _ref4[2],
			    a = _ref4[3];

			var r = void 0,
			    g = void 0,
			    b = void 0;

			if (s === 0) {
				r = g = b = l; 
			} else {
				var hue2rgb = function hue2rgb(p, q, t) {
					if (t < 0) t += 1;
					if (t > 1) t -= 1;
					if (t < 1 / 6) return p + (q - p) * 6 * t;
					if (t < 1 / 2) return q;
					if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
					return p;
				};

				var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
				    p = 2 * l - q;

				r = hue2rgb(p, q, h + 1 / 3);
				g = hue2rgb(p, q, h);
				b = hue2rgb(p, q, h - 1 / 3);
			}

			var rgba = [r * 255, g * 255, b * 255].map(Math.round);
			rgba[3] = a;

			return rgba;
		}
	}]);
	return Color;
}();

function dragTracker(options) {


    var ep = Element.prototype;
    if (!ep.matches) ep.matches = ep.msMatchesSelector || ep.webkitMatchesSelector;
    if (!ep.closest) ep.closest = function (s) {
        var node = this;
        do {
            if (node.matches(s)) return node;
            node = node.tagName === 'svg' ? node.parentNode : node.parentElement;
        } while (node);

        return null;
    };

    options = options || {};
    var container = options.container || document.documentElement,
        selector = options.selector,
        callback = options.callback || console.log,
        callbackStart = options.callbackDragStart,
        callbackEnd = options.callbackDragEnd,

    callbackClick = options.callbackClick,
        roundCoords = options.roundCoords !== false,
        dragOutside = options.dragOutside !== false,

    handleOffset = options.handleOffset || options.handleOffset !== false;
    var offsetToCenter = null;
    switch (handleOffset) {
        case 'center':
            offsetToCenter = true;break;
        case 'topleft':
        case 'top-left':
            offsetToCenter = false;break;
    }

    var dragged = void 0,
        mouseOffset = void 0,
        dragStart = void 0;

    function getMousePos(e, elm, offset, stayWithin) {
        var x = e.clientX,
            y = e.clientY;

        function respectBounds(value, min, max) {
            return Math.max(min, Math.min(value, max));
        }

        if (elm) {
            var bounds = elm.getBoundingClientRect();
            x -= bounds.left;
            y -= bounds.top;

            if (offset) {
                x -= offset[0];
                y -= offset[1];
            }
            if (stayWithin) {
                x = respectBounds(x, 0, bounds.width);
                y = respectBounds(y, 0, bounds.height);
            }

            if (elm !== container) {
                var center = offsetToCenter !== null ? offsetToCenter
                : elm.nodeName === 'circle' || elm.nodeName === 'ellipse';

                if (center) {
                    x -= bounds.width / 2;
                    y -= bounds.height / 2;
                }
            }
        }
        return roundCoords ? [Math.round(x), Math.round(y)] : [x, y];
    }

    function onDown(e) {
        dragged = selector ? e.target.closest(selector) : {};
        if (dragged) {
            e.preventDefault();
            e.stopPropagation();

            mouseOffset = selector && handleOffset ? getMousePos(e, dragged) : [0, 0];
            dragStart = getMousePos(e, container, mouseOffset);
            if (roundCoords) {
                dragStart = dragStart.map(Math.round);
            }

            if (callbackStart) {
                callbackStart(dragged, dragStart);
            }
        }
    }

    function onMove(e) {
        if (!dragged) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();

        var pos = getMousePos(e, container, mouseOffset, !dragOutside);
        callback(dragged, pos, dragStart);
    }

    function onEnd(e) {
        if (!dragged) {
            return;
        }

        if (callbackEnd || callbackClick) {
            var pos = getMousePos(e, container, mouseOffset, !dragOutside);

            if (callbackClick && dragStart[0] === pos[0] && dragStart[1] === pos[1]) {
                callbackClick(dragged, dragStart);
            }
            if (callbackEnd) {
                callbackEnd(dragged, pos, dragStart);
            }
        }
        dragged = null;
    }


    container.addEventListener('mousedown', function (e) {
        if (isLeftButton(e)) {
            onDown(e);
        }
    });
    container.addEventListener('touchstart', function (e) {
        relayTouch(e, onDown);
    });

    window.addEventListener('mousemove', function (e) {
        if (!dragged) {
            return;
        }

        if (isLeftButton(e)) {
            onMove(e);
        }
        else {
                onEnd(e);
            }
    });
    window.addEventListener('touchmove', function (e) {
        relayTouch(e, onMove);
    });

    window.addEventListener('mouseup', function (e) {
        if (dragged && !isLeftButton(e)) {
            onEnd(e);
        }
    });
    function onTouchEnd(e) {
        onEnd(tweakTouch(e));
    }
    container.addEventListener('touchend', onTouchEnd);
    container.addEventListener('touchcancel', onTouchEnd);

    function isLeftButton(e) {
        return e.buttons !== undefined ? e.buttons === 1 :
        e.which === 1;
    }
    function relayTouch(e, handler) {
        if (e.touches.length !== 1) {
            onEnd(e);return;
        }

        handler(tweakTouch(e));
    }
    function tweakTouch(e) {
        var touch = e.targetTouches[0];
        if (!touch) {
            touch = e.changedTouches[0];
        }

        touch.preventDefault = e.preventDefault.bind(e);
        touch.stopPropagation = e.stopPropagation.bind(e);
        return touch;
    }
}

document.documentElement.firstElementChild 
.appendChild(document.createElement('style')).textContent = '.picker_wrapper{position:absolute;display:block;width:272px;padding:8px 0 8px 8px;box-sizing:border-box;overflow:visible;cursor:default;pointer-events:auto;z-index:1;color:red}.picker_wrapper,.picker_wrapper::before,.picker_wrapper::after{background:#f2f2f2;box-shadow:0 0 10px 1px rgba(0,0,0,0.4)}.picker_wrapper::before,.picker_wrapper::after{content:"";display:block;position:absolute;top:0;left:0;z-index:-99}.picker_wrapper::before{width:30px;height:30px;transform:skew(45deg);transform-origin:0 100%}.picker_wrapper::after{width:40px;height:40px;box-shadow:none}.picker_wrapper>div{margin:8px;float:left}.picker_hue{width:240px;height:20px;position:relative;margin-left:10px;background-image:linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red);outline:1px solid #cccccc}.picker_sl{width:203px;height:203px;position:relative;outline:1px solid #cccccc;background-color:red;background-image:linear-gradient(180deg, white, rgba(255,255,255,0) 50%),linear-gradient(0deg, black, transparent 50%),linear-gradient(90deg, gray, rgba(128,128,128,0))}.picker_alpha{width:20px;height:200px;position:relative;margin-left:10px;background:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'2\' height=\'2\'%3E%3Cpath d=\'M1,0H0V1H2V2H1\' fill=\'lightgrey\'/%3E%3C/svg%3E") top/contain white;outline:1px solid #cccccc}.picker_selector{position:absolute;display:block;width:24px;height:24px;margin:-12px;cursor:pointer;border:2px solid white;box-sizing:border-box;border-radius:20px;box-shadow:0 0 3px 1px #67b9ff;background:currentColor}.picker_slider .picker_selector{border-radius:2px}.picker_hue .picker_selector{top:50%}.picker_sl .picker_selector{left:100%}.picker_alpha .picker_selector{left:50%;background:none}.picker_sample{width:170px;height:30px;background:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'2\' height=\'2\'%3E%3Cpath d=\'M1,0H0V1H2V2H1\' fill=\'lightgrey\'/%3E%3C/svg%3E") left top/20px white;position:relative;margin-top:10px;outline:1px solid #aaaaaa}.picker_sample::before{content:"";position:absolute;display:block;width:100%;height:100%;background:currentColor}.picker_done{width:53px;height:30px;line-height:30px;color:#444444;background:#e2e2e2;outline:1px solid #cccccc;box-shadow:0 0 3px 1px #eeeeee;text-align:center;cursor:pointer}';

var BG_TRANSP = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'2\' height=\'2\'%3E%3Cpath d=\'M1,0H0V1H2V2H1\' fill=\'lightgrey\'/%3E%3C/svg%3E")';
var HUES = 360;

var Picker = function () {
    function Picker(options) {
        classCallCheck(this, Picker);



        this.settings = {
            parent: document.body,
            orientation: 'right',
            x: 'auto',
            y: 'auto',
            arrowSize: 20
        };

        if (options instanceof HTMLElement) {
            this.settings.parent = options;
        } else {
            for (var name in options) {
                this.settings[name] = options[name];
            }
        }


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
            }
        };


        this.onDone = null;
        this.onChange = null;
    }



    createClass(Picker, [{
        key: 'setColor',
        value: function setColor(color) {
            this.colour = this.color = new Color(color);
            this._setHSLA();
        }


    }, {
        key: 'show',
        value: function show() {
            var parent = this.settings.parent;

            parent.style.pointerEvents = 'none';

            if (this.domElement) {
                this.domElement.style.display = '';
                return;
            }

            var html = '<div class="picker_wrapper">\n   <div class="picker_hue picker_slider">\n       <div class="picker_selector"></div>\n   </div>\n   <div class="picker_sl">\n       <div class="picker_selector"></div>\n   </div>\n   <div class="picker_alpha picker_slider">\n       <div class="picker_selector"></div>\n   </div>\n   <div class="picker_sample"></div>\n   <div class="picker_done">ok</div>\n</div>';

            var wrapper = function parse(htmlString) {
                var div = document.createElement('div');
                div.innerHTML = htmlString;
                return div.firstElementChild;
            }(html);

            this.domElement = wrapper;
            this._domH = wrapper.querySelector('.picker_hue');
            this._domSL = wrapper.querySelector('.picker_sl');
            this._domA = wrapper.querySelector('.picker_alpha');
            this._domSample = wrapper.querySelector('.picker_sample');
            this._domOkay = wrapper.querySelector('.picker_done');

            if (getComputedStyle(parent).position !== 'absolute') {
                parent.style.position = 'relative';
            }

            parent.appendChild(this.domElement);



            var w = wrapper.offsetWidth,
                h = wrapper.offsetHeight,
                pw = parent.offsetWidth,
                ph = parent.offsetHeight,
                arrow = this.settings.arrowSize;

            var x = this.settings.x,
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
            wrapper.style.top = y + 'px';

            this._bindEvents();

            if (this.colour) {
                this._updateUI();
            } else {
                this.setColor('#0cf');
            }
        }


    }, {
        key: 'hide',
        value: function hide() {
            if (this.domElement) {
                this.domElement.style.display = 'none';
            }
            this.settings.parent.style.pointerEvents = '';
        }


    }, {
        key: '_bindEvents',
        value: function _bindEvents() {


            var that = this;

            function createDragConfig(container, callbackRelative) {

                function relayDrag(_, pos) {
                    var relX = pos[0] / container.clientWidth,
                        relY = pos[1] / container.clientHeight;
                    callbackRelative(relX, relY);
                }

                var config = {
                    container: container,
                    callback: relayDrag,
                    callbackClick: relayDrag,
                    dragOutside: false
                };
                return config;
            }

            dragTracker(createDragConfig(this._domH, function (x, y) {
                return that._setHSLA(x);
            }));

            dragTracker(createDragConfig(this._domSL, function (x, y) {
                return that._setHSLA(null, x, 1 - y);
            }));

            dragTracker(createDragConfig(this._domA, function (x, y) {
                return that._setHSLA(null, null, null, 1 - y);
            }));


            this.domElement.addEventListener('mousedown', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });

            window.addEventListener('mousedown', function (e) {
                that.hide();
            });

            this._domOkay.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();

                that._done();
            };
        }


    }, {
        key: '_setHSLA',
        value: function _setHSLA(h, s, l, a) {

            var arg = arguments;
            if (arg.length) {
                var hsla = this.colour.hsla;
                for (var i = 0; i < arg.length; i++) {
                    var _a = arg[i];
                    if (_a || _a === 0) {
                        hsla[i] = _a;
                    }
                }
                this.colour.hsla = hsla;
            }

            this._updateUI();

            if (this.onChange) {
                this.onChange(this.colour);
            }
        }
    }, {
        key: '_updateUI',
        value: function _updateUI() {
            if (!this.domElement) {
                return;
            }

            var col = this.colour,
                hsl = col.hsla,
                cssHue = 'hsl(' + hsl[0] * HUES + ', 100%, 50%)',
                cssHSL = col.hslString,
                cssHSLA = col.hslaString;

            var uiH = this._domH,
                uiSL = this._domSL,
                uiA = this._domA;

            function posX(parent, child, relX) {
                child.style.left = parent.clientWidth * relX + 'px';
            }
            function posY(parent, child, relY) {
                child.style.top = parent.clientHeight * relY + 'px';
            }


            posX(uiH, uiH.firstElementChild, hsl[0]);

            this._domSL.style.backgroundColor = this._domH.style.color = cssHue;


            posX(uiSL, uiSL.firstElementChild, hsl[1]);
            posY(uiSL, uiSL.firstElementChild, 1 - hsl[2]);

            uiSL.style.color = cssHSL;


            posY(uiA, uiA.firstElementChild, 1 - hsl[3]);

            var opaque = cssHSL,
            transp = opaque.replace('hsl', 'hsla').replace(')', ', 0)'),
                bg = 'linear-gradient(' + [opaque, transp] + ')';

            this._domA.style.backgroundImage = bg + ', ' + BG_TRANSP;


            this._domSample.style.color = cssHSLA;
        }
    }, {
        key: '_done',
        value: function _done() {
            this.hide();

            if (this.onDone) {
                this.onDone(this.colour);
            }
        }
    }]);
    return Picker;
}();

return Picker;

})));
