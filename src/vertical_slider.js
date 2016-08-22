import {dom as m_dom, event as m_event, env as m_env} from 'mobile-utils'; // eslint-disable-line no-unused-vars

const _time = ()=>(new Date).getTime();

/**
 * 可以手指上下滑动的垂直列表
 */
export default class VSlider {
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
	constructor(config) {
		this.config = Object.assign({
			containerContext: null,
			innerContext: 'ol',
			itemContext: 'li',
			itemCount: 5,
			defaultIndex: 0,
			callback: null
		}, config);

		let {containerContext, innerContext, itemContext, itemCount, defaultIndex} = this.config;

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
		this.inner.addEventListener("onscroll", e=>e.preventDefault());
	}
	/**
	 * 设置选择项
	 * @param {Number}  idx - 选中项索引值
	 * @param {Boolean} needTween - 是否需要缓动效果
	 * @return {void}
	 */
	setCurr(idx, needTween = true) {
		this.topIdx = idx;
		this._move(-this.itemH*idx, needTween);
	}
	/**
	 * 取得所选范围
	 * @return {Array} [childs, start_idx, end_idx]
	 */
	getRange() {
		return Array.prototype.slice.call(this.childs, this.topIdx, this.topIdx+this.config.itemCount);
	}
	/**
	 * @private
	 */
	_move(top, needTween=false) {
		let tween_time = needTween ? .618 * 4 / 10000 : 0;
		m_dom.transformXY(this.inner, 0, top, tween_time);
	}
	/**
	 * @private
	 */
	_e_ts(e) { /*touchstart*/
		e.preventDefault();

		let
			ct = this.container.getBoundingClientRect().top,
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
	_e_tm(e) { /*touchmove*/
		e.preventDefault();

		let 
			{stageY, innerTop} = this.dinfo_start
			,top = e.touches[0].clientY - stageY + innerTop
		;
		this._move(top);

		let c = e.currentTarget;
		if (typeof c.dataset['touching'] === 'undefined'
			|| c.dataset['touching'] * 1 != 1) {
			c.dataset['touching'] = 1;
		}

		e.stopPropagation();
	}
	/**
	 * @private
	 */
	_e_te(e) { /*touchend*/
		e.preventDefault();

		e.currentTarget.removeEventListener("touchmove", this._ontouchmove);
		e.currentTarget.removeEventListener("touchend", this._ontouchend);
		e.currentTarget.removeEventListener("touchcancel", this._ontouchend);

		let
			c = e.currentTarget,
			ct = this.container.getBoundingClientRect().top,
			it = this.inner.getBoundingClientRect().top,
			idx = this.topIdx;

		c.dataset['touching'] = 0;
		this.dinfo_end = {
			time: _time(),
			innerTop: it - ct
		};

		let
			{time:s_time, innerTop:s_innerTop} = this.dinfo_start,
			{time:e_time, innerTop:e_innerTop} = this.dinfo_end,
			tTime = e_time - s_time,
			tDis = e_innerTop - s_innerTop,
			shortDis = Math.abs(tDis) < 5,
			longTime = tTime > 200;

		if (!longTime && !shortDis) { /*快速拖动*/
			if (tDis < 0) /*up*/ idx += 5;
			else /*down*/ idx -= 5;
		} else { /*一般拖动*/
			if (Math.abs(tDis) > .5 * this.itemH) {
				var d1 = Math.abs(Math.round(tDis / this.itemH));
				if (tDis < 0) idx += d1;
				else idx -= d1;
			}
		}
		if (idx < 0)
			idx = 0;
		if (idx >= this.childs.length - this.config.itemCount)
			idx = this.childs.length - this.config.itemCount;

		m_event.on_tweened(this.inner, this._ontransitionend);
		this.setCurr(idx);
	}
	/**
	 * @private
	 */
	_e_tre(e) {
		e.currentTarget.removeEventListener('webkitTransitionEnd', this._ontransitionend);
		if ('callback' in this.config
			&& typeof this.config.callback === 'function') {
			this.config.callback.call(this, this.getRange());
		}
	}

}