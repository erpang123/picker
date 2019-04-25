(function () {
  // 获取所有字段元素，绑定事件
  var b = document.getElementsByClassName('check-keyword');
  var text,top,left;
  if (b.length > 0) {
    for (var i = 0; i < b.length; i++) {
      b[i].onclick=(function (i) {
        return function () {
          text = b[i].innerText
          var offDom = b[i]
          top = 0
          // 获取节点相对于浏览器边界的距离
          while (offDom.offsetTop > 0) {
            top += offDom.offsetTop
            offDom = offDom.offsetParent
          }
          top = top + b[i].offsetHeight + 10
          // 判断是否出现换行
          left = b[i].offsetLeft + b[i].offsetWidth / 2
          if (b[i].offsetWidth + b[i].offsetLeft > window.screen.availWidth) {
            left = 8
          }
          // 清除选中样式
          for (var j = 0; j < b.length; j++){
            b[j].classList.remove('checkText')
          }
          // 设置选中的样式
          b[i].classList.add('checkText')
          createHtml('指由保险公司经办的以特定重大疾病，如恶性肿瘤、心肌梗死、脑溢血等为保险对象，当被保人患有上述疾病时，由保险公司根据保险合。')
        }
      })(i)
    }
  }
  // 创建字段详情弹框
  function createHtml (context) {
    var oldDom = document.getElementById('checkbox')
    var newDom
    var html = '<div class="the-t" style="left: ' + left + 'px"></div>' + 
                '<h5>' + text + '<a id="box-close" class="close-btn"></a></h5>' + 
                '<div class="des-info">' + 
                  context + 
                '</div>' + 
                '<div class="more-info">' + 
                  '词汇详情' + 
                  '<i class="next-icon"></i>' + 
                '</div>'
    if (oldDom) {
      newDom = oldDom
      newDom.style.top = top + 'px'
    } else {
      var dom = document.createElement('div');
      dom.id = 'checkbox'
      dom.className = 'checkbox'
      dom.style.top = top + 'px'
      newDom = dom
    }
    newDom.innerHTML = html
    document.body.appendChild(newDom)
    document.getElementById('box-close').onclick = function () {
      for (var i = 0; i < b.length; i++){
        b[i].classList.remove('checkText')
      }
      document.body.removeChild(newDom)
    }
  }
  // 无评论
  function nocomment () {
    var html =  '<div class="no-info"><img src="https://www.91duobaoyu.com/res/src/images/app-to-c/pages-webView-index/no-info.png"/><p>暂时没有评论哦，赶快来抢沙发吧</p></div>';
    var dom = document.createElement('div');
    dom.innerHTML = html;
    dom.className = 'comment';
    document.body.appendChild(dom);
  }
  // 有评论
  function createCommentList () {
    var replyList = [{
      name: '图图',
      zanMath: 2,
      imgUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1062675657,2502206893&fm=26&gp=0.jpg',
      content: '感谢保鱼君！说实话，关注有一阵子了，年前母亲患癌去世，才猛然感受到生命的脆弱！看了您很多的文章，着实有用！',
      replyList: [{
        name: '保鱼君',
        content: '感谢您的支持，我们会继续为你们产出精选文章'
      }, {
        name: '保鱼君',
        content: '感谢您的支持，我们会继续为你们产出精选文章'
      }]
    }, {
      name: '图图',
      zanMath: 0,
      imgUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1062675657,2502206893&fm=26&gp=0.jpg',
      content: '感谢保鱼君！说实话，关注有一阵子了，年前母亲患癌去世，才猛然感受到生命的脆弱！看了您很多的文章，着实有用！',
      replyList: []
    }]
    var html =  '<h6>精选留言·40</h6><div class="info-lists">'
    replyList.forEach(function (el) {
      html = html + '<div class="info-list">' + 
                      '<div class="user-info">' + 
                        '<div class="user-head">' + 
                          '<img class="head-img" src="'+ el.imgUrl +'"/>' + 
                          '<span>' + el.name + '</span>' + 
                        '</div>'
      if (el.zanMath > 0) {
        html = html + '<div class="user-zan zan-active">' + el.zanMath + '</div>' 
      } else {
        html = html + '<div class="user-zan zan-default"></div>' 
      }
      html = html + '</div>' + 
                    '<div class="com-info">' + el.content + '</div>' + 
                    '<div class="reply-lists">'
      el.replyList.forEach(function(obj) {
        html = html + '<div class="reply-list"><span class="name">'+ obj.name +'回复：</span><span>' + obj.content + '</span></div>'
      })
      html = html + '</div></div>';
    })
    var dom = document.createElement('div');
    dom.innerHTML = html;
    dom.className = 'comment comment-info';
    document.body.appendChild(dom);
    // 点赞功能
    var zanDoms = document.getElementsByClassName('user-zan')
    if (zanDoms.length > 0) {
      for(var zI = 0; zI < zanDoms.length; zI++) {
        zanDoms[zI].onclick = (function (zI) {
          return function () {
            var oldZan = parseInt(event.target.innerText)
            if (oldZan > 0) {
              event.target.innerText = oldZan + 1
            } else {
              event.target.classList.remove('zan-default')
              event.target.classList.add('zan-active')
              event.target.innerText = 1
            }
          }
        })(zI)
      }
    }
  }
  // 创建留言区域
  function createMessageArea() {
    var html = '<div class="reply-box"><div id="reply-in" class="reply-input"><input type="text" disabled placeholder="给我们留言以便互相交流哦"/></div><div class="share-icon">分享</div></div>' + 
               '<div id="messMask" class="messMask"></div><div id="messArea" class="messArea"><h6>写留言<a id="t-close" class="close-btn"></a></h6>' + 
               '<div class="mess-textarea"><textarea id="mes-textarea" placeholder="留言将由保鱼君筛选后显示，对所有人可见"></textarea></div>' + 
               '<a class="send-btn">发送</a></div>';
    var dom = document.createElement('div');
    dom.className = 'message-box';
    dom.innerHTML = html;
    document.body.appendChild(dom);
    // 隐藏留言界面
    document.getElementById('t-close').onclick = function () {
      document.getElementById('messMask').style.display = 'none';
      document.getElementById('messArea').style.display = 'none';
    }
    // 点击输入框显示留言界面
    document.getElementById('reply-in').onclick = function () {
      document.getElementById('messArea').style.display = 'block';
      document.getElementById('messMask').style.display = 'block';
      document.getElementById('mes-textarea').focus();
    }
  }
  createMessageArea()
  // 判断是否有评论列表
  var hasBool = false
  if (!hasBool) {
    nocomment();
  } else {
    createCommentList();
  }
})();
