function pricker (dom, data, li_h) {
	this.checkedDom = dom;
	this.prickerDom = dom;
	this.data = data || [0,1000,2000,3000,4000,5000,6000,8000,9000,10000,15000,20000,25000,30000,35000,40000,45000,50000,55000,60000,65000,70000];
	this.li_h = li_h || 20;
	this.showTime();
}
pricker.prototype.showTime = function () {
	var data = this.data;
	var _this = this.checkedDom;
	var dom = this.prickerDom;
	var init_value = 0;
	var init_translate = _this.getAttribute('data-translate');
	if (init_translate) {
		init_value = init_translate
	} else {
		init_value = 0;
	}
	var li_info = [];//储存li的dom节点
	var data_value = _this.getAttribute('data-value');
	if (!data_value) {
		data_value = data[0];
	}
	var gold_i = 0;
	var li_h = this.li_h;
	for (var j in data) {
		var rtx = j*(-li_h);
		if (data_value == data[j]) {
			gold_i = j;
			init_value = -rtx;
			li_info.push('<li class="li-height visible" style="transform: rotateX('+rtx+'deg) translateZ(100px);-webkit-transform: rotateX('+rtx+'deg) translateZ(100px);">'+data[j]+'</li>');
			continue;
		}
		li_info.push('<li class="visible" style="transform: rotateX('+rtx+'deg) translateZ(100px);-webkit-transform: rotateX('+rtx+'deg) translateZ(100px);">'+data[j]+'</li>');
	}
	for(var l in data) {
		if (l < (gold_i-3) || l > (parseInt(gold_i)+3)) {

			li_info[l] = '<li class="li-height visible hide" style="transform: rotateX('+rtx+'deg) translateZ(100px);-webkit-transform: rotateX('+(-li_h)*l+'deg) translateZ(100px);">'+data[l]+'</li>'
		}
	}
	var dom_text = '<div class="time-view" style="height:100%;">'
						+'<div class="time-picker" style="position:absolute;top:50%;left:0;width:100%;height:36px;transform:translateY(-50%);" data-value="0">'
							+'<div class="time-select"></div>'
							+'<ul class="time-list" data-value='+init_value+' style="transform: rotateX('+init_value+'deg);">'
							+li_info.join('')
							+'</ul>'
						+'</div>'
					+'</div>';
	dom.innerHTML = dom_text;
	this.setTime();
}
pricker.prototype.setTime = function () {
	var _that = this;
	var parent = this.prickerDom;
	var _this = this.checkedDom;
	var dom = parent.getElementsByClassName('time-picker')[0];
	var first_y = 0;			//点击时在屏幕y轴的坐标
	var data_value = 0;			//初始旋转角度为0
	var dom_bool = false;		//是否按下
	var stopDown = true; 		//是否停止滚动
	var li_h = this.li_h;		//旋转的角度间隔为20deg
	var lis = parent.getElementsByClassName('time-list')[0].getElementsByTagName('li');
	var ul_name = parent.getElementsByClassName('time-list')[0];
	var firstmoveTime = 0;//按下是的时间
	var lastmoveTime = 0;//移动的最后一帧的时间
	var lastY = 0;//移动的最后一帧坐标
	var golb_speed = 0;//移动的平均速度
	dom.addEventListener('touchstart',function(event){
		dom_bool = true;
		data_value = ul_name.getAttribute('data-value');
		first_y = event.touches[0].clientY;//存储按下时的Y轴坐标
		firstmoveTime = event.timeStamp;
		ul_name.style.transitionDuration = '0s';
		ul_name.style.webkitTransitionDuration = '0s';
	});
	document.addEventListener('touchmove',function(event){
		if (dom_bool && stopDown) {
			removeClass();
			lastmoveTime = event.timeStamp;
			var Y = event.touches[0].clientY;//存储移动时的Y轴坐标
			lastY = Y;
			var move_Y = parseInt(first_y - Y) + parseInt(data_value);
			if (move_Y<-li_h*2) {
				move_Y = -li_h*2;
			};
			if (move_Y>(lis.length+1)*li_h) {
				move_Y = (lis.length+1)*li_h
			};
			var i = Math.floor(move_Y/li_h);
			var j = move_Y%li_h;
			if (i >= lis.length-1) {
				i = lis.length-1;
			} else if ( j > li_h/2) {
				i = i+1
			}
			_that.showDom (i);
			addClass (i);
			ul_name.style.transform = 'rotateX(' +move_Y+ 'deg)';
			ul_name.style.webkitTransform = 'rotateX(' +move_Y+ 'deg)';
			ul_name.setAttribute('data-value', move_Y);
			event.preventDefault();
		}
	});
	document.addEventListener('touchend',function(e){
		if(dom_bool && stopDown){
			dom_bool = false;
			stopDown = false
			var speed = (lastY - first_y)/(lastmoveTime - firstmoveTime);//平均速度
			if (Math.abs(speed) <= 0.4) {//根据不同的平均速度设置点触结束后的速度
                golb_speed = (speed < 0 ? -0.08 : 0.08);
            } else {
                if (Math.abs(speed) <= 0.6) {
                    golb_speed = (speed < 0 ? -0.16 : 0.16);
                } else {
                    golb_speed = speed / 2;
                }
            }
			rollGear(e)
		}
	});
	function addClass (i) {
		if (lis[i]) {
			lis[i].classList.add('li-height');
		}
	}
	function removeClass () {
		for (var i = 0; i < lis.length; i++) {
			lis[i].classList.remove('li-height');
		}
	}
	var t = 0;
	function rollGear (e) {
		var d = 0;
		var text = '';
		function aa() {
			var data_value = parseInt(ul_name.getAttribute('data-value'));
			var speed = golb_speed * Math.exp(-0.03 * d);			//e的-0.03*d次幂，速度不断减小
			data_value += speed*-li_h;								//根据速度设置旋转量，随着速度的递减，旋转角度减小并停止
			removeClass();
			var i = Math.floor(data_value/li_h);					//根据（旋转角度/初始旋转角度）获取第几个元素选中
			addClass(i);
			if (i>=(lis.length+2)) {
				speed = 0;
			}
			if(i<=-2){
				speed = 0;
			}
			if (Math.abs(speed) > 0.1) {
				requestAnimationFrame(aa);
            } else {
            	stopDown = true;
                ul_name.style.transitionDuration = '0.2s';
                ul_name.style.webkitTransitionDuration = '0.2s';
				if (i >= lis.length-1) {
					i = lis.length-1;
					removeClass();
					lis[lis.length-1].classList.add('li-height');
					data_value = li_h*(lis.length - 1);
					text = lis[lis.length-1].innerHTML;
				} else {
					removeClass();
					if(i<0){
						i = 0;
						lis[i].classList.add('li-height');
						text = lis[i].innerHTML;
						data_value = li_h*i;
					} else if((data_value - li_h*i) < li_h/2){
						lis[i].classList.add('li-height');
						text = lis[i].innerHTML;
						data_value = li_h*i;
					} else {
						lis[i+1].classList.add('li-height');
						text = lis[i+1].innerHTML;
						data_value = li_h*(i+1);
						i = i+1;
					}
				}
            }
            _that.showDom(i);
            _this.setAttribute('data-value', text);
			ul_name.style.transform = 'rotateX(' +data_value+ 'deg)';
			ul_name.style.webkitTransform = 'rotateX(' +data_value+ 'deg)';
			ul_name.setAttribute('data-value', data_value);
			d++;
		}
		requestAnimationFrame(aa);
	}
}
pricker.prototype.showDom = function (i) {
	var parent = this.prickerDom;
	var lis = parent.getElementsByClassName('time-list')[0].getElementsByTagName('li');
	for (var k = 0; k < lis.length; k++) {
		if (k >= (i-3) && k <= (i+3)) {
			lis[k].classList.remove('hide');
		} else {
			lis[k].classList.add('hide');
		}
	}
}
