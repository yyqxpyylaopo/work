// let img = require("./images/ComeThrough.jpg")
// import noLike from "url:../images/noLike.png"
let musicList=[{
	id:"1838886738",
	name:'Come Through ',
	singer:'H.E.R. / Chris Brown-Come Through',
	url:require('../music/ComeThrough.mp3'),
	img:require('../images/ComeThrough.jpg'),
},{
	id:"1892632507",
	name:'wyd?',
	singer:'Larissa Lambert-wyd?',
	url:require('../music/wyd.mp3'),
	img: require('../images/wyd.jpg'),
},{
	id:"1861119567",
	name:'California',
	singer:'88rising / Rich Brian / NIKI / 王嘉尔 / Warren Hue',
	url:require('../music/California.mp3'),
	img: require('../images/California.jpg'),
},{
	id:"1921892053",
	name:'EverySummertime-NIKI ',
	singer:'i8-NPCのABC',
	url:require('../music/EverySummertime.mp3'),
	img: require('../images/EverySummertime.jpg'),
},{
	id:"1877751193",
	name:'Ride',
	singer:'HYBS-Ride',
	url:require('../music/Ride.mp3'),
	img: require('../images/Ride.jpg'),
},{
	id:"1480251493",
	name:'Palm Springs (the way you made me feel)',
	singer:'Virginia To Vegas',
	url:require('../music/PalmSprings.mp3'),
	img: require('../images/PalmSprings.jpg'),
}]


let musicIndex=0;
let nowMusic={};
let time=0,duration=0;
let playType=1; //1顺序播放，2随机播放，3循环播放
let timer=null
renderMinMusic();
function renderMinMusic(){
	nowMusic=musicList[musicIndex];
	$(".musicText h2").html(nowMusic.name);
	$(".musicText p").html(nowMusic.singer);
	$(".musicText img").attr('src',nowMusic.img)
	$(".musicCon>img").attr('src',nowMusic.img)
	if(localStorage.getItem(nowMusic.id)){
		$(".musicMinLikeBtn").attr('src',require('../images/Like.png'))
		$(".musicBtn img").attr('src',require('../images/Like.png'))
	}else{
		$(".musicMinLikeBtn").attr('src',require("../images/noLike.png"))
		$(".musicStartBox .musicBtn img").attr('src',require("../images/noLike.png"))
	}
	$("#music").attr('src',nowMusic.url);
	$("#music")[0].pause()
	
function playMusic(){
	$(".musicStopBox").css("display","none")
	$(".musicStartBox").css("display","block");
	$("#music")[0].play();
	$(".pauseBig").attr('src',require('../images/pauseBig.png'));
	duration = $("#music")[0].duration;
	musicTimeInterval();
}
function pauseMusic(){
	$("#music")[0].pause();
	$(".musicMinBtn").attr('src','./images/pause1.png');
	// setTimeout(()=>{
		duration = parseInt($("#music")[0].duration);
		// console.log(duration);
		musicTimeInterval();
	// },200)
}
function musicTimeInterval(){
	let percentage = time/duration*100+'%';
	$(".nowPre").css('width',percentage)
	timer = setInterval(()=>{
		time++;
		if(time>=duration){
			switch (playType){
				case 1:
					nextMusic();
					break;
				case 2:
					randomMusic();
				case 3:
					time=0;
					duration=0;
					renderMinMusic();
					break;
				default:
					break;
			}
		}
		let percentage = time/duration*100+'%';
		$(".playedTime").html(formatSeconds(time));
		$(".noplayedTime").html(formatSeconds(duration-time));
		$(".nowPre").css('width',percentage)
	},1000)
}
function nextMusic(){
	time=0;
	duration=0;
	if(musicIndex == musicList.length-1){
		musicIndex = 0;
		renderMinMusic();
		return;
	}
	musicIndex++;
	renderMinMusic();
}
function preMusic(){
	time=0;
	duration=0;
	if(musicIndex == 0){
		musicIndex = musicList.length-1;
		renderMinMusic();
		return;
	}
	musicIndex--;
	renderMinMusic();
}
function randomMusic(){
	time=0;
	duration=0;
	musicIndex = parseInt(Math.random()*musicList.length)+1;
	renderMinMusic();
}
$(".musicMinBtn").click(()=>{
	if($("#music")[0].paused){
		playMusic();
	}else{
		$("#music")[0].pause();
		$(".musicMinBtn").attr('src','./images/play1.png')
	}
})
$(".musicMinXin").click(()=>{
	if($(".musicMinXin").attr('src')=='./images/xin.png'){
		localStorage.setItem(nowMusic.id,JSON.stringify(nowMusic));
		$(".musicMinXin").attr('src','./images/xined.png')
	}else{
		localStorage.removeItem(nowMusic.id);
		$(".musicMinXin").attr('src','./images/xin.png')
	}
})
$(".musicMinprogress").click(()=>{
	
})

function renderMaxMusic(){
	$(".musicMaxTitle h2").html(nowMusic.name);
	$(".musicMaxTitle p").html(nowMusic.singer);
	$(".musicMaxImg").attr('src',nowMusic.img)
	if(localStorage.getItem(nowMusic.id)){
		$(".musicMaxXin").attr('src','./images/xined.png')
	}else{
		$(".musicMaxXin").attr('src','./images/xin.png')
	}
	$("#music").attr('src',nowMusic.url);
}

function renderPlayList(){
	let html="";
	musicList.forEach((item)=>{
		html+=`<div class="playItem">
					<div class="playCon">
						<img src="${item.img}" >
						<div class="playItemTitle">
							<h2>${item.name}</h2>
							<p>${item.singer}</p>
						</div>
					</div>
					<div class="playBtn">`
		if(localStorage.getItem(item.id)){
			html+=`<img class="playBtnXin" src="./images/xined.png" >`
		}else{
			html+=`<img class="playBtnXin" src="./images/xin.png" >`
		}
		html+=`<img class="playBtnPlay" src="./images/play1.png" >
				</div>
			</div>`
	})
	$(".playList").html($(".playList").html()+html)
}