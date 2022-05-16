$(document).ready(function(){
    let mNavIndex=2;
    renderMCard();
    $(".navBox p").click(function(){
        // console.log($(this).index())
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
    $(".timeBox h2").html(formatSeconds(pomodoroTime));
    $(".clockPomodoroBox .clockTime h2").html(formatSeconds(pomodoroTime,'h'));
    $(".pomodoroTaskBox .taskRight p").html(formatSeconds(pomodoroTime));
    $(".mobileMenuBox").click(function(){
        console.log($(this).hasClass("mobileMenuBoxHide"))
        if($(this).hasClass("mobileMenuBoxHide")){
            $(this).removeClass("mobileMenuBoxHide");
            $(".mobileMusicBox").css("display", "none");
            $(".mobileBottomBox").css("display", "none");
            $(".mobileTaskBox").css("display", "none");
        }
    })
    $(".startWatch").click(function(){
        watchTaskStart();
    })
    $(".restWatch").click(function(){
        watchTaskStart();
    })
    function watchTaskStart(){
        stopTimer && clearInterval(stopTimer);
        let wachTime=0;
        stopTimer = setInterval(()=>{
            wachTime++;
            $(".clockWatchBox .clockTime h2").html(formatSeconds(wachTime,"h"));
            $(".watchTaskBox .taskRight p").html(formatSeconds(wachTime));
            $(".watchTaskBox .taskBtn .playIcon").attr('src',require('../images/pauseMin.png'))
        },1000)
    }
    $(".pomodoroTaskBox .playIcon").click(function(){
        startTask();
    })
    $(".pomodoroTaskBox .stopIcon").click(function(){
        stopTask();
    })
    $(".endPomodoro").click(function(){
        time=0;
        clearInterval(taskTimer);
        $(".stopTime .timeBox h2").html(pomodoroTime)
        $(".startTime .timeBox h2").html(formatSeconds(pomodoroTime))
        $(".clockPomodoroBox .clockTime h2").html(formatSeconds(pomodoroTime,"h"))
        $(".pomodoroTaskBox .taskRight p").html(formatSeconds(pomodoroTime));
        $(".clockTime .nowPre").css("width",0)
        $(".clockTime .preDot").css("left",0)
    })
    $(".resetPomodoro").click(function(){
        time=0;
        startTask();
    })
    $(".narrow").click(function(){
        $(".musicMaxBox").css("display","none");
        $(".mobileMenuBox").addClass("mobileMenuBoxHide")
        $(".mobileMenu div").removeClass("active");
        if(taskTimer || stopTimer){
            $(".mobileBottomBox").css("display","flex")
            $(".mobileBottomBox .mobileMusicBox").css("display","flex")
            if(taskTimer){
                $(".mobileBottomBox .pomodoroTaskBox").css("display", "flex");
            }
            if(stopTimer){
                $(".mobileBottomBox .watchTaskBox").css("display", "flex");
            }
        }else{
            $(".onlyMusicBox").css("display","flex")
            $(".mobileBottomBox .mobileMusicBox").css("display","none")
        }
    })
    $(".clockMaxBox .close").click(function(){
        $(".mobileMenuBox").addClass("mobileMenuBoxHide");
        $(".mobileMenu div").removeClass("active");
        $(".clockMaxBox").css("display", "none");
        if($(".onlyMusicBox").css("display")=='none'){
            $(".mobileMusicBox").css("display", "none");
        }else{
            $(".onlyMusicBox").css("display", "none");
            $(".mobileBottomBox .mobileMusicBox").css("display", "flex");
        }
        $(".mobileBottomBox").css("display", "flex");
        console.log($(this).parent().hasClass("clockWatchBox"))
        if($(this).parent().hasClass("clockWatchBox")){
            $(".mobileBottomBox .watchTaskBox").css("display", "flex");
            if(taskTimer){
                $(".mobileBottomBox .pomodoroTaskBox").css("display", "flex");
            }
        }else{
            $(".mobileBottomBox .pomodoroTaskBox").css("display", "flex");
            if(stopTimer){
                $(".mobileBottomBox .watchTaskBox").css("display", "flex");
            }
        }
        if(!$("#music")[0].paused){
            $(".mobileBottomBox .mobileMusicBox").css("display", "flex");
        }
    })
    $(".timerBox").click(()=>{
        $(".timeMaxTask").css("display","block");
    })
    // $(".timeTask").click(function () {
    //     $(".stopTime").css("display", "none")
    //     $(".startTime").css("display", "none")
    //     $(".timeMaxTask").css("display", "block")
    //     $(".timerBox").css("display", "block")
    // })
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
    })
    $(".stopTime img").click(function (e) {
        e.stopPropagation();
        $(".stopTime").css("display", "none")
        $(".startTime").css("display", "block")
        $(".timeMaxTask").css("display", "none")
        startTask();
    })
    $(".startTime img").click(function (e) {
        e.stopPropagation();
        $(".stopTime").css("display", "block")
        $(".startTime").css("display", "none")
        $(".timeMaxTask").css("display", "none")
        stopTask();
    })
    let time = 0;
    function startTask() {
        time = time?time:pomodoroTime;
        taskTimer && clearInterval(taskTimer)
        taskTimer = setInterval(function() {
            time--;
            if (time <= 0) {
                time = pomodoroTime;
                stopTask();
            }
            $(".stopTime .timeBox h2").html(formatSeconds(time))
            $(".startTime .timeBox h2").html(formatSeconds(time))
            $(".clockPomodoroBox .clockTime h2").html(formatSeconds(time,"h"))
            $(".pomodoroTaskBox .taskRight p").html(formatSeconds(time));
            $(".pomodoroTaskBox .taskBtn .playIcon").attr('src',require('../images/pauseMin.png'))
            let width = (pomodoroTime-time)/pomodoroTime*100+'%';
            $(".clockTime .nowPre").css("width",width)
            $(".clockTime .preDot").css("left",width)
        },1000)
        $(".stopTime").css("display","none");
        $(".startTime").css("display","block");
	    $(".mobileMenuBox").addClass("mobileMenuBoxHide")
		$(".mobileBottomBox").css("display","flex")
        $(".pomodoroTaskBox").css("display","flex")
        if(!isNone($(".pcMusicMaxBox"))){
            $(".mobileMusicMaxBox").css("display","none");
		    $(".mobileMusicBox").css("display","flex")
        }
        if(!$("#music")[0].paused){
            $(".mobileMusicMaxBox").css("display","onlyMusicBox");
		    $(".mobileBottomBox .mobileMusicBox").css("display","flex")
        }
    }
    function stopTask() {
        clearInterval(taskTimer);
        // $(".stopTime .timeBox h2").html(formatSeconds(pomodoroTime))
        // $(".startTime .timeBox h2").html(formatSeconds(pomodoroTime))
        // $(".clockPomodoroBox .clockTime h2").html(formatSeconds(pomodoroTime,"h"))
        // $(".pomodoroTaskBox .taskRight p").html(formatSeconds(pomodoroTime));
        setTimeout(()=>{
            $(".pomodoroTaskBox .taskBtn .playIcon").attr('src',require('../images/playIcon.png'))
        },200)
        // $(".clockTime .nowPre").css("width",0)
        // $(".clockTime .preDot").css("left",0)
        $(".startTime").css("display", "none")
        $(".timeMaxTask").css("display", "none")
        if(type=='mobile'){

        }else{
            $(".stopTime").css("display", "block")
        }
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
            $(".mobileMusicMaxBox").css("display","block");
	        $(".pcMusicMaxBox").css("display","block");
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