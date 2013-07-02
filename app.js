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
 
	var form = {

		input : function(label,name) {
			var id = btoa(Math.floor(Math.random() * 1000));
			var _str = '<label for="' + id + '">' + label + '</label>';
			_str += '<input type="radio" name="' + name + '" id="' + id + '" />';

			return _str;
		}

	}

	json.forEach(function(form,index) {

		var name = btoa(Math.floor(Math.random() * 1000) + 'rep');
		console.log(form.valid);

		$('#input')
	});

})(jQuery);