// be strict
"use strict";

// this only works in IE9 and above, but fine everywhere else
document.getElementById("cart-oil").addEventListener( "submit", estimateOrder, false );

function estimateOrder(event) {
	// do not try to submit this form
	event.preventDefault();
	
	if (document.getElementById('s-state').value === '') {
		alert('Please choose your shipping state.');
		
		// trigger a focus event on the offending field
		document.getElementById('s-state').focus();
		return;
	}
	
	// collect the quantity of each kind of bottle
	// we're sanitizing these values since the user could put in any old thing
	var btlExtra = parseInt(document.getElementById('txt-q-extra').value, 10) || 0,
		btlCold = parseInt(document.getElementById('txt-q-cold').value, 10) || 0,
		btlGarlic = parseInt(document.getElementById('txt-q-garlic').value, 10) || 0;
	
	var totalBottles = btlExtra + btlCold + btlGarlic;
		
	// collect the state
	var state = document.getElementById('s-state').value;
	var taxFactor = 1;
	if (state === 'CA') taxFactor = 1.075; // 7.5% tax in California
	
	// collect the radio button's value
	var method = document.getElementById('cart-oil').r_method,
		methodValue = '';
		
	for (var i = 0; i < method.length; i++) {
		if (method[i].checked) {
			methodValue = method[i].value;
			break;
		}
	}
	
	var shippingPrice = 0;
	switch (methodValue) {
		case 'pickup' :
			// we don't charge for in-person pickup
			shippingPrice = 0;
			break;
		case 'usps' :
			// USPS: $2 per bottle
			shippingPrice = 2 * totalBottles;
			break;
		case 'ups' :
			// UPS: $3 per bottle
			shippingPrice = 3 * totalBottles;
			break;
	}
			console.log('shipping price: ' + shippingPrice);
	
	var estimate = (btlExtra * 10 + btlCold * 8 + btlGarlic * 10) * taxFactor + shippingPrice;
	
	document.getElementById('txt-estimate').value = '$' + estimate.toFixed(2);
	
	document.getElementById('results').innerHTML = 'Total bottles: ' + totalBottles + '<br>';
	document.getElementById('results').innerHTML += 'Total shipping: $' + shippingPrice.toFixed(2) + '<br>';
	document.getElementById('results').innerHTML += 'Total tax: ' + (taxFactor - 1) * 100 + '%';
}