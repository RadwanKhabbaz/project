var app = angular.module("authService", []);

app.service("auth", function($http){
	this.signup = function(user){
		return $http.post("/auth/signup", user)
		
	};
	this.signin = function(user){
		console.log(user);
		return $http.post("/auth/signin", user)
	};
});