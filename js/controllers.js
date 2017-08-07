/*(function() {
	var controllers = angular.module("controllers", []);
})()*/

;
(function(){
	var controllers = angular.module("controllers",[]);
	controllers.controller("msgCtrl",function($scope,$http){
		$http({
			url:"http://localhost:5888",
			method:'get'
		}).then(function(data){
			console.log(data);
			$scope.arrs = data.data.list;
			console.log($scope.arrs)
		})
	})
	controllers.controller("aaa",function($scope,$state){
		console.log($state.params.id);
		$scope.id = $state.params.id;
		$scope.src = "http://qt.qq.com/php_cgi/news/php/varcache_article.php?id="+$state.params.id+"&version=$PROTO_VERSION$"
		console.log($scope.src)
		// templateUrl:"http://qt.qq.com/php_cgi/news/php/varcache_article.php?id="+$state.params.id+"&version=$PROTO_VERSION$"
	})
})()
;