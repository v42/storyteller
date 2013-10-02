require 'flour'

task 'build:stylus', ->
	compile 'css/main.styl', 'css/main.css'

task 'watch', ->
    invoke 'build:stylus'

    watch 'css/*.styl', ->
    	invoke 'build:stylus'