$(document).ready(function(){
    let mNavIndex=2;  //Mobile NAV (Not Started, In Progress, Already done) default index
    renderMCard(); //Display the corresponding card according to the index
    //Monitor nav click operation, display corresponding card according to the switched nav
    $(".navBox p").click(function(){
        mNavIndex=$(this).index();
        $(".navBox p").removeClass("active")
        $(this).addClass("active")
        renderMCard();
    })
    //In the upper right corner of the PC, Add Task and Add Column click Shrink
    $(".rightTopBtnBox button").click(function () {
        $(this).addClass('smaller');
        setTimeout(() => {
            $(this).removeClass('smaller');
        }, 200)
    })
    //Move Categories to the right of Add and click Shrink effect
    $(".mScreenBox button").click(function () {
        $(this).addClass('smaller');
        setTimeout(() => {
            $(this).removeClass('smaller');
        }, 200)
    })
    //Displays the set task time
    $(".timeBox h2").html(formatSeconds(pomodoroTime));
    $(".clockPomodoroBox .clockTime h2").html(formatSeconds(pomodoroTime,'h'));
    $(".pomodoroTaskBox .taskRight p").html(formatSeconds(pomodoroTime));
    //PC under the contraction of the small yellow horizontal block click operation effect
    $(".mobileMenuBox").click(function(){
        if($(this).hasClass("mobileMenuBoxHide")){
            $(this).removeClass("mobileMenuBoxHide");
            $(".mobileMusicBox").css("display", "none");
            $(".mobileBottomBox").css("display", "none");
            $(".mobileTaskBox").css("display", "none");
        }
    })
    //The Start button
    $(".startWatch").click(function(){
        watchTaskStart();
    })
    //the reset button
    $(".restWatch").click(function(){
        watchTaskStart();
    })
    //Stop Watch starts the timer function
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
    //Small Pomodoro playicon is the start icon click
    $(".pomodoroTaskBox .playIcon").click(function(){
        startTask();
    })
    //Small pomodoro stopicon is the end of the icon click
    $(".pomodoroTaskBox .stopIcon").click(function(){
        stopTask();
    })
    //Big Pomodoro end click
    $(".endPomodoro").click(function(){
        potime=0;
        clearInterval(taskTimer);
        $(".stopTime .timeBox h2").html(pomodoroTime)
        $(".startTime .timeBox h2").html(formatSeconds(pomodoroTime))
        $(".clockPomodoroBox .clockTime h2").html(formatSeconds(pomodoroTime,"h"))
        $(".pomodoroTaskBox .taskRight p").html(formatSeconds(pomodoroTime));
        $(".clockTime .nowPre").css("width",0)
        $(".clockTime .preDot").css("left",0)
    })
    //big pomodoro reset click
    $(".resetPomodoro").click(function(){
        potime=0;
        startTask();
    })
    //Click the shrink button of the big music box on the mobile terminal
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
    //Big Stop Watch and Big Pomodoro close button operation
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
    //Click Tasks in the right list on the PC
    $(".onlyTaskBox").click(function(){
        $(".taskBox").removeClass("active")
	    $(this).addClass("active")
    })
    //Timer Click in the list on the right of the PC
    $(".timerBox").click(function(){
        $(".timeMaxTask").css("display","block");
        $(".taskBox").removeClass("active")
	    $(this).addClass("active")
    })
    //PC side Pomodoro popup box below time click operation
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
    //Click the start of Project 1 on PC
    $(".stopTime img").click(function (e) {
        e.stopPropagation();
        $(".stopTime").css("display", "none")
        $(".startTime").css("display", "block")
        $(".timeMaxTask").css("display", "none")
        startTask();
    })
    //Click the end of the TASK on the PC
    $(".startTime img").click(function (e) {
        e.stopPropagation();
        $(".stopTime").css("display", "block")
        $(".startTime").css("display", "none")
        $(".timeMaxTask").css("display", "none")
        stopTask();
    })
    //Task timing
    let potime = 0;
    //task start function
    function startTask() {
        potime = potime?potime:pomodoroTime;
        taskTimer && clearInterval(taskTimer)
        taskTimer = setInterval(function() {
            potime--;
            if (potime <= 0) {
                potime = pomodoroTime;
                stopTask();
            }
            $(".stopTime .timeBox h2").html(formatSeconds(potime))
            $(".startTime .timeBox h2").html(formatSeconds(potime))
            $(".clockPomodoroBox .clockTime h2").html(formatSeconds(potime,"h"))
            $(".pomodoroTaskBox .taskRight p").html(formatSeconds(potime));
            $(".pomodoroTaskBox .taskBtn .playIcon").attr('src',require('../images/pauseMin.png'))
            let width = (pomodoroTime-potime)/pomodoroTime*100+'%';
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
    //task end function
    function stopTask() {
        clearInterval(taskTimer);
        setTimeout(()=>{
            $(".pomodoroTaskBox .taskBtn .playIcon").attr('src',require('../images/playIcon.png'))
        },200)
        $(".startTime").css("display", "none")
        $(".timeMaxTask").css("display", "none")
        if(type=='mobile'){

        }else{
            $(".stopTime").css("display", "block")
        }
    }
    //The mobile side renders the corresponding card function based on the NAV index
    function renderMCard(){
        $(".rightCon>div .card").css("display","none")
        $(".rightCon>div").eq(mNavIndex).find(".card").css("display","block")
    }
    //The big yellow block below the mobile terminal (containing music and task buttons) inside the music and task button click operation
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
    //Next (right arrow button) in the big task box, switch to the next clock, namely switch to Stop Watch and Pomodoro
    $(".clockNext").click(function(){
        let show = $(this).attr("show");
        $(".clockMaxBox").css("display","none");
        $("."+show).css("display","flex");
        console.log($(this),show,$("."+show))
    })
})
