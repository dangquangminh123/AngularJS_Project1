var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    //điều hướng trang hiển thị
    $routeProvider
        .when("/home", {
            templateUrl: "views/trangchu.html?" + Math.random(),
            controller: "proCtrl"
        })
        .when("/taosanpham", {
            templateUrl: "views/taosanpham.html?" + Math.random(),
            controller: "viewCtrl"
        })
        .when("/shop", {
            templateUrl: "views/shop.html?" + Math.random(),
            controller: "sanpham"
        })
        .when("/quanly", {
            templateUrl: "views/sanpham.html?" + Math.random(),
            controller: "list"
        })
        .when("/view/:name/:photo/:price/:soluongban", {
            templateUrl: "views/chitietsanpham.html?" + Math.random(),
            controller: "chitiet"
        })
        .when("/xeploai", {
            templateUrl: "views/xeploai.html?" + Math.random(),
            controller: "xeploai"
        })
        .when("/info", {
            templateUrl: "views/canhan.html?" + Math.random(),
            controller: "studCtrl"
        })
        .otherwise({ redirectTo: "/home" });
});

app.controller("formView",function($rootScope){
    $rootScope.cart=[];
});

//Cho Trang home
app.controller("proCtrl",function($scope, $http){
    $scope.book= {};
    $scope.list_book = [];
    //dùng http 
    $http.get("./js/book.json").then(function (response) {
        $scope.list_book = response.data;
        // $scope.pageCount=Math.ceil($scope.items.length/$scope.pageSize);
    }, function (response) {
        alert('Error!!!');
    });
});

app.controller("studCtrl", function ($scope) {
       $scope.Fullname= "Đặng Quang Minh";
        $scope.Birthday= "19-07-2001";
        $scope.Gender= "Nam";
        $scope.Mark= "7.0";
        $scope.Photo = "../images/dangquangminh.jpg";
       })
//Cho phần thêm sản phẩm
app.controller("viewCtrl", function($scope, $http){
    $scope.book= {};
   
    $scope.index=-1; //Gắn vị trí đầu tiên 
    //dùng http 
    $http.get("./js/book.json").then(function (response) {
        $scope.list_book = response.data;
        // $scope.pageCount=Math.ceil($scope.items.length/$scope.pageSize);
    }, function (response) {
        alert('Error!!!');
    });

            //Nút save
            $scope.save = function() {
                $scope.list_book.push(angular.copy($scope.book))
            }

            //Nút edit
            $scope.edit = function(index) {
                $scope.index = index;
                $scope.book = angular.copy($scope.list_book[index]);
            }

             //Nút update
             $scope.update = function() {
                $scope.list_book[$scope.index] = angular.copy($scope.book);
                $scope.clear();
            }

            //Nút Xóa
            $scope.delete = function() {
                $scope.list_book.splice($scope.index,1);
                $scope.clear();
            }

            //cancel
            $scope.cancel = function() {
                if($scope.index == -1) {
                    $scope.clear();
                }
                else {
                    $scope.edit($scope.index);
                }
            }

            //Nút hủy là hủy  toàn bộ những gì người dùng đang nhập vào trong ô input nhưng chưa thêm vào trong danh sách
            $scope.clear = function() {
                $scope.book = {};
            }

            // $scope.list_book = [
            //     {
            //         name: "Sách Angular JS căn bản",
            //         photo: "angularJS_canban.png",
            //         price: "10",
            //         soluongnhap: "15",
            //         soluongban: "5" 
            //     },

            // ]
            $scope.list_book = [];
});

//Cho phần Quản lý sản phẩm
app.controller("list", function($scope, $http){
    $scope.book= {};
    $scope.list_book = [];
    //dùng http 
    $http.get("./js/book.json").then(function (response) {
        $scope.list_book = response.data;
        // $scope.pageCount=Math.ceil($scope.items.length/$scope.pageSize);
    }, function (response) {
        alert('Error!!!');
    });
    $scope.gettongtien = function() {
        var amount =0;
        for(var i=0; i< $scope.list_book.length; i++){
            if($scope.list_book[i].buy) {
                amount += $scope.list_book[i].price * $scope.list_book[i].soluongnhap;
            }
        }
        return amount;
    }

    $scope.gettongthue = function() {
        var tax =0;
        for(var i=0; i< $scope.list_book.length; i++){
            if($scope.list_book[i].buy) {
                tax += ($scope.list_book[i].price * $scope.list_book[i].soluongnhap)*10/100;
            }
        }
        return tax;
    }
});

//Cho phần chi tiết của 1 sản phẩm
app.controller("chitiet",function($scope,$routeParams,$rootScope) {
    $scope.list_sach=[];
    $scope.sach={
        "name":$routeParams.name,
        "photo":$routeParams.photo,
        "price":$routeParams.price,
        "soluongban":$routeParams.soluongban
    };
    if($routeParams.name!=""&&$routeParams.photo!=""&&$routeParams.price!=null&&$routeParams.soluongban!=null)
    {
     $scope.list_sach.push($scope.sach);
    }
  
});

//Phần Sắp xếp toàn bộ các sản phẩm
app.controller("xeploai", function ($scope, $http) {
    // Sản Phẩm :lấy mặt hàng từ file list.json vào $scope users
    $scope.list_book = [];
    //dùng http 
    $http.get("./js/book.json").then(function (response) {
        $scope.list_book = response.data;
        // $scope.pageCount=Math.ceil($scope.book.length/$scope.pageSize);
    }, function (response) {
        alert('Error!!!');
    }
    );
    $scope.begin=0;
    $scope.pageSize=5;
    $scope.pageCount=Math.ceil($scope.list_book.length/$scope.pageSize);
    
    $scope.repaginate = function(){
        $scope.begin=0;  
        $scope.pageCount=Math.ceil($scope.list_book.length/$scope.pageSize); 
    }
    $scope.first=function(){
        $scope.begin=0;
    }
    $scope.previous=function(){
        if($scope.begin>0)
            $scope.begin-=$scope.pageSize;  
    }
    $scope.next=function(){
        if($scope.begin<($scope.pageCount-1)*$scope.pageSize)
            $scope.begin+=$scope.pageSize;
    }
    $scope.last=function(){
        $scope.begin=($scope.pageCount-1)*$scope.pageSize;
    }
});

app.directive('convertToNumber',function(){
    return {
        require:'ngModel',
        link: function(scope,element,atrs,ngModel)
        {
            ngModel.$parsers.push(function(val){
                   return parseInt(val,10);
            });
            ngModel.$formatters.push(function(val){
                   return " "+val;
            });
        }
    }
});
// app.directive('evenNumber', function () {
//     return {
//         require: 'ngModel',
//         link: function (scope, element, attr, mCtrl) {
//             function fnValidate(value) {
//                 if (parseInt(value)>=1) {
//                     mCtrl.$setValidity('charE', true);
//                 }
//                 else {
//                     mCtrl.$setValidity('charE', false);
//                 }
//                 return value;
//             }
//             mCtrl.$parsers.push(fnValidate);
//         }
//     };
// });