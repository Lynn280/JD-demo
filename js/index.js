$(function(){
	//地点栏
	var $location=$('.location');
	var $locationList=$('.location-list');
	$location.mouseover(function(){
		$location.addClass('location-h');
		$locationList.show();
	}).mouseout(function(){
		$location.removeClass('location-h');
		$locationList.hide();
	})
	$locationList.mouseover(function(){
		$location.trigger('mouseover');
	}).mouseout(function(){
		$location.trigger('mouseout');
	})
	$('.location-list>li>a').mouseover(function(){
		if($(this).attr('class')!='selected'){
			$(this).addClass('hover');
		}
	}).mouseout(function(){
		$(this).removeClass('hover');
	})
	var $locationItem=$('.location-list>li>a');
	$locationItem.click(function(){
		$locationItem.removeClass('selected');
		$(this).attr('class','selected');
		var lName=$(this).text();
		$location.text(lName);
		$location.trigger('mouseout');
	})
	$locationItem.eq(18).trigger('click');
	//顶部右栏
	$('.topBar-item-dd').mouseover(function(){
		$(this).addClass('topBar-item-hover').siblings().show();
	}).mouseout(function(){
		$(this).removeClass('topBar-item-hover').siblings().hide();
	})
	$('.topBar-item-dt').mouseover(function(){
		$(this).siblings().trigger('mouseover');
	}).mouseout(function(){
		$(this).siblings().trigger('mouseout');
	})
	var $myphone=$('<p class="myphone">林琳：1511-8830-280</p>');
	$('.contact-me').mouseenter(function(){
		$(this).width(287).height(260).append($myphone).find('img').attr('src','img/my-wechat-b.png');
	}).mouseleave(function(){
		$(this).width(66).height(57).find('img').attr('src','img/my-wechat-s.png');
		$myphone.detach();
	})
	//搜索框文字
	var searchTips=new Array('暗影游戏本','格兰仕空调','魅族手机','闪迪U盘','抽奖赢空调','沙发大降价','海尔冰箱','笔记本硬盘','苹果笔记本','格力变频空调');
	var searchTimer=null;
	var searchI=0;
	function hasPlaceholderSupport(){
		var attr='placeholder';
		var input=document.createElement('input');
		return attr in input;
	}
	var $headerSearch=$('.header-search-input>input');
	var supportPlaceHolder = hasPlaceholderSupport();
	$headerSearch.focus(function(){
		$headerSearch.attr('placeholder','');
		clearInterval(searchTimer);
	}).blur(function(){
		$headerSearch.attr('placeholder',searchTips[searchI]);
		searchTimer=setInterval(function(){
			searchI++;
			if (searchI==searchTips.length) { searchI=0; }
			$headerSearch.attr('placeholder',searchTips[searchI]);
		},5000);
	}).blur();
	if( ! supportPlaceHolder ){
		$headerSearch.focus(function(){
			$headerSearch.removeClass('blurclass');
			var val=$headerSearch.val();
			if( val == searchTips[searchI] || val== searchTips[searchI-1] ){
				$headerSearch.val('');
			}
		}).blur(function(){
			var val=$headerSearch.val();
			if( val == searchTips[searchI] || val == ''){
				$headerSearch.addClass('blurclass');
				$headerSearch.val(searchTips[searchI]);
				searchTimer=setInterval(function(){
					$headerSearch.val(searchTips[searchI]);
				},5000);
			}
		}).blur();
	}
	//购物车
	$('.header-shopcart').hover(function(){
		$('.header-shopcart-d').show();
	},function(){
		$('.header-shopcart-d').hide();
	})
	//目录
	var $navSubcate=$('.nav-subcate');
	$('.nav-cate>li').mouseover(function(){
		$navSubcate.eq( $(this).index() ).show().siblings().hide();
	})
	$('.nav-col1').mouseleave(function(){
		$navSubcate.hide();
	})
	//nav col3 头像
	$('.nav-user-portrait').css('background-image','url(img/nav-head.jpg)');
	//促销/公告切换
	var $navInfoMsg=$('.nav-info-msg>div');
	var $navInfoNameSelect=$('.nav-info-name-select');
	$('.nav-info-promote').mouseover(function(){
		$navInfoMsg.eq(0).show().siblings().hide();
		$navInfoNameSelect.animate({left:'-2px'},200);
	}).trigger('mouseover');
	$('.nav-info-notice').mouseover(function(){
		$navInfoMsg.eq(1).show().siblings().hide();
		$navInfoNameSelect.animate({left:'50px'},200);
	})
	//秒杀倒计时赋值
	var $seckillH=$('.seckill_hour');
	var $seckillM=$('.seckill_min');
	var $seckillS=$('.seckill_sec');
	$seckillH.text('02');
	$seckillM.text('48');
	$seckillS.text('26');
	timeBackward($seckillH,$seckillM,$seckillS);
	//秒杀图片切换
	var $seckillContentBox=$('.seckill-content-left');
	var $seckillLeft=$('.seckill-btn-left');
	var $seckillRight=$('.seckill-btn-right');
	$seckillContentBox.mouseover(function(){
		$seckillLeft.show();
		$seckillRight.show();
	}).mouseout(function(){
		$seckillLeft.hide();
		$seckillRight.hide();
	})
	var $seckillContentList=$('.seckill-content-list');
	var seckillMaxNum=Math.round( $seckillContentList.width()/$seckillContentBox.width() )-1;
	var seckillListLeft=0;
	var seckillOrigLeft=$seckillContentList.position().left;
	var seckillListMinLeft=-seckillMaxNum*1000;
	var seckillFlag=0;
	$seckillLeft.click(function(){
		seckillFlag--;
		seckillFlag= seckillFlag<0 ? seckillMaxNum : seckillFlag ;
		$seckillContentList.animate( {left : -seckillFlag*1000 } );
	})
	$seckillRight.click(function(){
		seckillFlag++;
		seckillFlag= seckillFlag>seckillMaxNum? 0 : seckillFlag ;
		$seckillContentList.animate( {left : -seckillFlag*1000 } );
	})
	//排行榜
	var $chartName=$('.chart-name');
	var $chartTabList=$('.chart-tab-list');
	var $chartTabLine=$('.chart-tab-line');
	$chartName.mouseover(function(){
		var chartIndex=$chartName.index($(this));
		$chartTabLine.stop(true,false).animate({left:17+chartIndex*74},'fast');
		$chartTabList.eq( chartIndex ).show().siblings().hide();
	})
	$chartName.eq(0).trigger('mouseover');
	//京东直播
	$('.video-box').mouseout(function(){
		var _this=$(this);
		_this.find('.video-left').show();
		_this.find('.video-right').show();
	})
	//联系我吧
	$('.phone-me').mouseenter(function(){
		$('.phone-num').animate({left:-96});
	}).mouseleave(function(){
		$('.phone-num').stop(true,false).animate({left:40});
	})
	//回到顶部
	$('.to-top').click(function(){
		$('body,html').stop(true,false).animate({scrollTop:0});
	})
	//左侧栏、没逛够
	var $leftBar=$('.left-bar');
	var $leftBarLink=$('[data-link=left-bar]');
	var $leftBarItems=$('.left-bar-item');
	var leftBarTop=$leftBar.position().top;
	var firstLinkTop=$leftBarLink.eq(0).offset().top;
	var windowHeight=$(window).height();
	$(window).scroll(function(){
		var wScrollTop=$(window).scrollTop();
		if ( leftBarTop >= (firstLinkTop-wScrollTop-200) ) {
			$leftBar.css('visibility','visible');
			$leftBarLink.each(function(){
				var myTop=$(this).offset().top-wScrollTop;
				var $myLink=$leftBarItems.filter('[href=\"#'+$(this).attr('id')+'\"]');
				if ( myTop <= $myLink.position().top+leftBarTop+200 ) {
					$leftBarItems.removeClass('on');
					$myLink.addClass('on');
				}
			});
		}else{
			$leftBar.css('visibility','hidden');
		}
		$('.stroll-img').each(function(){
			var $othis=$(this);
			if ( $othis.offset().top-wScrollTop <= windowHeight ) {
				$othis.attr( 'src', $othis.attr('data-src'));
			}
		})
	})
})
//倒计时
function timeBackward($hour,$min,$sec){
	var hour=parseInt($hour.text());
	var min=parseInt($min.text());
	var sec=parseInt($sec.text());
	clearInterval(timer);
	var timer=setInterval(function(){
		var lastTime=hour*60*60+min*60+sec-1;
		hour=Math.floor(lastTime/3600);
		min=Math.floor(lastTime/60)-hour*60;
		sec=lastTime-hour*3600-min*60;
		$hour.text( doubleDigit(hour) );
		$min.text( doubleDigit(min) );
		$sec.text( doubleDigit(sec) );
	},1000);
}
//补零
function doubleDigit(num){
	if (num>=0&&num<=9) {
		num='0'+num;
	}
	return num;
}