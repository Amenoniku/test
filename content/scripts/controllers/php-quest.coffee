module.exports = ["$scope", "$http", "$sce", ($scope, $http, $sce) ->

	$scope.checkTable = ->
		$http.get('./php_handlers/add_table.php').then((res) ->
			$scope.user = res.data
		)

	$scope.auth = (event) ->
		do event.preventDefault
		form = event.target
		postData = login: form.login.value, pass: form.pass.value
		$http.post('./php_handlers/auth.php', postData).then (res) ->
			$scope.user = res.data

	$scope.filesList = ->
		$http.get('./php_handlers/get_tree.php').then (res) ->
			$scope.tree = $sce.trustAsHtml res.data
		
		
	
	
]