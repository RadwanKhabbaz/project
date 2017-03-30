var app = angular.module("app.signin", ["ngRoute", "authService"]);

app.config(function($routeProvider){
	$routeProvider.when("/signin", {
		templateUrl: "/views/signin.tmpl.html",
		controller: "signInCtrl"
	})
});

app.controller("signInCtrl", function($scope, auth, $location){
	$scope.signin = function(myuser) {
//		var data = {
//			username : $scope.userinput.username
//			,password: $scope.userinput.password
//		}
		auth.signin(myuser).then(function(response){
			$location.path("/home")
		}, function(response) {
			console.log(response.status);
		})
	}
	});