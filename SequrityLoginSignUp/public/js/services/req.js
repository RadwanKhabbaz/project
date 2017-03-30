var app = angular.module("reqModule", []);
app.service("requests", function ($http) {
    this.get = function () {
        return $http.get("http://localhost:8080/api")
    }
    this.post  = function (data) {
        return $http.post("http://localhost:8080/api/", data)
    }
    this.delete = function (id) {
        return $http.delete("http://localhost:8080/api/" + id);
    }
    this.updateData = function (id, data) {
        var str = "";
        var fullStr = "";
        for (key in data) {
            str += key + "=" + data[key] + "&";
            fullStr += str;
            str = "";
        }
        console.log(id);
        console.log(fullStr);
        //$.param(data);
        return $http.put("http://localhost:8080/api/" + id + "?" + fullStr);
    }
});