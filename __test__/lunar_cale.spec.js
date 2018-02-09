import $ from 'jquery';
import lCale from 'lunar_cale';

describe('test the component', function() {
	it('should render basic UI', function() {

		let lc = new lCale({
			mode: lCale.SOLAR,
			startYear: '2010',
			endYear: '2020',
			initShownYMD: '2018-01-02'
		});
		lc.show();

		const $el = $(lc.el); 

		console.log($el.html())

		expect(lc.mode).toEqual(lCale.SOLAR);
		expect($el.find('.wbox.year ol>li').not(':empty').length).toEqual(11);
		expect($el.find('.wbox.year li[data-rowstyle="row2"]').html()).toEqual('2018');
		expect($el.find('.wbox.month li[data-rowstyle="row2"]').html()).toEqual('01');
		expect($el.find('.wbox.date li[data-rowstyle="row2"]').html()).toEqual('02');
	});
	it('should trigger callbacks', function() {

		const fn1 = jest.fn();
		const fn2 = jest.fn();

		let lc = new lCale({
			mode: lCale.LUNAR,
			startYear: '2010',
			endYear: '2020',
			initShownYMD: '2018-01-02',
			selectCallback: fn1,
			closeCallback: fn2
		});
		lc.show();

		const $el = $(lc.el);

		expect(lc.mode).toEqual(lCale.LUNAR);

		$el.find('.wbox.year ol').trigger('webkitTransitionEnd');
		expect(fn1).toHaveBeenCalled();

		$el.find('.finishBtn').trigger('click');
		expect(fn2).toHaveBeenCalled();
	});
	it('should support English', function() {
		let lc = new lCale({
			lang: 'en',
			mode: lCale.SOLAR,
			startYear: '2010',
			endYear: '2020',
			initShownYMD: '2018-01-02'
		});
		lc.show();

		const $el = $(lc.el); 

		expect($el.find('.finishBtn').html()).toEqual("Done");
	});
});