/* Experiment 09 / Program 01 — Registration form. */
(function () {
  "use strict";
  angular.module("registrationApp", [])
    .controller("RegistrationController", function () {
      var vm = this;
      // Whitelist alphabetic names and spaces; Unicode letters are supported.
      vm.namePattern = /^[\p{L}][\p{L} .'-]*$/u;
      // Require upper, lower, digit, and at least 8 total characters.
      vm.passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
      vm.mobilePattern = /^\d{10}$/;
      vm.states = ["Andhra Pradesh", "Delhi", "Goa", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"];
      vm.user = {};
      vm.submitted = false;
      vm.submit = function (form) {
        if (form.$valid) { vm.submitted = true; }
      };
    });
}());
