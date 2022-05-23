var type="pc";  //当前属于移动端还是PC端，小于等于1000为移动端
var pomodoroTime = 300;  //默认任务时间5分钟，即300秒
var taskTimer = null,stopTimer=null; //taskTimer任务的计时，即Pomodoro的计时，stopTimer 正计时的计时，即stop watch的计时
//根据屏幕宽度计算设置相对应的根元素font-size,从而更改rem大小
; (function (win) {
    var tid
    function refreshRem() {
        let html = document.documentElement
        let wW = html.clientWidth // 窗口宽度
        let designSize = 1000 // 设计图尺寸
        if(wW<=1000){
            designSize=370
            type="mobile"
        }else{
            type="pc";
        }
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
//判断某节点是否隐藏
function isNone(dom){
    let res = dom.css("display")=='none'?true:false;
    return res;
}
//秒转换成时分秒   type为h返回时分秒，为其他返回分秒
function formatSeconds(second,type){//秒转换成时分秒
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
    if(type=='h'){
        return hh+" ： "+mm+" ： "+ss
    }else{
        return result;
    }
}