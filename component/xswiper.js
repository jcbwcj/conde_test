Vue.component("xswiper",{
	template:`
		<div class="swiper-container">
			<div class="swiper-wrapper" >
				<div class="swiper-slide" v-for="a in imgs" @click="changeGallery(a)">
					<img :src="a" />
				</div>
			</div>
			<!-- Add Pagination -->
			<div class="swiper-pagination"></div>
		</div>
	`,
	data:function(){
		return {
			imgs:["images/0.jpg","images/6.jpg","images/13.jpg"]
		}
	},
	mounted:function(){
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			autoplay:3000,
			// 上|\自动滚动（手动滑动后会失效）
			// 下|/解决方案
			autoplayDisableOnInteraction : false,
			observer:true,
			//修改swiper自己或子元素时，自动初始化swiper
			observeParents:true,
			//修改swiper的父元素时，自动初始化swiper
		});
	}
})