// let img = require("./images/ComeThrough.jpg")
// import noLike from "url:../images/noLike.png"
import ComeThrough from "url:../music/ComeThrough.mp3"
import wyd from "url:../music/wyd.mp3"
import California from "url:../music/California.mp3"
import EverySummertime from "url:../music/EverySummertime.mp3"
import Ride from "url:../music/Ride.mp3"
import PalmSprings from "url:../music/PalmSprings.mp3"

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


let musicIndex=0;
let nowMusic={};
let time=0,duration=0;
let playType=1; //1顺序播放，2随机播放，3循环播放
let timer=null;
let searchMusic=[];
renderMinMusic();
renderPlayList(musicList);
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
}
function playMusic(){
	$(".musicStopBox").css("display","none")
	$(".musicStartBox").css("display","block");
	$("#music")[0].play();
	$(".pauseBig").attr('src',require('../images/pauseBig.png'));
	$(".musicMinBtn").attr('src',require('../images/pauseMin.png'));
	setTimeout(()=>{
		duration = $("#music")[0].duration;
		console.log(duration)
		musicTimeInterval();
	},200)
}
function pauseMusic(){
	$(".musicStopBox").css("display","block")
	$(".musicStartBox").css("display","none");
	$("#music")[0].pause();
	$(".pauseBig").attr('src',require('../images/playBig.png'));
	$(".musicMinBtn").attr('src',require('../images/playMin.png'));
	clearInterval(timer)
}
function musicTimeInterval(){
	timer && clearInterval(timer)
	let percentage = time/duration*100+'%';
	$(".nowPre").css('width',percentage)
	$(".preDot").css('left',percentage)
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
		$(".nowPre").css('width',percentage)
		$(".preDot").css('left',percentage)
		// console.log(time,duration,percentage)
	},1000)
}
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
		pauseMusic();
	}
})
$(".pauseBig").click(()=>{
	console.log($("#music"))
	if($("#music")[0].paused){
		playMusic();
	}else{
		pauseMusic();
	}
})
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
$(".previous").click(()=>{
	preMusic();
})
$(".next").click(()=>{
	nextMusic();
})
$(".musicAlbum").click(()=>{
	$(".musicStopBox").css("display","none")
	$(".musicStartBox").css("display","none");
	$(".musicMaxBox").css("display","block");
})
$(".close").click(()=>{
	pauseMusic();
	$(".musicStopBox").css("display","block")
	$(".musicStartBox").css("display","none");
	$(".musicMaxBox").css("display","none");
})
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
let text = "";
$(".rightTopBox .searchBox input").on('input',function(e){
	text = $(this).val();
	console.log(text)
})
document.onkeydown = function(event){
	console.log(event);
	// if(!text){
	// 	$(".tagBox p").removeClass("searched");
	// 	$(".notStartBox .num").html($(".notStartBox .card:visible").length)
	// 	$(".progressBox .num").html(($(".progressBox .card:visible").length))
	// 	$(".doneBox .num").html($(".doneBox .card:visible").length)
	// 	return;
	// }
	if(event.keyCode == 13){
		let cards = $(".card");
		for (let i = 0; i < cards.length; i++) {
			let card = cards.eq(i);
			let tags = card.find(".tagBox p");
			let searched=false;
			for (let j = 0; j < tags.length; j++) {
				let tag = tags.eq(j);
				if(tag.html().indexOf(text) != -1){
					if(text){
						searched=true;
						tag.addClass("searched")
					}else{
						searched=false;
						tag.removeClass("searched")
					}
				}else{
					tag.removeClass("searched")
				}
			}
			if(searched){
				card.css("display",'block')
			}else{
				card.css("display",'none')
			}
		}
		$(".notStartBox .num").html($(".notStartBox .card:visible").length)
		$(".progressBox .num").html(($(".progressBox .card:visible").length))
		$(".doneBox .num").html($(".doneBox .card:visible").length)
	}
}
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
	$(".playBtnPlay").click(function(){
		let index = $(this).attr("id");
		musicIndex=index;
		renderMinMusic();
		playMusic();
	})
}