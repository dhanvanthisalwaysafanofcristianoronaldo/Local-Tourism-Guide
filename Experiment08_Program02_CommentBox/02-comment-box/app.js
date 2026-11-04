var commentApp = angular.module('commentApp', []);

commentApp.controller('CommentCtrl', function ($scope) {
  // The comments array is the model rendered by ng-repeat.
  $scope.comments = [];
  $scope.newComment = '';
  var nextId = 1;

  // Add a comment only when the input contains non-whitespace text.
  $scope.addComment = function () {
    var text = ($scope.newComment || '').trim();
    if (!text) return;

    $scope.comments.unshift({
      id: nextId++,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    $scope.newComment = '';
  };

  // Remove the selected comment using its current array index.
  $scope.removeComment = function (index) {
    $scope.comments.splice(index, 1);
  };
});
