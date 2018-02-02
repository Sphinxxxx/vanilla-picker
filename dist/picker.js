/*!
 * Picker <https://github.com/Sphinxxxx/Picker>
 * A simple, easy to use, versatile and customisable Javascript colour picker.
 * Version 2.0.0-alpha.2  2018-02-02
 *
 * Copyright (c) 2014-2018 Adam Brooks (https://github.com/dissimulate), Andreas Borgen (https://github.com/Sphinxxxx)
 * Licensed under the ISC license.
 */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("Picker", ["module"], factory);
    } else if (typeof exports !== "undefined") {
        factory(module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod);
        global.Picker = mod.exports;
    }
})(this, function (module) {
    "use strict";

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass2 = function () {
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

    function dragTracker(d) {
        function k(a, b, d, e) {
            var c = a.clientX;a = a.clientY;if (b) {
                var f = b.getBoundingClientRect();c -= f.left;a -= f.top;d && (c -= d[0], a -= d[1]);e && (c = Math.max(0, Math.min(c, f.width)), a = Math.max(0, Math.min(a, f.height)));b !== g && (null !== l ? l : "circle" === b.nodeName || "ellipse" === b.nodeName) && (c -= f.width / 2, a -= f.height / 2);
            }return u ? [Math.round(c), Math.round(a)] : [c, a];
        }function v(a) {
            if (e = n ? a.target.closest(n) : {}) a.preventDefault(), a.stopPropagation(), m = n && w ? k(a, e) : [0, 0], c = k(a, g, m), u && (c = c.map(Math.round)), x && x(e, c);
        }function y(a) {
            e && (a.preventDefault(), a.stopPropagation(), a = k(a, g, m, !z), B(e, a, c));
        }function h(a) {
            if (e) {
                if (p || q) a = k(a, g, m, !z), q && c[0] === a[0] && c[1] === a[1] && q(e, c), p && p(e, a, c);e = null;
            }
        }function A(a) {
            h(r(a));
        }function t(a) {
            return void 0 !== a.buttons ? 1 === a.buttons : 1 === a.which;
        }function r(a) {
            var b = a.targetTouches[0];b || (b = a.changedTouches[0]);b.preventDefault = a.preventDefault.bind(a);b.stopPropagation = a.stopPropagation.bind(a);return b;
        }var f = Element.prototype;f.matches || (f.matches = f.msMatchesSelector || f.webkitMatchesSelector);f.closest || (f.closest = function (a) {
            var b = this;do {
                if (b.matches(a)) return b;b = "svg" === b.tagName ? b.parentNode : b.parentElement;
            } while (b);return null;
        });d = d || {};var g = d.container || document.documentElement,
            n = d.selector,
            B = d.callback || console.log,
            x = d.callbackDragStart,
            p = d.callbackDragEnd,
            q = d.callbackClick,
            u = !1 !== d.roundCoords,
            z = !1 !== d.dragOutside,
            w = d.handleOffset || !1 !== d.handleOffset,
            l = null;switch (w) {case "center":
                l = !0;break;case "topleft":case "top-left":
                l = !1;}var e, m, c;g.addEventListener("mousedown", function (a) {
            t(a) && v(a);
        });g.addEventListener("touchstart", function (a) {
            1 !== a.touches.length ? h(a) : v(r(a));
        });window.addEventListener("mousemove", function (a) {
            e && (t(a) ? y(a) : h(a));
        });window.addEventListener("touchmove", function (a) {
            1 !== a.touches.length ? h(a) : y(r(a));
        });window.addEventListener("mouseup", function (a) {
            e && !t(a) && h(a);
        });g.addEventListener("touchend", A);g.addEventListener("touchcancel", A);
    }

    var _createClass = function () {
        function e(f, j) {
            for (var m, k = 0; k < j.length; k++) {
                m = j[k], m.enumerable = m.enumerable || !1, m.configurable = !0, 'value' in m && (m.writable = !0), Object.defineProperty(f, m.key, m);
            }
        }return function (f, j, k) {
            return j && e(f.prototype, j), k && e(f, k), f;
        };
    }();
    var Color = function () {
        function e(f, j, k, m) {
            function n(v) {
                if (v.startsWith('#')) o.rgba = e._hexToRgb(v);else if (v.startsWith('hsl')) {
                    var _input$match$map = v.match(/([\-\d\.e]+)/g).map(Number),
                        w = _input$match$map[0],
                        y = _input$match$map[1],
                        z = _input$match$map[2],
                        A = _input$match$map[3];void 0 === A && (A = 1), w /= 360, y /= 100, z /= 100, o.hsla = [w, y, z, A];
                } else {
                    var _input$match$map2 = v.match(/([\-\d\.e]+)/g).map(Number),
                        B = _input$match$map2[0],
                        C = _input$match$map2[1],
                        D = _input$match$map2[2],
                        E = _input$match$map2[3];void 0 === E && (E = 1), o.rgba = [B, C, D, E];
                }
            }
            var o = this;if (void 0 === f) ;else if (Array.isArray(f)) this.rgba = f;else if (void 0 === k) {
                var u = f && ('' + f).trim();u && n(u.toLowerCase());
            } else this.rgba = [f, j, k, void 0 === m ? 1 : m];
        }return e._hexToRgb = function _hexToRgb(f) {
            var j = (f.startsWith('#') ? f.slice(1) : f).replace(/^(\w{3})$/, '$1F').replace(/^(\w)(\w)(\w)(\w)$/, '$1$1$2$2$3$3$4$4').replace(/^(\w{6})$/, '$1FF');if (!j.match(/^(\w{8})$/)) throw new Error('Unknown hex color; ' + f);var k = j.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1).map(function (m) {
                return parseInt(m, 16);
            });return k[3] /= 255, k;
        }, e._rgbToHsl = function _rgbToHsl(_ref) {
            var f = _ref[0],
                j = _ref[1],
                k = _ref[2],
                m = _ref[3];f /= 255, j /= 255, k /= 255;var u,
                v,
                n = Math.max(f, j, k),
                o = Math.min(f, j, k),
                w = (n + o) / 2;if (n === o) u = v = 0;else {
                var y = n - o;v = 0.5 < w ? y / (2 - n - o) : y / (n + o), n === f ? u = (j - k) / y + (j < k ? 6 : 0) : n === j ? u = (k - f) / y + 2 : n === k ? u = (f - j) / y + 4 : void 0, u /= 6;
            }return [u, v, w, m];
        }, e._hslToRgb = function _hslToRgb(_ref2) {
            var f = _ref2[0],
                j = _ref2[1],
                k = _ref2[2],
                m = _ref2[3],
                n = void 0,
                o = void 0,
                u = void 0;if (0 === j) n = o = u = k;else {
                var v = function v(A, B, C) {
                    return 0 > C && (C += 1), 1 < C && (C -= 1), C < 1 / 6 ? A + 6 * (B - A) * C : C < 1 / 2 ? B : C < 2 / 3 ? A + 6 * ((B - A) * (2 / 3 - C)) : A;
                },
                    w = 0.5 > k ? k * (1 + j) : k + j - k * j,
                    y = 2 * k - w;n = v(y, w, f + 1 / 3), o = v(y, w, f), u = v(y, w, f - 1 / 3);
            }var z = [255 * n, 255 * o, 255 * u].map(Math.round);return z[3] = m, z;
        }, _createClass(e, [{ key: 'rgba', get: function get() {
                if (this._rgba) return this._rgba;if (!this._hsla) throw new Error('No color is set');return this._rgba = e._hslToRgb(this._hsla);
            }, set: function set(f) {
                3 === f.length && (f[3] = 1), this._rgba = f, this._hsla = null;
            } }, { key: 'rgbString', get: function get() {
                return 'rgb(' + this.rgba.slice(0, 3) + ')';
            } }, { key: 'rgbaString', get: function get() {
                return 'rgba(' + this.rgba + ')';
            } }, { key: 'hsla', get: function get() {
                if (this._hsla) return this._hsla;if (!this._rgba) throw new Error('No color is set');return this._hsla = e._rgbToHsl(this._rgba);
            },
            set: function set(f) {
                3 === f.length && (f[3] = 1), this._hsla = f, this._rgba = null;
            } }, { key: 'hslString', get: function get() {
                var f = this.hsla;return 'hsl(' + 360 * f[0] + ', ' + 100 * f[1] + '%, ' + 100 * f[2] + '%)';
            } }, { key: 'hslaString', get: function get() {
                var f = this.hsla;return 'hsla(' + 360 * f[0] + ', ' + 100 * f[1] + '%, ' + 100 * f[2] + '%, ' + f[3] + ')';
            } }, { key: 'hex', get: function get() {
                var f = this.rgba,
                    j = f.map(function (k, m) {
                    return 3 > m ? k.toString(16) : (255 * k).toString(16);
                });return '#' + j.map(function (k) {
                    return k.padStart(2, '0');
                }).join('');
            }, set: function set(f) {
                this.rgba = e._hexToRgb(f);
            } }]), e;
    }();

    document.documentElement.firstElementChild.appendChild(document.createElement('style')).textContent = ".picker_wrapper{position:absolute;display:block;width:272px;padding:8px 0 8px 8px;box-sizing:border-box;overflow:visible;cursor:default;pointer-events:auto;z-index:1;color:red}.picker_wrapper,.picker_wrapper::before,.picker_wrapper::after{background:#f2f2f2;box-shadow:0 0 10px 1px rgba(0,0,0,0.4)}.picker_wrapper::before,.picker_wrapper::after{content:\"\";display:block;position:absolute;top:0;left:0;z-index:-99}.picker_wrapper::before{width:30px;height:30px;transform:skew(45deg);transform-origin:0 100%}.picker_wrapper::after{width:40px;height:40px;box-shadow:none}.picker_wrapper>div{margin:8px;float:left}.picker_hue{width:240px;height:20px;position:relative;margin-left:10px;background-image:linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red);outline:1px solid #cccccc}.picker_sl{width:203px;height:203px;position:relative;outline:1px solid #cccccc;background-color:red;background-image:linear-gradient(180deg, white, rgba(255,255,255,0) 50%),linear-gradient(0deg, black, transparent 50%),linear-gradient(90deg, gray, rgba(128,128,128,0))}.picker_alpha{width:20px;height:200px;position:relative;margin-left:10px;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E\") top/contain white;outline:1px solid #cccccc}.picker_selector{position:absolute;display:block;width:24px;height:24px;margin:-12px;cursor:pointer;border:2px solid white;box-sizing:border-box;border-radius:20px;box-shadow:0 0 3px 1px #67b9ff;background:currentColor}.picker_slider .picker_selector{border-radius:2px}.picker_hue .picker_selector{top:50%}.picker_sl .picker_selector{left:100%}.picker_alpha .picker_selector{left:50%;background:none}.picker_sample{width:170px;height:30px;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E\") left top/20px white;position:relative;margin-top:10px;outline:1px solid #aaaaaa}.picker_sample::before{content:\"\";position:absolute;display:block;width:100%;height:100%;background:currentColor}.picker_done{width:53px;height:30px;line-height:30px;color:#444444;background:#e2e2e2;outline:1px solid #cccccc;box-shadow:0 0 3px 1px #eeeeee;text-align:center;cursor:pointer}\n";

    var BG_TRANSP = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E\")";
    var HUES = 360;

    var Picker = function () {
        function Picker(options) {
            _classCallCheck(this, Picker);

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

        _createClass2(Picker, [{
            key: "show",
            value: function show() {

                var parent = this.settings.parent;

                parent.style.pointerEvents = 'none';

                if (this.domElement) {
                    this.domElement.style.display = '';
                    return;
                }

                var html = "<div class=\"picker_wrapper\">\n   <div class=\"picker_hue picker_slider\">\n       <div class=\"picker_selector\"></div>\n   </div>\n   <div class=\"picker_sl\">\n       <div class=\"picker_selector\"></div>\n   </div>\n   <div class=\"picker_alpha picker_slider\">\n       <div class=\"picker_selector\"></div>\n   </div>\n   <div class=\"picker_sample\"></div>\n   <div class=\"picker_done\">ok</div>\n</div>";

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

                if (this.settings.x === 'auto') {

                    switch (this.settings.orientation) {
                        case 'left':
                            wrapper.style.left = -wrapper.offsetWidth - this.settings.arrow_size - 4 + "px";
                            break;

                        case 'top':
                        case 'bottom':
                            wrapper.style.left = parent.offsetWidth / 2 - this.settings.arrow_size + "px";
                            break;

                        case 'center':
                        case 'centre':
                            wrapper.style.left = -wrapper.offsetWidth / 2 + parent.offsetWidth / 2 + "px";
                            break;

                        default:
                            wrapper.style.left = parent.offsetWidth + this.settings.arrow_size + 4 + "px";
                            break;
                    }
                } else {
                    wrapper.style.left = parseInt(this.settings.x) + "px";
                }

                if (this.settings.y === 'auto') {

                    switch (this.settings.orientation) {
                        case 'top':
                            wrapper.style.top = -wrapper.offsetHeight - this.settings.arrow_size - 4 + "px";
                            break;

                        case 'bottom':
                            wrapper.style.top = parent.offsetHeight + this.settings.arrow_size + 4 + "px";
                            break;

                        case 'center':
                        case 'centre':
                            wrapper.style.top = -parent.offsetHeight / 2 + -wrapper.offsetHeight / 2 + "px";
                            break;

                        default:
                            wrapper.style.top = parent.offsetHeight / 2 - this.settings.arrow_size + "px";
                            break;
                    }
                } else {
                    wrapper.style.top = parseInt(this.settings.y) + "px";
                }

                this.bind_events();

                if (!this.colour) {
                    this.setColor('#ff0');
                }
            }
        }, {
            key: "bind_events",
            value: function bind_events() {

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
                    return that.setHSLA(x);
                }));

                dragTracker(createDragConfig(this._domSL, function (x, y) {
                    return that.setHSLA(null, x, 1 - y);
                }));

                dragTracker(createDragConfig(this._domA, function (x, y) {
                    return that.setHSLA(null, null, null, 1 - y);
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

                    that.done();
                };
            }
        }, {
            key: "done",
            value: function done() {
                this.hide();

                if (this.onDone) {
                    this.onDone(this.colour);
                }
            }
        }, {
            key: "hide",
            value: function hide() {
                if (this.domElement) {
                    this.domElement.style.display = 'none';
                }
                this.settings.parent.style.pointerEvents = '';
            }
        }, {
            key: "setColor",
            value: function setColor(color) {
                this.colour = this.color = new Color(color);
                this.setHSLA();
            }
        }, {
            key: "setHSLA",
            value: function setHSLA(h, s, l, a) {

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

                this.updateUI();

                if (this.onChange) {
                    this.onChange(this.colour);
                }
            }
        }, {
            key: "updateUI",
            value: function updateUI() {
                var col = this.colour,
                    hsl = col.hsla,
                    cssHue = "hsl(" + hsl[0] * HUES + ", 100%, 50%)",
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
                    bg = "linear-gradient(" + [opaque, transp] + ")";

                this._domA.style.backgroundImage = bg + ', ' + BG_TRANSP;

                this._domSample.style.color = cssHSLA;
            }
        }]);

        return Picker;
    }();

    module.exports = Picker;
});
