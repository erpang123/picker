(function () {
  var newScript1 = document.createElement('script')
  newScript1.type = 'text/javascript'
  newScript1.src = 'https://www.91duobaoyu.com/res/src/js/jquery-1.11.3.min.js'
  document.body.appendChild(newScript1)
  newScript1.onload=function () {
  // 请求地址
  var base_url = 'http://192.168.20.215'
  // 获取所有字段元素，绑定事件
  var text,top,left,token,articleId;
  $(document).on('click', '.check-keyword', function () {
    text = $(this).text();
    var offDom = $(this)[0];
    top = 0;
    // 获取节点相对于浏览器上边界的距离
    while (offDom.offsetTop > 0) {
      top += offDom.offsetTop;
      offDom = offDom.offsetParent;
    }
    offDom = $(this)[0];
    top = top + offDom.offsetHeight + 10;
    // 判断是否出现换行,计算距离浏览器左边界的距离
    left = offDom.offsetLeft + offDom.offsetWidth / 2;
    if (offDom.offsetWidth + offDom.offsetLeft > window.screen.availWidth) {
      left = 0;
      while (offDom.offsetLeft > 0) {
        left += offDom.offsetLeft;
        offDom = offDom.offsetParent;
      }
      offDom = $(this)[0];
      left = left - offDom.offsetLeft - 15 + 6;
    }
    // 清除选中样式
    $('.check-keyword').removeClass('checkText');
    // 设置选中的样式
    $(this).addClass('checkText');
    event.preventDefault()
    // 请求对应关键字的描述
    $.ajax({
      url: base_url + '/resource/articleLexicon/getLexiconExplain',
      type: 'post',
      contentType: 'application/json;charset=utf-8',
      data: JSON.stringify({
        name: text
      }),
      dataType: 'json',
      success (res) {
        if (res.dbymsg == 'ok') {
          createHtml(res.dbydata.explain)
        } else {
          createHtml(res.dbymsg)
        }
      }
    })
  })
  // 创建字段详情弹框
  function createHtml (context) {
    var oldDom = document.getElementById('checkbox');
    var newDom;
    var html = '<div class="the-t" style="left: ' + left + 'px"></div>' + 
                '<h5>' + text + '<a id="box-close" class="close-btn"></a></h5>' + 
                '<div class="des-info">' + 
                  context + 
                '</div>' + 
                '<div class="more-info">' + 
                  '词汇详情' + 
                  '<i class="next-icon"></i>' + 
                '</div>';
    if (oldDom) {
      newDom = oldDom;
      newDom.style.top = top + 'px';
    } else {
      var dom = document.createElement('div');
      dom.id = 'checkbox';
      dom.className = 'checkbox';
      dom.style.top = top + 'px';
      newDom = dom;
    }
    newDom.innerHTML = html;
    document.body.appendChild(newDom);
    document.getElementById('box-close').onclick = function () {
      $('.checkText').removeClass('checkText');
      document.body.removeChild(newDom);
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
  function createCommentList (replyList) {
    var html =  '<h6>精选留言·' + replyList.length + '</h6><div class="info-lists">';
    replyList.forEach(function (el) {
      html = html + '<div class="info-list">' + 
                      '<div class="user-info">' + 
                        '<div class="user-head">' + 
                          '<img class="head-img" src="'+ el.fromHeadimgurl +'"/>' + 
                          '<span>' + el.fromNickname + '</span>' + 
                        '</div>';
      if (el.praised == 1) {
        html = html + '<div class="user-zan zan-active" commentId= ' + el.id + '>' + el.praiseCount + '</div>'
      } else {
        var praiseCount = el.praiseCount > 0 ? el.praiseCount : ''
        html = html + '<div class="user-zan zan-default" commentId= ' + el.id + '>' + praiseCount + '</div>';
      }
      html = html + '</div>' + 
                    '<div class="com-info">' + el.content + '</div>' + 
                    '<div class="reply-lists">';
      if (el.replyNickame) {
        html = html + '<div class="reply-list"><span class="name">'+ el.replyNickame +'回复：</span><span>' + el.replyContent + '</span></div>';
      }
      html = html + '</div></div>';
    })
    if ($('.comment.comment-info').length > 0) {
      $('.comment.comment-info').html(html)
    } else {
      var dom = document.createElement('div');
      dom.innerHTML = html;
      dom.className = 'comment comment-info';
      document.body.appendChild(dom);
    }
    // 点赞功能
    var ajaxBool = false
    $(document).on('click', '.user-zan', function () {
      if (ajaxBool) {
        return
      }
      ajaxBool = true
      var oldZan = parseInt($(this).text()) > 0 ? parseInt($(this).text()) : 0;
      var commentid = $(this).attr('commentid')
      var _that = $(this)
      // 取消点赞
      if ($(this).hasClass('zan-active')) {
        $.ajax({
          url: base_url + '/business/comment/cancelCommentPraise',
          type: 'post',
          contentType: 'application/json;charset=utf-8',
          data: JSON.stringify({
            token: token,
            commentId: commentid
          }),
          dataType: 'json',
          success (res) {
            if (res.dbymsg == 'ok' && res.dbydata) {
              oldZan = oldZan - 1 == 0 ? '' : oldZan - 1
              _that.text(oldZan);
              _that.addClass('zan-default');
              _that.removeClass('zan-active');
            }
          },
          complete () {
            ajaxBool = false
          }
        })
      } else {
        // 点赞
        $.ajax({
          url: base_url + '/business/comment/saveCommentPraise',
          type: 'post',
          contentType: 'application/json;charset=utf-8',
          data: JSON.stringify({
            token: token,
            commentId: commentid
          }),
          dataType: 'json',
          success (res) {
            if (res.dbymsg == 'ok' && res.dbydata) {
              _that.text(oldZan + 1);
              _that.removeClass('zan-default');
              _that.addClass('zan-active');
            }
          },
          complete () {
            ajaxBool = false
          }
        })
      }
    })
  }
  // 创建留言区域
  (function () {
    var html = '<div class="reply-box"><div id="reply-in" class="reply-input"><input type="text" disabled placeholder="给我们留言以便互相交流哦"/></div></div>' + 
               '<div id="messMask" class="messMask"></div><div id="messArea" class="messArea"><h6>写留言<a id="t-close" class="close-btn"></a></h6>' + 
               '<div class="mess-textarea"><textarea id="mes-textarea" placeholder="留言将由保鱼君筛选后显示，对所有人可见"></textarea></div>' + 
               '<a class="send-btn">发送</a></div><div class="consult-btn">咨询</div>';
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
    // 发送消息
    var sendBool = false
    $(document).on('click', '.message-box .send-btn', function () {
      if (sendBool) {
        return
      }
      sendBool = true
      var content = $('#mes-textarea').val()
      $.ajax({
        url: base_url + '/business/comment/saveArticleComment',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({
          token: token,
          articleId: articleId,
          content: content
        }),
        dataType: 'json',
        success (res) {
          if (res.dbymsg == 'ok') {
            document.getElementById('messMask').style.display = 'none';
            document.getElementById('messArea').style.display = 'none';
            $('#mes-textarea').val('')
            getCommentList()
          }
        },
        complete () {
          sendBool = false
        }
      })
    })
  })();
  // 创建引导层
  (function () {
    var needGuide = localStorage.getItem('needGuide')
    if (needGuide) {
      return
    }
    var html = '<div class="guideImg"><img src="./images/app-to-c/pages-webView-index/guide-img.png"/><a class="know-btn">知道了</a></div>';
    var dom = document.createElement('div')
    dom.className = 'guideMask'
    dom.innerHTML = html
    document.body.appendChild(dom)
    $(document).on('click', '.guideMask .know-btn', function () {
      $('.guideMask').remove()
      localStorage.setItem('needGuide', 1)
    })
  })();
  // 新增uni.webview.js
  var newScript = document.createElement('script')
  newScript.type = 'text/javascript'
  newScript.src = 'https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.1.js'
  document.body.appendChild(newScript)
  newScript.onload = function () {
    // 跳转到小程序中的页面详情
    $(document).on('click', '.more-info', function () {
      var ite = $(this).siblings('h5').text()
      uni.navigateTo({
        url: "/pages/insuranceClass/dictionariesDetail/index?value=" + ite
      })
    });
    // 跳转到小程序中的咨询页
    $(document).on('click', '.consult-btn', function () {
      uni.navigateTo({
        url: "/pages/insuranceClass/conSult/index"
      })
    })
  }
  // 获取评论列表
  function getCommentList () {
    $.ajax({
      url: base_url + '/business/comment/listArticleComment',
      type: 'post',
      contentType: 'application/json;charset=utf-8',
      data: JSON.stringify({
        token: token,
        articleId: articleId
      }),
      dataType: 'json',
      success (res) {
        if (res.dbymsg == 'ok' && res.dbydata.length > 0) {
          createCommentList(res.dbydata);
        } else {
          nocomment();
        }
      }
    })
  }
  // 获取url中的token和articleId
  function getUrlParam () {
    var url = window.location.href
    var regExp1 = new RegExp('token=[^&]*', 'g')
    var regExp2 = new RegExp('articleId=[^&]*', 'g')
    token = url.match(regExp1) && url.match(regExp1)[0].split('=')[1] || ''
    articleId = url.match(regExp2) && url.match(regExp2)[0].split('=')[1] || ''
    getCommentList()
  }
  getUrlParam()
  }
})();
