module.exports = ["$scope", "$http", "$compile", "$templateCache", ($scope, $http, $compile, $templateCache) ->
	urls =
		changeForm: 'views/change-form.html'
		persons: 'data/persons.json'

	$scope.fetch = (url) ->
		$scope.data = {}
		$http(method: 'GET', url: url)
		.then((res) ->
			if typeof res.data == 'string'
				$templateCache.put 'form', res.data
			else
				$scope.data.persons = res.data
		)

	$scope.fetch urls.persons
	$scope.fetch urls.changeForm

	$scope.change = (event, id) ->
		changeForm = document.getElementById 'changeForm'
		if changeForm
			changeForm.parentNode.removeChild changeForm
		$scope.person = $scope.data.persons[id]
		compile = $compile($templateCache.get 'form')($scope)
		compile[0].firstName.value = $scope.person.firstName
		compile[0].lastName.value = $scope.person.lastName
		compile[0].comment.value = $scope.person.comment
		event.target.parentNode.appendChild compile[0]
		return no

	$scope.close = (e) ->
		e.target.parentNode.parentNode.removeChild e.target.parentNode
		return no

	$scope.delete = (event, id) ->
		$scope.data.persons.forEach (item, i) ->
			item.id = i
		$scope.data.persons.splice id, 1

	isNum = (str) ->
		for i in [0...str.length]
			return on if +str[i]

	validation = (fields) ->
		firstName = fields.firstName.value
		lastName = fields.lastName.value
		if firstName.length >= 255 or firstName.length < 1 or isNum firstName
			alert "Ошибка ввода в поле \"Имя\""
			return no
		else if lastName.length >= 255 or lastName.length < 1 or isNum lastName
			alert "Ошибка ввода в поле \"Фамилия\""
			return no
		else
			return on

	$scope.saveChange = (e) ->
		fields = e.target.parentNode
		if validation fields
			$scope.person.firstName = fields.firstName.value
			$scope.person.lastName = fields.lastName.value
			$scope.person.comment = fields.comment.value
			fields.parentNode.removeChild fields
		return no

	$scope.add = (event) ->
		do event.preventDefault
		form = event.target
		if validation form
			newPerson =
				id: $scope.data.persons.length
				firstName: form.firstName.value
				lastName: form.lastName.value
				comment: form.comment.value
			$scope.data.persons.push newPerson
]