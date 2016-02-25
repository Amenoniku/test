"use strict"

angular = require "angular"
require "ngRoute"

kanjiApp = angular.module "testQuest", [
	"ngRoute"
	require("./directives").name
	require("./controllers").name
	require("./services").name
	]
	# .config ["$routeProvider", ($routeProvider) ->
	# 	$routeProvider
	# 		.when "/",
	# 			templateUrl: "views/cars.html"
	# 			controller: "CarsCtrl"
	# 		.when "/car/create",
	# 			templateUrl: "views/car-create.html"
	# 			# controller: "NewKanjiCtrl"
	# 		.when "/about-us",
	# 			templateUrl: "views/about-us.html"
	# 			# controller: "UsersCtrl"
	# 		.when "/car/:id",
	# 			templateUrl: "views/car.html"
	# 			controller: "CarCtrl"
			# .otherwise
			# 	templateUrl: "views/404.html"
	# ]