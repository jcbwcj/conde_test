Vue.component('xsearch', {
    template: `
		<div :class="{'weui-search-bar_focusing':isShowSearchBar}" class="weui-search-bar" id="search_bar">
			<form class="weui-search-bar__form">
				<div class="weui-search-bar__box">
					<i class="weui-icon-search"></i>
					<input v-model="searchMsg" @change="gallerySearch" type="search" class="weui-search-bar__input" id="search_input" placeholder="搜索"/>
					<a v-searchFocus href="javascript:" class="weui-icon-clear" id="search_clear" @click="clearSearchMsg()"></a>
				</div>
				<label @click="changeSearchBar()" for="search_input" class="weui-search-bar__label" id="search_text">
		            <i class="weui-icon-search"></i>
		            <span>搜索</span>
		        </label>
			</form>
			<a href="javascript:" @click="isShowSearchBar=false;searchMsg = ''" class="weui-search-bar__cancel-btn" id="search_cancel">取消</a>
		</div>
	`,
    data: function() {
        return {
            isShowSearchBar: false,
            searchMsg: ''
        }
    },
    directives:{
    	searchFocus:function(el, binding, vnode){
    		console.log('绑定监听');
    		el.addEventListener('click',function(){
    			/*
                    另一种写法
                    2.x写法
                    上面用v-searchFocus="{fn:clearSearchMsg}"
                    //获取传入v-focus:wscats来的wscats值
        			console.log(binding.arg);
        			//传入指令的值
        			console.log(binding.value.params);
        			//执行传给指令的clear函数
        			binding.value.fn();
        			//让输入框聚焦
                */
    			document.getElementById("search_input").focus();
    		})
    	}
    },
    methods: {
        changeSearchBar: function() {
            this.isShowSearchBar = true;
        },

        clearSearchMsg: function() {
            this.searchMsg = '';
        },
        gallerySearch:function(){
            console.log(this.searchMsg)
            this.$store.state.searchMsg = this.searchMsg;
            this.$store.state.showSearchState = 1;

        }

    }
})
