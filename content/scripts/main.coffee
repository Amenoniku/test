"use strict"

require "angular"
require "ngRoute"

angular.module "testQuest", [
	"ngRoute"
	require("./directives").name
	require("./controllers").name
	require("./services").name
	]
	.config ["$routeProvider", ($routeProvider) ->
		$routeProvider
			.when "/",
				templateUrl: "views/news-list.html"
				controller: "NewsList"
			.when "/news/:id",
				templateUrl: "views/news-page.html"
				controller: "NewsPage"
			.otherwise
				templateUrl: "views/404.html"
	]