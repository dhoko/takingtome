;(function($) {

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
		}

		input : function(label,name) {
			var id = btoa(Math.floor(Math.random() * 1000));
			var _str = '<label for="' + id + '">' + label + '</label>';
			_str += '<input type="radio" name="' + name + '" id="' + id + '" />';

			return _str;
		},

		generate : function(config) {

			var name = btoa(Math.floor(Math.random() * 1000) + 'rep');
			var str = '<div id="' + name + '">';


			for(dom in config) {
				if('question' === dom) {
					str += Form.title(config[dom]);
				}

				if('question' !== dom && 'valid' !== dom) {
					str += Form.input(config[dom],name);
				}
			}
		}

	}

	var formDiv = $('#contest');

	json.forEach(function(ele,index) {

		
		console.log(ele.valid);
		Form.generate(ele);
		formDiv.html();
	});

})(jQuery);