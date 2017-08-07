Vue.component("xgallery",{
	template:`
		<div class="weui-gallery" :style="{display:isShowGallery?'block':'none'}">
			<span class="weui-gallery__img" :style="{backgroundImage: 'url('+imgUrl+')'}"></span>
			<div class="weui-gallery__opr">
				<a href="javascript:" class="weui-gallery__del">
					<i class="weui-icon-delete weui-icon_gallery-delete" @click="hideGallery()"></i>
				</a>
			</div>
		</div>
	`,
	/*data:function(){
		return {
			isShowGallery:false
		}
	},*/
	computed:{
		// 接收处理vuex分发的数据
		isShowGallery:function(){
			return this.$store.state.isShowGallery;
		},
		imgUrl:function(){
			return this.$store.state.imgUrl;
		}
	},
	methods:{
		hideGallery:function(){
			this.$store.state.isShowGallery = false;
		}
	}
})