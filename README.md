# 模仿ios中的select效果制作的一个滚轮插件
通过var pricker1 = new pricker(d, nav_list, data, 30);实例化一个对象，传入三个参数分别：<br/>
d：select中选中的文本显示的dom节点。<br/>
nav-list：为select框所在的dom节点。<br/>
data: select中的数据。<br/>
30：为两个option的高度。（现阶段提供三个参数）。<br/>
案例：
```html
<div class="demo1">
	<div id="dom"></div>
		<div class="nav-list" id="nav-list" style="top:100px;left:50px;">
	</div>
</div>
```
```javascript
<script>
var d = document.getElementById('dom');
var nav_list = document.getElementById('nav-list');
var data = ['2017-08-23','2017-08-24','2017-08-25','2017-08-26','2017-08-27','2017-08-28','2017-08-29','2017-08-30','2017-08-31','2017-09-01','2017-09-02','2017-09-03','2017-09-04','2017-09-05','2017-09-06','2017-09-07','2017-09-08','2017-09-09','2017-09-10','2017-09-11','2017-09-12','2017-09-13','2017-09-14','2017-09-15','2017-09-16','2017-09-17','2017-09-18','2017-09-19'];
var pricker1 = new pricker(d, nav_list, data, 30);
</script>
```
效果：
  ![](https://github.com/erpang123/pricker-dmeo/raw/master/Screenshots/pricker.png)
