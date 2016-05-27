(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
module.exports = angular.module("controllers", []).controller("NewsList", require("./controllers/news-list")).controller("NewsPage", require("./controllers/news-page")).controller("PhpQuest", require("./controllers/php-quest"));


},{"./controllers/news-list":2,"./controllers/news-page":3,"./controllers/php-quest":4}],2:[function(require,module,exports){
module.exports = [
  "$scope", "GetNews", "Pagination", function($scope, GetNews, Pagination) {
    GetNews.query(function(news) {
      Pagination.setNews(news);
      $scope.newsList = Pagination.getPageNews();
      return $scope.paginationList = Pagination.getPaginationList();
    });
    $scope.showPage = function(page) {
      if (page === 'prev') {
        return $scope.newsList = Pagination.getPreviwPageNews();
      } else if (page === 'next') {
        return $scope.newsList = Pagination.getNextPageNews();
      } else {
        return $scope.newsList = Pagination.getPageNews(page);
      }
    };
    return $scope.currentPageNum = function() {
      return Pagination.getCurrentPageNum();
    };
  }
];


},{}],3:[function(require,module,exports){
module.exports = [
  "$scope", "$routeParams", "GetNews", function($scope, $routeParams, GetNews) {
    return GetNews.query(function(res) {
      return res.forEach(function(item) {
        if (item.id === +$routeParams.id) {
          return $scope.news = item;
        }
      });
    });
  }
];


},{}],4:[function(require,module,exports){
module.exports = [
  "$scope", "$http", "$sce", function($scope, $http, $sce) {
    $scope.checkTable = function() {
      return $http.get('./php_handlers/add_table.php').then(function(res) {
        return $scope.user = res.data;
      });
    };
    $scope.auth = function(event) {
      var form, postData;
      event.preventDefault();
      form = event.target;
      postData = {
        login: form.login.value,
        pass: form.pass.value
      };
      return $http.post('./php_handlers/auth.php', postData).then(function(res) {
        return $scope.user = res.data;
      });
    };
    return $scope.filesList = function() {
      return $http.get('./php_handlers/get_tree.php').then(function(res) {
        return $scope.tree = $sce.trustAsHtml(res.data);
      });
    };
  }
];


},{}],5:[function(require,module,exports){
"use strict";
module.exports = angular.module("directives", []);


},{}],6:[function(require,module,exports){
"use strict";
require("angular");

require("ngRoute");

angular.module("testQuest", ["ngRoute", require("./directives").name, require("./controllers").name, require("./services").name]).config([
  "$routeProvider", function($routeProvider) {
    return $routeProvider.when("/", {
      templateUrl: "views/news-list.html",
      controller: "NewsList"
    }).when("/news/:id", {
      templateUrl: "views/news-page.html",
      controller: "NewsPage"
    }).otherwise({
      templateUrl: "views/404.html"
    });
  }
]);


},{"./controllers":1,"./directives":5,"./services":7,"angular":"angular","ngRoute":"ngRoute"}],7:[function(require,module,exports){
"use strict";
require("ngResource");

module.exports = angular.module("services", ["ngResource"]).factory("GetNews", require("./services/get-news")).factory("Pagination", require("./services/pagination"));


},{"./services/get-news":8,"./services/pagination":9,"ngResource":"ngResource"}],8:[function(require,module,exports){
module.exports = [
  "$resource", function($resource) {
    return $resource('./../data/news.json', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }
];


},{}],9:[function(require,module,exports){
module.exports = [
  "$sce", function($sce) {
    var currentPage, itemPerPage, newsList;
    currentPage = 0;
    itemPerPage = 2;
    newsList = [];
    return {
      setNews: function(newNews) {
        return newsList = newNews;
      },
      getPageNews: function(num) {
        var first, last;
        if (num == null) {
          num = 0;
        }
        first = itemPerPage * num;
        last = first + itemPerPage;
        currentPage = num;
        last = last > newsList.length ? newsList.length : last;
        return newsList.slice(first, last);
      },
      getTotalPagesNum: function() {
        return Math.ceil(newsList.length / itemPerPage);
      },
      getPaginationList: function() {
        var i, j, name, pagesNum, paginationList, ref;
        pagesNum = this.getTotalPagesNum();
        paginationList = [];
        paginationList.push({
          name: $sce.trustAsHtml('&laquo;'),
          link: 'prev'
        });
        for (i = j = 0, ref = pagesNum; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          name = i + 1;
          paginationList.push({
            name: $sce.trustAsHtml('' + name),
            link: i
          });
        }
        paginationList.push({
          name: $sce.trustAsHtml('&raquo;'),
          link: 'next'
        });
        if (pagesNum > 1) {
          return paginationList;
        } else {
          return false;
        }
      },
      getCurrentPageNum: function() {
        return currentPage;
      },
      getPreviwPageNews: function() {
        var prevPageNum;
        prevPageNum = currentPage - 1;
        if (prevPageNum < 0) {
          prevPageNum = 0;
        }
        return this.getPageNews(prevPageNum);
      },
      getNextPageNews: function() {
        var allPages, nextPageNum;
        nextPageNum = currentPage + 1;
        allPages = this.getTotalPagesNum();
        if (nextPageNum >= allPages) {
          nextPageNum = allPages - 1;
        }
        return this.getPageNews(nextPageNum);
      }
    };
  }
];


},{}]},{},[6]);
