module.exports = function(body) {
	var attributes = {};

	if (body.hasOwnProperty('name')) {
		attributes.name = body.name;
	}

	if (body.hasOwnProperty('email')) {
		attributes.email = body.email;
	}

	if (body.hasOwnProperty('sex')) {
		attributes.sex = body.sex;
	}
	
	if (body.hasOwnProperty('country')) {
		attributes.country = body.country;
	}

	if (body.hasOwnProperty('neighborhood')) {
		attributes.neighborhood = body.neighborhood;
	}

	if (body.hasOwnProperty('state')) {
		attributes.state = body.state;
	}

	if (body.hasOwnProperty('city')) {
		attributes.city = body.city;
	}

	return attributes;
}