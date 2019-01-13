import { format } from 'mobile-utils';

function solar2lunar(...args) {
  const [py, pm, pd] = args.map(arg => parseInt(arg, 10));
  const pstr = `${py}-${format.num_pad_left(pm)}-${format.num_pad_left(pd)} 00:00:00`;
  const date = new Date(pstr);
  // console.log(pstr, date)
	
  const TIAN_GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const DI_ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  const SHI = ["初", "十", "廿", "三"];
  const YUE = ["", "十"];
  const GE = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  const Animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
  
  const locale = "zh-TW-u-ca-chinese";

  const fmt = (key, d=null) => {
    return Intl.DateTimeFormat(locale,{[key]:"numeric"}).format(d||date).match(/\d+/)[0];
  };
  
  const isLeapMonth = (d) => {
    let _date = new Date(date);
    _date.setDate(-d);
    return fmt("month", _date) === m;
  };

  const getAnimal = (y) => {
    return Animals[(y - 4) % 12];
  };

  let y = fmt("year"); // eslint-disable-line no-unused-vars
  let m = fmt("month");
  let d = fmt("day");
  const isL = isLeapMonth(d);

  y = TIAN_GAN[(y - 1) % 10]
    + DI_ZHI[(y - 1) % 12];
  m = (YUE[(m - 1) / 10 | 0]
    + GE[(m - 1) % 10]).replace(/^一$/, "正");
  d = (SHI[(d) / 10 | 0]
    + GE[(d - 1) % 10]).replace(/^十十$/, "初十").replace(/^廿十$/, "二十");

  // return y + "年" + (isL ? "閏" : "") + m + "月" + d;
  return {
    'Animal': getAnimal(py),
    'gzYear': y,
    'IMonthCn': (isL ? "閏" : "") + m + '月',
    'IDayCn': d
  };
}

export default {
	solar2lunar
};