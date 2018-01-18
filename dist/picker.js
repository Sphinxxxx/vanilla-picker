/*!
 * Picker <https://github.com/Sphinxxxx/Picker>
 * A simple, easy to use, versatile and customisable Javascript colour picker.
 * Version 2.0.0-alpha.1  2018-01-18
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

    var _createClass = function () {
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

    window.addEventListener('load', function () {
        return document.body.appendChild(document.createElement('style')).textContent = ".picker_wrapper{position:absolute;display:block;width:272px;padding:8px 0 8px 8px;box-sizing:border-box;overflow:visible;cursor:default;pointer-events:auto;z-index:1;color:red}.picker_wrapper,.picker_wrapper::before,.picker_wrapper::after{background:#f2f2f2;box-shadow:0 0 10px 1px rgba(0,0,0,0.4)}.picker_wrapper::before,.picker_wrapper::after{content:\"\";display:block;position:absolute;top:0;left:0;z-index:-99}.picker_wrapper::before{width:30px;height:30px;transform:skew(45deg);transform-origin:0 100%}.picker_wrapper::after{width:40px;height:40px;box-shadow:none}.picker_wrapper>div{margin:8px;float:left}.picker_hue{width:240px;height:20px;position:relative;margin-left:10px;background-image:linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta, red);outline:1px solid #cccccc}.picker_sl{width:203px;height:203px;position:relative;outline:1px solid #cccccc;background-color:red;background-image:linear-gradient(0deg, black, transparent),linear-gradient(90deg, white, rgba(255,255,255,0))}.picker_alpha{width:20px;height:200px;position:relative;margin-left:10px;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E\") top/contain white;outline:1px solid #cccccc}.picker_selector{position:absolute;display:block;width:24px;height:24px;margin:-12px;cursor:pointer;border:2px solid white;box-sizing:border-box;border-radius:20px;box-shadow:0 0 3px 1px #67b9ff;background:currentColor}.picker_slider .picker_selector{border-radius:2px}.picker_hue .picker_selector{top:50%}.picker_sl .picker_selector{left:100%}.picker_alpha .picker_selector{left:50%;background:none}.picker_sample{width:170px;height:30px;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E\") left top/20px white;position:relative;margin-top:10px;outline:1px solid #aaaaaa}.picker_sample::before{content:\"\";position:absolute;display:block;width:100%;height:100%;background:currentColor}.picker_done{width:53px;height:30px;line-height:30px;color:#444444;background:#e2e2e2;outline:1px solid #cccccc;box-shadow:0 0 3px 1px #eeeeee;text-align:center;cursor:pointer}\n";
    });

    var BG_TRANSP = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E\")";

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

            this.colour = this.color = {

                hue: 0,
                saturation: 1,
                value: 1,
                alpha: 1,

                hsl: function hsl() {
                    var h = this.hue,
                        sat = this.saturation,
                        val = this.value;

                    var l = (2 - sat) * val;
                    var s = void 0;
                    if (sat === 0 || val === 0) {
                        s = 0;
                    } else {
                        s = sat * val;
                        s /= l <= 1 ? l : 2 - l;
                    }
                    l /= 2;

                    s *= 100;
                    l *= 100;
                    return {
                        h: h,
                        s: s,
                        l: l,
                        toString: function toString() {
                            return "hsl(" + this.h + ", " + this.s + "%, " + this.l + "%)";
                        }
                    };
                },
                hsla: function hsla() {
                    var hsl = this.hsl();
                    hsl.a = this.alpha;

                    hsl.toString = function () {
                        return "hsla(" + this.h + ", " + this.s + "%, " + this.l + "%, " + this.a + ")";
                    };

                    return hsl;
                },
                rgb: function rgb() {
                    var r = void 0;
                    var g = void 0;
                    var b = void 0;

                    var h = this.hue;
                    var s = this.saturation;
                    var v = this.value;

                    h /= 60;

                    var i = Math.floor(h);
                    var f = h - i;
                    var p = v * (1 - s);
                    var q = v * (1 - s * f);
                    var t = v * (1 - s * (1 - f));

                    r = [v, q, p, p, t, v][i];
                    g = [t, v, v, q, p, p][i];
                    b = [p, p, t, v, v, q][i];

                    return {
                        r: Math.floor(r * 255),
                        g: Math.floor(g * 255),
                        b: Math.floor(b * 255),
                        toString: function toString() {
                            return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
                        }
                    };
                },
                rgba: function rgba() {
                    var rgb = this.rgb();
                    rgb.a = this.alpha;

                    rgb.toString = function () {
                        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
                    };

                    return rgb;
                },
                hex: function hex() {
                    var rgb = this.rgb();

                    function to_hex(c) {
                        var hex = c.toString(16);
                        return hex.length == 1 ? "0" + hex : hex;
                    }

                    return {
                        r: to_hex(rgb.r),
                        g: to_hex(rgb.g),
                        b: to_hex(rgb.b),
                        toString: function toString() {
                            return "#" + this.r + this.g + this.b;
                        }
                    };
                }
            };

            this.on_done = null;
            this.on_change = null;
        }

        _createClass(Picker, [{
            key: "show",
            value: function show() {

                var parent = this.settings.parent;

                parent.style.pointerEvents = 'none';

                if (this.domElement) {
                    this.domElement.style.display = '';
                    return;
                }

                var html = "\n<div class=\"picker_wrapper\">\n   <div class=\"picker_hue picker_slider\">\n       <div class=\"picker_selector\"></div>\n   </div>\n   <div class=\"picker_sl\">\n       <div class=\"picker_selector\"></div>\n   </div>\n   <div class=\"picker_alpha picker_slider\">\n       <div class=\"picker_selector\"></div>\n   </div>\n   <div class=\"picker_sample\"></div>\n   <div class=\"picker_done\">ok</div>\n</div>";

                var wrapper = function parse(htmlString) {
                    var div = document.createElement('div');
                    div.innerHTML = htmlString;
                    return div.firstChild;
                }(html.trim());

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
                this.update_sample();
            }
        }, {
            key: "update_picker_hue",
            value: function update_picker_hue(relX, relY) {
                this.colour.hue = relX * 360;

                this.update_sl_hue();
                this.update_sample();
                this.update_hue_slider();
            }
        }, {
            key: "update_picker_sl",
            value: function update_picker_sl(relX, relY) {

                this.colour.saturation = relX;
                this.colour.value = 1 - relY;

                this.update_alpha_slider();
                this.update_sample();
                this.update_sl_slider();
            }
        }, {
            key: "update_picker_alpha",
            value: function update_picker_alpha(relX, relY) {

                this.colour.alpha = 1 - relY;

                this.update_sample();
                this.update_alpha_slider();
            }
        }, {
            key: "update_sample",
            value: function update_sample() {
                this._domSample.style.color = this.colour.hsla().toString();

                this.update_alpha_hue();
                if (this.on_change) {
                    this.on_change(this.colour);
                }
            }
        }, {
            key: "update_sl_hue",
            value: function update_sl_hue() {
                this._domSL.style.backgroundColor = "hsl(" + this.colour.hue + ", 100%, 50%)";

                this.update_sl_slider();
                this.update_alpha_slider();
            }
        }, {
            key: "update_alpha_hue",
            value: function update_alpha_hue() {
                var color = this.colour.hsl().toString(),
                    transp = color.replace('hsl', 'hsla').replace(')', ', 0)'),
                    bg = "linear-gradient(" + [color, transp] + ")";

                var combo = [bg, BG_TRANSP].join(', ');
                this._domA.style.backgroundImage = combo;
            }
        }, {
            key: "update_hue_slider",
            value: function update_hue_slider() {
                this._domH.style.color = "hsl(" + this.colour.hue + ", 100%, 50%)";
            }
        }, {
            key: "update_sl_slider",
            value: function update_sl_slider() {
                this._domSL.style.color = this.colour.hsl().toString();
            }
        }, {
            key: "update_alpha_slider",
            value: function update_alpha_slider() {

                var slider = document.querySelector('#picker_alpha .picker_selector');
            }
        }, {
            key: "bind_events",
            value: function bind_events() {

                var that = this;

                function relate(container, pos, handler) {
                    handler.call(that, pos[0] / container.clientWidth, pos[1] / container.clientHeight);
                }

                function setHue(_, pos) {
                    var container = that._domH;

                    container.firstElementChild.style.left = pos[0] + 'px';
                    relate(container, pos, that.update_picker_hue);
                }
                dragTracker({
                    container: this._domH,
                    dragOutside: false,
                    callback: setHue,
                    callbackClick: setHue
                });

                function setSL(_, pos) {
                    var container = that._domSL;

                    container.firstElementChild.style.left = pos[0] + 'px';
                    container.firstElementChild.style.top = pos[1] + 'px';
                    relate(container, pos, that.update_picker_sl);
                }
                dragTracker({
                    container: this._domSL,
                    dragOutside: false,
                    callback: setSL,
                    callbackClick: setSL
                });

                function setAlpha(_, pos) {
                    var container = that._domA;

                    container.firstElementChild.style.top = pos[1] + 'px';
                    relate(container, pos, that.update_picker_alpha);
                }
                dragTracker({
                    container: this._domA,
                    dragOutside: false,
                    callback: setAlpha,
                    callbackClick: setAlpha
                });

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

                if (this.on_done) {
                    this.on_done(this.colour);
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
        }]);

        return Picker;
    }();

    module.exports = Picker;
});
