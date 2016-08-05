function _es6mod(mod) {
    if (typeof mod.__esModule === "boolean" && !!mod.__esModule && mod.default) {
        return mod.default;
    }
    return mod;
}

var _myRjsConfigObj = {
    paths: {
        "mobile-utils": "../node_modules/mobile-utils/lib/mobile-utils",
        "lunar-cale": "../lib/lunar-cale"
    },
    shim: {
    },
    waitSeconds: 10
};
require.config(_myRjsConfigObj);

require(["mobile-utils", "lunar-cale"], function(mUtils, lCale) {

    var lc = new lCale({
        startYear: 1982,
        endYear: 2022,
        initShownYMD: '2016-09-01',
        selectCallback: function(y,m,d) {
            console.log([y, m, d]);
        },
        closeCallback: function(y,m,d) {
            alert('closed!');
        }
    });

    document.getElementById('trigger').addEventListener('click', lc.show.bind(lc));

});