var type="pc";  //Check whether the current device belongs to the mobile terminal or PC terminal. The value is less than or equal to 1000.
var pomodoroTime = 300;  //The default task duration is 5 minutes.
var taskTimer = null,stopTimer=null; //TaskTimer Timing of a task, namely Pomodoro timing.
//Change the REM size by calculating the corresponding root element font-size based on the screen width.
; (function (win) {
    var tid
    function refreshRem() {
        let html = document.documentElement
        let wW = html.clientWidth // Window width
        let designSize = 1000 // Design dimension
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
//Check whether a node is hidden
function isNone(dom){
    let res = dom.css("display")=='none'?true:false;
    return res;
}

function formatSeconds(second,type){//Seconds convert to hours and minutes and seconds

    var s = parseInt(second);//Time required to convert in seconds
    var m = 0;//minute
    var h = 0;//hour 
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
