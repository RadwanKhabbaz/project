var app = angular.module("app.home", ["ngRoute", "reqModule"]);

app.config(function($routeProvider){
	$routeProvider.when("/home", {
		templateUrl: "/views/home.tmpl.html",
		controller: "homeCtrl"
	})
});

app.controller("homeCtrl", function($scope, requests){
	$scope.userInput = {};
	$scope.todoItems = [];
	$scope.getData = function() {
		requests.get().then(function(response) {
			var tempData = response.data.data;
			$scope.todoItems = [];
			for (var i=0; i<tempData.length; i++){
				$scope.todoItems.push({
					_id: tempData[i]._id,
					name:tempData[i].name,
					cost: tempData[i].cost,
					isDone: tempData[i].isDone,
					isEdit:false
				});
			}
		}, function(response) {
			console.log(response.status);
		});
	};
	$scope.addItem = function() {
		var data = {
			name: $scope.userInput.name,
			cost: $scope.userInput.cost,
			isDone: false
		}
		requests.post(data).then(function(response){
			$scope.getData();
			$scope.userInput = {};
		}, function(response){
			console.log(response.status);
		});
	};
	$scope.remove = function(id) {
		requests.delete(id).then(function(response){
			$scope.getData();
		}, function(response) {
			console.log(response.status);
		})
	};
	$scope.toogleEdit = function(index) {
		$scope.todoItems[index].isEdit = !$scope.todoItems[index].isEdit;
	};
	$scope.save = function (id, data){

		requests.put(id, data).then(function(response) {
			$scope.getData();
		}, function(response) {
			console.log(response.data);
		});
	}
});