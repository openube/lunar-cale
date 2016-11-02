import {env as m_env, format as m_format, utils as m_utils, time as m_time} from 'mobile-utils'; // eslint-disable-line no-unused-vars
import VSlider from "./vertical_slider";
import LunarFormatter from "./lunar_formatter";
import css from './cale.less'; // eslint-disable-line no-unused-vars

const
	domId = 'lunar_cale_panel'
	,ensure_num = m_format.num_pad_left
	// ,screen_lock = e=>e.preventDefault()
	,noop = ()=>void(0)
	,find = (container, selector)=>container.querySelector(selector)
	,vs_range = vslider=>vslider.getRange()
	,vs_val = vslider=>vs_range(vslider)[2].getAttribute('rel')
	,lunar_str = lunar=>`${lunar.Animal}年 ${lunar.gzYear} ${lunar.IMonthCn} ${lunar.IDayCn}`
	,li_tmpl = type=>(f, idx, display=null) => `<li id="${type}_li${f}" rel="${idx}">${display || idx}</li>`
	,year_tmpl = li_tmpl('year')
	,month_tmpl = li_tmpl('month')
	,date_tmpl = li_tmpl('date')
	,base_tmpl = (mode=LunarCale.SOLAR)=>`
		<div id="${domId}"
			class="${
				mode===LunarCale.LUNAR?'lunar':'solar'
			} ${
				(m_env.ios && m_env.version<8) ? 'ios7' : 'normal'
			}">
			<div class="hd">
				<label><input type="checkbox"
					class="mod_round_checkbox"
					${mode===LunarCale.LUNAR?'checked':''} />农历</label>
				<p></p>
				<a class="finishBtn">完成</a>
			</div>
			<div class="bd">
				<div class="win">
					<div class="wdecoration">
						<div class="wbk year"></div>
						<div class="wline"></div>
						<div class="wbk month"></div>
						<div class="wline"></div>
						<div class="wbk date"></div>
					</div>
					<div class="wglass"></div>
					<div class="wmain">
						<div class="wbox year">{#year#}</div>
						<div class="wbox month">{#month#}</div>
						<div class="wbox date"></div>
					</div>
				</div>
			</div>
		</div>`
;

/**
 * 可支持农历和公历的移动端触控日历控件
 * @type {Object}
 */
class LunarCale {
	static get SOLAR() {
		return 0;
	}
	static get LUNAR() {
		return 1;
	}

	get mode() {
		return this._mode;
	}
	set mode(m) {
		if (m !== LunarCale.SOLAR && m !== LunarCale.LUNAR) {
			throw new Error('[LunarCale] invalid mode!');
		}
		this._mode = m;
		this._render();
	}

	/**
	 * 判断控件当前是否可见
	 * @type {Boolean}
	 */
	get isVisible() {
		return this._is_visible;
	}

	/**
	 * 显示
	 * @return {Object} 当前控件
	 */
	show() {
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
	hide() {
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
	 * @param  {Object} [setting={mode, startYear, endYear, initShownYMD, selectCallback, closeCallback}]
	 * @description 参数说明： mode - 初始模式; startYear - 开始年份 yyyy; endYear - 结束年份 yyyy; initShownYMD - 初始选中的日期 yyyy-mm-dd; selectCallback - 选中新值时的回调函数 - 关闭面板时的回调函数
	 * @return {Object} 当前控件
	 */
	constructor(setting) {
		let
			_this = this,
			cfg = Object.assign({
				mode: LunarCale.SOLAR
				,startYear: 1970
				,endYear: m_time.today().getFullYear()
				,initShownYMD: m_time.date_to_YMD(m_time.today())
				,selectCallback: noop
				,closeCallback: noop
			}, setting),
			{startYear, endYear, initShownYMD, selectCallback, closeCallback} = cfg,
			d_d,
			d_m,
			d_y,
			yS = parseInt(startYear),
			yE = parseInt(endYear),
			yOld = initShownYMD
				? (function(){
					let earr = initShownYMD.split('-');
					return {
						year: earr[0],
						month: ensure_num(earr[1]),
						date: ensure_num(earr[2])
					};
				}())
				: null,

			tmpl,

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
					let args = [flag++, i];
					arr.push( year_tmpl.apply(null, args) );
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
			fillDates = function(dayNum, y, m){
				loop_total_d = dayNum;
				cacheDate = {};

				let
					arr = [],
					i,
					lng,
					flag = 0,
					plus_and_fix = n=>ensure_num(n+1),
					add = (f,i)=>{
						let d = plus_and_fix(i);
						let args = [f, d];
						if (_this.mode === LunarCale.LUNAR) {
							let lunar = LunarFormatter.solar2lunar(y, m+1, d);
							let str = `${d} <small>${lunar.IMonthCn}${lunar.IDayCn}</small>`;
							args.push(str);
						}
						arr.push( date_tmpl.apply(null, args) )
					}
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
					p_year = parseInt( vs_val(d_y) )
					,p_month = parseInt( Number(vs_val(d_m)) ) - 1 //Number转型for安卓老手机
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

				find(document, did).innerHTML = fillDates(dnum, p_year, p_month);

				d_d = new VSlider({
					containerContext: did,
					defaultIndex: yOld
									? cacheDate['key_'+yOld.date] - 2
									: loop_total_d + loop_offset_d - 2,
					callback: function(currArr){
						let
							mdom = currArr[2],
							midx = parseInt( mdom.id.replace('date_li', '') );
						if (midx<(loop_total_d-loop_offset_d))
							this.setCurr(midx+(loop_total_d-2), false);
						else if	(midx>(loop_total_d+loop_offset_d-1))
							this.setCurr(midx-(loop_total_d+2), false);
						parseResult();
						fixStyle();
					}
				});
			},
			getResults = function(){
				try{
					let
						rst = [
							vs_val(d_y),
							vs_val(d_m),
							vs_val(d_d)
						]
						,lunar = LunarFormatter.solar2lunar.apply(null, rst)
					;
					rst.push(lunar);
					return rst;
				}catch(ex){}
				return null;
			},
			parseResult = function(){
				let [y,m,d,lunar] = getResults();
				yOld = {year:y, month:m, date:d};
				if (_this.mode === LunarCale.LUNAR) {
					find(document, `#${domId} .hd p`).innerHTML = `${lunar.Animal}年(${lunar.gzYear})`;
				}
				if (selectCallback !== noop){
					selectCallback.call(null, y, m, d, lunar_str(lunar));
				}
			},

			fixStyle = function() {
				if (!/normal/.test(find(document, `#${domId}`).className)) return;
				//显示的5个项
				[].forEach.call(document.querySelectorAll(`#${domId} ol li`), li=>(delete li.dataset['rowstyle']));
				[d_y, d_m, d_d].map(vs_range).forEach(range=>range.forEach((item,idx)=>item.dataset['rowstyle']='row'+idx));
				//修正垂直对齐
				setTimeout(()=>{
					[].forEach.call(document.querySelectorAll('.wbox ol'), function(ele) {
						// ele.addEventListener('transitionend', e=>{
						ele.style.marginTop = 0;
						let ol = ele //e.currentTarget
							,li = ol.querySelector('[data-rowstyle=row2]')
							,gls = document.querySelector('.wglass')
							,r1 = li.getBoundingClientRect()
							,r2 = gls.getBoundingClientRect()
						;
						var diff = r1.top - (r2.top - .5*(r1.height - r2.height));
						ol.style.marginTop = -Math.abs(diff) + 'px';
						// });
					});
				}, 0);
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
				fixStyle();
			}
		;

		this._mode = cfg.mode;

		this._render = () => {
			let ap = document.getElementById(domId);
			if (ap)	closeFunc();

			tmpl = base_tmpl(this._mode);

			fillYears();
			fillMonths();
			document.body.insertAdjacentHTML('beforeEnd', tmpl);
			ap = document.getElementById(domId);

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
				callback: function(currArr){
					let hidx = parseInt( currArr[2].id.replace('month_li', '') );
					if (hidx<(loop_total_m-loop_offset_m))
						this.setCurr(hidx+(loop_total_m-2), false);
					else if	(hidx>(loop_total_m+loop_offset_m-1))
						this.setCurr(hidx-(loop_total_m+2), false);
					renderFunc();
				}
			});

			find(ap, '.finishBtn').addEventListener('click', closeFunc);
			if (closeCallback !== noop) {
				find(ap, '.finishBtn').addEventListener('click', function(){
					let [y,m,d,lunar] = getResults();
					closeCallback(y,m,d,lunar_str(lunar));
				});
			}
			find(ap, '.hd input[type=checkbox]').addEventListener('click', e=>{
				let lunar_mode = e.currentTarget.checked;
				_this.mode = lunar_mode ? LunarCale.LUNAR : LunarCale.SOLAR;
			});

			renderFunc();
		};

		this._close_func = closeFunc;

		return this;
	}
}

export default LunarCale;