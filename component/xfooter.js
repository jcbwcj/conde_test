Vue.component("xfooter",{
	template:`
		<div class="weui-tab">
			<div class="weui-tab__panel">
			</div>
			<div class="weui-tabbar">
				<a href="#/index/home" class="weui-tabbar__item" :class="{'weui-bar__item_on':tab==0}" @click="changeTab(0)">
					<img src="./images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
					<p class="weui-tabbar__label">分享资讯</p>
				</a>
				<a href="#/index/job" class="weui-tabbar__item" :class="{'weui-bar__item_on':tab==1}" @click="changeTab(1)">
					<img src="./images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
					<p class="weui-tabbar__label">招聘信息</p>
				</a>
				<a href="#/index/good" class="weui-tabbar__item" :class="{'weui-bar__item_on':tab==2}" @click="changeTab(2)">
					<img src="./images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
					<p class="weui-tabbar__label">发现</p>
				</a>
				<a href="#/index/mine" class="weui-tabbar__item" :class="{'weui-bar__item_on':tab==3}" @click="changeTab(3)">
					<img src="./images/icon_tabbar.png" alt="" class="weui-tabbar__icon">
					<p class="weui-tabbar__label">我</p>
				</a>
			</div>
		</div>
	`,
	data:function(){
		return {
			tab:0
		}
	},
	methods:{
		changeTab:function(a){
			this.tab = a;
			if(a==0){
				this.$store.state.type = 'ask'
			}else if(a==1){
				this.$store.state.type = 'job'
			}else if(a==2){
				this.$store.state.type = 'good'
			}
			
		}
	}

})