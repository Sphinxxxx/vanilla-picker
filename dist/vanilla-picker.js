/*!
 * vanilla-picker v2.7.2
 * https://vanilla-picker.js.org
 *
 * Copyright 2017-2019 Andreas Borgen (https://github.com/Sphinxxxx), Adam Brooks (https://github.com/dissimulate)
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

  var colorNames = { aliceblue: '#f0f8ff', antiquewhite: '#faebd7', aqua: '#00ffff', aquamarine: '#7fffd4', azure: '#f0ffff', beige: '#f5f5dc', bisque: '#ffe4c4', black: '#000000', blanchedalmond: '#ffebcd', blue: '#0000ff', blueviolet: '#8a2be2', brown: '#a52a2a', burlywood: '#deb887', cadetblue: '#5f9ea0', chartreuse: '#7fff00', chocolate: '#d2691e', coral: '#ff7f50', cornflowerblue: '#6495ed', cornsilk: '#fff8dc', crimson: '#dc143c', cyan: '#00ffff', darkblue: '#00008b', darkcyan: '#008b8b', darkgoldenrod: '#b8860b', darkgray: '#a9a9a9', darkgreen: '#006400', darkgrey: '#a9a9a9', darkkhaki: '#bdb76b', darkmagenta: '#8b008b', darkolivegreen: '#556b2f', darkorange: '#ff8c00', darkorchid: '#9932cc', darkred: '#8b0000', darksalmon: '#e9967a', darkseagreen: '#8fbc8f', darkslateblue: '#483d8b', darkslategray: '#2f4f4f', darkslategrey: '#2f4f4f', darkturquoise: '#00ced1', darkviolet: '#9400d3', deeppink: '#ff1493', deepskyblue: '#00bfff', dimgray: '#696969', dimgrey: '#696969', dodgerblue: '#1e90ff', firebrick: '#b22222', floralwhite: '#fffaf0', forestgreen: '#228b22', fuchsia: '#ff00ff', gainsboro: '#dcdcdc', ghostwhite: '#f8f8ff', gold: '#ffd700', goldenrod: '#daa520', gray: '#808080', green: '#008000', greenyellow: '#adff2f', grey: '#808080', honeydew: '#f0fff0', hotpink: '#ff69b4', indianred: '#cd5c5c', indigo: '#4b0082', ivory: '#fffff0', khaki: '#f0e68c', lavender: '#e6e6fa', lavenderblush: '#fff0f5', lawngreen: '#7cfc00', lemonchiffon: '#fffacd', lightblue: '#add8e6', lightcoral: '#f08080', lightcyan: '#e0ffff', lightgoldenrodyellow: '#fafad2', lightgray: '#d3d3d3', lightgreen: '#90ee90', lightgrey: '#d3d3d3', lightpink: '#ffb6c1', lightsalmon: '#ffa07a', lightseagreen: '#20b2aa', lightskyblue: '#87cefa', lightslategray: '#778899', lightslategrey: '#778899', lightsteelblue: '#b0c4de', lightyellow: '#ffffe0', lime: '#00ff00', limegreen: '#32cd32', linen: '#faf0e6', magenta: '#ff00ff', maroon: '#800000', mediumaquamarine: '#66cdaa', mediumblue: '#0000cd', mediumorchid: '#ba55d3', mediumpurple: '#9370db', mediumseagreen: '#3cb371', mediumslateblue: '#7b68ee', mediumspringgreen: '#00fa9a', mediumturquoise: '#48d1cc', mediumvioletred: '#c71585', midnightblue: '#191970', mintcream: '#f5fffa', mistyrose: '#ffe4e1', moccasin: '#ffe4b5', navajowhite: '#ffdead', navy: '#000080', oldlace: '#fdf5e6', olive: '#808000', olivedrab: '#6b8e23', orange: '#ffa500', orangered: '#ff4500', orchid: '#da70d6', palegoldenrod: '#eee8aa', palegreen: '#98fb98', paleturquoise: '#afeeee', palevioletred: '#db7093', papayawhip: '#ffefd5', peachpuff: '#ffdab9', peru: '#cd853f', pink: '#ffc0cb', plum: '#dda0dd', powderblue: '#b0e0e6', purple: '#800080', rebeccapurple: '#663399', red: '#ff0000', rosybrown: '#bc8f8f', royalblue: '#4169e1', saddlebrown: '#8b4513', salmon: '#fa8072', sandybrown: '#f4a460', seagreen: '#2e8b57', seashell: '#fff5ee', sienna: '#a0522d', silver: '#c0c0c0', skyblue: '#87ceeb', slateblue: '#6a5acd', slategray: '#708090', slategrey: '#708090', snow: '#fffafa', springgreen: '#00ff7f', steelblue: '#4682b4', tan: '#d2b48c', teal: '#008080', thistle: '#d8bfd8', tomato: '#ff6347', turquoise: '#40e0d0', violet: '#ee82ee', wheat: '#f5deb3', white: '#ffffff', whitesmoke: '#f5f5f5', yellow: '#ffff00', yellowgreen: '#9acd32' };

  function printNum(num) {
  	var decs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  	var str = decs > 0 ? num.toFixed(decs).replace(/0+$/, '').replace(/\.$/, '') : num.toString();
  	return str || '0';
  }

  var Color = function () {
  	function Color(r, g, b, a) {
  		classCallCheck(this, Color);


  		var that = this;
  		function parseString(input) {

  			if (input.startsWith('hsl')) {
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

  			else if (input.startsWith('rgb')) {
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

  				else {
  						if (input.startsWith('#')) {
  							that.rgba = Color.hexToRgb(input);
  						} else {
  							that.rgba = Color.nameToRgb(input) || Color.hexToRgb(input);
  						}
  					}
  		}

  		if (r === undefined) ;


  		else if (Array.isArray(r)) {
  				this.rgba = r;
  			}

  			else if (b === undefined) {
  					var color = r && '' + r;
  					if (color) {
  						parseString(color.toLowerCase());
  					}
  				} else {
  					this.rgba = [r, g, b, a === undefined ? 1 : a];
  				}
  	}


  	createClass(Color, [{
  		key: 'printRGB',
  		value: function printRGB(alpha) {
  			var rgb = alpha ? this.rgba : this.rgba.slice(0, 3),
  			    vals = rgb.map(function (x, i) {
  				return printNum(x, i === 3 ? 3 : 0);
  			});

  			return alpha ? 'rgba(' + vals + ')' : 'rgb(' + vals + ')';
  		}
  	}, {
  		key: 'printHSL',
  		value: function printHSL(alpha) {
  			var mults = [360, 100, 100, 1],
  			    suff = ['', '%', '%', ''];

  			var hsl = alpha ? this.hsla : this.hsla.slice(0, 3),

  			vals = hsl.map(function (x, i) {
  				return printNum(x * mults[i], i === 3 ? 3 : 1) + suff[i];
  			});

  			return alpha ? 'hsla(' + vals + ')' : 'hsl(' + vals + ')';
  		}
  	}, {
  		key: 'printHex',
  		value: function printHex(alpha) {
  			var hex = this.hex;
  			return alpha ? hex : hex.substring(0, 7);
  		}



  	}, {
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
  			return this.printRGB();
  		}
  	}, {
  		key: 'rgbaString',
  		get: function get$$1() {
  			return this.printRGB(true);
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
  			return this.printHSL();
  		}
  	}, {
  		key: 'hslaString',
  		get: function get$$1() {
  			return this.printHSL(true);
  		}


  	}, {
  		key: 'hex',
  		get: function get$$1() {
  			var rgb = this.rgba,
  			    hex = rgb.map(function (x, i) {
  				return i < 3 ? x.toString(16) : Math.round(x * 255).toString(16);
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

  			if (!hex.match(/^([0-9a-fA-F]{8})$/)) {
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
  		key: 'nameToRgb',
  		value: function nameToRgb(input) {
  			var hex = colorNames[input];
  			if (hex) {
  				return Color.hexToRgb(hex);
  			}
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

  var root = window;

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
          propagate = options.propagateEvents,
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

      var dragState = void 0;

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

      function stopEvent(e) {
          e.preventDefault();
          if (!propagate) {
              e.stopPropagation();
          }
      }

      function onDown(e) {
          var target = void 0;
          if (selector) {
              target = selector instanceof Element ? selector.contains(e.target) ? selector : null : e.target.closest(selector);
          } else {
              target = {};
          }

          if (target) {
              stopEvent(e);

              var mouseOffset = selector && handleOffset ? getMousePos(e, target) : [0, 0],
                  startPos = getMousePos(e, container, mouseOffset);
              dragState = {
                  target: target,
                  mouseOffset: mouseOffset,
                  startPos: startPos,
                  actuallyDragged: false
              };

              if (callbackStart) {
                  callbackStart(target, startPos);
              }
          }
      }

      function onMove(e) {
          if (!dragState) {
              return;
          }
          stopEvent(e);

          var start = dragState.startPos,
              pos = getMousePos(e, container, dragState.mouseOffset, !dragOutside);

          dragState.actuallyDragged = dragState.actuallyDragged || start[0] !== pos[0] || start[1] !== pos[1];

          callback(dragState.target, pos, start);
      }

      function onEnd(e, cancelled) {
          if (!dragState) {
              return;
          }

          if (callbackEnd || callbackClick) {
              var isClick = !dragState.actuallyDragged,
                  pos = isClick ? dragState.startPos : getMousePos(e, container, dragState.mouseOffset, !dragOutside);

              if (callbackClick && isClick && !cancelled) {
                  callbackClick(dragState.target, pos);
              }
              if (callbackEnd) {
                  callbackEnd(dragState.target, pos, dragState.startPos, cancelled || isClick && callbackClick);
              }
          }
          dragState = null;
      }


      addEvent(container, 'mousedown', function (e) {
          if (isLeftButton(e)) {
              onDown(e);
          } else {
              onEnd(e, true);
          }
      });
      addEvent(container, 'touchstart', function (e) {
          return relayTouch(e, onDown);
      });

      addEvent(root, 'mousemove', function (e) {
          if (!dragState) {
              return;
          }

          if (isLeftButton(e)) {
              onMove(e);
          }
          else {
                  onEnd(e);
              }
      });
      addEvent(root, 'touchmove', function (e) {
          return relayTouch(e, onMove);
      });

      addEvent(container, 'mouseup', function (e) {
          if (dragState && !isLeftButton(e)) {
              onEnd(e);
          }
      });
      function onTouchEnd(e, cancelled) {
          onEnd(tweakTouch(e), cancelled);
      }
      addEvent(container, 'touchend', function (e) {
          return onTouchEnd(e);
      });
      addEvent(container, 'touchcancel', function (e) {
          return onTouchEnd(e, true);
      });

      function addEvent(target, type, handler) {
          target.addEventListener(type, handler);
      }
      function isLeftButton(e) {
          return e.buttons !== undefined ? e.buttons === 1 :
          e.which === 1;
      }
      function relayTouch(e, handler) {
          if (e.touches.length !== 1) {
              onEnd(e, true);return;
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


  var BG_TRANSP = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'2\' height=\'2\'%3E%3Cpath d=\'M1,0H0V1H2V2H1\' fill=\'lightgrey\'/%3E%3C/svg%3E")';
  var HUES = 360;
  var EVENT_KEY = 'keydown',
  EVENT_CLICK_OUTSIDE = 'mousedown',
      EVENT_TAB_MOVE = 'focusin';

  function parseHTML(htmlString) {
      var div = document.createElement('div');
      div.innerHTML = htmlString;
      return div.firstElementChild;
  }

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
      addEvent(target, EVENT_KEY, function (e) {
          if (keys.indexOf(e.key) >= 0) {
              if (stop) {
                  stopEvent(e);
              }
              handler(e);
          }
      });
  }

  document.documentElement.firstElementChild 
  .appendChild(document.createElement('style')).textContent = '.picker_wrapper.no_alpha .picker_alpha{display:none}.picker_wrapper.no_editor .picker_editor{position:absolute;z-index:-1;opacity:0}.layout_default.picker_wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;font-size:10px;width:25em;padding:.5em}.layout_default.picker_wrapper input,.layout_default.picker_wrapper button{font-size:1rem}.layout_default.picker_wrapper>*{margin:.5em}.layout_default.picker_wrapper::before{content:\'\';display:block;width:100%;height:0;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.layout_default .picker_slider,.layout_default .picker_selector{padding:1em}.layout_default .picker_hue{width:100%}.layout_default .picker_sl{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}.layout_default .picker_sl::before{content:\'\';display:block;padding-bottom:100%}.layout_default .picker_editor{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;width:6rem}.layout_default .picker_editor input{width:calc(100% + 2px);height:calc(100% + 2px)}.layout_default .picker_sample{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}.layout_default .picker_done{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.picker_wrapper{-webkit-box-sizing:border-box;box-sizing:border-box;background:#f2f2f2;-webkit-box-shadow:0 0 0 1px silver;box-shadow:0 0 0 1px silver;cursor:default;font-family:sans-serif;color:#444;pointer-events:auto}.picker_wrapper:focus{outline:none}.picker_wrapper button,.picker_wrapper input{margin:-1px}.picker_selector{position:absolute;z-index:1;display:block;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);border:2px solid white;border-radius:100%;-webkit-box-shadow:0 0 3px 1px #67b9ff;box-shadow:0 0 3px 1px #67b9ff;background:currentColor;cursor:pointer}.picker_slider .picker_selector{border-radius:2px}.picker_hue{position:relative;background-image:-webkit-gradient(linear, left top, right top, from(red), color-stop(yellow), color-stop(lime), color-stop(cyan), color-stop(blue), color-stop(magenta), to(red));background-image:linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red);-webkit-box-shadow:0 0 0 1px silver;box-shadow:0 0 0 1px silver}.picker_sl{position:relative;-webkit-box-shadow:0 0 0 1px silver;box-shadow:0 0 0 1px silver;background-image:-webkit-gradient(linear, left top, left bottom, from(white), color-stop(50%, rgba(255,255,255,0))),-webkit-gradient(linear, left bottom, left top, from(black), color-stop(50%, rgba(0,0,0,0))),-webkit-gradient(linear, left top, right top, from(gray), to(rgba(128,128,128,0)));background-image:linear-gradient(180deg, white, rgba(255,255,255,0) 50%),linear-gradient(0deg, black, rgba(0,0,0,0) 50%),linear-gradient(90deg, gray, rgba(128,128,128,0))}.picker_alpha,.picker_sample{position:relative;background:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'2\' height=\'2\'%3E%3Cpath d=\'M1,0H0V1H2V2H1\' fill=\'lightgrey\'/%3E%3C/svg%3E") left top/contain white;-webkit-box-shadow:0 0 0 1px silver;box-shadow:0 0 0 1px silver}.picker_alpha .picker_selector,.picker_sample .picker_selector{background:none}.picker_editor input{-webkit-box-sizing:border-box;box-sizing:border-box;font-family:monospace;padding:.1em .2em}.picker_sample::before{content:\'\';position:absolute;display:block;width:100%;height:100%;background:currentColor}.picker_done button{-webkit-box-sizing:border-box;box-sizing:border-box;padding:.2em .5em;cursor:pointer}.picker_arrow{position:absolute;z-index:-1}.picker_wrapper.popup{position:absolute;z-index:2;margin:1.5em}.picker_wrapper.popup,.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{background:#f2f2f2;-webkit-box-shadow:0 0 10px 1px rgba(0,0,0,0.4);box-shadow:0 0 10px 1px rgba(0,0,0,0.4)}.picker_wrapper.popup .picker_arrow{width:3em;height:3em;margin:0}.picker_wrapper.popup .picker_arrow::before,.picker_wrapper.popup .picker_arrow::after{content:"";display:block;position:absolute;top:0;left:0;z-index:-99}.picker_wrapper.popup .picker_arrow::before{width:100%;height:100%;-webkit-transform:skew(45deg);transform:skew(45deg);-webkit-transform-origin:0 100%;transform-origin:0 100%}.picker_wrapper.popup .picker_arrow::after{width:150%;height:150%;-webkit-box-shadow:none;box-shadow:none}.popup.popup_top{bottom:100%;left:0}.popup.popup_top .picker_arrow{bottom:0;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.popup.popup_bottom{top:100%;left:0}.popup.popup_bottom .picker_arrow{top:0;left:0;-webkit-transform:rotate(90deg) scale(1, -1);transform:rotate(90deg) scale(1, -1)}.popup.popup_left{top:0;right:100%}.popup.popup_left .picker_arrow{top:0;right:0;-webkit-transform:scale(-1, 1);transform:scale(-1, 1)}.popup.popup_right{top:0;left:100%}.popup.popup_right .picker_arrow{top:0;left:0}';

  var Picker = function () {


      function Picker(options) {
          var _this = this;

          classCallCheck(this, Picker);


          this.settings = {
              popup: 'right',
              layout: 'default',
              alpha: true,
              editor: true,
              editorFormat: 'hex'
          };

          this._openProxy = function (e) {
              return _this.openHandler(e);
          };

          this.onChange = null;
          this.onDone = null;
          this.onOpen = null;
          this.onClose = null;

          this.setOptions(options);
      }



      createClass(Picker, [{
          key: 'setOptions',
          value: function setOptions(options) {
              if (!options) {
                  return;
              }
              var settings = this.settings;

              function transfer(source, target, skipKeys) {
                  for (var key in source) {
                      if (skipKeys && skipKeys.indexOf(key) >= 0) {
                          continue;
                      }

                      target[key] = source[key];
                  }
              }

              if (options instanceof HTMLElement) {
                  settings.parent = options;
              } else {


                  if (settings.parent && options.parent && settings.parent !== options.parent) {
                      settings.parent.removeEventListener('click', this._openProxy, false);
                      this._popupInited = false;
                  }

                  transfer(options, settings );

                  if (options.onChange) {
                      this.onChange = options.onChange;
                  }
                  if (options.onDone) {
                      this.onDone = options.onDone;
                  }
                  if (options.onOpen) {
                      this.onOpen = options.onOpen;
                  }
                  if (options.onClose) {
                      this.onClose = options.onClose;
                  }

                  var col = options.color || options.colour;
                  if (col) {
                      this._setColor(col);
                  }
              }

              var parent = settings.parent;
              if (parent && settings.popup && !this._popupInited) {

                  addEvent(parent, 'click', this._openProxy);

                  onKey(parent, [' ', 'Spacebar', 'Enter'], this._openProxy );


                  this._popupInited = true;
              } else if (options.parent && !settings.popup) {
                  this.show();
              }
          }


      }, {
          key: 'openHandler',
          value: function openHandler(e) {
              if (this.show()) {
                  e && e.preventDefault();

                  this.settings.parent.style.pointerEvents = 'none';

                  var toFocus = e && e.type === EVENT_KEY ? this._domEdit : this.domElement;
                  setTimeout(function () {
                      return toFocus.focus();
                  }, 100);

                  if (this.onOpen) {
                      this.onOpen(this.colour);
                  }
              }
          }


      }, {
          key: 'closeHandler',
          value: function closeHandler(e) {
              var event = e && e.type;
              var doHide = false;

              if (!e) {
                  doHide = true;
              }
              else if (event === EVENT_CLICK_OUTSIDE || event === EVENT_TAB_MOVE) {

                      if (!this.domElement.contains(e.target)) {
                          doHide = true;
                      }
                  }
                  else {
                          stopEvent(e);

                          doHide = true;
                      }

              if (doHide && this.hide()) {
                  this.settings.parent.style.pointerEvents = '';

                  if (event !== EVENT_CLICK_OUTSIDE) {
                      this.settings.parent.focus();
                  }

                  if (this.onClose) {
                      this.onClose(this.colour);
                  }
              }
          }


      }, {
          key: 'movePopup',
          value: function movePopup(options, open) {
              this.closeHandler();

              this.setOptions(options);
              if (open) {
                  this.openHandler();
              }
          }


      }, {
          key: 'setColor',
          value: function setColor(color, silent) {
              this._setColor(color, { silent: silent });
          }
      }, {
          key: '_setColor',
          value: function _setColor(color, flags) {
              if (typeof color === 'string') {
                  color = color.trim();
              }
              if (!color) {
                  return;
              }

              flags = flags || {};
              var c = void 0;
              try {
                  c = new Color(color);
              } catch (ex) {
                  if (flags.failSilently) {
                      return;
                  }
                  throw ex;
              }

              if (!this.settings.alpha) {
                  var hsla = c.hsla;
                  hsla[3] = 1;
                  c.hsla = hsla;
              }
              this.colour = this.color = c;
              this._setHSLA(null, null, null, null, flags);
          }

      }, {
          key: 'setColour',
          value: function setColour(colour, silent) {
              this.setColor(colour, silent);
          }


      }, {
          key: 'show',
          value: function show() {
              var parent = this.settings.parent;
              if (!parent) {
                  return false;
              }

              if (this.domElement) {
                  var toggled = this._toggleDOM(true);

                  this._setPosition();

                  return toggled;
              }

              var html = this.settings.template || '<div class="picker_wrapper" tabindex="-1"><div class="picker_arrow"></div><div class="picker_hue picker_slider"><div class="picker_selector"></div></div><div class="picker_sl"><div class="picker_selector"></div></div><div class="picker_alpha picker_slider"><div class="picker_selector"></div></div><div class="picker_editor"><input aria-label="Type a color name or hex value"/></div><div class="picker_sample"></div><div class="picker_done"><button>Ok</button></div></div>';
              var wrapper = parseHTML(html);

              this.domElement = wrapper;
              this._domH = $('.picker_hue', wrapper);
              this._domSL = $('.picker_sl', wrapper);
              this._domA = $('.picker_alpha', wrapper);
              this._domEdit = $('.picker_editor input', wrapper);
              this._domSample = $('.picker_sample', wrapper);
              this._domOkay = $('.picker_done button', wrapper);

              wrapper.classList.add('layout_' + this.settings.layout);
              if (!this.settings.alpha) {
                  wrapper.classList.add('no_alpha');
              }
              if (!this.settings.editor) {
                  wrapper.classList.add('no_editor');
              }
              this._ifPopup(function () {
                  return wrapper.classList.add('popup');
              });

              this._setPosition();

              if (this.colour) {
                  this._updateUI();
              } else {
                  this._setColor('#0cf');
              }
              this._bindEvents();

              return true;
          }


      }, {
          key: 'hide',
          value: function hide() {
              return this._toggleDOM(false);
          }


      }, {
          key: '_bindEvents',
          value: function _bindEvents() {
              var _this2 = this;

              var that = this,
                  dom = this.domElement;

              addEvent(dom, 'click', function (e) {
                  return e.preventDefault();
              });


              function createDragConfig(container, callbackRelative) {

                  function relayDrag(_, pos) {
                      var relX = pos[0] / container.clientWidth,
                          relY = pos[1] / container.clientHeight;
                      callbackRelative(relX, relY);
                  }

                  var config = {
                      container: container,
                      dragOutside: false,
                      callback: relayDrag,
                      callbackDragStart: relayDrag,
                      propagateEvents: true
                  };
                  return config;
              }

              dragTracker(createDragConfig(this._domH, function (x, y) {
                  return that._setHSLA(x);
              }));

              dragTracker(createDragConfig(this._domSL, function (x, y) {
                  return that._setHSLA(null, x, 1 - y);
              }));

              if (this.settings.alpha) {
                  dragTracker(createDragConfig(this._domA, function (x, y) {
                      return that._setHSLA(null, null, null, 1 - y);
                  }));
              }


              var editInput = this._domEdit;
{
                  addEvent(editInput, 'input', function (e) {
                      that._setColor(this.value, { fromEditor: true, failSilently: true });
                  });
                  addEvent(editInput, 'focus', function (e) {
                      var input = this;
                      if (input.selectionStart === input.selectionEnd) {
                          input.select();
                      }
                  });
              }


              var popupCloseProxy = function popupCloseProxy(e) {
                  _this2._ifPopup(function () {
                      return _this2.closeHandler(e);
                  });
              };
              var onDoneProxy = function onDoneProxy(e) {
                  _this2._ifPopup(function () {
                      return _this2.closeHandler(e);
                  });
                  if (_this2.onDone) {
                      _this2.onDone(_this2.colour);
                  }
              };

              addEvent(window, EVENT_CLICK_OUTSIDE, popupCloseProxy);
              addEvent(window, EVENT_TAB_MOVE, popupCloseProxy); 
              onKey(dom, ['Esc', 'Escape'], popupCloseProxy);

              addEvent(this._domOkay, 'click', onDoneProxy);
              onKey(dom, ['Enter'], onDoneProxy);
          }


      }, {
          key: '_setPosition',
          value: function _setPosition() {
              var parent = this.settings.parent,
                  elm = this.domElement;

              if (parent !== elm.parentNode) {
                  parent.appendChild(elm);
              }

              this._ifPopup(function (popup) {

                  if (getComputedStyle(parent).position === 'static') {
                      parent.style.position = 'relative';
                  }

                  var cssClass = popup === true ? 'popup_right' : 'popup_' + popup;

                  ['popup_top', 'popup_bottom', 'popup_left', 'popup_right'].forEach(function (c) {
                      if (c === cssClass) {
                          elm.classList.add(c);
                      } else {
                          elm.classList.remove(c);
                      }
                  });

                  elm.classList.add(cssClass);
              });
          }


      }, {
          key: '_setHSLA',
          value: function _setHSLA(h, s, l, a, flags) {
              flags = flags || {};

              var col = this.colour,
                  hsla = col.hsla;

              [h, s, l, a].forEach(function (x, i) {
                  if (x || x === 0) {
                      hsla[i] = x;
                  }
              });
              col.hsla = hsla;

              this._updateUI(flags);

              if (this.onChange && !flags.silent) {
                  this.onChange(col);
              }
          }
      }, {
          key: '_updateUI',
          value: function _updateUI(flags) {
              if (!this.domElement) {
                  return;
              }
              flags = flags || {};

              var col = this.colour,
                  hsl = col.hsla,
                  cssHue = 'hsl(' + hsl[0] * HUES + ', 100%, 50%)',
                  cssHSL = col.hslString,
                  cssHSLA = col.hslaString;

              var uiH = this._domH,
                  uiSL = this._domSL,
                  uiA = this._domA,
                  thumbH = $('.picker_selector', uiH),
                  thumbSL = $('.picker_selector', uiSL),
                  thumbA = $('.picker_selector', uiA);

              function posX(parent, child, relX) {
                  child.style.left = relX * 100 + '%'; 
              }
              function posY(parent, child, relY) {
                  child.style.top = relY * 100 + '%'; 
              }


              posX(uiH, thumbH, hsl[0]);

              this._domSL.style.backgroundColor = this._domH.style.color = cssHue;


              posX(uiSL, thumbSL, hsl[1]);
              posY(uiSL, thumbSL, 1 - hsl[2]);

              uiSL.style.color = cssHSL;


              posY(uiA, thumbA, 1 - hsl[3]);

              var opaque = cssHSL,
                  transp = opaque.replace('hsl', 'hsla').replace(')', ', 0)'),
                  bg = 'linear-gradient(' + [opaque, transp] + ')';

              this._domA.style.backgroundImage = bg + ', ' + BG_TRANSP;


              if (!flags.fromEditor) {
                  var format = this.settings.editorFormat,
                      alpha = this.settings.alpha;

                  var value = void 0;
                  switch (format) {
                      case 'rgb':
                          value = col.printRGB(alpha);break;
                      case 'hsl':
                          value = col.printHSL(alpha);break;
                      default:
                          value = col.printHex(alpha);
                  }
                  this._domEdit.value = value;
              }


              this._domSample.style.color = cssHSLA;
          }
      }, {
          key: '_ifPopup',
          value: function _ifPopup(actionIf, actionElse) {
              if (this.settings.parent && this.settings.popup) {
                  actionIf && actionIf(this.settings.popup);
              } else {
                  actionElse && actionElse();
              }
          }
      }, {
          key: '_toggleDOM',
          value: function _toggleDOM(toVisible) {
              var dom = this.domElement;
              if (!dom) {
                  return false;
              }

              var displayStyle = toVisible ? '' : 'none',
                  toggle = dom.style.display !== displayStyle;

              if (toggle) {
                  dom.style.display = displayStyle;
              }
              return toggle;
          }


      }]);
      return Picker;
  }();

  return Picker;

})));
