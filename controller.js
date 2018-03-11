angular.module('newModule', [])
    .controller('newController', function ($scope, $http) {
        GetNotesList($scope);
        $scope.Clear = function () {
            $scope.message = "";
            $scope.subject = "";
            //alert('cleared');
        };
        $scope.Save = function () {
            var data = { Subject: $scope.subject, Message: $scope.message };
            //alert(data.Subject);
            SaveNotes(data);
            //GetNotesList($scope);
        }
        $scope.validate = function () {
            if ($scope.message == undefined || $scope.message == '' || $scope.subject == undefined || $scope.subject == '') {
                return false;
            }
        
        }
        $scope.Edit = function () {

        }
        $scope.Delete = function () {

        }
    });
var GetNotesList = function ($scope) {
    var data
    $.ajax({
        type: "Post",
        url: "Default.aspx/GetData",
        data: "{}",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            var dataList = [];
            $(data.d).each(function (index, item) {
                var tmp = {}
                tmp['Subject'] = item.Subject;
                tmp['Message'] = item.Message;
                dataList.push(tmp);
            });
            $scope.dataList = dataList;
        },
        Error: function (error) {
            alert("failed!" + error);
        },
        async: false
    })
}
var SaveNotes = function (data) {
    $.ajax({
        type: "Post",
        url: "Default.aspx/InsertData",
        data: "{Subject:'" + data.Subject + "',Message:'" + data.Message + "'}",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function () {
        },
        Error: function () {
            alert("failed to insert!")
        }
    })
}
