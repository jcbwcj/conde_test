/*;
(function() {
	var routes = angular.module("routes", []);
	routes.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
		$stateProvider.state("index", {
			url: "/index",
			templateUrl: "template/index.html"
		}).state("index.home", {
			url: "/home",
			templateUrl: "template/home.html"
		}).state("index.contacts", {
			url: "/contacts",
			templateUrl: "template/contacts.html"
		}).state("detail", {
			url: "/detail",
			templateUrl: "template/detail.html"
		})
	}])
})();*/

// 这种数组写法是为了避免压缩时，代码中的变量会被转换
// 而此处的形参是固定的，转换后无法正常使用
// 数组中的内容再被压缩时是不会被转换的
// 要嵌套routes 需要使用angular-ui-router.js
// angular官方版的angular-router.js不支持嵌套
;
(function(){
	var routes = angular.module("routes",[]);
	routes.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
		$stateProvider.state("first",{
			url:'/index',
			templateUrl:'template/index.html'
		}).state("first.a",{
			url:'/contacts',
			templateUrl:"template/contacts.html"
		}).state("first.home",{
			url:'/home',
			templateUrl:"template/home.html"
		}).state("firstc",{
			url:'/detail/:id',
			controller:"aaa",
			templateUrl:"template/detail.html"
			
		}).state("detail",{
			url:'/detail',
			templateUrl:"template/detail.html"
		})
		
		// 设置默认路由
		$urlRouterProvider.when("","/index/home")
	}])
})()
;