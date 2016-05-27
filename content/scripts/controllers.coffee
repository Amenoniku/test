"use strict"

module.exports = angular.module "controllers", []
	.controller "NewsList", require "./controllers/news-list"
	.controller "NewsPage", require "./controllers/news-page"
	.controller "PhpQuest", require "./controllers/php-quest"