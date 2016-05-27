module.exports = ["$resource", ($resource) ->
	$resource './../data/news.json', {}, 
		query:
			method: 'GET'
			isArray: on
]