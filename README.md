# lunar-cale
a touch control component can support the traditional Chinese calendar

![demo1](https://raw.githubusercontent.com/tonylua/lunar-cale/master/demo1.jpg)
![demo2](https://raw.githubusercontent.com/tonylua/lunar-cale/master/demo2.jpg)

## 1. How to install
```
npm i lunar-cale --save
```

## 2. How to use

see /example/index.html

## 3. API
<a name="LunarCale"></a>

## LunarCale : <code>Object</code>
可支持农历和公历的移动端触控日历控件

**Kind**: global class  

* [LunarCale](#LunarCale) : <code>Object</code>
    * [new LunarCale([setting])](#new_LunarCale_new)
    * [.el](#LunarCale+el) ⇒ <code>HTMLElement</code>
    * [.isVisible](#LunarCale+isVisible) : <code>Boolean</code>
    * [.show()](#LunarCale+show) ⇒ <code>Object</code>
    * [.hide()](#LunarCale+hide) ⇒ <code>Object</code>

<a name="new_LunarCale_new"></a>

### new LunarCale([setting])
参数说明： mode - 初始模式; lang - 语言; startYear - 开始年份 yyyy; endYear - 结束年份 yyyy; initShownYMD - 初始选中的日期 yyyy-mm-dd; selectCallback - 选中新值时的回调函数 - 关闭面板时的回调函数


| Param | Type | Default |
| --- | --- | --- |
| [setting] | <code>Object</code> | <code>{mode, lang, startYear, endYear, initShownYMD, selectCallback, closeCallback}</code> | 

<a name="LunarCale+el"></a>

### lunarCale.el ⇒ <code>HTMLElement</code>
取得组件的DOM

**Kind**: instance property of <code>[LunarCale](#LunarCale)</code>  
<a name="LunarCale+isVisible"></a>

### lunarCale.isVisible : <code>Boolean</code>
判断控件当前是否可见

**Kind**: instance property of <code>[LunarCale](#LunarCale)</code>  
<a name="LunarCale+show"></a>

### lunarCale.show() ⇒ <code>Object</code>
显示

**Kind**: instance method of <code>[LunarCale](#LunarCale)</code>  
**Returns**: <code>Object</code> - 当前控件  
<a name="LunarCale+hide"></a>

### lunarCale.hide() ⇒ <code>Object</code>
隐藏

**Kind**: instance method of <code>[LunarCale](#LunarCale)</code>  
**Returns**: <code>Object</code> - 当前控件  
