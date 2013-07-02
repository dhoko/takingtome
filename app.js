;(function($) {

window.playerMe = 
{
	name : "toto",
	score : 0
}
	var currentQuestion = 0;
	var players = {}; //object containers for players and their scores
	var json = [
		{
			question : 'Ma question un',
			rep1 : 'luis',
			rep2 : 'marcel',
			rep3 : 'henrie',
			rep4 : 'robert',
			valid : 'robert',
			score : 5 
		},
		{
			question : 'Ma question 2',
			rep1 : 'luis',
			rep2 : 'marcel',
			rep3 : 'henrie',
			rep4 : 'robert',
			valid : 'luis',
			score : 10
		}
	];
 
 	/*
		Form generator
		Build a form from a custom JSON
 	*/
	var Form = {

		// Build the form title
		title : function(label) {
			return '<h2>' + label + '</h2>';
		},

		// Build radio input for a question
		input : function(label,name) {
			var id = 's' + (Math.floor(Math.random() * 1000)).toString(16);

			var _str = '<div class="row-form">';
			_str += '<label for="' + id + '">' + label + '</label>';
			_str += '<input type="radio" name="' + name + '" value="' + label + '" id="' + id + '" />';
			_str += '</div>';
			return _str;
		},

		// Display the answer in the dom input:hidden
		solution : function(label,name) {
			return '<input type="hidden" value="' + label + '" id="rep' + name + '">'
		},


		// Main loop on each question in the JSON
		generate : function(config) {

			// Generate an id attach to the current step
			var name = 'form' + (Math.floor(Math.random() * 1000)).toString(16);
			var str = '<div id="' + name + '" class="formElement">';

			// For each key build a custom element
			for(dom in config) {

				if('score' === dom) continue;

				if('question' === dom) {
					str += Form.title(config[dom]);
				}

				if('question' !== dom && 'valid' !== dom) {
					str += Form.input(config[dom],name);
				}

				if('valid' === dom) {
					str += Form.solution(config[dom],name);
				}
			}

			str += '</div>';
			return str;
		}

	}

	var formMain  	  = $('#contest'),
		questionScore = $(document.getElementById('questionScore')),
		ownScore      = $(document.getElementById('ownScore'));

	// OnLoad display only the first form
	var display = function(div) {
		div.find('.formElement:not(.formElement:first-child)').addClass('hidden');
	};

	// From the config to the dom, render the form
	var builder = function(formDiv,callback) {

		json.forEach(function(ele,index) {
			formDiv.append(Form.generate(ele));
		});
		questionScore.html(json[currentQuestion].score);
		ownScore.html(playerMe.score);
		callback(formDiv);

	}(formMain, display);

	var addEventsRadio = function()
	{
		$("input[type='radio']").click(function(event)
			{
				var name = this.name;
				var value = this.value;
				var rep = $.trim(document.getElementById('rep'+this.name).value);
				if(value == rep)
					nextQuestion(playerMe.name, questionScore.html(), name);
				else
					falseRep(playerMe.name);
			})
	}();
	var checkValidity = function(rep)
	{
		return (json[currentQuestion][rep] == json[questionIndex].valid);
	};// method to check if the player has the correct solution


	var loadPlayers = function()
	{
		players[playerMe.name] = playerMe;
	}
	window.nextQuestion = function(player, score, name)
	{
		players[player].score += ~~score;
		if(currentQuestion < json.length)
		{
			currentQuestion++;
			var currentDiv = $("#"+name);
			currentDiv.hide();
			currentDiv.next().show();
			changeScore();
		}
		else
			finishGame();
	}// method called when a correct solution has been found to go to the next question
	window.falseRep = function(player)
	{
		players[player].score--;
		changeScore();
	}// method called when a correct solution has been found to go to the next question
	window.changeScore = function()
	{
		ownScore.html(playerMe.score);
	}

loadPlayers();
})(jQuery);