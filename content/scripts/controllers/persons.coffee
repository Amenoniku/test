module.exports = ["$scope", "$http", "$compile", ($scope, $http, $compile) ->
	$http.get("data/persons.json").then (persons) ->
		$scope.persons = persons.data

	$scope.change = (event, id) ->
		$scope.person = $scope.persons[id]
		tpl = "<form class='change-form' action='#'>
					<div class='input-group'>
						<input class='form-control' type='text' name='firstName' placeholder='Имя'>
					</div>
					<div class='input-group'>
						<input class='form-control' type='text' name='lastName' placeholder='Фамилия'>
					</div>
					<div class='input-group'>
						<textarea class='form-control' name='comment' placeholder='Коментарий'></textarea>
					</div>
					<input class='btn btn-default' type='button' value='Изменить' ng-click='saveChange($event)'>
					<span class='close' ng-click='close($event)'>×</span>
				</form>"
		compile = $compile(tpl)($scope)
		compile[0].firstName.value = $scope.person.firstName
		compile[0].lastName.value = $scope.person.lastName
		compile[0].comment.value = $scope.person.comment
		event.target.parentNode.appendChild compile[0]
		return no

	$scope.saveChange = (e) ->
		fields = e.target.parentNode
		firstName = fields.firstName.value
		lastName = fields.lastName.value
		comment = fields.comment.value
		if firstName.length <= 255 and firstName.length > 1 and not +firstName
			$scope.person.firstName = firstName 
		if lastName.length <= 255 and lastName.length > 1 and not +lastName
			$scope.person.lastName = lastName
		$scope.person.comment = comment
		fields.parentNode.removeChild fields
		return no

	$scope.close = (e) ->
		e.target.parentNode.parentNode.removeChild e.target.parentNode
		return no

	$scope.delete = (event, id) ->
		$scope.persons.splice id, 1

	$scope.add = (event) ->
		do event.preventDefault
		form = event.target
		firstName = form.firstName.value
		lastName = form.lastName.value
		comment = form.comment.value
		if not (firstName.length <= 255 and firstName.length > 1 and not +firstName)
			return alert "Ошибка ввода в поле \"Имя\""
		if not (lastName.length <= 255 and lastName.length > 1 and not +lastName)
			return alert "Ошибка ввода в поле \"Фамилия\""
		newPerson = {
			id: $scope.persons.length
			firstName: firstName
			lastName: lastName
			comment: comment
		}
		$scope.persons.push newPerson
		console.log $scope.persons
]