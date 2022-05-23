$(document).ready(function(){
    let mNavIndex=2;  //移动端nav（Not Started，In progress，Already done）默认索引
    renderMCard(); //根据索引展示相对应的card
    //监听nav点击操作，根据切换的nav展示相对应card
    $(".navBox p").click(function(){
        mNavIndex=$(this).index();
        $(".navBox p").removeClass("active")
        $(this).addClass("active")
        renderMCard();
    })
    //PC端右上角Add Task，Add Column点击收缩效果
    $(".rightTopBtnBox button").click(function () {
        $(this).addClass('smaller');
        setTimeout(() => {
            $(this).removeClass('smaller');
        }, 200)
    })
    //移动端Categories右侧Add点击收缩效果
    $(".mScreenBox button").click(function () {
        $(this).addClass('smaller');
        setTimeout(() => {
            $(this).removeClass('smaller');
        }, 200)
    })
    //默认展示设置的任务时间
    $(".timeBox h2").html(formatSeconds(pomodoroTime));
    $(".clockPomodoroBox .clockTime h2").html(formatSeconds(pomodoroTime,'h'));
    $(".pomodoroTaskBox .taskRight p").html(formatSeconds(pomodoroTime));
    //移动端下方收缩的小黄色横块块点击操作效果
    $(".mobileMenuBox").click(function(){
        if($(this).hasClass("mobileMenuBoxHide")){
            $(this).removeClass("mobileMenuBoxHide");
            $(".mobileMusicBox").css("display", "none");
            $(".mobileBottomBox").css("display", "none");
            $(".mobileTaskBox").css("display", "none");
        }
    })
    //大Stop Watch的Start按键
    $(".startWatch").click(function(){
        watchTaskStart();
    })
    //大Stop Watch的Reset按键
    $(".restWatch").click(function(){
        watchTaskStart();
    })
    //Stop Watch开始计时函数
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
    //小pomodoro playIcon即开始icon 点击
    $(".pomodoroTaskBox .playIcon").click(function(){
        startTask();
    })
    //小pomodoro stopIcon即结束icon 点击
    $(".pomodoroTaskBox .stopIcon").click(function(){
        stopTask();
    })
    //大Pomodoro  End点击
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
    //大Pomodoro  Reset点击
    $(".resetPomodoro").click(function(){
        potime=0;
        startTask();
    })
    //移动端大音乐框的缩小按钮点击操作
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
    //大Stop Watch和大Pomodoro的关闭按钮操作
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
    //PC端右侧列表Tasks点击
    $(".onlyTaskBox").click(function(){
        $(".taskBox").removeClass("active")
	    $(this).addClass("active")
    })
    //PC端右侧列表Timer点击
    $(".timerBox").click(function(){
        $(".timeMaxTask").css("display","block");
        $(".taskBox").removeClass("active")
	    $(this).addClass("active")
    })
    //PC端Pomodoro弹出框下面时间的点击操作
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
    //PC端Project 1.的开始点击操作
    $(".stopTime img").click(function (e) {
        e.stopPropagation();
        $(".stopTime").css("display", "none")
        $(".startTime").css("display", "block")
        $(".timeMaxTask").css("display", "none")
        startTask();
    })
    //PC端任务的结束点击操作
    $(".startTime img").click(function (e) {
        e.stopPropagation();
        $(".stopTime").css("display", "block")
        $(".startTime").css("display", "none")
        $(".timeMaxTask").css("display", "none")
        stopTask();
    })
    //任务计时时间
    let potime = 0;
    //任务开始函数
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
    //任务结束函数
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
    //移动端根据nav索引渲染相对应的card函数
    function renderMCard(){
        $(".rightCon>div .card").css("display","none")
        $(".rightCon>div").eq(mNavIndex).find(".card").css("display","block")
    }
    //移动端下方黄色大块块（含有音乐和任务按钮）内部音乐和任务按钮的点击操作
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
    //大任务框的next(即右侧箭头按钮)，切换下一个clock，即切换Stop Watch和Pomodoro
    $(".clockNext").click(function(){
        let show = $(this).attr("show");
        $(".clockMaxBox").css("display","none");
        $("."+show).css("display","flex");
        console.log($(this),show,$("."+show))
    })
})