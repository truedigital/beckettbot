'use strict';

var	Responder = function() {	
	this.multipleResponse = ["Wot wot.", "My ears are burning.", "You rang!?", "Get back to work."];
}

Responder.prototype.found = function(collection, text) {
	return collection.some(item => item === text);
}

Responder.prototype.getResponse = function(text) {
	var textParts = text.toLowerCase().split(/[\s.,!;:,._'"!<>()[\]{\}]/ig);

	if ( this.found(textParts, "beckett") && this.found(textParts, "help") ) {
		return ">Hello, I am *beckett* bot.\n"
				+">Tell me about your upcoming *holiday*,\n"
				+">or maybe you like to *joke*?\n"
		 		+">I have an opinion about the latest from the *Guardian Newspaper*.\n"
				+">I love music, especially *rap* music.\n"
				+">Any more for anymore?\n"
				+">Back to work then.";
	}
	else if ( this.found(textParts, "beckett") ) {
		if ( this.found(textParts, "rap") || this.found(textParts, "hip-hop") ) {
			return "I said a hip hop,\n"
					+"The hippie, the hippie,\n"
					+"To the hip, hip hop, and you don't stop, a rock it\n"
					+"To the bang bang boogie, say, up jump the boogie,\n"
					+"To the rhythm of the boogie, the beat.\n"
					+"\n"
					+"Back to work.";
		}
		else {
			var index = Math.floor(Math.random() * (this.multipleResponse.length - 1));
			return this.multipleResponse[index];
		}
	}		
	else if ( this.found(textParts, "holiday") || this.found(textParts, "holidays") ) {
		return "Holidays are for the weak."
	}
	else if ( this.found(textParts, "joke") || this.found(textParts, "jokes") ) {
		return "I'll do the jokes around here."
	}
	else if ( this.found(textParts, "guardian") && this.found(textParts, "newspaper")) {
		return "Bloody lefties."
	}

	return "";
}

module.exports = Responder;