Vue.component("xdetail",{
	template:`	
		<div>
			<header><a href="#/index/home" @click="changeGaoduState()"><span><返回</span>详情</a></header>
			<div v-html="news.content" class="detail">
				
			</div>
		</div>
		
	`,
	data:function(){
		return {
			news:''
		}
	},
	methods:{
		showDetail:function(){
			var id = this.$route.params.id;
			console.log(id)
			var self = this;
			// 此处this指向Vue
			var xml = new XMLHttpRequest();

			xml.onreadystatechange = function(){
				if(xml.readyState==4&&xml.status==200){
					console.log(this);
					// 此处this指向XMLHttpRequest
					console.log(self);
					console.log(JSON.parse(xml.responseText));
					self.news = JSON.parse(xml.responseText).data;
					console.log(self.news)
				}
			}

			xml.open('get','https://cnodejs.org/api/v1/topic/'+id,true);

			xml.send(null);
		},
		changeGaoduState:function(){
			this.$store.state.gaoduState = 1;
		}
	},
	mounted:function(){
		this.showDetail();
		
	}
})