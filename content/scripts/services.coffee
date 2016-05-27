"use strict"

require "ngResource"

module.exports = angular.module "services", ["ngResource"]
	.factory "GetNews", require "./services/get-news"
	.factory "Pagination", require "./services/pagination"