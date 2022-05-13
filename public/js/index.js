$(document).ready(function(){
    let mNavIndex=0;
    $(".navBox p").click(function(){
        console.log($(this).index())
        mNavIndex=$(this).index();
        $(".navBox p").removeClass("active")
        $(this).addClass("active")
        renderMCard();
    })
    $(".rightTopBtnBox button").click(function () {
        $(this).addClass('smaller');
        setTimeout(() => {
            $(this).removeClass('smaller');
        }, 200)
    })
    $(".mScreenBox button").click(function () {
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
    function renderMCard(){
        $(".rightCon>div .card").css("display","none")
        $(".rightCon>div").eq(mNavIndex).find(".card").css("display","block")
    }



    $(".mobileMenu div").click(function(){
        let index = $(this).index();
        console.log(index)
        $(".mobileMenu>div").removeClass("active");
        $(this).addClass("active");
        if(index == 0){
            $(".clockWatchBox").css("display","none")
            $(".mobileMusicMaxBox").css("display","block")
        }else{
            $(".mobileMusicMaxBox").css("display","none")
            $(".clockWatchBox").css("display","flex")
        }
    })
    $(".clockNext").click(function(){
        let show = $(this).attr("show");
        $(".clockMaxBox").css("display","none");
        $("."+show).css("display","flex");
        console.log($(this),show,$("."+show))
    })
})