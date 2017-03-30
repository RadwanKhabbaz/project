var app = angular.module("app.signup", ["ngRoute", "authService"]);

app.config(function($routeProvider){
	$routeProvider.when("/signup", {
		templateUrl: "/views/signup.tmpl.html",
		controller: "signUpCtrl"
	})
});

app.controller("signUpCtrl", function($scope, auth, $location){
	$scope.signup = function() {
		var data = {
			username : $scope.userinput.username
			,password: $scope.userinput.password1
		};
		auth.signup(data).then(function(response){
			$location.path("/signin");
		})
	}
	
	});