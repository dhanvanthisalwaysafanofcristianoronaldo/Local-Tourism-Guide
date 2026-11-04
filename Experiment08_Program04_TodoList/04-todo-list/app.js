var todoApp = angular.module('todoApp', []);

todoApp.controller('TodoController', function ($scope) {
  $scope.tasks = [
    { id: 1, title: 'Review AngularJS directives', done: true },
    { id: 2, title: 'Complete the lab experiment', done: false }
  ];
  $scope.title = '';
  $scope.filter = 'all';
  var nextId = 3;

  // Add a new task to the model array.
  $scope.addTask = function () {
    var title = ($scope.title || '').trim();
    if (!title) return;
    $scope.tasks.push({ id: nextId++, title: title, done: false });
    $scope.title = '';
  };

  // Return the tasks matching the selected view filter.
  $scope.filteredTasks = function () {
    if ($scope.filter === 'active') return $scope.tasks.filter(function (task) { return !task.done; });
    if ($scope.filter === 'done') return $scope.tasks.filter(function (task) { return task.done; });
    return $scope.tasks;
  };

  $scope.removeTask = function (id) {
    $scope.tasks = $scope.tasks.filter(function (task) { return task.id !== id; });
  };

  $scope.completedCount = function () {
    return $scope.tasks.filter(function (task) { return task.done; }).length;
  };

  $scope.remainingCount = function () {
    return $scope.tasks.length - $scope.completedCount();
  };

  $scope.clearCompleted = function () {
    $scope.tasks = $scope.tasks.filter(function (task) { return !task.done; });
  };
});
