import LunarFormatter from "./lunar_formatter";
import LunarFormatterModern from "./lunar_formatter_modern";

export default {
  solar2lunar(y, m, d) {
    const isModernEnv = typeof Intl !== 'undefined' 
      && typeof Intl.DateTimeFormat === 'function';
    const isLatterThen2100 = (function() {
      const now = new Date();
      return now.getFullYear() >= 2100;
    }());

    // console.log(isModernEnv, isLatterThen2100);

    let func = isModernEnv || isLatterThen2100
      ? LunarFormatterModern.solar2lunar
      : LunarFormatter.solar2lunar;

    return func(y, m, d);
  }
}