$(function(){
//倒计时
	function timeBackward($hour,$min,$sec){
		var hour=parseInt($hour.val());
		var min=parseInt($min.val());
		var sec=parseInt($sec.val());
		clearInterval(timer);
		var timer=setInterval(function(){
			var lastTime=hour*60*60+min*60+sec-1;
			hour=Math.floor(lastTime/3600);
			min=Math.floor(lastTime/60)-hour*60;
			sec=lastTime-hour*3600-min*60;
			$hour.val( doubleDigit(hour) );
			$min.val( doubleDigit(min) );
			$sec.val( doubleDigit(sec) );
		},1000);
	}
//补零
	function doubleDigit(num){
		if (num>=0&&num<=9) {
			num='0'+num;
		}
		return num;
	}
//左移：父元素添加sonmove，移动元素添加sonmove+left/right+/top/dowm+偏移量(数字形式),定位必须用left或者top设置
	$('.sonmove').mouseenter(function(){
		var $son=$(this).find('[class*=sonmove]');
		$son.stop(true,true);
		var classname=$son.attr('class');
		var indexleft=classname.indexOf('sonmoveleft');
		var indexright=classname.indexOf('sonmoveright');
		var indextop=classname.indexOf('sonmovetop');
		var indexdown=classname.indexOf('sonmovedown');
		var unit,newplace;
		if(indexleft>=0){
			unit= parseInt( classname.substring(indexleft+11) );
			newplace=$son.position().left-unit;
			$son.animate({left:newplace});
		}else if(indexright>=0){
			unit= parseInt( classname.substring(indexright+12) ) *(-1);
			newplace=$son.position().left-unit;
			$son.animate({left:newplace});
		}else if(indextop>=0){
			unit= parseInt( classname.substring(indextop+10) );
			newplace=$son.position().top-unit;
			$son.animate({top:newplace});
		}else if(indexdown>=0){
			unit= parseInt( classname.substring(indexdown+11) ) *(-1);
			newplace=$son.position().top-unit;
			$son.animate({top:newplace});
		}
	}).mouseleave(function(){
		var $son=$(this).find('[class*=sonmove]');
		$son.stop(true,true);
		var classname=$son.attr('class');
		var indexleft=classname.indexOf('sonmoveleft');
		var indexright=classname.indexOf('sonmoveright');
		var indextop=classname.indexOf('sonmovetop');
		var indexdown=classname.indexOf('sonmovedown');
		var unit,newplace;
		if(indexleft>=0){
			unit= parseInt( classname.substring(indexleft+11) );
			newplace=$son.position().left+unit;
			$son.animate({left:newplace});
		}else if(indexright>=0){
			unit= parseInt( classname.substring(indexright+12) ) *(-1);
			newplace=$son.position().left+unit;
			$son.animate({left:newplace});
		}else if(indextop>=0){
			unit= parseInt( classname.substring(indextop+10) );
			newplace=$son.position().top+unit;
			$son.animate({top:newplace});
		}else if(indexdown>=0){
			unit= parseInt( classname.substring(indexdown+11) ) *(-1);
			newplace=$son.position().top+unit;
			$son.animate({top:newplace});
		}
	})
//左右切换图片块，要求HTML中最后一个单位跟第一个重复，totalWidth在CSS中要设置正确
	$('.switchbox').mouseenter(function(){
		var $switchBefore=$(this).find('.switchbefore');
		var $switchNext=$(this).find('.switchnext');
		var $switchList=$(this).find('.switchlist');
		var unitWidth=$(this).width()+8;//隔线处理
		var totalWidth=$switchList.width();
		var maxFlag=Math.round( totalWidth/unitWidth )-1;
		var oLeft=$switchList.position().left;
		var flag=Math.abs( Math.round( oLeft/unitWidth ) );
		$switchBefore.show();
		$switchNext.show();
		function nextFun(){
			flag++;
			if (flag>maxFlag) {
				$switchList.css('left',0);
				flag=1;
			}
			var nextLeft=flag*unitWidth*(-1);
			$switchList.stop(true,false).animate( {'left': nextLeft-20},
				function(){ $switchList.animate( { 'left': nextLeft }); }
			);
		}
		function beforeFun(){
			flag--;
			if (flag<0) {
				$switchList.css('left',-maxFlag*unitWidth);
				flag=maxFlag-1;
			}
			var nextLeft=flag*unitWidth*(-1);
			$switchList.stop(true,false).animate({ 'left': nextLeft+20 },
				function(){ $switchList.animate({ 'left': nextLeft }); }
			);
		}
		$switchNext.off('click').on('click',nextFun);
		$switchBefore.off('click').on('click',beforeFun);
	}).mouseleave(function(){
		$(this).find('.switchnext').hide();
		$(this).find('.switchbefore').hide();
	})
//图片轮播
	$('.bannerBox').each(function(){
		var $box=$(this);
		var $imgs=$box.find('.bannerImgBox').children();
		var $btns=$box.find('.bannerBtnBox').children();
		var $switchBox=$box.find('.bannerSwitchBox');
		var $next=$box.find('.bannerNext');
		var $before=$box.find('.bannerBefore');
		var maxFlag=$imgs.length-1;
		var timer=null;
		var flag=getFlag();
		var ifFous=true;
		$(window).blur(function(){
			ifFous=false;
		}).focus(function(){
			ifFous=true;
		})
		$imgs.eq(flag).show().siblings().hide();
		setChange(flag);
		function setChange(index){
			timer=setInterval(function(){
				if (ifFous) {
					index==maxFlag? index=0 : index++ ;
					setImg(index);
				}
			},3000);
		}
		function setImg(index){
			$imgs.eq(index).fadeIn('slow').siblings().fadeOut('slow');
			$btns.eq(index).addClass('on').siblings().removeClass('on');
		}
		function getFlag(){
			var index=$btns.filter('.on').index();
			return index;
		}
		$box.mouseenter(function(){
			clearInterval(timer);
			if ($switchBox.length!=0) { $switchBox.show(); }
				else{
					if ($next.length!=0) { $next.show(); }
					if ($before.length!=0) { $before.show(); }
				}
		}).mouseleave(function(){
			flag=getFlag();
			setChange(flag);
			if ($switchBox.length!=0) { $switchBox.hide() }
				else{
					if ($next.length!=0) { $next.hide(); }
					if ($before.length!=0) { $before.hide(); }
				}
		})
		if ($next.length!=0) {
			var nextTimer=null;
			$next.click(function(){
				clearTimeout(nextTimer);
				nextTimer=setTimeout(function(){
					flag=getFlag();
					flag==maxFlag? flag=0 : flag++ ;
					setImg(flag);
				},100);
			})
		}
		if ($before.length!=0) {
			var beforeTimer=null;
			$before.click(function(){
				clearTimeout(beforeTimer);
				beforeTimer=setTimeout(function(){
					flag=getFlag();
					flag==0? flag=maxFlag : flag-- ;
					setImg(flag);
				},50);
			})
		}
		var btnTimer=null;
		$btns.mouseover(function(){
			clearTimeout(btnTimer);
			var $btnThis=$(this);
			btnTimer=setTimeout(function(){
				$btnThis.addClass('on').siblings().removeClass('on');
				flag=$btnThis.index();
				$imgs.eq(flag).fadeIn('slow').siblings().fadeOut('slow');
			},100);
		})
	})
})