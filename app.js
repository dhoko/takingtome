;(function($) {

window.playerMe = 
{
	name : "toto",
	score : 0
}
	var currentQuestion = 0;
	var players = {}; //object containers for players and their scores
	window.json = [
		{
			question : 'Ou sommes nous ?',
			rep1 : 'un chateau',
			rep2 : 'un domaine',
			rep3 : 'une grande maison',
			rep4 : 'un palais',
			valid : 'un chateau',
			score : 5, 
			time : 60
		},
		{
			question : 'Qui a gagn&#233; la coupe des conf&#233;d&#233;rations ?',
			rep1 : 'Italie',
			rep2 : 'Uruguay',
			rep3 : 'Espagne',
			rep4 : 'Br&#233;sil',
			valid : 'Br&#233;sil',
			score : 10, 
			time : 60
		}
	];

	window.timer = json[currentQuestion].time;
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
			_str += '<input type="radio" name="' + name + '" value="' + label + '" id="' + id + '" />';
			_str += '<label for="' + id + '">' + label + '</label>';
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

				if('question' !== dom && 'valid' !== dom && 'time' !== dom) {
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
	};
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
		if(player !== undefined)
			players[player].score += ~~score;

		if(currentQuestion < json.length)
		{
			currentQuestion++;
			if(name !== undefined)
				var currentDiv = $("#"+name);
			else
			{
				window.currentDiv.hide();
				window.currentDiv = window.currentDiv.next().show();
			}
			changeScore();
			timer = json[currentQuestion].time;
		}
		else
			finishGame();
	}// method called when a correct solution has been found to go to the next question
	window.falseRep = function(player)
	{
		players[player].score--;
		changeScore();
	}// method called when a correct solution has been found to go to the next question
	window.currentDiv = $("div").first();
	window.changeScore = function()
	{
		questionScore.html(json[currentQuestion].score)
		ownScore.html(playerMe.score);
	}
	window.canvas = document.getElementById('canvas');
	canvas.width = 500;
	canvas.height = 30;
	window.context = canvas.getContext('2d');
	window.draw = function()
	{
		context.fillStyle = "white";
		context.fillRect(0,0,json[currentQuestion].time*4, 30);

		context.fillStyle = "rgb("+(120-(Math.round(timer)*2))+","+Math.round(timer)*2+", 0)";
		context.fillRect(0,0,(json[currentQuestion].time/json[currentQuestion].time*timer)*4, 30);
	}
	window.decreaseTimer = function()
	{
		timer-=0.05;
		if(timer <= 0)
			nextQuestion();
	}
	window.init = function()
	{
		addEventsRadio();
		loadPlayers();
		setInterval(draw, 17);
		setInterval(decreaseTimer, 20);
	}
	window.getScore = function(score)
	{
		//send score
	}
	window.setScore = function(score)
	{
		players["foe"].score = score;
	}
	window.questionValidate = function(currentQuestion)
	{
		nextQuestion();
	}
// init();
// getScore(score);
// setScore(score)
// setPicture();
// questionValidate(currentQuestion);

})(jQuery);
var simpleCallApp = function(action) 
{
	var cfg = {'ipadPath': action};
	
	self.callApp(cfg);
};
			
			/** 
			* methods that manages javascript brigdge call
			*
			* @param cfg.iPadPath  : method name
			* 
			* @param cfg.data  : data parameters
			* 
			*********************************/
var callApp: function(cfg) {
	var defaults = {'data':{}};
	
	var config = $.extend(true,{},defaults, cfg);
	
	switch (self.device) 
	{
	case self.devices.webbrowser:
		if(config.ipadPath.substr(0,3)!= 'log')
		WEBAPP.PadLoader.log('The webservice '+config.ipadPath+' has been requested from ' + JSON.stringify(arguments), 'LOADER    ');
		
		break;
		
	case self.devices.android:
		var url = self._getProcheoUrl(config);
		
		Android.execute(url);
		break;
		
	case self.devices.iOS:
	default:	// retrocompatibility behaviour
		var url = self._getProcheoUrl(config);
	
		self.callAppiPadDevice(config,url);
		break;	 
		
	}
};
			
var callAppiPadDevice: function (config,url) {
	
	var iframe = document.createElement("IFRAME");
	
	iframe.setAttribute("src", url);
	document.documentElement.appendChild(iframe);
	iframe.parentNode.removeChild(iframe);
	iframe = null;
	
	if (config.complete) config.complete(null);
	
};

//format url from config.ipadPath and config.data 
var _getProcheoUrl:function(config)
{
	var args = config.data;			
	var url = 'procheo://'+config.ipadPath+'?';
	var i = 0;
	var tmp = '';
	
	for(k in args){
		if (i>0) tmp = '&';
		url = url+tmp+k+'='+escape(JSON.stringify(args[k]));
		i++;
	}
	
	return url;		
};

var callAppIpadDevice: function (url) {
	
	var iframe = document.createElement("IFRAME");
	
	iframe.setAttribute("src", url);
	document.documentElement.appendChild(iframe);
	iframe.parentNode.removeChild(iframe);
	iframe = null;
	
	if (config.complete) config.complete(null);
	
};
var callAppIpad: function (config) {
	//manage call to pad :
	if(self.isOnPad===true && config.ipadPath) {
		var iframe = document.createElement("IFRAME");
		var args = config.data;
		
		
		var url = 'procheo://'+config.ipadPath+'?';
		var i = 0;
		var tmp = '';
		
		for(k in args){
			if (i>0) tmp = '&';
			url = url+tmp+k+'='+escape(JSON.stringify(args[k]));
			i++;
		}
		
		iframe.setAttribute("src", url);
		document.documentElement.appendChild(iframe);
		iframe.parentNode.removeChild(iframe);
		iframe = null;
		
		if (config.complete) config.complete(null);
	}
	if(config.ipadPath.substr(0,3)!= 'log')
	{
		WEBAPP.PadLoader.log('The webservice '+config.ipadPath+' has been requested', '[padInterface.js] LOADER  webservice requested',true);
		WEBAPP.PadLoader.log('The config param is ['+JSON.stringify(config) +']', '[padInterface.js] LOADER  webservice requested',true);
	}
};