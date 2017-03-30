var app = angular.module("app" ,["ngRoute","app.home", "app.signin", "app.signup"]);

app.config(function($locationProvider , $routeProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when("/" , {
        redirectTo:"/signin"
    }).otherwise("/" , {
        redirectTo:"/signin"
    })
});