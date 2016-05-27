module.exports = ["$sce", ($sce) ->
	currentPage = 0
	itemPerPage = 2
	newsList = []

	return {
		setNews: (newNews) ->
			newsList = newNews

		getPageNews: (num=0) ->
			first = itemPerPage * num
			last = first + itemPerPage
			currentPage = num
			last = if last > newsList.length then newsList.length else last
			newsList.slice first, last

		getTotalPagesNum: ->
			Math.ceil newsList.length / itemPerPage

		getPaginationList: ->
			pagesNum = @getTotalPagesNum()
			paginationList = []
			paginationList.push 
				name: $sce.trustAsHtml '&laquo;'
				link: 'prev'
			for i in [0...pagesNum]
				name = i + 1
				paginationList.push 
					name: $sce.trustAsHtml ''+name
					link: i
			paginationList.push 
				name: $sce.trustAsHtml '&raquo;'
				link: 'next'
			if pagesNum > 1
				return paginationList
			else
				return no

		getCurrentPageNum: ->
			return currentPage

		getPreviwPageNews: ->
			prevPageNum = currentPage - 1
			if prevPageNum < 0 then prevPageNum = 0
			@getPageNews prevPageNum

		getNextPageNews: ->
			nextPageNum = currentPage + 1
			allPages = @getTotalPagesNum()
			if nextPageNum >= allPages then nextPageNum = allPages - 1
			@getPageNews nextPageNum
	}
]