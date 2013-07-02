;(function($) {

	var json = [
		{
			question : 'Ma question un',
			rep1 : 'luis',
			rep2 : 'marcel',
			rep3 : 'henrie',
			rep4 : 'robert',
			valid : 'robert'
		},
		{
			question : 'Ma question 2',
			rep1 : 'luis',
			rep2 : 'marcel',
			rep3 : 'henrie',
			rep4 : 'robert',
			valid : 'luis'
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
			var id = btoa(Math.floor(Math.random() * 1000));
			var _str = '<label for="' + id + '">' + label + '</label>';
			_str += '<input type="radio" name="' + name + '" value="' + label + '" id="' + id + '" />';

			return _str;
		},

		// Display the answer in the dom input:hidden
		solution : function(label,name) {
			return '<input type="hidden" value="' + label + '" id="rep' + name + '">'
		},


		// Main loop on each question in the JSON
		generate : function(config) {

			// Generate an id attach to the current step
			var name = btoa(Math.floor(Math.random() * 1000) + 'rep');
			var str = '<div id="' + name + '" class="formElement">';

			// For each key build a custom element
			for(dom in config) {
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

	var formMain = $('#contest');

	// OnLoad display only the first form
	var display = function(div) {

		div.find('.formElement:not(.formElement:first-child)').addClass('hidden');

	}

	// From the config to the dom, render the form
	var builder = function(formDiv,callback) {

		json.forEach(function(ele,index) {
			formDiv.append(Form.generate(ele));
		});

		callback(formDiv);

	}(formMain, display);


})(jQuery);