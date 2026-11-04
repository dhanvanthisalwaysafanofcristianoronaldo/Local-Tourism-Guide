var calculatorApp = angular.module('calculatorApp', []);

calculatorApp.controller('CalculatorController', function ($scope) {
  // Values bound to the number inputs.
  $scope.a = 2;
  $scope.b = 4;
  $scope.operator = '+';
  $scope.operators = [
    { value: '+', label: '＋  Addition' },
    { value: '-', label: '−  Subtraction' },
    { value: '*', label: '×  Multiplication' },
    { value: '/', label: '÷  Division' }
  ];

  // Calculate the selected operation and expose the answer to the view.
  $scope.calculate = function () {
    var first = Number($scope.a);
    var second = Number($scope.b);

    if ($scope.a === null || $scope.a === '' || $scope.b === null || $scope.b === '') {
      $scope.result = '—';
      $scope.explanation = 'Enter both numbers to calculate.';
      return;
    }

    var answer;
    switch ($scope.operator) {
      case '+': answer = first + second; break;
      case '-': answer = first - second; break;
      case '*': answer = first * second; break;
      case '/':
        if (second === 0) {
          $scope.result = 'Cannot divide by zero';
          $scope.explanation = 'Choose a non-zero second number.';
          return;
        }
        answer = first / second;
        break;
      default:
        $scope.result = '—';
        $scope.explanation = 'Choose an operation.';
        return;
    }

    // Round floating-point output to a readable precision.
    $scope.result = Number.isFinite(answer) ? Number(answer.toFixed(8)).toString() : 'Invalid input';
    $scope.explanation = first + ' ' + $scope.operator + ' ' + second + ' = ' + $scope.result;
  };

  $scope.reset = function () {
    $scope.a = 2;
    $scope.b = 4;
    $scope.operator = '+';
    $scope.calculate();
  };

  $scope.calculate();
});
