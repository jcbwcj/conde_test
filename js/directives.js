/*;
(function() {
	var directives = angular.module("directives", []);
	directives.directive("xheader", [function() {
		return {
			templateUrl: "directive/xheader.html"
		}
	}])
	directives.directive("xsearch", [function() {
		return {
			templateUrl: "directive/xsearch.html",
			link: function(scope, ele, attr) {
				scope.isShowSearchBar = false;
				scope.changeSearchBar = function() {
					scope.isShowSearchBar = true;
				}
			}
		}
	}])
	directives.directive("xswiper", [function() {
		return {
			templateUrl: "directive/xswiper.html",
			link: function(scope, ele, attr) {
				scope.imgs = ["images/1.jpg"];				
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true
				});
			}
		}
	}])
	directives.directive("xlist", [function() {
		return {
			templateUrl: "directive/xlist.html"
		}
	}])
	directives.directive("xfooter", [function() {
		return {
			templateUrl: "directive/xfooter.html",
			link: function(scope, ele, attr) {
				scope.tab = 0;
				scope.changeTab = function(tab) {
					scope.tab = tab
				}
			}
		}
	}])
	directives.directive("xactionsheet", [function() {
		return {
			templateUrl: "directive/xactionsheet.html",
			link: function(scope, ele, attr) {
				scope.isShowActionSheet = false
				scope.changeActionSheet = function(){
					console.log("111")
					scope.isShowActionSheet = true
				}
			}
		}
	}])
	directives.directive("xgallery", [function() {
		return {
			templateUrl: "directive/xgallery.html",
			link: function(scope, ele, attr) {
				scope.isShowGallery = false;
				scope.changeGallery = function(galleryImg){
					scope.galleryImg = galleryImg
					scope.isShowGallery = true;
				}
			}
		}
	}])
})();*/

;
(function(){
	var directives = angular.module("directives",[]);
	directives.directive('xheader',[function(){
		return {
			templateUrl:"directive/xheader.html"
		}
	}])
	directives.directive('xfooter',[function(){
		return {
			templateUrl:"directive/xfooter.html",
			link: function(scope, ele, attr) {
				scope.tab = 0;
				scope.changeTab = function(tab) {
					scope.tab = tab
				}
			}
		}
	}])
	directives.directive('xsearch',[function(){
		return {
			templateUrl:"directive/xsearch.html",
			link:function(scope,ele,attr){
				scope.isShowSearchBar = false;
				scope.searchMsg = '';
				scope.changeSearchBar = function() {
					scope.isShowSearchBar = true;
				}
				
				scope.clearSearchMsg = function(){
					scope.searchMsg = '';
				}
			}
		}
	}])
	directives.directive('xlist',["$http",function($http){
		return {
			templateUrl:"directive/xlist.html",
			link:function(scope,ele,attr){
				scope.loading = true;
				scope.page = 1;
				scope.news = [];
				scope.isShowLoadMore = false;

				scope.xlistLoadMore = function(){
					scope.loading = true;	
					$http({
						url:"https://cnodejs.org/api/v1//topics",
						method:'get',
						params: {
							page: scope.page++,
							// tab: attr.channel,
							tab:'share',
							limit: 10
						}
					}).then(function(data){
						console.log(data);
						scope.news = scope.news.concat(data.data.data);

						scope.loading = false;							
					})
					if(scope.page>3){
						scope.isShowLoadMore = true;
					}
				}
				scope.xlistLoadMore();
				
			}
		}
	}])
	directives.directive('xswiper',[function(){
		return {
			templateUrl:"directive/xswiper.html",
			link:function(scope,ele,attr){
				scope.imgs = ["images/0.jpg","images/6.jpg","images/13.jpg"]
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					observer:true,
					//修改swiper自己或子元素时，自动初始化swiper
					observeParents:true,
					//修改swiper的父元素时，自动初始化swiper
				});
			}
		}
	}])
	directives.directive('xgallery',[function(){
		return {
			templateUrl:"directive/xgallery.html",
			link:function(scope, ele, attr) {
				scope.isShowGallery = false;
				scope.changeGallery = function(galleryImg){
					scope.galleryImg = galleryImg
					scope.isShowGallery = true;
				}
			}
		}
	}])
	directives.directive('xactionsheet',[function(){
		return {
			templateUrl:"directive/xactionsheet.html"
		}
	}])
	directives.directive("xgohead", ["$window",function($window) {
		return {
			templateUrl: "directive/xgohead.html",
			link:function(scope,ele,attr){
				scope.isShowGohead = false;
				
				$window.onscroll = function(){
					if($window.scrollY>500){
						scope.isShowGohead = true;
						console.log(scope.isShowGohead)
					}else{
						scope.isShowGohead = false;
					}
					// 破坏了脏值检测机制
					// 手动刷新
					scope.$apply();
				}
			}
			
		}
	}])
	directives.directive('xdetail',["$state","$http",function($state,$http){
		return {
			link:function(scope,ele,attr){
				console.log($state.params);
				scope.id = $state.params.id;

				scope.goBack = function(){
					location.href = "lol.html#!/index/home";
				}
				$http({
					url:"https://cnodejs.org/api/v1//topic/"+scope.id,
					method:'get'
				}).then(function(data){
					console.log(data);
					scope.msg = data.data.data;

				})
			},
			// templateUrl:"http://qt.qq.com/php_cgi/news/php/varcache_article.php?id=34011&version=$PROTO_VERSION$"
		}
	}])

})()
;