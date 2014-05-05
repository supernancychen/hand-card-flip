$(document).ready(function(){
var state = 1;

function transformCSS (className, degree) {
	var style = {
		"-webkit-transform": "rotateY("+degree+"deg)",
		"-moz-transform": "rotateY("+degree+"deg)",
		"transform": "rotateY("+degree+"deg)"
	}
	$(className).css(style);

	return style;
}

// based on how much the hand rolls, CSS transform the card to flip accordingly
// hasHand (boolean): whether a hand exists in the field of view or not
// handType (string): "left" or "right"
// degree: hand.roll in radian
function cardFlip(hasHand, handType, rollRadian) {
	var degree = rollRadian * (180 / Math.PI);

	if(hasHand) {
	    transformCSS(".front", 0-degree);			// front card should roll from 0 to 180

		if(handType === "left")						// hand roll is from 0 to 180deg
			transformCSS(".back", -degree-180);		// back card should roll from -180 to 0
		else 										// hand roll is from 0 to -180deg
			transformCSS(".back", -180-degree);		// back card should roll from -180 to 0
	}
	else {
		transformCSS(".front", 0);
		transformCSS(".back", -180);
	}
}

Leap.loop(function (frame) {
	// state machine
	switch(state) {
		case 1:
			if(frame.hands.length > 0) {
				cardFlip(true, frame.hands[0].type, frame.hands[0].roll());
			}
			else {
				cardFlip(false, "", 0);				// if there are no hands detected, reset the rotations to 0
			}
		  break;
		case 2:
		  break;
		default:
	}

});

});
