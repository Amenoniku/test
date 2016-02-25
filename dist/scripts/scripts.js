(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var angular, kanjiApp;

angular = require("angular");

require("ngRoute");

kanjiApp = angular.module("testQuest", ["ngRoute", require("./directives").name, require("./controllers").name, require("./services").name]);


},{"./controllers":2,"./directives":4,"./services":5,"angular":"angular","ngRoute":"ngRoute"}],2:[function(require,module,exports){
"use strict";
module.exports = angular.module("controllers", []).controller("Persons", require("./controllers/persons"));


},{"./controllers/persons":3}],3:[function(require,module,exports){
module.exports = [
  "$scope", "$http", "$compile", function($scope, $http, $compile) {
    $http.get("data/persons.json").then(function(persons) {
      return $scope.persons = persons.data;
    });
    $scope.change = function(event, id) {
      var compile, tpl;
      $scope.person = $scope.persons[id];
      tpl = "<form class='change-form' action='#'> <div class='input-group'> <input class='form-control' type='text' name='firstName' placeholder='Имя'> </div> <div class='input-group'> <input class='form-control' type='text' name='lastName' placeholder='Фамилия'> </div> <div class='input-group'> <textarea class='form-control' name='comment' placeholder='Коментарий'></textarea> </div> <input class='btn btn-default' type='button' value='Изменить' ng-click='saveChange($event)'> <span class='close' ng-click='close($event)'>×</span> </form>";
      compile = $compile(tpl)($scope);
      compile[0].firstName.value = $scope.person.firstName;
      compile[0].lastName.value = $scope.person.lastName;
      compile[0].comment.value = $scope.person.comment;
      event.target.parentNode.appendChild(compile[0]);
      return false;
    };
    $scope.saveChange = function(e) {
      var comment, fields, firstName, lastName;
      fields = e.target.parentNode;
      firstName = fields.firstName.value;
      lastName = fields.lastName.value;
      comment = fields.comment.value;
      if (firstName.length <= 255 && firstName.length > 1 && !+firstName) {
        $scope.person.firstName = firstName;
      }
      if (lastName.length <= 255 && lastName.length > 1 && !+lastName) {
        $scope.person.lastName = lastName;
      }
      $scope.person.comment = comment;
      fields.parentNode.removeChild(fields);
      return false;
    };
    $scope.close = function(e) {
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      return false;
    };
    $scope["delete"] = function(event, id) {
      return $scope.persons.splice(id, 1);
    };
    return $scope.add = function(event) {
      var comment, firstName, form, lastName, newPerson;
      event.preventDefault();
      form = event.target;
      firstName = form.firstName.value;
      lastName = form.lastName.value;
      comment = form.comment.value;
      if (!(firstName.length <= 255 && firstName.length > 1 && !+firstName)) {
        return alert("Ошибка ввода в поле \"Имя\"");
      }
      if (!(lastName.length <= 255 && lastName.length > 1 && !+lastName)) {
        return alert("Ошибка ввода в поле \"Фамилия\"");
      }
      newPerson = {
        id: $scope.persons.length,
        firstName: firstName,
        lastName: lastName,
        comment: comment
      };
      $scope.persons.push(newPerson);
      return console.log($scope.persons);
    };
  }
];


},{}],4:[function(require,module,exports){
"use strict";
module.exports = angular.module("directives", []);


},{}],5:[function(require,module,exports){
"use strict";
require("ngResource");

module.exports = angular.module("services", ["ngResource"]);


},{"ngResource":"ngResource"}]},{},[1]);
