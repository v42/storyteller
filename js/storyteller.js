var storyteller = (function() {
	var path = "js/"
	  , file = "story.json?callback=?"
	  , start = 1
	  , container = ".wrapper"

	function init() {
		getJSONP(path + file, function(data){
			buildSlides(data)
		})
	}

	function buildSlides(data) {
		var html = ""
		  , id = 1
		  , slideClass = "single"
		  , selected

		_.each(data, function(slide){
			slideClass = (slide.length > 1 ? "double" : "single")
			selected = (id == start ? " selected" : "")
			html += '<div class="slide '+ slideClass + selected + '" id="slide-' + id + '">'
			_.each(slide, function(option){
				html += _.template('<div class="frame" data-link="<%= link %>"><div class="image" style="background-image: url(<%= image %>)"></div><div class="caption"><%- text %></div></div>', option)
			})
			html += '</div>'
			id += 1
		})
		document.querySelector(container).innerHTML = html

		_.each(document.querySelectorAll(".frame"), function(slide) {
			slide.onclick = function() {
				var link = this.dataset.link
				  , height = document.querySelector(".frame").offsetHeight + document.documentElement.clientHeight / 10

				document.querySelector(container).style.webkitTransform = 'translate(0, -' + (height * (link - 1)) + 'px)'
			}
		})
	}

	function getJSONP(url, success) {
		var ud = '_story'
		  , script = document.createElement('script')
		  , head = document.getElementsByTagName('head')[0] || document.documentElement

		window[ud] = function(data) {
			head.removeChild(script)
			success && success(data)
		}

		script.src = url.replace('callback=?', 'callback=' + ud)
		head.appendChild(script)
	}

	return {
		init: init
	}
})()