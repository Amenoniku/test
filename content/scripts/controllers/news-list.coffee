module.exports = ["$scope", "GetNews", "Pagination", ($scope, GetNews, Pagination) ->

	GetNews.query (news) ->
		Pagination.setNews news
		$scope.newsList = Pagination.getPageNews()
		$scope.paginationList = Pagination.getPaginationList()

	$scope.showPage = (page) ->
		if page == 'prev'
			$scope.newsList = Pagination.getPreviwPageNews()
		else if page == 'next'
			$scope.newsList = Pagination.getNextPageNews()
		else
			$scope.newsList = Pagination.getPageNews page

	$scope.currentPageNum = ->
		return Pagination.getCurrentPageNum()

]