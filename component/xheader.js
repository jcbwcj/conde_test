Vue.component("xheader",{
	template:`
		<header @click="goBack()">CNODE社区</header>
	`,
	methods:{
		goBack:function(){
			// location.href = '#'
			var timer = setInterval(function() {
				document.body.scrollTop = document.body.scrollTop - 200;
				if(document.body.scrollTop == 0) {
					clearInterval(timer)
				}
			}, 100)
		}
	}
})