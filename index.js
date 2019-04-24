(function () {
  // 获取所有字段元素，绑定事件
  var b = document.getElementsByClassName('check-keyword')
  var text,top,left
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
    var html =  '<div class="no-info"><img src="./img/no-info.png"/><p>暂时没有评论哦，赶快来抢沙发吧</p></div>' + 
                '<div class="reply-box"><div class="reply-input"><input type="text" placeholder="给我们留言以便互相交流哦"/></div><div class="share-icon">分享</div></div>'
    var dom = document.createElement('div')
    dom.innerHTML = html
    dom.className = 'comment'
    document.body.appendChild(dom)
  }
  // 有评论
  function createCommentList () {
    var html =  '<h6>精选留言·40</h6>' + 
                '<div class="info-lists">' + 
                  '<div class="info-list">' + 
                    '<div class="user-info">' + 
                      '<div class="user-head">' + 
                        '<img class="head-img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1062675657,2502206893&fm=26&gp=0.jpg"/>' + 
                        '<span>图图</span>' + 
                      '</div>' + 
                      '<div class="user-zan zan-active">2</div>' + 
                    '</div>' + 
                    '<div class="com-info">感谢保鱼君！说实话，关注有一阵子了，年前母亲患癌去世，才猛然感受到生命的脆弱！看了您很多的文章，着实有用！</div>' + 
                    '<div class="reply-lists">' +
                      '<div class="reply-list"><span class="name">保鱼君回复：</span></span>感谢您的支持，我们会继续为你们产出精选文章</span></div>' + 
                    '</div>' + 
                  '</div>' + 
                  '<div class="info-list">' + 
                    '<div class="user-info">' + 
                      '<div class="user-head">' + 
                        '<img class="head-img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1062675657,2502206893&fm=26&gp=0.jpg"/>' + 
                        '<span>图图</span>' + 
                      '</div>' + 
                      '<div class="user-zan zan-default"></div>' + 
                    '</div>' + 
                    '<div class="com-info">感谢保鱼君！说实话，关注有一阵子了，年前母亲患癌去世，才猛然感受到生命的脆弱！看了您很多的文章，着实有用！</div>' + 
                    '<div class="reply-lists">' +
                      '<div class="reply-list"><span class="name">保鱼君回复：</span></span>感谢您的支持，我们会继续为你们产出精选文章</span></div>' + 
                    '</div>' + 
                  '</div>' + 
                '</div>' + 
                '<div class="reply-box"><div class="reply-input"><input type="text" placeholder="给我们留言以便互相交流哦"/></div><div class="share-icon">分享</div></div>'
    var dom = document.createElement('div')
    dom.innerHTML = html
    dom.className = 'comment comment-info'
    document.body.appendChild(dom)
  }
  // 判断是否有评论列表
  var hasBool = false
  if (!hasBool) {
    nocomment();
  } else {
    createCommentList();
  }
})();