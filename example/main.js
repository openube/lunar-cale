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

    var
        yS = 1982,
        yE = 2022,
        yOld = '1997-09-01';
    var lc = new lCale(yS, yE, yOld, function(y,m,d) {
        console.log([y, m, d]);
    }, function(y,m,d) {
        alert('closed!');
    });

    document.getElementById('trigger').addEventListener('click', lc.show.bind(lc));

});