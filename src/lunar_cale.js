import {format as m_format, utils as m_utils} from 'mobile-utils';
import VSlider from "./vertical_slider";
import css from './cale.less'; // eslint-disable-line no-unused-vars

const
	domId = 'DateChooserPanel'
	,noop = ()=>void(0)
	,ensure_num = m_format.num_pad_left
	,locker = new m_utils.ScrollLocker()
	,li_tmpl = type=>(f, idx) => `<li id="${type}_li${f}" rel="${idx}">${idx}</li>`
	,year_tmpl = li_tmpl('year')
	,month_tmpl = li_tmpl('month')
	,date_tmpl = li_tmpl('date')
	,base_tmpl = ()=>`<div id="${domId}">
			<div class="hd"><a class="finishBtn">完成</a></div><div class="bd">
			<div class="win">
			<div class="wbk year"></div><div class="wline"></div><div class="wbk month"></div>
			<div class="wline"></div><div class="wbk date"></div><div class="wglass"></div>
			<div class="wmain">
			<div class="wbox year">{#year#}</div>
			<div class="wbox month">{#month#}</div>
			<div class="wbox date"></div>
			</div></div></div></div>`
;

/**
 * 可支持农历和公历的移动端触控日历控件
 * @type {Object}
 */
export default class LunarCale {
	/**
	 * 判断控件当前是否可见
	 * @type {Boolean}
	 */
	get isVisible(){
		return this._is_visible;
	}

	/**
	 * 显示
	 * @return {Object} 当前控件
	 */
	show() {
		locker.lock();
		this._is_visible = true;
		this._render();
		return this;
	}

	/**
	 * 隐藏
	 * @return {Object} 当前控件
	 */
	hide() {
		if (typeof this._close_func === 'function') {
			this._close_func();
		}
		this._is_visible = false;
		locker.unlock();
		return this;
	}

	/**
	 * 构造函数
	 * @constructor
	 * @param  {Number}   startYear - 开始年份 yyyy
	 * @param  {Number}   endYear - 结束年份 yyyy
	 * @param  {String}   [existValue=null] - 初始选中的日期 yyyy-mm-dd
	 * @param  {Function} [selectCallback=null] - 选中新值时的回调函数
	 * @param  {[type]}   [closeCallback=null] - 关闭面板时的回调函数
	 * @return {Object} 当前控件
	 */
	constructor(startYear, endYear, existValue=null, selectCallback=noop, closeCallback=noop) {
		let
			d_d,
			d_m,
			d_y,
			yS = parseInt(startYear),
			yE = parseInt(endYear),
			yOld = existValue
				? (function(){
						let earr = existValue.split('-');
						return {
							year: earr[0],
							month: ensure_num(earr[1]),
							date: ensure_num(earr[2])
						};
					}())
				: null,

			tmpl = base_tmpl(),

			cacheYear = {},
			fillYears = function(){
				cacheYear = {};

				let
					blank = '<li></li>',
					arr = [],
					i,
					lng,
					flag = 0;
				arr.push(blank);
				arr.push(blank);
				for (i= yS, lng= yE+1; i<lng; i++){
					arr.push( year_tmpl(flag++, i) );
					cacheYear['key_'+i] = flag-1;
				}
				arr.push(blank);
				arr.push(blank);
				tmpl = tmpl.replace('{#year#}', '<ol>'+arr.join('')+'</ol>');
			},

			loop_total_m = 12,
			loop_offset_m = 6,
			cacheMonth = {},
			fillMonths = function(){
				cacheMonth = {};

				let
					arr = [],
					i,
					lng,
					flag = 0,
					plus_and_fix = n=>ensure_num(n+1),
					add = (f,i)=>arr.push( month_tmpl(f, plus_and_fix(i)) )
				;
				for (i=loop_total_m-loop_offset_m,lng=loop_total_m;i<lng;i++){
					add(flag++, i);
				}
				for (i=0,lng=loop_total_m;i<lng;i++){
					add(flag++, i);
					cacheMonth['key_'+plus_and_fix(i)] = flag-1-loop_offset_m;
				}
				for (i=0,lng=loop_offset_m;i<lng;i++){
					add(flag++, i);
				}

				tmpl = tmpl.replace('{#month#}', '<ol>'+arr.join('')+'</ol>');
			},

			loop_total_d = 31,
			loop_offset_d = 15,
			cacheDate = {},
			fillDates = function(dayNum){
				loop_total_d = dayNum;
				cacheDate = {};

				let
					arr = [],
					i,
					lng,
					flag = 0,
					plus_and_fix = n=>ensure_num(n+1),
					add = (f,i)=>arr.push( date_tmpl(f, plus_and_fix(i)) )
				;
				for (i=loop_total_d-loop_offset_d,lng=loop_total_d;i<lng;i++){
					add(flag++, i);
				}
				for (i=0,lng=loop_total_d;i<lng;i++){
					add(flag++, i);
					cacheDate['key_'+plus_and_fix(i)] = flag-1;
				}
				for (i=0,lng=loop_offset_d;i<lng;i++){
					add(flag++, i);
				}

				return '<ol>'+arr.join('')+'</ol>';
			},

			checkDateNum = function(){
				let
					p_year = parseInt(d_y.getRange()[2].getAttribute('rel'))
					,p_month = parseInt(d_m.getRange()[2].getAttribute('rel')) - 1
					,day = new Date
					,dnum = 0
					,did = `#${domId} .wbox.date`
				;

				day.setFullYear(p_year);
				day.setDate(1);
				day.setMonth(p_month);

				while(day.getMonth() == p_month){
					dnum++;
					day.setDate(day.getDate() + 1);
				}

				document.querySelector(did).innerHTML = fillDates(dnum);

				d_d = new VSlider({
					containerContext: did,
					defaultIndex: yOld
									? cacheDate['key_'+yOld.date] - 2
									: loop_total_d + loop_offset_d - 2,
					callback: function(currArr){
						let midx = parseInt( currArr[2].id.replace('date_li', '') );
						if (midx<(loop_total_d-loop_offset_d))
							this.setCurr(midx+(loop_total_d-2), false);
						else if	(midx>(loop_total_d+loop_offset_d-1))
							this.setCurr(midx-(loop_total_d+2), false);
						parseResult();
					}
				});
			},
			getResults = function(){
				try{
					return [
						(d_y.getRange()[2].getAttribute('rel')),
						(d_m.getRange()[2].getAttribute('rel')),
						(d_d.getRange()[2].getAttribute('rel'))
					];
				}catch(ex){}
				return null;
			},
			parseResult = function(){
				if (selectCallback !== noop){
					selectCallback.apply(null, getResults());
				}
			},

			closeFunc = function(e) { // eslint-disable-line no-unused-vars
				let ap = document.getElementById(domId);
				try{
					ap.parentNode.removeChild(ap);
				}catch(ex){}
			},
			renderFunc = function(){
				checkDateNum();
				parseResult();
			}
		;

		this._render = () => {
			let ap = document.getElementById(domId);
			if (ap)	closeFunc();

			fillYears();
			fillMonths();
			document.body.insertAdjacentHTML('beforeEnd', tmpl);

			d_y = new VSlider({
				containerContext: `#${domId} .wbox.year`,
				defaultIndex:  yOld
								? cacheYear['key_'+yOld.year]
								: yE-yS,
				callback: function(currArr){ // eslint-disable-line no-unused-vars
					renderFunc();
				}
			});
			d_m = new VSlider({
				containerContext: `#${domId} .wbox.month`,
				defaultIndex:  yOld
								? cacheMonth['key_'+yOld.month] + loop_offset_m - 2
								: loop_total_m + loop_offset_m - 2,
				callback: function(currArr){ // eslint-disable-line no-unused-vars
					let hidx = parseInt( currArr[2].id.replace('month_li', '') );
					if (hidx<(loop_total_m-loop_offset_m))
						this.setCurr(hidx+(loop_total_m-2), false);
					else if	(hidx>(loop_total_m+loop_offset_m-1))
						this.setCurr(hidx-(loop_total_m+2), false);
					renderFunc();
				}
			});

			document.querySelector('.finishBtn', ap).addEventListener('click', closeFunc);
			if (closeCallback !== noop) {
				document.querySelector('.finishBtn', ap).addEventListener('click', function(){
					closeCallback.apply(null, getResults());
				});
			}

			renderFunc();
		};

		this._close_func = closeFunc;

		return this;
	}
}