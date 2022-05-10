; (function (win) {
    var tid
    function refreshRem() {
        let designSize = 1000 // 设计图尺寸
        let html = document.documentElement
        let wW = html.clientWidth // 窗口宽度
        let rem = (wW * 100) / designSize
        document.documentElement.style.fontSize = rem + 'px'
    }
    win.addEventListener(
        'resize',
        function () {
            clearTimeout(tid)
            tid = setTimeout(refreshRem, 1)
        },
        false
    )
    win.addEventListener(
        'pageshow',
        function (e) {
            if (e.persisted) {
                clearTimeout(tid)
                tid = setTimeout(refreshRem, 1)
            }
        },
        false
    )
    refreshRem();

})(window)
function formatSeconds(second){//秒转换成时分秒
    var s = parseInt(second);// 需要转换的时间秒 
    var m = 0;// 分 
    var h = 0;// 小时 
    if (s > 60) {
        m = parseInt(s / 60);
        s = parseInt(s % 60);
        if (m > 60) {
            h = parseInt(m / 60);
            m = parseInt(m % 60);
        }
    }

    var ss, mm, hh;
    if (s > 0) {
        ss = s.toString().length >= 2 ? s.toString() : "0" + s.toString();
    } else {
        ss = "00";
    }

    if (m > 0) {
        mm = m.toString().length >= 2 ? m.toString() : "0" + m.toString();
    } else {
        mm = "00"
    }

    if (h > 0) {
        hh = h.toString().length >= 2 ? h.toString() : "0" + h.toString();
    } else {
        hh = "00";
    }
    var result = mm + ":" + ss;
    // console.log(second + " => " + result);
    return result;
}