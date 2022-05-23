//引入音乐
import ComeThrough from "url:../music/ComeThrough.mp3"
import wyd from "url:../music/wyd.mp3"
import California from "url:../music/California.mp3"
import EverySummertime from "url:../music/EverySummertime.mp3"
import Ride from "url:../music/Ride.mp3"
import PalmSprings from "url:../music/PalmSprings.mp3"

//音乐信息列表
let musicList=[{
	id:"1838886738",
	name:'Come Through ',
	singer:'H.E.R. / Chris Brown-Come Through',
	url:ComeThrough,
	img:require('../images/ComeThrough.jpg'),
},{
	id:"1892632507",
	name:'wyd?',
	singer:'Larissa Lambert-wyd?',
	url:wyd,
	img: require('../images/wyd.jpg'),
},{
	id:"1861119567",
	name:'California',
	singer:'88rising / Rich Brian / NIKI / 王嘉尔 / Warren Hue',
	url:California,
	img: require('../images/California.jpg'),
},{
	id:"1921892053",
	name:'EverySummertime-NIKI ',
	singer:'i8-NPCのABC',
	url:EverySummertime,
	img: require('../images/EverySummertime.jpg'),
},{
	id:"1877751193",
	name:'Ride',
	singer:'HYBS-Ride',
	url:Ride,
	img: require('../images/Ride.jpg'),
},{
	id:"1480251493",
	name:'Palm Springs (the way you made me feel)',
	singer:'Virginia To Vegas',
	url:PalmSprings,
	img: require('../images/PalmSprings.jpg'),
}]


//当前播放音乐索引
let musicIndex=0;
//当前播放音乐信息
let nowMusic={};
//音乐已播放时间，音乐总播放时间
let time=0,duration=0;
let playType=1; //1顺序播放，2随机播放，3单曲循环播放
// 播放类型icon图片列表
let typeList=[
	require('../images/sx.png'),
	require('../images/sj.png'),
	require('../images/dq.png'),
]
//音乐播放计时器
let timer=null;
//搜索的音乐列表
let searchMusic=[];
//最开始渲染音乐card
renderMinMusic();
//渲染音乐列表
renderPlayList(musicList);
//最开始渲染音乐相关内容函数，默认第一首暂停播放
function renderMinMusic(){
	nowMusic=musicList[musicIndex];
	$(".musicName").html(nowMusic.name);
	$(".musicSinger").html(nowMusic.singer);
	$(".musicAlbum").attr('src',nowMusic.img)
	if(localStorage.getItem(nowMusic.id)){
		$(".musicMinLikeBtn").attr('src',require('../images/Like.png'))
	}else{
		$(".musicMinLikeBtn").attr('src',require("../images/noLike.png"))
	}
	$("#music").attr('src',nowMusic.url);
	$("#music")[0].pause()
	$(".nowPre").css('width',0)
	$(".preDot").css('left',0)
	$(".suiji").attr('src',typeList[playType-1])
}
//播放音乐
function playMusic(){
	if(type!="mobile"){
		$(".musicStopBox").css("display","none")
		$(".musicStartBox").css("display","block");
	}
	$("#music")[0].play();
	$(".pauseBig").attr('src',require('../images/pauseBig.png'));
	$(".musicMinBtn").attr('src',require('../images/pauseMin.png'));
	setTimeout(()=>{
		duration = $("#music")[0].duration;
		console.log(duration)
		musicTimeInterval();
	},200)
	if(taskTimer || stopTimer){
		$(".mobileMenuBox").addClass("mobileMenuBoxHide")
		$(".mobileBottomBox").css("display","flex");
		$(".mobileBottomBox .mobileMusicBox").css("display","flex");
	}else{
		$(".onlyMusicBox").css("display","flex");
		$(".mobileMusicMaxBox").css("display","none")
	}
}
//暂停音乐
function pauseMusic(){
	if(type!="mobile"){
		$(".musicStopBox").css("display","block")
		$(".musicStartBox").css("display","none");
	}
	$("#music")[0].pause();
	$(".pauseBig").attr('src',require('../images/playBig.png'));
	$(".musicMinBtn").attr('src',require('../images/playMin.png'));
	clearInterval(timer)
}
//音乐计时函数
function musicTimeInterval(){
	timer && clearInterval(timer)
	let percentage = time/duration*100+'%';
	$(".musicPre .nowPre").css('width',percentage)
	$(".musicPre .preDot").css('left',percentage)
	// console.log(time,duration,percentage)
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
		$(".musicPre .nowPre").css('width',percentage)
		$(".musicPre .preDot").css('left',percentage)
		// console.log(time,duration,percentage)
	},1000)
}
//下一首
function nextMusic(){
	time=0;
	// console.log(musicIndex)
	if(musicIndex == musicList.length-1){
		musicIndex = 0;
	}else{
		musicIndex++;
	}
	renderMinMusic();
	playMusic();
}
//上一首
function preMusic(){
	time=0;
	if(musicIndex == 0){
		musicIndex = musicList.length-1;
	}else{
		musicIndex--;
	}
	renderMinMusic();
	playMusic();
}
//随即一首
function randomMusic(){
	time=0;
	duration=0;
	musicIndex = parseInt(Math.random()*musicList.length)+1;
	renderMinMusic();
}
//PC端下方小音乐暂停播放card的播放按钮
$(".musicMinBtn").click(()=>{
	if($("#music")[0].paused){
		playMusic();
	}else{
		pauseMusic();
	}
})
//PC端下方小音乐开始播放card的暂停播放按钮
$(".pauseBig").click(function(){
	if($("#music")[0].paused){
		if(type=="mobile"){
			playMusic();
		}else{
			playMusic();
		}
	}else{
		if(type=="mobile"){
			pauseMusic();
		}else{
			pauseMusic();
		}
	}
})
//音乐card的收藏小心心按钮
$(".musicMinLikeBtn").click(()=>{
	if(localStorage.getItem(nowMusic.id)){
		localStorage.removeItem(nowMusic.id);
		$(".musicMinLikeBtn").attr('src',require('../images/noLike.png'))
	}else{
		localStorage.setItem(nowMusic.id,JSON.stringify(nowMusic));
		$(".musicMinLikeBtn").attr('src',require('../images/Like.png'))
	}
	renderPlayList(musicList);
})
//播放类型切换，顺序，随机，单曲
$(".suiji").click(()=>{
	if(playType==3){
		playType=1;
	}else{
		playType++;
	}
	$(".suiji").attr('src',typeList[playType-1])
})
//上一首点击按钮
$(".previous").click(()=>{
	preMusic();
})
//下一首点击按钮
$(".next").click(()=>{
	nextMusic();
})
//PC端右侧列表Music点击
$(".musicBox").click(function(){
	$(".taskBox").removeClass("active")
	$(this).addClass("active")
	$(".pcMusicMaxBox").css("display","block");
	$(".musicStartBox").css("display","none");
	$(".onlyMusicBox").css("display","none");
	if(taskTimer || stopTimer){
		$(".mobileMenuBox").addClass("mobileMenuBoxHide")
		$(".mobileBottomBox").css("display","flex");
		$(".mobileBottomBox .mobileMusicBox").css("display","flex");
	}else{
		$(".mobileMenu div").eq(0).addClass("active");
		$(".mobileMusicMaxBox").css("display","block");
	}
})
//音乐card的close按钮点击操作
$(".close").click(function(){
	let clock=$(this).attr("clock");
	if(clock=='clock'){
		return;
	}
	$(".musicMaxBox").css("display","none");
	$(".mobileMenu div").removeClass("active");
	$(".mobileMenuBox").removeClass("mobileMenuBoxHide")
	$(".taskBox").removeClass("active")
	$(".onlyTaskBox").addClass("active")
	if($("#music")[0].paused){
		$(".musicStopBox").css("display","block")
		$(".musicStartBox").css("display","none");
	}else{
		$(".musicStopBox").css("display","none")
		$(".musicStartBox").css("display","block");
	}
})
//监听音乐搜索框输入
$(".musicMaxBox .searchBox input").on('input',function(e){
	searchMusic=[];
	let text = $(this).val();
	// console.log(text)
	musicList.forEach((item,index)=>{
		if(item.name.indexOf(text)!=-1){
			searchMusic.push(item)
		}
	})
	renderPlayList(searchMusic)
})
//PC端右侧上面搜索框输入内容
let text = "";
//监听PC端右侧上面搜索框输入内容
$(".rightTopBox .searchBox input").on('input',function(e){
	text = $(this).val();
	// console.log(text)
})
//监听enter按键，按下enter后根据PC端右侧上面搜索框输入内容搜索card
document.onkeydown = function(event){
	if(event.keyCode == 13){
		if(text){
			$(".screenBox").css("display","flex")
		}
		let cards = $(".card");
		for (let i = 0; i < cards.length; i++) {
			let card = cards.eq(i);
			let tags = card.find(".tagBox p");
			let searched=false;
			for (let j = 0; j < tags.length; j++) {
				let tag = tags.eq(j);
				console.log(tag.html().indexOf(text))
				if(tag.html().indexOf(text) != -1){
					if(text){
						searched=true;
						tag.addClass("searched")
					}else{
						searched=false;
						tag.removeClass("searched")
						card.css("display",'block')
					}
				}else{
					tag.removeClass("searched")
				}
			}
			if(text){
				if(searched){
					card.css("display",'block')
				}else{
					card.css("display",'none')
				}
			}else{
				$(".screenBox").css("display","none")
			}
		}
		$(".notStartBox .num").html($(".notStartBox .card:visible").length)
		$(".progressBox .num").html(($(".progressBox .card:visible").length))
		$(".doneBox .num").html($(".doneBox .card:visible").length)
	}
}
//音乐列表渲染函数
function renderPlayList(musicList){
	let html="";
	if(musicList.length==0){
		html+=`<h2 class="empty">Music is empty</h2>`;
		$(".playList").html(html)
		return;
	}
	musicList.forEach((item,index)=>{
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
			html+=`<img class="playBtnXin" id="${index}" src="${require("../images/Like.png")}" >`
		}else{
			html+=`<img class="playBtnXin" id="${index}" src="${require("../images/noLike.png")}" >`
		}
		html+=`<img class="playBtnPlay" id="${index}" src="${require("../images/playMin.png")}" >
				</div>
			</div>`
	})
	$(".playList").html(html)
	//音乐列表内收藏心心点击
	$(".playBtnXin").click(function(){
		let index = $(this).attr("id");
		let music = musicList[index]
		if(localStorage.getItem(music.id)){
			localStorage.removeItem(music.id);
			$(this).attr("src",require("../images/noLike.png"))
			if(nowMusic.id == music.id){
				$(".musicMinLikeBtn").attr("src",require("../images/noLike.png"))
			}
		}else{
			localStorage.setItem(music.id,JSON.stringify(music));
			$(this).attr("src",require("../images/Like.png"))
			if(nowMusic.id == music.id){
				$(".musicMinLikeBtn").attr("src",require("../images/Like.png"))
			}
		}
	})
	//音乐列表内播放按钮点击
	$(".playBtnPlay").click(function(){
		let index = $(this).attr("id");
		musicIndex=index;
		renderMinMusic();
		playMusic();
	})
}