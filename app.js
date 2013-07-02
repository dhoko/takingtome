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
 
	var Form = {

		title : function(label) {
			return '<h2>' + label + '</h2>';
		},

		input : function(label,name) {
			var id = btoa(Math.floor(Math.random() * 1000));
			var _str = '<label for="' + id + '">' + label + '</label>';
			_str += '<input type="radio" name="' + name + '" value="' + label + '" id="' + id + '" />';

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
					str += Form.solution(config[dom],name);
				}
			}

			str += '</div>';
			return str;
		}

	}

	var formDiv = $('#contest');

	json.forEach(function(ele,index) {

		formDiv.append(Form.generate(ele));
	});

	// $('.formElement:not(.formElement:first-child)').addClass('hidden')

})(jQuery);