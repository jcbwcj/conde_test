Vue.component("xlist",{
	template:`
		<div class="weui-panel weui-panel_access">
			<div class="weui-panel__hd">社区信息/{{type}}{{ searchMsg?' / 搜索内容：'+searchMsg:''}}</div>
			<div class="weui-panel__bd">
				<!-- href="#!/detail/{{a.id}}"                  v-for="a in news|filter 'title' searchMsg"               -->
				<a class="weui-media-box weui-media-box_appmsg" v-for="a in news">
					<div class="weui-media-box__hd">
						<img @click="showGallery(a.author.avatar_url)" class="weui-media-box__thumb" :src="a.author.avatar_url">
					</div>
					<div class="weui-media-box__bd" >
						<a @click="setHeight()" :href="'#/detail/'+a.id">
							<h4 class="weui-media-box__title">{{a.title}}</h4>
							<p class="weui-media-box__desc"><span>作者：{{a.author.loginname}}</span> <span>发布于：{{a.create_at|time1}}</span></p>
							<p class="weui-media-box__desc" style="text-align: right;">最后回复：{{a.last_reply_at|time1}}  {{a.last_reply_at|time2}}</p>
							<p class="weui-media-box__desc" style="text-align: right;">回复/访问：&nbsp;&nbsp;<span title="回复数">{{a.reply_count}}</span>/<span title="点击数">{{a.visit_count}}</span></p>
						</a>	
					</div>
				</a>
			
			</div>
			<div class="weui-panel__ft" v-show="!isShowLoadMore">
				<a @click="loadMore()" href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
					<div class="weui-cell__bd">查看更多</div>
					<span class="weui-cell__ft"></span>
				</a>
			</div>
			<div class="weui-loadmore weui-loadmore_line" v-show="isShowLoadMore">
		        <span class="weui-loadmore__tips">暂无更多数据</span>
		    </div>
		    <div id="loadingToast" v-show="loading">
		        <div class="weui-mask_transparent"></div>
		        <div class="weui-toast">
		            <i class="weui-loading weui-icon_toast"></i>
		            <p class="weui-toast__content">数据加载中</p>
		        </div>
		    </div>
		</div>
	`,
	data:function(){
		return {
			originNews:'',
			news:'',
			pageNum:0,//vuex--state
			isShowLoadMore:false,
			loading:false,
			searchMsg:'',//vuex--state
			type:'ask'
		}
	},
	filters:{
		time1:function(input){
			return input.slice(5,10);
		},
		time2:function(input){
			return input.slice(11,16)
		}
	},
	methods:{
		loadMore:function(){
			this.pageNum = this.$store.state.pageNum;
			this.pageNum += 10;
			this.loading = true;

			this.type = this.$store.state.type;
		
			var self = this;
			// 此处this指向Vue
			var xml = new XMLHttpRequest();

			xml.onreadystatechange = function(){
				if(xml.readyState==4&&xml.status==200){
					console.log(this);
					// 此处this指向XMLHttpRequest
					console.log(self);
					console.log(JSON.parse(xml.responseText));

					self.originNews = JSON.parse(xml.responseText).data;
					self.news = self.originNews.slice(0,self.pageNum);
					self.isShowLoadMore = false;
					self.loading = false;
					if(self.pageNum>=self.originNews.length){
						self.isShowLoadMore = true;
					}
					self.$store.state.pageNum = self.pageNum;
					console.log(self.news)
					console.log('num为',self.pageNum)
				}
			}

			xml.open('get','https://cnodejs.org/api/v1/topics?tab='+this.type,true);

			xml.send(null);
		},
		showGallery:function(a){
			console.log(1);
			console.log(this.$store);
			this.$store.state.imgUrl = a;
			this.$store.state.isShowGallery = true;
		},
		// 记录当前位置，设置从详情页返回时自动返回之前的位置
		setHeight:function(){
			var gaodu = document.body.scrollTop;
			window.sessionStorage.setItem("gaodu",gaodu);
		},
		goHeight:function(){
			var gaodu = sessionStorage.getItem("gaodu");
			console.log(gaodu);
			window.scrollTo(0,gaodu);
			this.$store.state.gaoduState = 0;
		},
		showSearch:function(){
			// console.log(this);
			var self = this;
			// console.log(this.$store.state.searchMsg,666);
			// console.log(this.news,88888)
			if(this.$store.state.searchMsg){
				var reNews = this.originNews.filter(function(item){
					// console.log(self)
					// console.log(item.title)
					console.log('正在搜索中');
					return item.title.indexOf(self.$store.state.searchMsg)>=0;
				})
			}
			this.news = reNews ? reNews : this.originNews;
			this.$store.state.showSearchState = 0;
			this.searchMsg = this.$store.state.searchMsg;
			
			console.log(this.searchMsg)
		}
		
	},
	// 1.搜索直接放在此处会导致遍历数组后会有新数据生成
	//   新数据：遍历生成了新数组
	// 2.（死循环进去时，虽然再次生成的数组元素与上一次一模一样，但是他们是两份不同的数据，不同的指针）
	// 数据一变动又会导致该处函数运行
	// 3.两者不停的相互作用导致运行速度变慢
	// (死循环==>报错==>然后停止==>数据输出)
	beforeUpdate:function(){
		console.log('正在刷新')
		// this.showSearch();
		// console.log(this.searchMsg,'变变变')

		// 解决办法
		if(this.$store.state.showSearchState == 1){
			// console.log('变变变');
			this.showSearch();
			// 此处函数执行后有数据变更
			// beforeUpdate函数会再次执行
			// 设置状态码阻止代码进入该逻辑
		}

	},
	updated:function(){
		// 刚开始只是铺页面还没渲染数据时会跑一次（即{{xxx}}还没生效时），导致状态码变换
		// 要设置在页面数据已经渲染完才运行goHeight()才能实现跳转到之前位置
		if(this.$store.state.gaoduState == 1 && !this.loading){
			this.goHeight();
			console.log('跳高度----')
		}	
		console.log('--------------------------')
	},
	mounted:function(){
		this.loadMore();
		console.log('mounted-----')
		console.log(this.$route)
		console.log(this.$route.query)

	}
})