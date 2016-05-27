module.exports = ["$scope", "$routeParams", "GetNews", ($scope, $routeParams, GetNews) ->
	GetNews.query (res) ->
		res.forEach (item) ->
			if item.id == +$routeParams.id
				$scope.news = item
]