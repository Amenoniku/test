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
  "$scope", "$http", "$compile", "$templateCache", function($scope, $http, $compile, $templateCache) {
    var isNum, urls, validation;
    urls = {
      changeForm: 'views/change-form.html',
      persons: 'data/persons.json'
    };
    $scope.fetch = function(url) {
      $scope.data = {};
      return $http({
        method: 'GET',
        url: url
      }).then(function(res) {
        if (typeof res.data === 'string') {
          return $templateCache.put('form', res.data);
        } else {
          return $scope.data.persons = res.data;
        }
      });
    };
    $scope.fetch(urls.persons);
    $scope.fetch(urls.changeForm);
    $scope.change = function(event, id) {
      var changeForm, compile;
      changeForm = document.getElementById('changeForm');
      if (changeForm) {
        changeForm.parentNode.removeChild(changeForm);
      }
      $scope.person = $scope.data.persons[id];
      compile = $compile($templateCache.get('form'))($scope);
      compile[0].firstName.value = $scope.person.firstName;
      compile[0].lastName.value = $scope.person.lastName;
      compile[0].comment.value = $scope.person.comment;
      event.target.parentNode.appendChild(compile[0]);
      return false;
    };
    $scope.close = function(e) {
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      return false;
    };
    $scope["delete"] = function(event, id) {
      $scope.data.persons.forEach(function(item, i) {
        return item.id = i;
      });
      return $scope.data.persons.splice(id, 1);
    };
    isNum = function(str) {
      var i, j, ref;
      for (i = j = 0, ref = str.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        if (+str[i]) {
          return true;
        }
      }
    };
    validation = function(fields) {
      var firstName, lastName;
      firstName = fields.firstName.value;
      lastName = fields.lastName.value;
      if (firstName.length >= 255 || firstName.length < 1 || isNum(firstName)) {
        alert("Ошибка ввода в поле \"Имя\"");
        return false;
      } else if (lastName.length >= 255 || lastName.length < 1 || isNum(lastName)) {
        alert("Ошибка ввода в поле \"Фамилия\"");
        return false;
      } else {
        return true;
      }
    };
    $scope.saveChange = function(e) {
      var fields;
      fields = e.target.parentNode;
      if (validation(fields)) {
        $scope.person.firstName = fields.firstName.value;
        $scope.person.lastName = fields.lastName.value;
        $scope.person.comment = fields.comment.value;
        fields.parentNode.removeChild(fields);
      }
      return false;
    };
    return $scope.add = function(event) {
      var form, newPerson;
      event.preventDefault();
      form = event.target;
      if (validation(form)) {
        newPerson = {
          id: $scope.data.persons.length,
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          comment: form.comment.value
        };
        return $scope.data.persons.push(newPerson);
      }
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
