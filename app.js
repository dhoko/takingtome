;(function($) {

	var currentQuestion = 0;
	var players = {}; //object containers for players and their scores
	var json = [
		{
			question : 'Ma question un',
			rep1 : 'luis',
			rep2 : 'marcel',
			rep3 : 'henrie',
			rep4 : 'robert',
			valid : 'rep1'
		},
		{
			question : 'Ma question 2',
			rep1 : 'luis',
			rep2 : 'marcel',
			rep3 : 'henrie',
			rep4 : 'robert',
			valid : 'rep4'
		}
	];
 
	var Form = {

		title : function(label) {
			return '<h2>' + label + '</h2>';
		},

		input : function(label,name) {
			var id = btoa(Math.floor(Math.random() * 1000));
			var _str = '<label for="' + id + '">' + label + '</label>';
			_str += '<input type="radio" name="' + name + '" id="' + id + '" />';

			return _str;
		},

		solution : function(label,name) {
			return '<input type="hidden" value="' + label + '" id="rep' + name + '">'
		},

		generate : function(config) {

			var name = btoa(Math.floor(Math.random() * 1000) + 'rep');
			var str = '<div id="' + name + '" class="formElement">';


			for(dom in config) {
				if('question' === dom) {
					str += Form.title(config[dom]);
				}

				if('question' !== dom && 'valid' !== dom) {
					str += Form.input(config[dom],name);
				}

				if('valid' === dom) {
					str += Form.solution(config[dom]);
				}
			}

			str += '</div>';
			return str;
		}

	}

	var formDiv = $('#contest');

	json.forEach(function(ele,index) {

		
		console.log(ele.valid);
		
		formDiv.append(Form.generate(ele));
	});

	var checkValidity = function(questionIndex, rep)
	{
		if(json[questionIndex][rep] == json[questionIndex].valid)
			return true;
		else
			return false;
	};// method to check if the player has the correct solution

	var nextQuestion = function(player, score)
	{
		players[player].score += score;
		if(currentQuestion < json.length)
			currentQuestion++;
		else
			finishGame();
	}// method called when a correct solution has been found to go to the next question

})(jQuery);
