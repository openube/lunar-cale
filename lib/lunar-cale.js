(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mobile-utils"));
	else if(typeof define === 'function' && define.amd)
		define("lunar-cale", ["mobile-utils"], factory);
	else if(typeof exports === 'object')
		exports["lunar-cale"] = factory(require("mobile-utils"));
	else
		root["lunar-cale"] = factory(root["mobile-utils"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mobileUtils = __webpack_require__(2);
	
	var _vertical_slider = __webpack_require__(3);
	
	var _vertical_slider2 = _interopRequireDefault(_vertical_slider);
	
	var _formatter = __webpack_require__(4);
	
	var _formatter2 = _interopRequireDefault(_formatter);
	
	var _i18n = __webpack_require__(7);
	
	var _i18n2 = _interopRequireDefault(_i18n);
	
	__webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var domId = 'lunar_cale_panel',
	    ensure_num = _mobileUtils.format.num_pad_left
	// ,screen_lock = e=>e.preventDefault()
	,
	    noop = function noop() {
		return void 0;
	},
	    find = function find(container, selector) {
		return container.querySelector(selector);
	},
	    vs_range = function vs_range(vslider) {
		return vslider.getRange();
	},
	    vs_val = function vs_val(vslider) {
		return vs_range(vslider)[2].getAttribute('rel');
	},
	    lunar_str = function lunar_str(lang, lunar) {
		var ayear = _mobileUtils.lang.read_i18n(_i18n2.default[lang]['animal_year'], lunar.Animal);
		console.log(lunar);
		return ayear + " " + lunar.gzYear + " " + lunar.IMonthCn + " " + lunar.IDayCn;
	},
	    li_tmpl = function li_tmpl(type) {
		return function (f, idx) {
			var display = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
			return "<li id=\"" + type + "_li" + f + "\" rel=\"" + idx + "\">" + (display || idx) + "</li>";
		};
	},
	    year_tmpl = li_tmpl('year'),
	    month_tmpl = li_tmpl('month'),
	    date_tmpl = li_tmpl('date'),
	    base_tmpl = function base_tmpl(lang) {
		var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LunarCale.SOLAR;
	
		var word_lc = _i18n2.default[lang]['lunar_calendar'];
		var word_dn = _i18n2.default[lang]['done'];
		return "<div id=\"" + domId + "\"\n\t\t\tclass=\"" + (mode === LunarCale.LUNAR ? 'lunar' : 'solar') + " " + (_mobileUtils.env.ios && _mobileUtils.env.version < 8 ? 'ios7' : 'normal') + "\">\n\t\t\t<div class=\"hd\">\n\t\t\t\t<label><input type=\"checkbox\"\n\t\t\t\t\tclass=\"mod_round_checkbox\"\n\t\t\t\t\t" + (mode === LunarCale.LUNAR ? 'checked' : '') + " />" + word_lc + "</label>\n\t\t\t\t<p></p>\n\t\t\t\t<a class=\"finishBtn\">" + word_dn + "</a>\n\t\t\t</div>\n\t\t\t<div class=\"bd\">\n\t\t\t\t<div class=\"win\">\n\t\t\t\t\t<div class=\"wdecoration\">\n\t\t\t\t\t\t<div class=\"wbk year\"></div>\n\t\t\t\t\t\t<div class=\"wline\"></div>\n\t\t\t\t\t\t<div class=\"wbk month\"></div>\n\t\t\t\t\t\t<div class=\"wline\"></div>\n\t\t\t\t\t\t<div class=\"wbk date\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"wglass\"></div>\n\t\t\t\t\t<div class=\"wmain\">\n\t\t\t\t\t\t<div class=\"wbox year\">{#year#}</div>\n\t\t\t\t\t\t<div class=\"wbox month\">{#month#}</div>\n\t\t\t\t\t\t<div class=\"wbox date\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>";
	};
	
	/**
	 * 可支持农历和公历的移动端触控日历控件
	 * @type {Object}
	 */
	
	var LunarCale = function () {
		_createClass(LunarCale, [{
			key: "show",
	
	
			/**
	   * 显示
	   * @return {Object} 当前控件
	   */
			value: function show() {
				// locker.lock();
				// document.addEventListener('touchmove', screen_lock, false);
				this._is_visible = true;
				this._render();
				return this;
			}
	
			/**
	   * 隐藏
	   * @return {Object} 当前控件
	   */
	
		}, {
			key: "hide",
			value: function hide() {
				if (typeof this._close_func === 'function') {
					this._close_func();
				}
				this._is_visible = false;
				//locker.unlock();
				// document.removeEventListener('touchmove', screen_lock, false);
				return this;
			}
	
			/**
	   * 构造函数
	   * @constructor
	   * @param  {Object} [setting={mode, lang, startYear, endYear, initShownYMD, selectCallback, closeCallback}]
	   * @description 参数说明： mode - 初始模式; lang - 语言; startYear - 开始年份 yyyy; endYear - 结束年份 yyyy; initShownYMD - 初始选中的日期 yyyy-mm-dd; selectCallback - 选中新值时的回调函数 - 关闭面板时的回调函数
	   * @return {Object} 当前控件
	   */
	
		}, {
			key: "mode",
			get: function get() {
				return this._mode;
			},
			set: function set(m) {
				if (m !== LunarCale.SOLAR && m !== LunarCale.LUNAR) {
					throw new Error('[LunarCale] invalid mode!');
				}
				this._mode = m;
				this._render();
			}
	
			/**
	   * 取得组件的DOM
	   * @return {HTMLElement}
	   */
	
		}, {
			key: "el",
			get: function get() {
				return document.getElementById(domId);
			}
	
			/**
	   * 判断控件当前是否可见
	   * @type {Boolean}
	   */
	
		}, {
			key: "isVisible",
			get: function get() {
				return this._is_visible;
			}
		}], [{
			key: "SOLAR",
			get: function get() {
				return 0;
			}
		}, {
			key: "LUNAR",
			get: function get() {
				return 1;
			}
		}]);
	
		function LunarCale(setting) {
			var _this2 = this;
	
			_classCallCheck(this, LunarCale);
	
			var _this = this,
			    cfg = Object.assign({
				mode: LunarCale.SOLAR,
				lang: 'zh',
				startYear: 1970,
				endYear: _mobileUtils.time.today().getFullYear(),
				initShownYMD: _mobileUtils.time.date_to_YMD(_mobileUtils.time.today()),
				selectCallback: noop,
				closeCallback: noop
			}, setting),
			    startYear = cfg.startYear,
			    endYear = cfg.endYear,
			    initShownYMD = cfg.initShownYMD,
			    selectCallback = cfg.selectCallback,
			    closeCallback = cfg.closeCallback,
			    d_d = void 0,
			    d_m = void 0,
			    d_y = void 0,
			    yS = parseInt(startYear),
			    yE = parseInt(endYear),
			    yOld = initShownYMD ? function () {
				var earr = initShownYMD.split('-');
				return {
					year: earr[0],
					month: ensure_num(earr[1]),
					date: ensure_num(earr[2])
				};
			}() : null,
			    tmpl = void 0,
			    cacheYear = {},
			    fillYears = function fillYears() {
				cacheYear = {};
	
				var blank = '<li></li>',
				    arr = [],
				    i = void 0,
				    lng = void 0,
				    flag = 0;
				arr.push(blank);
				arr.push(blank);
				for (i = yS, lng = yE + 1; i < lng; i++) {
					var args = [flag++, i];
					arr.push(year_tmpl.apply(null, args));
					cacheYear['key_' + i] = flag - 1;
				}
				arr.push(blank);
				arr.push(blank);
				tmpl = tmpl.replace('{#year#}', '<ol>' + arr.join('') + '</ol>');
			},
			    loop_total_m = 12,
			    loop_offset_m = 6,
			    cacheMonth = {},
			    fillMonths = function fillMonths() {
				cacheMonth = {};
	
				var arr = [],
				    i = void 0,
				    lng = void 0,
				    flag = 0,
				    plus_and_fix = function plus_and_fix(n) {
					return ensure_num(n + 1);
				},
				    add = function add(f, i) {
					return arr.push(month_tmpl(f, plus_and_fix(i)));
				};
				for (i = loop_total_m - loop_offset_m, lng = loop_total_m; i < lng; i++) {
					add(flag++, i);
				}
				for (i = 0, lng = loop_total_m; i < lng; i++) {
					add(flag++, i);
					cacheMonth['key_' + plus_and_fix(i)] = flag - 1 - loop_offset_m;
				}
				for (i = 0, lng = loop_offset_m; i < lng; i++) {
					add(flag++, i);
				}
	
				tmpl = tmpl.replace('{#month#}', '<ol>' + arr.join('') + '</ol>');
			},
			    loop_total_d = 31,
			    loop_offset_d = 15,
			    cacheDate = {},
			    fillDates = function fillDates(dayNum, y, m) {
				loop_total_d = dayNum;
				cacheDate = {};
	
				var arr = [],
				    i = void 0,
				    lng = void 0,
				    flag = 0,
				    plus_and_fix = function plus_and_fix(n) {
					return ensure_num(n + 1);
				},
				    add = function add(f, i) {
					var d = plus_and_fix(i);
					var args = [f, d];
					if (_this.mode === LunarCale.LUNAR) {
						var lunar = _formatter2.default.solar2lunar(y, m + 1, d);
						var str = d + " <small>" + lunar.IMonthCn + lunar.IDayCn + "</small>";
						args.push(str);
					}
					arr.push(date_tmpl.apply(null, args));
				};
	
				for (i = loop_total_d - loop_offset_d, lng = loop_total_d; i < lng; i++) {
					add(flag++, i);
				}
				for (i = 0, lng = loop_total_d; i < lng; i++) {
					add(flag++, i);
					cacheDate['key_' + plus_and_fix(i)] = flag - 1;
				}
				for (i = 0, lng = loop_offset_d; i < lng; i++) {
					add(flag++, i);
				}
	
				return '<ol>' + arr.join('') + '</ol>';
			},
			    checkDateNum = function checkDateNum() {
				var p_year = parseInt(vs_val(d_y)),
				    p_month = parseInt(Number(vs_val(d_m))) - 1 //Number转型for安卓老手机
				,
				    day = new Date(),
				    dnum = 0,
				    did = "#" + domId + " .wbox.date";
	
				day.setFullYear(p_year);
				day.setDate(1);
				day.setMonth(p_month);
	
				while (day.getMonth() == p_month) {
					dnum++;
					day.setDate(day.getDate() + 1);
				}
	
				find(document, did).innerHTML = fillDates(dnum, p_year, p_month);
	
				d_d = new _vertical_slider2.default({
					containerContext: did,
					defaultIndex: yOld ? cacheDate['key_' + yOld.date] - 2 : loop_total_d + loop_offset_d - 2,
					callback: function callback(currArr) {
						var mdom = currArr[2],
						    midx = parseInt(mdom.id.replace('date_li', ''));
						if (midx < loop_total_d - loop_offset_d) this.setCurr(midx + (loop_total_d - 2), false);else if (midx > loop_total_d + loop_offset_d - 1) this.setCurr(midx - (loop_total_d + 2), false);
						parseResult();
						fixStyle();
					}
				});
			},
			    getResults = function getResults() {
				try {
					var rst = [vs_val(d_y), vs_val(d_m), vs_val(d_d)],
					    lunar = _formatter2.default.solar2lunar.apply(null, rst);
					rst.push(lunar);
					return rst;
				} catch (ex) {}
				return null;
			},
			    parseResult = function parseResult() {
				var _getResults = getResults(),
				    _getResults2 = _slicedToArray(_getResults, 4),
				    y = _getResults2[0],
				    m = _getResults2[1],
				    d = _getResults2[2],
				    lunar = _getResults2[3];
	
				yOld = { year: y, month: m, date: d };
				if (_this.mode === LunarCale.LUNAR) {
					find(document, "#" + domId + " .hd p").innerHTML = lunar.Animal + "\u5E74(" + lunar.gzYear + ")";
				}
				if (selectCallback !== noop) {
					selectCallback.call(null, y, m, d, lunar_str(cfg.lang, lunar));
				}
			},
			    fixStyle = function fixStyle() {
				if (!/normal/.test(find(document, "#" + domId).className)) return;
				//显示的5个项
				[].forEach.call(document.querySelectorAll("#" + domId + " ol li"), function (li) {
					return delete li.dataset['rowstyle'];
				});
				[d_y, d_m, d_d].map(vs_range).forEach(function (range) {
					return range.forEach(function (item, idx) {
						return item.dataset['rowstyle'] = 'row' + idx;
					});
				});
				//修正垂直对齐
				setTimeout(function () {
					[].forEach.call(document.querySelectorAll('.wbox ol'), function (ele) {
						// ele.addEventListener('transitionend', e=>{
						ele.style.marginTop = 0;
						var ol = ele //e.currentTarget
						,
						    li = ol.querySelector('[data-rowstyle=row2]'),
						    gls = document.querySelector('.wglass'),
						    r1 = li.getBoundingClientRect(),
						    r2 = gls.getBoundingClientRect();
						var diff = r1.top - (r2.top - .5 * (r1.height - r2.height));
						ol.style.marginTop = -Math.abs(diff) + 'px';
						// });
					});
				}, 0);
			},
			    closeFunc = function closeFunc(e) {
				// eslint-disable-line no-unused-vars
				var ap = document.getElementById(domId);
				try {
					ap.parentNode.removeChild(ap);
				} catch (ex) {}
			},
			    renderFunc = function renderFunc() {
				checkDateNum();
				parseResult();
				fixStyle();
			};
	
	
			this._mode = cfg.mode;
			this._cfg = cfg;
	
			if (!cfg.lang || /^zh(\-|$)/.test(cfg.lang.toLowerCase())) {
				cfg.lang = 'zh';
			} else {
				cfg.lang = 'en';
			}
	
			this._render = function () {
				var ap = document.getElementById(domId);
				if (ap) closeFunc();
	
				tmpl = base_tmpl(cfg.lang, _this2._mode);
	
				fillYears();
				fillMonths();
				document.body.insertAdjacentHTML('beforeEnd', tmpl);
				ap = document.getElementById(domId);
	
				d_y = new _vertical_slider2.default({
					containerContext: "#" + domId + " .wbox.year",
					defaultIndex: yOld ? cacheYear['key_' + yOld.year] : yE - yS,
					callback: function callback(currArr) {
						// eslint-disable-line no-unused-vars
						renderFunc();
					}
				});
				d_m = new _vertical_slider2.default({
					containerContext: "#" + domId + " .wbox.month",
					defaultIndex: yOld ? cacheMonth['key_' + yOld.month] + loop_offset_m - 2 : loop_total_m + loop_offset_m - 2,
					callback: function callback(currArr) {
						var hidx = parseInt(currArr[2].id.replace('month_li', ''));
						if (hidx < loop_total_m - loop_offset_m) this.setCurr(hidx + (loop_total_m - 2), false);else if (hidx > loop_total_m + loop_offset_m - 1) this.setCurr(hidx - (loop_total_m + 2), false);
						renderFunc();
					}
				});
	
				//for test
				find(ap, '.finishBtn').onclick = function (e) {
					// find(ap, '.finishBtn').addEventListener('click', function(e){
					closeFunc(e);
	
					var _getResults3 = getResults(),
					    _getResults4 = _slicedToArray(_getResults3, 4),
					    y = _getResults4[0],
					    m = _getResults4[1],
					    d = _getResults4[2],
					    lunar = _getResults4[3];
					// console.log(y,m,d,lunar)
	
	
					closeCallback(y, m, d, lunar_str(cfg.lang, lunar));
					// });
				};
	
				find(ap, '.hd input[type=checkbox]').addEventListener('click', function (e) {
					var lunar_mode = e.currentTarget.checked;
					_this.mode = lunar_mode ? LunarCale.LUNAR : LunarCale.SOLAR;
				});
	
				renderFunc();
			};
	
			this._close_func = closeFunc;
	
			return this;
		}
	
		return LunarCale;
	}();
	
	exports.default = LunarCale;
	module.exports = exports["default"];

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mobileUtils = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// eslint-disable-line no-unused-vars
	
	var _time = function _time() {
		return new Date().getTime();
	};
	
	/**
	 * 可以手指上下滑动的垂直列表
	 */
	
	var VSlider = function () {
		/**
	  * 构造函数
	  * @constructor
	  * @param  {Object} [config={
	 		containerContext: null,
	 		innerContext: 'ol',
	 		itemContext: 'li',
	 		itemCount: 5,
	 		defaultIndex: 0,
	 		callback: null
	 	}] - 构造参数
	  * @return {void}
	  */
		function VSlider(config) {
			_classCallCheck(this, VSlider);
	
			this.config = Object.assign({
				containerContext: null,
				innerContext: 'ol',
				itemContext: 'li',
				itemCount: 5,
				defaultIndex: 0,
				callback: null
			}, config);
	
			var _config = this.config,
			    containerContext = _config.containerContext,
			    innerContext = _config.innerContext,
			    itemContext = _config.itemContext,
			    itemCount = _config.itemCount,
			    defaultIndex = _config.defaultIndex;
	
	
			this.container = document.querySelector(containerContext);
			this.inner = this.container.querySelector(innerContext);
			this.childs = this.inner.querySelectorAll(itemContext);
			this.itemH = Math.round(this.container.clientHeight / itemCount);
			this.topIdx = 0;
			this.dinfo_start = null;
			this.dinfo_end = null;
	
			this.inner.style.height = this.itemH * this.childs.length + 'px';
			this.setCurr(defaultIndex || 0, false);
	
			this._ontouchstart = this._e_ts.bind(this);
			this._ontouchmove = this._e_tm.bind(this);
			this._ontouchend = this._e_te.bind(this);
			this._ontransitionend = this._e_tre.bind(this);
			this.inner.addEventListener("touchstart", this._ontouchstart);
			this.inner.addEventListener("onscroll", function (e) {
				return e.preventDefault();
			});
		}
		/**
	  * 设置选择项
	  * @param {Number}  idx - 选中项索引值
	  * @param {Boolean} needTween - 是否需要缓动效果
	  * @return {void}
	  */
	
	
		_createClass(VSlider, [{
			key: 'setCurr',
			value: function setCurr(idx) {
				var needTween = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
				this.topIdx = idx;
				this._move(-this.itemH * idx, needTween);
			}
			/**
	   * 取得所选范围
	   * @return {Array} [childs, start_idx, end_idx]
	   */
	
		}, {
			key: 'getRange',
			value: function getRange() {
				return Array.prototype.slice.call(this.childs, this.topIdx, this.topIdx + this.config.itemCount);
			}
			/**
	   * @private
	   */
	
		}, {
			key: '_move',
			value: function _move(top) {
				var needTween = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
				var tween_time = needTween ? .618 * 4 / 10000 : 0;
				_mobileUtils.dom.transformXY(this.inner, 0, top, tween_time);
			}
			/**
	   * @private
	   */
	
		}, {
			key: '_e_ts',
			value: function _e_ts(e) {
				/*touchstart*/
				e.preventDefault();
	
				var ct = this.container.getBoundingClientRect().top,
				    it = this.inner.getBoundingClientRect().top;
				this.dinfo_start = {
					time: _time(),
					localY: e.touches[0].clientY - ct,
					stageY: e.touches[0].clientY,
					innerTop: it - ct
				};
				e.currentTarget.addEventListener("touchmove", this._ontouchmove);
				e.currentTarget.addEventListener("touchend", this._ontouchend);
				e.currentTarget.addEventListener("touchcancel", this._ontouchend);
	
				e.stopPropagation();
			}
			/**
	   * @private
	   */
	
		}, {
			key: '_e_tm',
			value: function _e_tm(e) {
				/*touchmove*/
				e.preventDefault();
	
				var _dinfo_start = this.dinfo_start,
				    stageY = _dinfo_start.stageY,
				    innerTop = _dinfo_start.innerTop,
				    top = e.touches[0].clientY - stageY + innerTop;
	
				this._move(top);
	
				var c = e.currentTarget;
				if (typeof c.dataset['touching'] === 'undefined' || c.dataset['touching'] * 1 != 1) {
					c.dataset['touching'] = 1;
				}
	
				e.stopPropagation();
			}
			/**
	   * @private
	   */
	
		}, {
			key: '_e_te',
			value: function _e_te(e) {
				/*touchend*/
				e.preventDefault();
	
				e.currentTarget.removeEventListener("touchmove", this._ontouchmove);
				e.currentTarget.removeEventListener("touchend", this._ontouchend);
				e.currentTarget.removeEventListener("touchcancel", this._ontouchend);
	
				var c = e.currentTarget,
				    ct = this.container.getBoundingClientRect().top,
				    it = this.inner.getBoundingClientRect().top,
				    idx = this.topIdx;
	
				c.dataset['touching'] = 0;
				this.dinfo_end = {
					time: _time(),
					innerTop: it - ct
				};
	
				var _dinfo_start2 = this.dinfo_start,
				    s_time = _dinfo_start2.time,
				    s_innerTop = _dinfo_start2.innerTop,
				    _dinfo_end = this.dinfo_end,
				    e_time = _dinfo_end.time,
				    e_innerTop = _dinfo_end.innerTop,
				    tTime = e_time - s_time,
				    tDis = e_innerTop - s_innerTop,
				    shortDis = Math.abs(tDis) < 5,
				    longTime = tTime > 200;
	
	
				if (!longTime && !shortDis) {
					/*快速拖动*/
					if (tDis < 0) /*up*/idx += 5;else /*down*/idx -= 5;
				} else {
					/*一般拖动*/
					if (Math.abs(tDis) > .5 * this.itemH) {
						var d1 = Math.abs(Math.round(tDis / this.itemH));
						if (tDis < 0) idx += d1;else idx -= d1;
					}
				}
				if (idx < 0) idx = 0;
				if (idx >= this.childs.length - this.config.itemCount) idx = this.childs.length - this.config.itemCount;
	
				_mobileUtils.event.on_tweened(this.inner, this._ontransitionend);
				this.setCurr(idx);
			}
			/**
	   * @private
	   */
	
		}, {
			key: '_e_tre',
			value: function _e_tre(e) {
				e.currentTarget.removeEventListener('webkitTransitionEnd', this._ontransitionend);
				if ('callback' in this.config && typeof this.config.callback === 'function') {
					this.config.callback.call(this, this.getRange());
				}
			}
		}]);
	
		return VSlider;
	}();
	
	exports.default = VSlider;
	module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _lunar_formatter = __webpack_require__(5);
	
	var _lunar_formatter2 = _interopRequireDefault(_lunar_formatter);
	
	var _lunar_formatter_modern = __webpack_require__(6);
	
	var _lunar_formatter_modern2 = _interopRequireDefault(_lunar_formatter_modern);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  solar2lunar: function solar2lunar(y, m, d) {
	    var isModernEnv = typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function';
	    var isLatterThen2100 = function () {
	      var now = new Date();
	      return now.getFullYear() >= 2100;
	    }();
	
	    // console.log(isModernEnv, isLatterThen2100);
	
	    var func = isModernEnv || isLatterThen2100 ? _lunar_formatter_modern2.default.solar2lunar : _lunar_formatter2.default.solar2lunar;
	
	    return func(y, m, d);
	  }
	};
	module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//修改自： https://github.com/leeif/dateformater/blob/master/lib/lunar.js
	
	/**
	 * @1900-2100区间内的公历、农历互转
	 * @charset  UTF-8
	 * @Author  Ajing(JJonline@JJonline.Cn)
	 * @Time  2014-7-21
	 * @Version  $ID$
	 * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
	 * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
	 */
	var calendar = {
	
	  /**
	   * 农历1900-2100的润大小信息表
	   * @Array Of Property
	   * @return Hex
	   */
	  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
	  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
	  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
	  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
	  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
	  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
	  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
	  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
	  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
	  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
	  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
	  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
	  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
	  0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
	  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
	  /**Add By JJonline@JJonline.Cn**/
	  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
	  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
	  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
	  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
	  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
	  0x0d520], //2100
	
	
	  /**
	   * 公历每个月份的天数普通表
	   * @Array Of Property
	   * @return Number
	   */
	  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	
	  /**
	   * 天干地支之天干速查表
	   * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
	   * @return Cn string
	   */
	  Gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],
	
	  /**
	   * 天干地支之地支速查表
	   * @Array Of Property
	   * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
	   * @return Cn string
	   */
	  Zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],
	
	  /**
	   * 天干地支之地支速查表<=>生肖
	   * @Array Of Property
	   * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
	   * @return Cn string
	   */
	  Animals: ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"],
	
	  /**
	   * 24节气速查表
	   * @Array Of Property
	   * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
	   * @return Cn string
	   */
	  solarTerm: ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"],
	
	  /**
	   * 1900-2100各年的24节气日期速查表
	   * @Array Of Property
	   * @return 0x string For splice
	   */
	  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],
	
	  /**
	   * 数字转中文速查表
	   * @Array Of Property
	   * @trans ['日','一','二','三','四','五','六','七','八','九','十']
	   * @return Cn string
	   */
	  nStr1: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],
	
	  /**
	   * 日期转农历称呼速查表
	   * @Array Of Property
	   * @trans ['初','十','廿','卅']
	   * @return Cn string
	   */
	  nStr2: ["\u521D", "\u5341", "\u5EFF", "\u5345"],
	
	  /**
	   * 月份转农历称呼速查表
	   * @Array Of Property
	   * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
	   * @return Cn string
	   */
	  nStr3: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],
	
	  /**
	   * 返回农历y年一整年的总天数
	   * @param lunar Year
	   * @return Number
	   * @eg:var count = calendar.lYearDays(1987) ;//count=387
	   */
	  lYearDays: function lYearDays(y) {
	    var i,
	        sum = 348;
	    for (i = 0x8000; i > 0x8; i >>= 1) {
	      sum += calendar.lunarInfo[y - 1900] & i ? 1 : 0;
	    }
	    return sum + calendar.leapDays(y);
	  },
	
	  /**
	   * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
	   * @param lunar Year
	   * @return Number (0-12)
	   * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
	   */
	  leapMonth: function leapMonth(y) {
	    //闰字编码 \u95f0
	    return calendar.lunarInfo[y - 1900] & 0xf;
	  },
	
	  /**
	   * 返回农历y年闰月的天数 若该年没有闰月则返回0
	   * @param lunar Year
	   * @return Number (0、29、30)
	   * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
	   */
	  leapDays: function leapDays(y) {
	    if (calendar.leapMonth(y)) {
	      return calendar.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
	    }
	    return 0;
	  },
	
	  /**
	   * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
	   * @param lunar Year
	   * @return Number (-1、29、30)
	   * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
	   */
	  monthDays: function monthDays(y, m) {
	    if (m > 12 || m < 1) {
	      return -1;
	    } //月份参数从1至12，参数错误返回-1
	    return calendar.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
	  },
	
	  /**
	   * 返回公历(!)y年m月的天数
	   * @param solar Year
	   * @return Number (-1、28、29、30、31)
	   * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
	   */
	  solarDays: function solarDays(y, m) {
	    if (m > 12 || m < 1) {
	      return -1;
	    } //若参数错误 返回-1
	    var ms = m - 1;
	    if (ms == 1) {
	      //2月份的闰平规律测算后确认返回28或29
	      return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
	    } else {
	      return calendar.solarMonth[ms];
	    }
	  },
	
	  /**
	   * 传入offset偏移量返回干支
	   * @param offset 相对甲子的偏移量
	   * @return Cn string
	   */
	  toGanZhi: function toGanZhi(offset) {
	    return calendar.Gan[offset % 10] + calendar.Zhi[offset % 12];
	  },
	
	  /**
	   * 传入公历(!)y年获得该年第n个节气的公历日期
	   * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
	   * @return day Number
	   * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
	   */
	  getTerm: function getTerm(y, n) {
	    if (y < 1900 || y > 2100) {
	      return -1;
	    }
	    if (n < 1 || n > 24) {
	      return -1;
	    }
	    var _table = calendar.sTermInfo[y - 1900];
	    var _info = [parseInt('0x' + _table.substr(0, 5)).toString(), parseInt('0x' + _table.substr(5, 5)).toString(), parseInt('0x' + _table.substr(10, 5)).toString(), parseInt('0x' + _table.substr(15, 5)).toString(), parseInt('0x' + _table.substr(20, 5)).toString(), parseInt('0x' + _table.substr(25, 5)).toString()];
	    var _calday = [_info[0].substr(0, 1), _info[0].substr(1, 2), _info[0].substr(3, 1), _info[0].substr(4, 2), _info[1].substr(0, 1), _info[1].substr(1, 2), _info[1].substr(3, 1), _info[1].substr(4, 2), _info[2].substr(0, 1), _info[2].substr(1, 2), _info[2].substr(3, 1), _info[2].substr(4, 2), _info[3].substr(0, 1), _info[3].substr(1, 2), _info[3].substr(3, 1), _info[3].substr(4, 2), _info[4].substr(0, 1), _info[4].substr(1, 2), _info[4].substr(3, 1), _info[4].substr(4, 2), _info[5].substr(0, 1), _info[5].substr(1, 2), _info[5].substr(3, 1), _info[5].substr(4, 2)];
	    return parseInt(_calday[n - 1]);
	  },
	
	  /**
	   * 传入农历数字月份返回汉语通俗表示法
	   * @param lunar month
	   * @return Cn string
	   * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
	   */
	  toChinaMonth: function toChinaMonth(m) {
	    // 月 => \u6708
	    if (m > 12 || m < 1) {
	      return -1;
	    } //若参数错误 返回-1
	    var s = calendar.nStr3[m - 1];
	    s += "\u6708"; //加上月字
	    return s;
	  },
	
	  /**
	   * 传入农历日期数字返回汉字表示法
	   * @param lunar day
	   * @return Cn string
	   * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
	   */
	  toChinaDay: function toChinaDay(d) {
	    //日 => \u65e5
	    var s;
	    switch (d) {
	      case 10:
	        s = "\u521D\u5341";
	        break;
	      case 20:
	        s = "\u4E8C\u5341";
	        break;
	      case 30:
	        s = "\u4E09\u5341";
	        break;
	      default:
	        s = calendar.nStr2[Math.floor(d / 10)];
	        s += calendar.nStr1[d % 10];
	    }
	    return s;
	  },
	
	  /**
	   * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
	   * @param y year
	   * @return Cn string
	   * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
	   */
	  getAnimal: function getAnimal(y) {
	    return calendar.Animals[(y - 4) % 12];
	  },
	
	  /**
	   * 传入公历年月日获得详细的公历、农历object信息 <=>JSON
	   * @param y  solar year
	   * @param m solar month
	   * @param d  solar day
	   * @return JSON object
	   * @eg:console.log(calendar.solar2lunar(1987,11,01));
	   */
	  solar2lunar: function solar2lunar(y, m, d) {
	    //参数区间1900.1.31~2100.12.31
	    var objDate = void 0;
	    if (y < 1900 || y > 2100) {
	      return -1;
	    } //年份限定、上限
	    if (y == 1900 && m == 1 && d < 31) {
	      return -1;
	    } //下限
	    if (!y) {
	      //未传参 获得当天
	      objDate = new Date();
	    } else {
	      objDate = new Date(y, parseInt(m) - 1, d);
	    }
	    var i,
	        leap = 0,
	        temp = 0;
	    //修正ymd参数
	    y = objDate.getFullYear(), m = objDate.getMonth() + 1, d = objDate.getDate();
	    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
	    for (i = 1900; i < 2101 && offset > 0; i++) {
	      temp = calendar.lYearDays(i);
	      offset -= temp;
	    }
	    if (offset < 0) {
	      offset += temp;
	      i--;
	    }
	
	    //是否今天
	    var isTodayObj = new Date(),
	        isToday = false;
	    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
	      isToday = true;
	    }
	    //星期几
	    var nWeek = objDate.getDay(),
	        cWeek = calendar.nStr1[nWeek];
	    if (nWeek == 0) {
	      nWeek = 7;
	    } //数字表示周几顺应天朝周一开始的惯例
	    //农历年
	    var year = i;
	
	    leap = calendar.leapMonth(i); //闰哪个月
	    var isLeap = false;
	
	    //效验闰月
	    for (i = 1; i < 13 && offset > 0; i++) {
	      //闰月
	      if (leap > 0 && i == leap + 1 && isLeap == false) {
	        --i;
	        isLeap = true;
	        temp = calendar.leapDays(year); //计算农历闰月天数
	      } else {
	        temp = calendar.monthDays(year, i); //计算农历普通月天数
	      }
	      //解除闰月
	      if (isLeap == true && i == leap + 1) {
	        isLeap = false;
	      }
	      offset -= temp;
	    }
	
	    if (offset == 0 && leap > 0 && i == leap + 1) if (isLeap) {
	      isLeap = false;
	    } else {
	      isLeap = true;
	      --i;
	    }
	    if (offset < 0) {
	      offset += temp;
	      --i;
	    }
	    //农历月
	    var month = i;
	    //农历日
	    var day = offset + 1;
	
	    //天干地支处理
	    var sm = m - 1;
	    // var term3 = calendar.getTerm(year, 3); //该农历年立春日期
	    var gzY = calendar.toGanZhi(year - 4); //普通按年份计算，下方尚需按立春节气来修正
	
	    // //依据立春日进行修正gzY
	    // if (sm < 2 && d < term3) {
	    //   gzY = calendar.toGanZhi(year - 5);
	    // } else {
	    //   gzY = calendar.toGanZhi(year - 4);
	    // }
	
	    //月柱 1900年1月小寒以前为 丙子月(60进制12)
	    var firstNode = calendar.getTerm(y, m * 2 - 1); //返回当月「节」为几日开始
	    var secondNode = calendar.getTerm(y, m * 2); //返回当月「节」为几日开始
	
	    //依据12节气修正干支月
	    var gzM = calendar.toGanZhi((y - 1900) * 12 + m + 11);
	    if (d >= firstNode) {
	      gzM = calendar.toGanZhi((y - 1900) * 12 + m + 12);
	    }
	
	    //传入的日期的节气与否
	    var isTerm = false;
	    var Term = null;
	    if (firstNode == d) {
	      isTerm = true;
	      Term = calendar.solarTerm[m * 2 - 2];
	    }
	    if (secondNode == d) {
	      isTerm = true;
	      Term = calendar.solarTerm[m * 2 - 1];
	    }
	    //日柱 当月一日与 1900/1/1 相差天数
	    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
	    var gzD = calendar.toGanZhi(dayCyclical + d - 1);
	
	    return {
	      'lYear': year,
	      'lMonth': month,
	      'lDay': day,
	      'Animal': calendar.getAnimal(year),
	      'IMonthCn': (isLeap ? "\u95F0" : '') + calendar.toChinaMonth(month),
	      'IDayCn': calendar.toChinaDay(day),
	      'cYear': y,
	      'cMonth': m,
	      'cDay': d,
	      'gzYear': gzY + '年',
	      'gzMonth': gzM,
	      'gzDay': gzD,
	      'isToday': isToday,
	      'isLeap': isLeap,
	      'nWeek': nWeek,
	      'ncWeek': "\u661F\u671F" + cWeek,
	      'isTerm': isTerm,
	      'Term': Term
	    };
	  },
	
	  /**
	   * 传入公历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
	   * @param y  lunar year
	   * @param m lunar month
	   * @param d  lunar day
	   * @param isLeapMonth  lunar month is leap or not.
	   * @return JSON object
	   * @eg:console.log(calendar.lunar2solar(1987,9,10));
	   */
	  lunar2solar: function lunar2solar(y, m, d, isLeapMonth) {
	    //参数区间1900.1.31~2100.12.1
	    // var leapOffset = 0;
	    var leapMonth = calendar.leapMonth(y);
	    // var leapDay = calendar.leapDays(y);
	    if (isLeapMonth && leapMonth != m) {
	      return -1;
	    } //传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
	    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
	      return -1;
	    } //超出了最大极限值
	    var day = calendar.monthDays(y, m);
	    if (y < 1900 || y > 2100 || d > day) {
	      return -1;
	    } //参数合法性效验
	
	    //计算农历的时间差
	    var offset = 0;
	    for (var i = 1900; i < y; i++) {
	      offset += calendar.lYearDays(i);
	    }
	    var leap = 0,
	        isAdd = false;
	    for (var _i = 1; _i < m; _i++) {
	      leap = calendar.leapMonth(y);
	      if (!isAdd) {
	        //处理闰月
	        if (leap <= _i && leap > 0) {
	          offset += calendar.leapDays(y);
	          isAdd = true;
	        }
	      }
	      offset += calendar.monthDays(y, _i);
	    }
	    //转换闰月农历 需补充该年闰月的前一个月的时差
	    if (isLeapMonth) {
	      offset += day;
	    }
	    //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
	    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
	    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
	    var cY = calObj.getUTCFullYear();
	    var cM = calObj.getUTCMonth() + 1;
	    var cD = calObj.getUTCDate();
	
	    return calendar.solar2lunar(cY, cM, cD);
	  }
	};
	
	/*
	Animals : Array[12]
	Gan : Array[10]
	Zhi : Array[12]
	getAnimal : getAnimal(y)
	getTerm : getTerm(y, n)
	lYearDays : lYearDays(y)
	leapDays : leapDays(y)
	leapMonth : leapMonth(y)
	lunar2solar : lunar2solar(y, m, d, isLeapMonth)
	lunarInfo : Array[201]
	monthDays : monthDays(y, m)
	nStr1 : Array[11]
	nStr2 : Array[4]
	nStr3 : Array[12]
	sTermInfo : Array[201]
	solar2lunar : solar2lunar(y, m, d)
	solarDays : solarDays(y, m)
	solarMonth : Array[12]
	solarTerm : Array[24]
	toChinaDay : toChinaDay(d)
	toChinaMonth : toChinaMonth(m)
	toGanZhi : toGanZhi(offset)
	*/
	exports.default = calendar;
	module.exports = exports["default"];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _mobileUtils = __webpack_require__(2);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function solar2lunar() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  var _args$map = args.map(function (arg) {
	    return parseInt(arg, 10);
	  }),
	      _args$map2 = _slicedToArray(_args$map, 3),
	      py = _args$map2[0],
	      pm = _args$map2[1],
	      pd = _args$map2[2];
	
	  var pstr = py + "-" + _mobileUtils.format.num_pad_left(pm) + "-" + _mobileUtils.format.num_pad_left(pd) + " 00:00:00";
	  var date = new Date(pstr);
	  // console.log(pstr, date)
	
	  var TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
	  var DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
	  var SHI = ["初", "十", "廿", "三"];
	  var YUE = ["", "十"];
	  var GE = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
	  var Animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
	
	  var locale = "zh-TW-u-ca-chinese";
	
	  var fmt = function fmt(key) {
	    var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	    return Intl.DateTimeFormat(locale, _defineProperty({}, key, "numeric")).format(d || date).match(/\d+/)[0];
	  };
	
	  var isLeapMonth = function isLeapMonth(d) {
	    var _date = new Date(date);
	    _date.setDate(-d);
	    return fmt("month", _date) === m;
	  };
	
	  var getAnimal = function getAnimal(y) {
	    return Animals[(y - 4) % 12];
	  };
	
	  var y = fmt("year"); // eslint-disable-line no-unused-vars
	  var m = fmt("month");
	  var d = fmt("day");
	  var isL = isLeapMonth(d);
	
	  y = TIAN_GAN[(y - 1) % 10] + DI_ZHI[(y - 1) % 12];
	  m = (YUE[(m - 1) / 10 | 0] + GE[(m - 1) % 10]).replace(/^一$/, "正");
	  d = (SHI[d / 10 | 0] + GE[(d - 1) % 10]).replace(/^十十$/, "初十").replace(/^廿十$/, "二十");
	
	  // return y + "年" + (isL ? "閏" : "") + m + "月" + d;
	  return {
	    'Animal': getAnimal(py),
	    'gzYear': y,
	    'IMonthCn': (isL ? "閏" : "") + m + '月',
	    'IDayCn': d
	  };
	}
	
	exports.default = {
	  solar2lunar: solar2lunar
	};
	module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var en = exports.en = {
		animal_year: 'Year of "{0}"',
		done: 'Done',
		lunar_calendar: 'Lunar Calendar'
	};
	
	var zh = exports.zh = {
		animal_year: '{0}年',
		done: '完成',
		lunar_calendar: '农历'
	};
	
	exports.default = {
		zh: zh,
		en: en
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/index.js!../node_modules/less-loader/index.js?noIeCompat!./cale.less", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/index.js!../node_modules/less-loader/index.js?noIeCompat!./cale.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports
	
	
	// module
	exports.push([module.id, "input[type=checkbox].mod_round_checkbox {\n  -webkit-appearance: none;\n  width: 39px;\n  height: 23.5px;\n  -webkit-border-radius: 23.5px;\n          border-radius: 23.5px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background: #fff;\n  border: 1.5px solid #e5e5e5;\n  position: relative;\n}\ninput[type=checkbox].mod_round_checkbox::after {\n  content: '';\n  position: absolute;\n  top: -1px;\n  left: -1px;\n  -webkit-border-radius: 11px;\n  border-radius: 11px;\n  display: inline-block;\n  width: 22px;\n  height: 22px;\n  -webkit-border-radius: 50%;\n  border-radius: 50%;\n  background: #fff;\n  -webkit-box-shadow: 1px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 1px 0 rgba(0, 0, 0, 0.1);\n  border: 1px solid rgba(0, 0, 0, 0.18);\n  -webkit-transition: left 0.2s ease-in;\n}\ninput[type=checkbox].mod_round_checkbox:checked {\n  background: #00E367;\n  border: none;\n}\ninput[type=checkbox].mod_round_checkbox:checked::after {\n  -webkit-box-shadow: -1px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: -1px 0 rgba(0, 0, 0, 0.1);\n  background: #fff;\n  top: 0;\n  left: 15px;\n  border-color: #00E367;\n}\ninput[type=checkbox].mod_round_checkbox:focus {\n  outline: 0 none;\n  -webkit-user-modify: read-write-plaintext-only;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n#lunar_cale_panel {\n  background-color: #fff;\n  width: 100%;\n  text-align: center;\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  z-index: 99;\n  height: 259px;\n  border-top: 1px solid #3b3b3b;\n  -webkit-box-shadow: -3px 0 3px #b3b3b3;\n          box-shadow: -3px 0 3px #b3b3b3;\n}\n#lunar_cale_panel * {\n  margin: 0;\n  padding: 0;\n}\n#lunar_cale_panel ul,\n#lunar_cale_panel ol {\n  list-style-type: none;\n}\n#lunar_cale_panel small {\n  display: inline-block;\n}\n#lunar_cale_panel .hd {\n  height: 44px;\n  border-bottom: 1px solid #323943;\n  position: relative;\n  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#929292), to(#666666));\n  background-image: -webkit-linear-gradient(top, #929292, #6f6f6f, #666666);\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  padding: 0 3%;\n}\n#lunar_cale_panel .hd label {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n#lunar_cale_panel .hd label input {\n  margin-right: 5px;\n}\n#lunar_cale_panel .hd p {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n}\n#lunar_cale_panel .hd .finishBtn {\n  display: inline-block;\n  width: 43px;\n  height: 28px;\n  border: 1px solid #0e2036;\n  -webkit-border-radius: 4px;\n  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#72a1f1), to(#2163de));\n  background-image: -webkit-linear-gradient(top, #72a1f1, #2163de);\n  color: #fff;\n  text-shadow: 0 -1px #3a5290;\n  font-size: 12px;\n  text-align: center;\n  line-height: 28px;\n}\n#lunar_cale_panel .hd .finishBtn:active {\n  background-image: -webkit-linear-gradient(top, #2163de, #72a1f1);\n}\n#lunar_cale_panel .bd {\n  height: 206px;\n  padding-top: 8px;\n  text-align: center;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #9097aa), color-stop(50%, #444756), color-stop(50%, #1f212e), color-stop(100%, #282a37));\n  -webkit-box-shadow: inset 0 1px 2px #b1b7c5;\n          box-shadow: inset 0 1px 2px #b1b7c5;\n}\n#lunar_cale_panel .win {\n  margin: 0 auto;\n  width: 90%;\n  height: 195px;\n  -webkit-border-radius: 4px;\n  border: 1px solid;\n  border-color: #323943 #505261 #666779 #101322;\n  position: relative;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#41434f), color-stop(25%, #cccae2), color-stop(50%, #9d9eb3), color-stop(75%, #cccae2), to(#41434f));\n}\n#lunar_cale_panel .year {\n  -webkit-box-flex: 1.5;\n  -webkit-flex: 1.5;\n          flex: 1.5;\n}\n#lunar_cale_panel .month,\n#lunar_cale_panel .date {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n}\n#lunar_cale_panel.lunar .year {\n  -webkit-box-flex: 1.5;\n  -webkit-flex: 1.5;\n          flex: 1.5;\n}\n#lunar_cale_panel.lunar .month {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n}\n#lunar_cale_panel.lunar .date {\n  -webkit-box-flex: 2;\n  -webkit-flex: 2;\n          flex: 2;\n}\n#lunar_cale_panel .wdecoration {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n}\n#lunar_cale_panel .wdecoration .wbk {\n  height: 195px;\n  display: inline-block;\n  margin: 0 2px;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#b8bbc4), color-stop(21%, #fbfbfd), color-stop(50%, #fbfbfd), color-stop(79%, #fbfbfd), to(#b8bbc4));\n}\n#lunar_cale_panel .wdecoration .wline {\n  height: 195px;\n  display: inline-block;\n  width: 2px;\n  background: rgba(7, 11, 12, 0.75);\n}\n#lunar_cale_panel .wglass {\n  width: 100%;\n  height: 41px;\n  position: absolute;\n  top: 76px;\n  left: 0;\n  border: solid #555a60;\n  border-width: 1px 0 1px 0;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(217, 223, 237, 0.7)), color-stop(50%, rgba(175, 182, 210, 0.7)), color-stop(50%, rgba(161, 168, 197, 0.7)), to(rgba(168, 173, 203, 0.7)));\n  -webkit-box-shadow: inset 0 1px 1px #e8eff9, 0 1px 1px #b1b0be;\n          box-shadow: inset 0 1px 1px #e8eff9, 0 1px 1px #b1b0be;\n}\n#lunar_cale_panel .wmain {\n  width: 100%;\n  height: 195px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n}\n#lunar_cale_panel .wmain .wbox {\n  height: 195px;\n  overflow: hidden;\n  display: block;\n  margin: 0 2px;\n  -webkit-box-shadow: inset 0 -7px 7px #a8a8b2, inset 0 7px 7px #a8a8b2;\n          box-shadow: inset 0 -7px 7px #a8a8b2, inset 0 7px 7px #a8a8b2;\n}\n#lunar_cale_panel .wmain .wbox ol {\n  list-style-type: none;\n  display: block;\n  text-align: center;\n}\n#lunar_cale_panel .wmain .wbox li {\n  height: 39px;\n  line-height: 39px;\n  display: block;\n  color: #0a0a0c;\n  font-size: 18px;\n}\n#lunar_cale_panel .wmain .wbox.day,\n#lunar_cale_panel .wmain .wbox.hour {\n  margin-right: 4px;\n}\n#lunar_cale_panel .wmain .wbox.year {\n  margin-right: 4px;\n}\n#lunar_cale_panel .wmain .wbox.year i {\n  font-style: normal;\n  font-size: 15px;\n  color: #7f8082;\n}\n#lunar_cale_panel .wmain .wbox.day li.today {\n  font-size: 20px;\n  color: #2f6df2;\n  text-shadow: 0 1px #ededed;\n}\n#lunar_cale_panel .wmain .wbox.day i {\n  font-style: normal;\n  font-size: 15px;\n  color: #7f8082;\n}\n#lunar_cale_panel .wmain .wbox.month {\n  margin-right: 4px;\n}\n#lunar_cale_panel.normal {\n  -webkit-box-shadow: -1px 0 1px #eee;\n          box-shadow: -1px 0 1px #eee;\n  border-top-color: #ddd;\n  font-size: 14px;\n}\n#lunar_cale_panel.normal .hd {\n  background-image: none;\n  background: #fff;\n  border-bottom-color: #e8e8e8;\n  margin-left: 15px;\n  padding-left: 0;\n}\n#lunar_cale_panel.normal .hd .finishBtn {\n  color: #3587db;\n  background-image: none;\n  border: none;\n}\n#lunar_cale_panel.normal .bd {\n  background-image: none;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n#lunar_cale_panel.normal .bd .win {\n  background-image: none;\n  border: none;\n  width: 100%;\n}\n#lunar_cale_panel.normal .bd .win .wdecoration {\n  display: none;\n}\n#lunar_cale_panel.normal .bd .win .wglass {\n  background-image: none;\n  border: #d9d9d9 solid;\n  border-width: 1px 0;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  height: 30px;\n  top: 50%;\n  -webkit-transform: translateY(-16px);\n          transform: translateY(-16px);\n}\n#lunar_cale_panel.normal .bd .win .wmain {\n  margin: 0 10%;\n  width: 80%;\n}\n#lunar_cale_panel.normal .bd .win .wmain .wbox {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n#lunar_cale_panel.normal .bd .win .wmain .wbox ol li[data-rowstyle=row1],\n#lunar_cale_panel.normal .bd .win .wmain .wbox ol li[data-rowstyle=row3] {\n  opacity: .6;\n  -webkit-transform: scaleY(0.8);\n          transform: scaleY(0.8);\n}\n#lunar_cale_panel.normal .bd .win .wmain .wbox ol li[data-rowstyle=row0],\n#lunar_cale_panel.normal .bd .win .wmain .wbox ol li[data-rowstyle=row4] {\n  opacity: .3;\n  -webkit-transform: scaleY(0.6);\n          transform: scaleY(0.6);\n}\n#lunar_cale_panel.solar .hd {\n  color: #a7a7a7;\n}\n", ""]);
	
	// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ])
});
;
//# sourceMappingURL=lunar-cale.js.map