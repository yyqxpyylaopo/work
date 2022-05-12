$(document).ready(function(){
    $(".rightTopBtnBox button").click(function () {
        $(this).addClass('smaller');
        setTimeout(() => {
            $(this).removeClass('smaller');
        }, 200)
    })
    let pomodoroTime = 300;
    let taskTimer = null;
    $(".timeBox h2").html(formatSeconds(pomodoroTime));
    $(".timeTask").click(function () {
        $(".stopTime").css("display", "none")
        $(".startTime").css("display", "none")
        $(".timeMaxTask").css("display", "block")
        $(".timerBox").css("display", "block")
    })
    $(".timeMaxTask .timeBox").click(function(e){
        e.stopPropagation();
        if(taskTimer){
            $(".stopTime").css("display", "none")
            $(".startTime").css("display", "block")
        }else{
            $(".stopTime").css("display", "block")
            $(".startTime").css("display", "none")
        }
        $(".timeMaxTask").css("display", "none")
        $(".timerBox").css("display", "none")
    })
    $(".stopTime img").click(function (e) {
        e.stopPropagation();
        $(".stopTime").css("display", "none")
        $(".startTime").css("display", "block")
        $(".timeMaxTask").css("display", "none")
        $(".timerBox").css("display", "none")
        startTask();
    })
    $(".startTime img").click(function (e) {
        e.stopPropagation();
        $(".stopTime").css("display", "block")
        $(".startTime").css("display", "none")
        $(".timeMaxTask").css("display", "none")
        $(".timerBox").css("display", "none")
        stopTask();
    })

    function startTask() {
        taskTimer && clearInterval(taskTimer)
        let time = pomodoroTime;
        taskTimer = setInterval(() => {
            time--;
            if (time <= 0) {
                time = pomodoroTime;
                stopTask();
            }
            $(".stopTime .timeBox h2").html(formatSeconds(time))
            $(".startTime .timeBox h2").html(formatSeconds(time))
        },1000)
    }
    function stopTask() {
        clearInterval(taskTimer);
        $(".stopTime").css("display", "block")
        $(".startTime").css("display", "none")
        $(".timeMaxTask").css("display", "none")
    }
})