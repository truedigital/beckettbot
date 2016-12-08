'use strict';

var	Responder = function() {	
	this.multipleResponse = ["Wot wot.", "My ears are burning.", "You rang!?", "Get back to work."];
}

Responder.prototype.getResponse = function(text) {

	var theText = text.toLowerCase();

	if (theText.indexOf("beckett rap") > -1 || theText.indexOf("hip-hop") || theText.indexOf("rap") || theText.indexOf("hip hop")) {
		return "I said a hip hop,\n"
				+"The hippie, the hippie,\n"
				+"To the hip, hip hop, and you don't stop, a rock it\n"
				+"To the bang bang boogie, say, up jump the boogie,\n"
				+"To the rhythm of the boogie, the beat.\n"
				+"\n"
				+"Back to work.";
	}
	else if (theText.indexOf("beckett") > -1) {
		var index = Math.floor(Math.random() * (this.multipleResponse.length - 1));
		return this.multipleResponse[index];
	}	
	else if (theText.indexOf("holiday") > -1 || theText.indexOf("holidays") > -1) {
		return "Holidays are for the weak."
	}
	else if (theText.indexOf("joke") > -1 || theText.indexOf("jokes") > -1) {
		return "I'll do the jokes around here."
	}
	else if (theText.indexOf("guardian newspaper") > -1) {
		return "Bloody lefties."
	}

	return "";
}

module.exports = Responder;