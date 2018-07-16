/*自己的JS脚步文件
date:2018-05-18
location:华中科技大学 东九教学楼*/


$(function () {
	// 当窗口尺寸改变时执行函数
	function resize(){
		// 获取屏幕的宽度
		var window_width=$(window).width();
		// 判断是否为小屏幕
		var smallScreen=window_width<768;
		
		// 遍历每一张轮播图,根据屏幕大小来选择图片的大小
		$("#main-ad >.carousel-inner >.item").each(function(i,item){
	

			var $item=$(item);//把获取到的DOM对象转换成jquery对象
			// 定义图片类型
			// var imageType =$item.data(smallScreen ? 'sx-Image':'lg-Image');
			// console.log(imageType);
			var imageType =
        	smallScreen ?
        	 $item.data('sx-Image'):
        	  $item.data('lg-Image');
        	  // 大屏幕使用背景图居中的方式显示
			 $item.css('backgroundImage', 'url("' + imageType + '")');
			 // 小屏幕使用插入图片按宽度100%比例显示
			 if(smallScreen){
			 	$item.html('<img src="'+imageType+'">');
			 }else{
			 	// 当屏幕从小拉到大时先清除小图,然后再显示大图
			 	$item.empty();
			 }


		})


		//产品推荐里面的导航标签横向滚动
		var product_tabs=$(".nav-tabs");
		// 获取子元素的宽度之和
		//初始值本应该是0,但是ul上有padding-left值,所以加30px
		var product_tabs_width=30;
		product_tabs.children().each(function(index,ele){
			// console.log(ele.clientWidth);
			// 上下两句意思相同，都是输出子元素的宽度
			// console.log($(ele).width());
			product_tabs_width+=ele.clientWidth;

		});
		// 判断ul的宽度是否超出当前的屏幕宽度，如果超出就显示横向滚动条
		if (product_tabs_width>$(window).width()) {
			product_tabs
			.css('width',product_tabs_width)
			.parent().css('overflow-x','scroll');
			;
		}

	}
	// 让window调用resize方法,并用trigger方法立即执行一次resize
	$(window).on('resize',resize).trigger('resize');


	//初始化tooltips插件
	$('[data-toggle="tooltip"]').tooltip();

	/*新闻标签的点击切换内容 */
   $("#news .nav-pills a").on("click",function(){
   	// 获取当前点击元素的title值
   	var data_title=$(this).data('title');
   	$('#news .news_title').text(data_title);
   })
	


	// 手指滑动轮播图
	// 1.获取手指在轮播图元素上的滑动方向（左右）
		// (1)记录手指触摸开始的坐标X
		// (2)记录手指触摸结束一瞬间的坐标X
	
	var startX;
	var endX;
	var movePrecision=50;	//移动精度
	$(".carousel").on('touchstart',function(e){
		startX=e.originalEvent.touches[0].clientX
		console.log(startX);
	})
	// 变量重复赋值，取最后一个
	$(".carousel").on('touchmove',function(e){
		endX=e.originalEvent.touches[0].clientX
	})
	$(".carousel").on('touchend',function(e){
		console.log(endX);
		// 控制精度
		// 当手指滑动范围大于一定值时生效
		var moveDistance=Math.abs(startX-endX);
		// 2.根据获得的方向选择上一张或者下一张
		if(moveDistance>movePrecision){
			console.log(startX>endX?'<--':'-->');
			$(this).carousel(startX>endX?'next':'prev');

		}

	})	
	
})